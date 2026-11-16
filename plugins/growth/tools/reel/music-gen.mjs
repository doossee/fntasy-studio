#!/usr/bin/env node
// Original backing track synthesised from code: no samples, no third-party recordings.
// The output belongs to whoever runs the script, so a reel can ship with sound out of the box.
//   node tools/reel/music-gen.mjs --seconds 24 --out out/music.wav [--bpm 100] [--mood bright|calm] [--seed 7]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SR = 44100;
const MOODS = {
  // chord roots as MIDI notes + chord tones (semitones from root)
  bright: [[60, [0, 4, 7, 11]], [67, [0, 4, 7, 14]], [57, [0, 3, 7, 10]], [65, [0, 4, 7, 11]]], // C  G  Am F
  calm: [[57, [0, 3, 7, 10]], [65, [0, 4, 7, 11]], [60, [0, 4, 7, 11]], [67, [0, 4, 7, 14]]],   // Am F  C  G
};
const hz = (m) => 440 * 2 ** ((m - 69) / 12);

function prng(seed) {
  let s = seed >>> 0 || 1;
  return () => { s ^= s << 13; s >>>= 0; s ^= s >> 17; s ^= s << 5; s >>>= 0; return s / 4294967296; };
}

export function generateMusic({ seconds = 24, bpm = 100, mood = 'bright', seed = 7 } = {}) {
  const chords = MOODS[mood] || MOODS.bright;
  const n = Math.ceil(seconds * SR);
  const L = new Float32Array(n);
  const R = new Float32Array(n);
  const beat = 60 / bpm;
  const bar = beat * 4;
  const bars = Math.ceil(seconds / bar);
  const rnd = prng(seed);
  const add = (i, l, r) => { if (i >= 0 && i < n) { L[i] += l; R[i] += r; } };

  // one voice: additive tone with envelope; pan -1..1
  const tone = (start, dur, freq, gain, { attack = 0.01, release = 0.2, harmonics = [1], pan = 0, detune = 0 }) => {
    const i0 = Math.floor(start * SR);
    const len = Math.floor((dur + release) * SR);
    const gl = gain * Math.cos(((pan + 1) * Math.PI) / 4);
    const gr = gain * Math.sin(((pan + 1) * Math.PI) / 4);
    for (let i = 0; i < len; i++) {
      const tt = i / SR;
      let env = tt < attack ? tt / attack : 1;
      if (tt > dur) env *= Math.max(0, 1 - (tt - dur) / release);
      let v = 0;
      for (let h = 0; h < harmonics.length; h++) {
        if (!harmonics[h]) continue;
        v += harmonics[h] * Math.sin(2 * Math.PI * freq * (h + 1) * tt);
        if (detune) v += harmonics[h] * 0.6 * Math.sin(2 * Math.PI * freq * (h + 1) * (1 + detune) * tt + 1.3);
      }
      add(i0 + i, v * env * gl, v * env * gr);
    }
  };
  const pluck = (start, freq, gain, pan) => {
    const i0 = Math.floor(start * SR);
    const len = Math.floor(0.6 * SR);
    const gl = gain * Math.cos(((pan + 1) * Math.PI) / 4);
    const gr = gain * Math.sin(((pan + 1) * Math.PI) / 4);
    for (let i = 0; i < len; i++) {
      const tt = i / SR;
      const env = Math.min(1, tt / 0.004) * Math.exp(-tt * 7);
      const v = Math.sin(2 * Math.PI * freq * tt) + 0.35 * Math.exp(-tt * 14) * Math.sin(4 * Math.PI * freq * tt) + 0.12 * Math.exp(-tt * 20) * Math.sin(6 * Math.PI * freq * tt);
      add(i0 + i, v * env * gl, v * env * gr);
    }
  };
  const kick = (start, gain) => {
    const i0 = Math.floor(start * SR);
    const len = Math.floor(0.32 * SR);
    let phase = 0;
    for (let i = 0; i < len; i++) {
      const tt = i / SR;
      const f = 46 + 110 * Math.exp(-tt * 28);
      phase += (2 * Math.PI * f) / SR;
      const v = Math.sin(phase) * Math.exp(-tt * 9) * gain;
      add(i0 + i, v, v);
    }
  };
  const noise = (start, dur, gain, decay, bright, pan = 0) => {
    const i0 = Math.floor(start * SR);
    const len = Math.floor(dur * SR);
    let prev = 0; let lp = 0;
    for (let i = 0; i < len; i++) {
      const tt = i / SR;
      const w = rnd() * 2 - 1;
      const hp = w - prev; prev = w;           // crude high-pass
      lp += 0.35 * (w - lp);                    // crude low-pass
      const v = (bright ? hp * 0.7 : lp) * Math.exp(-tt * decay) * gain;
      add(i0 + i, v * (1 - pan * 0.5), v * (1 + pan * 0.5));
    }
  };

  const arpPattern = [0, 2, 1, 3, 2, 1, 3, 2];
  for (let b = 0; b < bars; b++) {
    const t0 = b * bar;
    const [root, tones] = chords[b % chords.length];
    const intro = b === 0;
    const outro = t0 + bar >= seconds - 0.01 && bars > 2;
    // pad
    tones.forEach((semi, k) => tone(t0, bar - 0.1, hz(root + semi), 0.05, { attack: 0.35, release: 0.7, harmonics: [1, 0.25, 0.08], pan: (k - 1.5) * 0.4, detune: 0.004 }));
    // bass
    const bassF = hz(root - 24);
    for (const off of outro ? [0] : [0, 1.5, 2.5]) tone(t0 + off * beat, beat * (off === 0 ? 1.3 : 0.7), bassF, 0.2, { attack: 0.01, release: 0.12, harmonics: [1, 0.3, 0.1] });
    // arpeggio, eighth notes, with a dotted-eighth echo
    for (let e = 0; e < 8; e++) {
      if (outro && e > 3) break;
      const semi = tones[arpPattern[(e + b * 3) % arpPattern.length] % tones.length];
      const f = hz(root + 12 + semi);
      const at = t0 + e * (beat / 2);
      const pan = e % 2 ? 0.45 : -0.45;
      pluck(at, f, 0.13, pan);
      pluck(at + beat * 0.75, f, 0.045, -pan);
    }
    if (intro || outro) continue;
    // drums
    for (let q = 0; q < 4; q++) {
      kick(t0 + q * beat, q % 2 === 0 ? 0.55 : 0.35);
      if (q % 2 === 1) noise(t0 + q * beat, 0.16, 0.16, 26, false);          // soft snare
      noise(t0 + (q + 0.5) * beat, 0.05, 0.07, 70, true, q % 2 ? 0.3 : -0.3); // offbeat hat
    }
  }

  // master: fades, soft clip, normalise to about -1.5 dBFS
  const fadeOut = Math.min(2.0, seconds / 4) * SR;
  let peak = 0;
  for (let i = 0; i < n; i++) {
    let g = Math.min(1, i / (0.03 * SR));
    if (i > n - fadeOut) g *= (n - i) / fadeOut;
    L[i] = Math.tanh(L[i] * 1.4) * g; R[i] = Math.tanh(R[i] * 1.4) * g;
    peak = Math.max(peak, Math.abs(L[i]), Math.abs(R[i]));
  }
  const norm = peak > 0 ? 0.84 / peak : 1;
  const buf = Buffer.alloc(44 + n * 4);
  buf.write('RIFF', 0); buf.writeUInt32LE(36 + n * 4, 4); buf.write('WAVEfmt ', 8);
  buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20); buf.writeUInt16LE(2, 22);
  buf.writeUInt32LE(SR, 24); buf.writeUInt32LE(SR * 4, 28); buf.writeUInt16LE(4, 32); buf.writeUInt16LE(16, 34);
  buf.write('data', 36); buf.writeUInt32LE(n * 4, 40);
  for (let i = 0; i < n; i++) {
    buf.writeInt16LE(Math.round(L[i] * norm * 32767), 44 + i * 4);
    buf.writeInt16LE(Math.round(R[i] * norm * 32767), 46 + i * 4);
  }
  return buf;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const a = process.argv.slice(2);
  const opt = (k, d) => { const i = a.indexOf(`--${k}`); return i >= 0 && a[i + 1] ? a[i + 1] : d; };
  const out = path.resolve(opt('out', 'out/music.wav'));
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, generateMusic({ seconds: Number(opt('seconds', 24)), bpm: Number(opt('bpm', 100)), mood: opt('mood', 'bright'), seed: Number(opt('seed', 7)) }));
  console.log(`music: ${path.relative(process.cwd(), out)}`);
}

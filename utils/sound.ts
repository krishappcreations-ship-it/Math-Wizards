// Simple synth sound generator to avoid external asset dependencies
export const playSound = (type: 'correct' | 'incorrect' | 'click' | 'win') => {
  const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioContext) return;

  const ctx = new AudioContext();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.connect(gain);
  gain.connect(ctx.destination);

  const now = ctx.currentTime;

  if (type === 'correct') {
    // Happy ding (Major third)
    osc.type = 'sine';
    osc.frequency.setValueAtTime(523.25, now); // C5
    osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.1); // E5
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
    osc.start(now);
    osc.stop(now + 0.4);
  } else if (type === 'incorrect') {
    // Gentle shake sound (wobbly low pitch)
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.linearRampToValueAtTime(100, now + 0.2);
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.linearRampToValueAtTime(0.01, now + 0.3);
    osc.start(now);
    osc.stop(now + 0.3);
  } else if (type === 'click') {
    // Soft pop
    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, now);
    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
    osc.start(now);
    osc.stop(now + 0.1);
  } else if (type === 'win') {
    // Victory fanfare (quick arpeggio)
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C E G C
    notes.forEach((freq, i) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.connect(g);
      g.connect(ctx.destination);
      o.frequency.value = freq;
      const startTime = now + i * 0.1;
      g.gain.setValueAtTime(0.2, startTime);
      g.gain.exponentialRampToValueAtTime(0.01, startTime + 0.3);
      o.start(startTime);
      o.stop(startTime + 0.3);
    });
  }
};
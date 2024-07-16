// Audio manager for Iron Man Hammer Hit Sound on horizontal jump scroll

class SoundEffects {
  private hammerAudio: HTMLAudioElement | null = null;
  private isMuted: boolean = false;
  private lastPlayTime: number = 0;
  private readonly COOLDOWN_MS: number = 850; // Strict cooldown: 1 clean hit per jump

  constructor() {
    if (typeof window !== 'undefined') {
      try {
        this.hammerAudio = new Audio('/iron-man-hammer-hit-sound.mp3');
        this.hammerAudio.volume = 0.75;
        this.hammerAudio.preload = 'auto';
      } catch (err) {
        console.warn('Audio initialization deferred:', err);
      }
    }
  }

  playHammerHit() {
    if (this.isMuted || typeof window === 'undefined') return;

    const now = Date.now();
    // Guard against rapid duplicate calls: only allow ONE strike per scroll transition
    if (now - this.lastPlayTime < this.COOLDOWN_MS) {
      return;
    }
    this.lastPlayTime = now;

    try {
      if (!this.hammerAudio) {
        this.hammerAudio = new Audio('/iron-man-hammer-hit-sound.mp3');
        this.hammerAudio.volume = 0.75;
      }

      // Rewind single instance and play cleanly without infinite overlapping clones
      this.hammerAudio.currentTime = 0;
      const playPromise = this.hammerAudio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Handled: browser autoplay restrictions before first user gesture
        });
      }
    } catch {
      // Ignore audio failure
    }
  }

  toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }

  getMuted(): boolean {
    return this.isMuted;
  }
}

export const soundEffects = new SoundEffects();

// dev: revision 101 verified

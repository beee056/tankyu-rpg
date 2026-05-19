/**
 * useAudio — BGM loop + SE single-shot playback
 *
 * - BGM is played as a loop. Same path → keeps playing (no restart).
 * - Audio is unlocked on first user interaction (browser autoplay policy).
 * - All errors are silently swallowed so a missing/silent mp3 never breaks the game.
 */
import { useCallback, useEffect, useRef, useState } from "react";

// ──────────────────────────────────────────────────────────────────────────────
// Singleton audio-unlock flag (shared across all hook instances)
// ──────────────────────────────────────────────────────────────────────────────
let audioUnlocked = false;
const unlockCallbacks: Array<() => void> = [];

function registerUnlockCallback(cb: () => void) {
  if (audioUnlocked) {
    cb();
  } else {
    unlockCallbacks.push(cb);
  }
}

function setupUnlockListener() {
  const unlock = () => {
    if (audioUnlocked) return;
    audioUnlocked = true;
    unlockCallbacks.forEach((cb) => {
      try { cb(); } catch { /* silent */ }
    });
    unlockCallbacks.length = 0;
    window.removeEventListener("click", unlock, true);
    window.removeEventListener("touchstart", unlock, true);
    window.removeEventListener("keydown", unlock, true);
  };
  window.addEventListener("click", unlock, true);
  window.addEventListener("touchstart", unlock, true);
  window.addEventListener("keydown", unlock, true);
}

// Set up once at module load
setupUnlockListener();

// ──────────────────────────────────────────────────────────────────────────────
// useAudio hook
// ──────────────────────────────────────────────────────────────────────────────
export interface UseAudioReturn {
  /** Set / change the current BGM path. Pass null to stop BGM. */
  setBgm: (path: string | null) => void;
  /** Play a sound effect once (fire and forget). */
  playSe: (path: string) => void;
  /** BGM volume 0-1 (default 0.3) */
  bgmVolume: number;
  setBgmVolume: (v: number) => void;
  /** SE volume 0-1 (default 0.6) */
  seVolume: number;
  setSeVolume: (v: number) => void;
  /** Mute toggles */
  bgmMuted: boolean;
  setBgmMuted: (v: boolean) => void;
  seMuted: boolean;
  setSeMuted: (v: boolean) => void;
}

export function useAudio(): UseAudioReturn {
  const bgmRef = useRef<HTMLAudioElement | null>(null);
  const currentBgmPath = useRef<string | null>(null);
  const pendingBgmPath = useRef<string | null>(null);

  const [bgmVolume, setBgmVolumeState] = useState(0.3);
  const [seVolume, setSeVolumeState] = useState(0.6);
  const [bgmMuted, setBgmMutedState] = useState(false);
  const [seMuted, setSeMutedState] = useState(false);

  const bgmVolumeRef = useRef(bgmVolume);
  const seVolumeRef = useRef(seVolume);
  const bgmMutedRef = useRef(bgmMuted);
  const seMutedRef = useRef(seMuted);

  // Sync refs
  useEffect(() => { bgmVolumeRef.current = bgmVolume; if (bgmRef.current) bgmRef.current.volume = bgmMutedRef.current ? 0 : bgmVolume; }, [bgmVolume]);
  useEffect(() => { seVolumeRef.current = seVolume; }, [seVolume]);
  useEffect(() => { bgmMutedRef.current = bgmMuted; if (bgmRef.current) bgmRef.current.volume = bgmMuted ? 0 : bgmVolumeRef.current; }, [bgmMuted]);
  useEffect(() => { seMutedRef.current = seMuted; }, [seMuted]);

  const startBgm = useCallback((path: string) => {
    if (!audioUnlocked) {
      pendingBgmPath.current = path;
      return;
    }
    // Same BGM already playing → do nothing
    if (currentBgmPath.current === path && bgmRef.current && !bgmRef.current.paused) {
      return;
    }
    // Stop previous
    if (bgmRef.current) {
      bgmRef.current.pause();
      bgmRef.current.src = "";
    }
    currentBgmPath.current = path;
    const audio = new Audio(path);
    audio.loop = true;
    audio.volume = bgmMutedRef.current ? 0 : bgmVolumeRef.current;
    bgmRef.current = audio;
    audio.play().catch(() => { /* autoplay blocked — will retry on next interaction */ });
  }, []);

  const stopBgm = useCallback(() => {
    if (bgmRef.current) {
      bgmRef.current.pause();
      bgmRef.current.src = "";
      bgmRef.current = null;
    }
    currentBgmPath.current = null;
  }, []);

  const setBgm = useCallback((path: string | null) => {
    if (!path) { stopBgm(); return; }
    if (audioUnlocked) {
      startBgm(path);
    } else {
      pendingBgmPath.current = path;
      registerUnlockCallback(() => {
        if (pendingBgmPath.current) startBgm(pendingBgmPath.current);
      });
    }
  }, [startBgm, stopBgm]);

  const playSe = useCallback((path: string) => {
    if (seMutedRef.current) return;
    const play = () => {
      try {
        const audio = new Audio(path);
        audio.volume = seVolumeRef.current;
        audio.play().catch(() => {});
      } catch { /* silent */ }
    };
    if (audioUnlocked) {
      play();
    } else {
      registerUnlockCallback(play);
    }
  }, []);

  const setBgmVolume = useCallback((v: number) => { setBgmVolumeState(Math.max(0, Math.min(1, v))); }, []);
  const setSeVolume = useCallback((v: number) => { setSeVolumeState(Math.max(0, Math.min(1, v))); }, []);
  const setBgmMuted = useCallback((v: boolean) => { setBgmMutedState(v); }, []);
  const setSeMuted = useCallback((v: boolean) => { setSeMutedState(v); }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (bgmRef.current) {
        bgmRef.current.pause();
        bgmRef.current.src = "";
      }
    };
  }, []);

  return {
    setBgm,
    playSe,
    bgmVolume,
    setBgmVolume,
    seVolume,
    setSeVolume,
    bgmMuted,
    setBgmMuted,
    seMuted,
    setSeMuted,
  };
}

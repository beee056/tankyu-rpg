/**
 * SceneBackground — full-screen background layer (z-index lowest)
 *
 * Accepts a `src` path. When `src` changes, crossfades to the new image.
 * `tint` allows CSS filter override (e.g. brightness(0.85) for "research room").
 * Falls back to the dark gradient if src is null/undefined.
 */
import { AnimatePresence, motion } from "framer-motion";

interface SceneBackgroundProps {
  src?: string | null;
  /** CSS filter string, e.g. "brightness(0.85) saturate(0.9)" */
  tint?: string;
  /** Crossfade duration in seconds (default 1.2) */
  fadeDuration?: number;
}

export function SceneBackground({
  src,
  tint,
  fadeDuration = 1.2,
}: SceneBackgroundProps) {
  return (
    <>
      {/* Fallback dark gradient — always rendered below */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(160deg, #1E1814 0%, #241C14 50%, #2C2218 100%)",
        }}
      />

      {/* Decorative glow blobs (ambient light) */}
      <div
        className="absolute top-0 right-0 w-64 h-64 opacity-10 blur-3xl z-0 pointer-events-none"
        style={{ background: "#E8B4A0", borderRadius: "50%" }}
      />
      <div
        className="absolute bottom-0 left-0 w-48 h-48 opacity-5 blur-3xl z-0 pointer-events-none"
        style={{ background: "#C9805E", borderRadius: "50%" }}
      />

      {/* Background image layer */}
      <AnimatePresence>
        {src && (
          <motion.div
            key={src}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: fadeDuration, ease: "easeInOut" }}
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `url(${src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: tint ?? undefined,
            }}
          />
        )}
      </AnimatePresence>

      {/* Vignette overlay — always on top of bg, below sprites */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 45%, rgba(14,10,8,0.45) 100%)",
        }}
      />
    </>
  );
}

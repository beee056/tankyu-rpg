/**
 * ChapterTitle — Chapter / koma title fade overlay
 *
 * Displays a title string in the center of the screen with:
 *  fadeIn → hold → fadeOut
 * then calls onComplete when the animation cycle finishes.
 *
 * Triggered by passing a non-null `title` prop.
 */
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface ChapterTitleProps {
  /** Pass a string to trigger the animation, null to hide. */
  title: string | null;
  /** Called after the full animation cycle completes */
  onComplete?: () => void;
}

export function ChapterTitle({ title, onComplete }: ChapterTitleProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!title) { setVisible(false); return; }
    setVisible(true);
    // Hold for 1500ms + 1200ms fadeIn + 600ms fadeOut ≈ 3300ms total
    const timer = setTimeout(() => {
      setVisible(false);
      onComplete?.();
    }, 3300);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title]);

  return (
    <AnimatePresence>
      {visible && title && (
        <motion.div
          key={title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 z-[50] flex flex-col items-center justify-center pointer-events-none"
          style={{ background: "rgba(14,10,8,0.75)" }}
        >
          {/* Decorative line above */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-16 h-px mb-6"
            style={{ background: "#C9B99A" }}
          />

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }}
            className="text-center font-serif"
            style={{
              fontFamily: "'DotGothic16', monospace",
              color: "#EDE3CF",
              fontSize: "clamp(1rem, 3vw, 1.5rem)",
              letterSpacing: "0.25em",
              textShadow: "0 2px 16px rgba(0,0,0,0.8)",
              whiteSpace: "pre-wrap",
            }}
          >
            {title}
          </motion.p>

          {/* Decorative line below */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="w-16 h-px mt-6"
            style={{ background: "#C9B99A" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

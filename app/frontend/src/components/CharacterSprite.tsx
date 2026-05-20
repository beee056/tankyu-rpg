/**
 * CharacterSprite — full-screen character sprite layer (z-index middle)
 *
 * Renders up to 2 simultaneous character sprites at left/center/right positions.
 * Each sprite entry has: actor, src, position, and optional exit animation.
 * If a 3rd sprite arrives, the oldest one is faded out automatically.
 *
 * Animations:
 *   fadeIn   → opacity 0→1
 *   slideIn  → slides from offscreen edge (left→from left, right→from right, center→from bottom)
 *   fadeOut  → opacity 1→0 (triggers removal)
 *   none     → instant appear
 */
import { AnimatePresence, motion } from "framer-motion";

// ──────────────────────────────────────────────────────────────────────────────
// Character image map (v2.5: yu uses bust-up version)
// ──────────────────────────────────────────────────────────────────────────────
export const CHAR_IMAGE: Record<string, string> = {
  yu:      "/assets/characters/yu/yu_01_neutral.png",
  chifuka: "/assets/characters/chifuka/chifuka_01_neutral.png",
  akira:   "/assets/characters/midou/midou_01_neutral_front.png",
  minori:  "/assets/characters/minori/minori_01_neutral.png",
  ren:     "/assets/characters/ren/ren_01_neutral.png",
};

export type SpritePosition = "left" | "center" | "right";
export type SpriteAction = "fadeIn" | "slideIn" | "fadeOut" | "none";

export interface SpriteEntry {
  actor: string;
  position: SpritePosition;
  action?: SpriteAction;
  /** override image src (e.g. expression variants) */
  src?: string;
}

interface CharacterSpriteProps {
  sprites: SpriteEntry[];
}

// Position classes — horizontal placement
const POSITION_STYLE: Record<SpritePosition, React.CSSProperties> = {
  left:   { left: "8%", right: "auto" },
  center: { left: "50%", transform: "translateX(-50%)" },
  right:  { right: "8%", left: "auto" },
};

function getInitial(action: SpriteAction, position: SpritePosition) {
  switch (action) {
    case "slideIn":
      if (position === "left")   return { opacity: 0, x: -80 };
      if (position === "right")  return { opacity: 0, x: 80 };
      return { opacity: 0, y: 60 }; // center → from bottom
    case "fadeOut":
      return { opacity: 1, x: 0, y: 0 };
    case "none":
      return { opacity: 1, x: 0, y: 0 };
    default: // fadeIn
      return { opacity: 0, x: 0, y: 0 };
  }
}

function getAnimate(action: SpriteAction) {
  if (action === "fadeOut") return { opacity: 0, x: 0, y: 0 };
  return { opacity: 1, x: 0, y: 0 };
}

export function CharacterSprite({ sprites }: CharacterSpriteProps) {
  // Limit to max 2 sprites: if more than 2, keep the last 2 (oldest is evicted)
  const visibleSprites = sprites.length > 2 ? sprites.slice(-2) : sprites;

  // Auto-split positions when 2 sprites share the same position (avoid overlap)
  const arranged = (() => {
    if (visibleSprites.length !== 2) return visibleSprites;
    const [a, b] = visibleSprites;
    if (a.position !== b.position) return visibleSprites;
    // Both same position: spread to left and right
    return [
      { ...a, position: "left" as SpritePosition },
      { ...b, position: "right" as SpritePosition },
    ];
  })();

  return (
    // Sprite layer: sits above background, below dialogue box
    <div className="absolute inset-0 z-[5] pointer-events-none overflow-hidden">
      <AnimatePresence>
        {arranged.map((sprite, idx) => {
          const imgSrc = sprite.src ?? CHAR_IMAGE[sprite.actor];
          if (!imgSrc) return null;
          const action: SpriteAction = sprite.action ?? "fadeIn";
          const posStyle = POSITION_STYLE[sprite.position];
          // z-index: first sprite lower, second sprite higher for natural overlap
          const zIndex = 5 + idx;

          return (
            <motion.div
              key={`${sprite.actor}-${sprite.position}`}
              initial={getInitial(action, sprite.position)}
              animate={getAnimate(action)}
              exit={{ opacity: 0, transition: { duration: 0.35 } }}
              transition={{ duration: action === "none" ? 0 : 0.5, ease: "easeOut" }}
              className="absolute bottom-0"
              style={{
                ...posStyle,
                // Height ~78% of screen for bust-up sprites
                height: "78%",
                maxHeight: "78vh",
                zIndex,
              }}
            >
              <img
                src={imgSrc}
                alt={sprite.actor}
                className="h-full w-auto object-contain object-bottom"
                style={{
                  filter: "sepia(0.1) drop-shadow(0 4px 16px rgba(0,0,0,0.5))",
                  maskImage: "linear-gradient(to bottom, black 85%, transparent 100%)",
                  WebkitMaskImage: "linear-gradient(to bottom, black 85%, transparent 100%)",
                }}
                onError={(e) => {
                  // If image fails to load, hide silently
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

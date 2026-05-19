import React from "react";

interface OfficeMapHotspotProps {
  /** CSS left as percentage string, e.g. "12%" */
  left: string;
  /** CSS top as percentage string, e.g. "78%" */
  top: string;
  /** Width of the hotspot area */
  width?: string;
  /** Height of the hotspot area */
  height?: string;
  /** Display label shown on hover */
  label: string;
  /** aria-label for accessibility */
  ariaLabel: string;
  onClick: () => void;
}

/**
 * Absolute-positioned clickable hotspot overlaid on the office map image.
 * Renders a pulsing ring + hover highlight + tooltip label.
 */
const OfficeMapHotspot: React.FC<OfficeMapHotspotProps> = ({
  left,
  top,
  width = "14%",
  height = "14%",
  label,
  ariaLabel,
  onClick,
}) => {
  return (
    <button
      className="absolute group cursor-pointer"
      style={{ left, top, width, height, transform: "translate(-50%, -50%)" }}
      onClick={onClick}
      aria-label={ariaLabel}
      type="button"
    >
      {/* Hover bg glow */}
      <span className="absolute inset-0 rounded-full bg-yoake-accent/0 group-hover:bg-yoake-accent/20 transition-colors duration-200" />
      {/* Pulsing ring */}
      <span className="absolute inset-0 rounded-full ring-2 ring-yoake-accent/50 animate-pulse-soft group-hover:ring-yoake-accent/80 transition-all" />
      {/* Center dot */}
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-yoake-accent/70 group-hover:bg-yoake-accent transition-colors" />
      {/* Label tooltip */}
      <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-yoake-ink text-xs font-serif whitespace-nowrap bg-yoake-bg/90 px-2 py-0.5 border border-yoake-border opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
        {label}
      </span>
    </button>
  );
};

export default OfficeMapHotspot;

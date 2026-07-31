import { cn } from "@/lib/utils";

type PawProps = {
  className?: string;
  size?: number;
  style?: React.CSSProperties;
};

export function PawIcon({ className, size = 20, style }: PawProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={cn("shrink-0", className)}
      style={style}
    >
      <ellipse cx="12" cy="17" rx="4.5" ry="3.5" />
      <ellipse cx="7" cy="11" rx="2.2" ry="2.8" />
      <ellipse cx="12" cy="9" rx="2.2" ry="2.8" />
      <ellipse cx="17" cy="11" rx="2.2" ry="2.8" />
      <ellipse cx="9.5" cy="6" rx="1.8" ry="2.4" />
      <ellipse cx="14.5" cy="6" rx="1.8" ry="2.4" />
    </svg>
  );
}

type PawPlacement = {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  rotate: string;
  opacity: number;
  size: number;
};

const defaultPaws: PawPlacement[] = [
  { top: "8%", left: "6%", rotate: "-20deg", opacity: 0.12, size: 28 },
  { top: "18%", right: "10%", rotate: "25deg", opacity: 0.1, size: 36 },
  { bottom: "12%", left: "12%", rotate: "15deg", opacity: 0.08, size: 32 },
  { bottom: "20%", right: "8%", rotate: "-30deg", opacity: 0.1, size: 28 },
];

export function FloatingPaws({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      {defaultPaws.map((paw, i) => (
        <PawIcon
          key={i}
          size={paw.size}
          className="absolute text-primary"
          style={{
            top: paw.top,
            bottom: paw.bottom,
            left: paw.left,
            right: paw.right,
            transform: `rotate(${paw.rotate})`,
            opacity: paw.opacity,
          }}
        />
      ))}
    </div>
  );
}

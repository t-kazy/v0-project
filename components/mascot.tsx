"use client"

interface MascotProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl"
  variant?: "default" | "attack" | "defense" | "point"
  className?: string
}

const sizes = {
  xs: 28,
  sm: 48,
  md: 80,
  lg: 120,
  xl: 180,
}

export function Mascot({ size = "md", variant = "default", className = "" }: MascotProps) {
  const px = sizes[size]

  return (
    <svg
      width={px}
      height={px}
      viewBox="0 0 100 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="AIXサイボーグキャラクター"
    >
      {/* ===== GLOW / ENERGY AURA ===== */}
      {(variant === "attack" || variant === "point") && (
        <>
          <ellipse cx="50" cy="65" rx="48" ry="60" fill="url(#glowOrange)" opacity="0.18" />
          <defs>
            <radialGradient id="glowOrange" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f97316" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
            </radialGradient>
          </defs>
        </>
      )}
      {variant === "defense" && (
        <>
          <ellipse cx="50" cy="65" rx="48" ry="60" fill="url(#glowBlue)" opacity="0.15" />
          <defs>
            <radialGradient id="glowBlue" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </radialGradient>
          </defs>
        </>
      )}

      {/* ===== LEGS ===== */}
      {/* Left leg */}
      <rect x="34" y="100" width="13" height="26" rx="4" fill="#1e3a8a" />
      <rect x="33" y="120" width="14" height="8" rx="3" fill="#1e40af" />
      {/* Right leg */}
      <rect x="53" y="100" width="13" height="26" rx="4" fill="#1e3a8a" />
      <rect x="53" y="120" width="14" height="8" rx="3" fill="#1e40af" />

      {/* ===== BODY / SUIT ===== */}
      <rect x="28" y="54" width="44" height="50" rx="6" fill="#1d4ed8" />

      {/* Suit jacket lapels */}
      <path d="M50 58 L40 70 L38 100 L50 100 Z" fill="#1e40af" />
      <path d="M50 58 L60 70 L62 100 L50 100 Z" fill="#1e40af" />

      {/* Shirt / tie area */}
      <path d="M44 58 L50 62 L56 58 L53 58 L50 66 L47 58 Z" fill="#f1f5f9" />
      {/* Tie */}
      <path d="M50 66 L47 75 L50 94 L53 75 Z" fill="#dc2626" />
      <path d="M48 68 L52 68 L53 75 L47 75 Z" fill="#b91c1c" />

      {/* Suit buttons */}
      <circle cx="50" cy="80" r="1.5" fill="#93c5fd" />
      <circle cx="50" cy="87" r="1.5" fill="#93c5fd" />

      {/* ===== LEFT ARM (human / normal) ===== */}
      <rect x="12" y="54" width="16" height="38" rx="7" fill="#1d4ed8" />
      {/* Left hand */}
      <ellipse cx="20" cy="94" rx="7" ry="6" fill="#fcd3a1" />
      {/* Fingers */}
      <rect x="14" y="96" width="4" height="6" rx="2" fill="#fcd3a1" />
      <rect x="19" y="97" width="4" height="7" rx="2" fill="#fcd3a1" />
      <rect x="24" y="96" width="4" height="6" rx="2" fill="#fcd3a1" />

      {/* ===== RIGHT ARM (robotic / cyborg) ===== */}
      <rect x="72" y="54" width="16" height="38" rx="7" fill="#4b5563" />
      {/* Arm plates */}
      <rect x="73" y="58" width="14" height="5" rx="2" fill="#6b7280" />
      <rect x="73" y="67" width="14" height="5" rx="2" fill="#6b7280" />
      <rect x="73" y="76" width="14" height="5" rx="2" fill="#6b7280" />

      {/* Arm joint/elbow glow */}
      <circle cx="80" cy="73" r="5" fill="#1d4ed8" opacity="0.7" />
      <circle cx="80" cy="73" r="3" fill="#60a5fa" />

      {/* Robotic hand */}
      <rect x="72" y="91" width="16" height="12" rx="4" fill="#374151" />
      {/* Robot fingers */}
      <rect x="73" y="101" width="3" height="7" rx="1.5" fill="#4b5563" />
      <rect x="77" y="102" width="3" height="8" rx="1.5" fill="#4b5563" />
      <rect x="81" y="102" width="3" height="8" rx="1.5" fill="#4b5563" />
      <rect x="85" y="101" width="3" height="7" rx="1.5" fill="#4b5563" />
      {/* Knuckle details */}
      <rect x="73" y="99" width="3" height="3" rx="1" fill="#60a5fa" opacity="0.8" />
      <rect x="77" y="99" width="3" height="3" rx="1" fill="#60a5fa" opacity="0.8" />
      <rect x="81" y="99" width="3" height="3" rx="1" fill="#60a5fa" opacity="0.8" />
      <rect x="85" y="99" width="3" height="3" rx="1" fill="#60a5fa" opacity="0.8" />

      {/* Attack variant: pointing finger */}
      {variant === "attack" && (
        <>
          <rect x="86" y="92" width="10" height="4" rx="2" fill="#4b5563" />
          <circle cx="97" cy="94" r="3" fill="#f97316" />
        </>
      )}

      {/* ===== NECK ===== */}
      <rect x="43" y="46" width="14" height="12" rx="3" fill="#fcd3a1" />

      {/* ===== HEAD ===== */}
      {/* Base skull */}
      <ellipse cx="50" cy="30" rx="22" ry="22" fill="#fcd3a1" />

      {/* LEFT FACE: normal human side */}
      {/* Left eye */}
      <ellipse cx="41" cy="28" rx="4.5" ry="5" fill="white" />
      <circle cx="41" cy="29" r="3" fill="#1a1a2e" />
      <circle cx="42.5" cy="27.5" r="1" fill="white" />
      {/* Left eyebrow */}
      <path d="M36 22 Q41 20 45 22" stroke="#5c3a1e" strokeWidth="1.5" strokeLinecap="round" fill="none" />

      {/* RIGHT FACE: cyborg side — metallic plate + glowing eye */}
      {/* Metal plate overlay (right half) */}
      <path d="M50 8 Q72 8 72 30 Q72 48 50 52 Q50 8 50 8 Z" fill="#374151" opacity="0.55" />
      {/* Circuit lines on right face */}
      <path d="M55 15 L65 18 M60 20 L70 22 M58 25 L68 26" stroke="#60a5fa" strokeWidth="0.8" opacity="0.7" />
      <circle cx="63" cy="18" r="1" fill="#60a5fa" />
      <circle cx="68" cy="26" r="1" fill="#93c5fd" />

      {/* Right eye: glowing blue cyborg */}
      <ellipse cx="59" cy="28" rx="5" ry="5.5" fill="#0f172a" />
      <ellipse cx="59" cy="28" rx="4" ry="4.5" fill="#1d4ed8" />
      <ellipse cx="59" cy="28" rx="2.5" ry="3" fill="#60a5fa" />
      <ellipse cx="59" cy="28" rx="1.2" ry="1.5" fill="#bfdbfe" />
      {/* Eye glow ring */}
      <ellipse cx="59" cy="28" rx="5.5" ry="6" stroke="#3b82f6" strokeWidth="0.5" fill="none" opacity="0.6" />

      {/* Nose */}
      <path d="M48 33 Q50 36 52 33" stroke="#c9956e" strokeWidth="1" fill="none" strokeLinecap="round" />

      {/* Mouth: confident smirk */}
      <path d="M42 39 Q50 44 58 41" stroke="#c9956e" strokeWidth="1.5" fill="none" strokeLinecap="round" />

      {/* Left ear */}
      <ellipse cx="28" cy="30" rx="4" ry="6" fill="#fcd3a1" />
      <ellipse cx="29" cy="30" rx="2" ry="4" fill="#e8b88a" />

      {/* Right ear: cyborg */}
      <ellipse cx="72" cy="30" rx="4" ry="6" fill="#4b5563" />
      {/* Ear antenna/sensor */}
      <circle cx="74" cy="26" r="2" fill="#60a5fa" />
      <line x1="74" y1="24" x2="76" y2="18" stroke="#60a5fa" strokeWidth="1" />
      <circle cx="76" cy="17" r="1.5" fill="#93c5fd" />

      {/* Hair (left human side) */}
      <path d="M28 20 Q30 8 50 8 Q54 8 50 8 L28 20Z" fill="#1a1a2e" />
      {/* Right side: metallic ridge instead of hair */}
      <path d="M50 8 Q70 8 72 20 L68 16 Q62 10 56 9 Z" fill="#374151" />

      {/* ===== CHEST CORE (energy center) ===== */}
      <circle cx="50" cy="72" r="6" fill="#0f172a" />
      <circle cx="50" cy="72" r="4.5" fill="#1d4ed8" />
      <circle cx="50" cy="72" r="3" fill="#60a5fa" />
      <circle cx="50" cy="72" r="1.5" fill="white" />

      {/* Defense variant: shield overlay */}
      {variant === "defense" && (
        <>
          <path
            d="M50 40 L25 50 L25 75 Q25 95 50 105 Q75 95 75 75 L75 50 Z"
            fill="#1d4ed8"
            opacity="0.12"
            stroke="#3b82f6"
            strokeWidth="1"
          />
        </>
      )}
    </svg>
  )
}

/* Smaller decorative mascot icon for nav / badges */
export function MascotIcon({ size = 28, glow = false }: { size?: number; glow?: boolean }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {glow && (
        <circle cx="20" cy="20" r="19" fill="#3b82f6" opacity="0.15" />
      )}
      {/* Head */}
      <ellipse cx="20" cy="15" rx="10" ry="10" fill="#fcd3a1" />
      {/* Left eye */}
      <circle cx="16" cy="14" r="2" fill="#1a1a2e" />
      {/* Right eye: cyborg blue */}
      <circle cx="24" cy="14" r="2" fill="#60a5fa" />
      <circle cx="24" cy="14" r="1" fill="#bfdbfe" />
      {/* Cyborg right face */}
      <path d="M20 5 Q30 5 30 15 Q30 24 20 25 Z" fill="#374151" opacity="0.4" />
      {/* Body */}
      <rect x="12" y="27" width="16" height="12" rx="3" fill="#1d4ed8" />
      {/* Core */}
      <circle cx="20" cy="32" r="3" fill="#60a5fa" />
      <circle cx="20" cy="32" r="1.5" fill="white" />
      {/* Left arm */}
      <rect x="5" y="27" width="7" height="12" rx="3" fill="#1d4ed8" />
      {/* Right arm: robotic */}
      <rect x="28" y="27" width="7" height="12" rx="3" fill="#4b5563" />
      <rect x="29" y="30" width="5" height="2" rx="1" fill="#60a5fa" opacity="0.8" />
      <rect x="29" y="34" width="5" height="2" rx="1" fill="#60a5fa" opacity="0.8" />
    </svg>
  )
}

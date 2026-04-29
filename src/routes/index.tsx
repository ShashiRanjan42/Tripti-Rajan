import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect, useRef, useCallback } from 'react'

export const Route = createFileRoute('/')({
  component: WeddingInvitation,
})

/* ═══════════════════════════════════════
   Types
═══════════════════════════════════════ */
interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

/* ═══════════════════════════════════════
   Constants
═══════════════════════════════════════ */
const WEDDING_DATE = new Date('2026-05-07T21:00:00+05:30')
// const LOCATION_MAPS = 'https://www.google.com/maps/search/Village+Madhuban+Gulwara+East+Champaran+Bihar+India'
const LOCATION_MAPS = 'https://maps.app.goo.gl/tUkUizr8fuJpzAFU9?g_st=aw'
const LOCATION_TEXT = 'Village Madhuban, Post: Gulwara Madhuban, Dist: East Champaran, Bihar'

const CAL_BASE = 'https://calendar.google.com/calendar/r/eventedit'
const CAL_LOC = encodeURIComponent('Village Madhuban, Gulwara, East Champaran, Bihar, India')
const CAL_DETAIL = encodeURIComponent('You are cordially invited to the auspicious wedding of Tripti Ranjan & Rajan Kumar. Hosted by Narendra Kumar Prasad. Contact: 8797860481')

const EVENTS = [
  {
    no: '01',
    title: 'Hanuman Aaradhna & Rituals',
    subtitle: 'Mandap · Haldi',
    date: 'Tuesday, 5 May 2026',
    time: 'Morning onwards',
    icon: '🪔',
    color: '#E8A020',
    cal: `${CAL_BASE}?text=${encodeURIComponent('Hanuman Aaradhna & Rituals – Tripti Weds Rajan')}&dates=20260505/20260506&location=${CAL_LOC}&details=${CAL_DETAIL}`,
  },
  {
    no: '02',
    title: 'Satsang & Mehendi Sangeet',
    subtitle: 'Music · Dance · Mehendi',
    date: 'Wednesday, 6 May 2026',
    time: 'Evening onwards',
    icon: '🎶',
    color: '#C45070',
    cal: `${CAL_BASE}?text=${encodeURIComponent('Satsang & Mehendi Sangeet – Tripti Weds Rajan')}&dates=20260506/20260507&location=${CAL_LOC}&details=${CAL_DETAIL}`,
  },
  {
    no: '03',
    title: 'Preeti Bhoj',
    subtitle: 'Grand Dinner · Feast',
    date: 'Thursday, 7 May 2026',
    time: 'From 6:00 PM onwards',
    icon: '🍽️',
    color: '#9B4020',
    cal: `${CAL_BASE}?text=${encodeURIComponent('Preeti Bhoj (Dinner Feast) – Tripti Weds Rajan')}&dates=20260507T180000/20260507T210000&location=${CAL_LOC}&details=${CAL_DETAIL}`,
  },
  {
    no: '04',
    title: 'Shubh Vivah',
    subtitle: 'Sacred Wedding Ceremony · Jaimala · Saptapadi',
    date: 'Thursday, 7 May 2026',
    time: 'From 9:00 PM onwards',
    icon: '💍',
    color: '#9B1B30',
    cal: `${CAL_BASE}?text=${encodeURIComponent('Shubh Vivah – Tripti Ranjan Weds Rajan Kumar')}&dates=20260507T210000/20260508T020000&location=${CAL_LOC}&details=${CAL_DETAIL}`,
  },
]

/* ═══════════════════════════════════════
   useTheme Hook
═══════════════════════════════════════ */
function useTheme() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('wedding-theme')
    const isDark = stored === 'dark'
    setDark(isDark)
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
  }, [])

  const toggle = useCallback(() => {
    setDark(prev => {
      const next = !prev
      document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light')
      localStorage.setItem('wedding-theme', next ? 'dark' : 'light')
      return next
    })
  }, [])

  return { dark, toggle }
}

/* ═══════════════════════════════════════
   useCountdown Hook
═══════════════════════════════════════ */
function useCountdown(target: Date): TimeLeft {
  const calc = () => {
    const diff = target.getTime() - Date.now()
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    }
  }
  const [tl, setTl] = useState<TimeLeft>(calc)
  useEffect(() => {
    const id = setInterval(() => setTl(calc()), 1000)
    return () => clearInterval(id)
  }, [])
  return tl
}

/* ═══════════════════════════════════════
   Petal Rain Component
═══════════════════════════════════════ */
function PetalRain() {
  const petals = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    left: `${(i * 5.5) % 100}%`,
    delay: `${(i * 0.7) % 9}s`,
    duration: `${8 + (i % 5)}s`,
    size: `${10 + (i % 7)}px`,
    hue: i % 3 === 0 ? 'rgba(212,96,124,0.65)' : i % 3 === 1 ? 'rgba(220,160,80,0.55)' : 'rgba(180,60,100,0.6)',
  }))

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999, overflow: 'hidden' }}>
      {petals.map(p => (
        <div
          key={p.id}
          className="petal"
          style={{
            left: p.left,
            animationDelay: p.delay,
            animationDuration: p.duration,
            width: p.size,
            height: p.size,
            background: p.hue,
          }}
        />
      ))}
    </div>
  )
}

/* ═══════════════════════════════════════
   Mandala SVG
═══════════════════════════════════════ */
function Mandala({ size = 220, opacity = 0.18 }: { size?: number; opacity?: number }) {
  const r1 = size * 0.45
  const r2 = size * 0.35
  const r3 = size * 0.22
  const cx = size / 2
  const petals8 = Array.from({ length: 8 }, (_, i) => {
    const a = (i * 45 * Math.PI) / 180
    const x = cx + r1 * Math.cos(a)
    const y = cx + r1 * Math.sin(a)
    return `M ${cx} ${cx} Q ${cx + r2 * Math.cos(a - 0.4)} ${cx + r2 * Math.sin(a - 0.4)} ${x} ${y} Q ${cx + r2 * Math.cos(a + 0.4)} ${cx + r2 * Math.sin(a + 0.4)} ${cx} ${cx}`
  })
  const petals12 = Array.from({ length: 12 }, (_, i) => {
    const a = (i * 30 * Math.PI) / 180
    const x = cx + r3 * Math.cos(a)
    const y = cx + r3 * Math.sin(a)
    return `M ${cx} ${cx} Q ${cx + r3 * 0.7 * Math.cos(a - 0.3)} ${cx + r3 * 0.7 * Math.sin(a - 0.3)} ${x} ${y} Q ${cx + r3 * 0.7 * Math.cos(a + 0.3)} ${cx + r3 * 0.7 * Math.sin(a + 0.3)} ${cx} ${cx}`
  })
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ opacity }}>
      <g className="mandala-spin" style={{ transformOrigin: `${cx}px ${cx}px` }}>
        {petals8.map((d, i) => (
          <path key={i} d={d} fill="var(--gold)" />
        ))}
      </g>
      <g className="mandala-spin-reverse" style={{ transformOrigin: `${cx}px ${cx}px` }}>
        {petals12.map((d, i) => (
          <path key={i} d={d} fill="var(--rose)" />
        ))}
      </g>
      <circle cx={cx} cy={cx} r={size * 0.07} fill="var(--gold)" />
      <circle cx={cx} cy={cx} r={size * 0.04} fill="var(--rose)" />
    </svg>
  )
}

/* ═══════════════════════════════════════
   Wedding Ceremony Animation
═══════════════════════════════════════ */
function WeddingCeremonyAnim() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0' }}>
      <svg
        viewBox="0 0 320 240"
        width="100%"
        style={{ maxWidth: 360, overflow: 'visible' }}
        aria-label="Wedding ceremony animation"
      >
        {/* Sky gradient */}
        <defs>
          <radialGradient id="skyGrad" cx="50%" cy="30%" r="60%">
            <stop offset="0%" stopColor="var(--bg-secondary)" />
            <stop offset="100%" stopColor="var(--bg-primary)" />
          </radialGradient>
          <radialGradient id="fireGrad" cx="50%" cy="80%" r="60%">
            <stop offset="0%" stopColor="#FFD060" />
            <stop offset="50%" stopColor="#FF6020" />
            <stop offset="100%" stopColor="#C02010" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Ground */}
        <ellipse cx="160" cy="220" rx="130" ry="18" fill="var(--border)" opacity="0.4" />

        {/* Mandap arch */}
        <g opacity="0.85">
          {/* Left pillar */}
          <rect x="72" y="100" width="14" height="100" rx="4" fill="var(--gold-dark)" />
          {/* Right pillar */}
          <rect x="234" y="100" width="14" height="100" rx="4" fill="var(--gold-dark)" />
          {/* Arch top */}
          <path d="M 72 104 Q 160 40 248 104" stroke="var(--gold)" strokeWidth="5" fill="none" />
          {/* Flower decorations on arch */}
          {[0.2, 0.5, 0.8].map((t, i) => {
            const x = 72 + t * (248 - 72)
            const y = 104 - Math.sin(t * Math.PI) * 64 + (i === 1 ? -4 : 0)
            return <circle key={i} cx={x} cy={y} r="5" fill={i % 2 === 0 ? 'var(--rose)' : 'var(--gold)'} />
          })}
          {/* Hanging flowers left */}
          <line x1="86" y1="104" x2="86" y2="140" stroke="var(--rose)" strokeWidth="1.5" />
          <circle cx="86" cy="143" r="4" fill="var(--rose-light)" />
          {/* Hanging flowers right */}
          <line x1="234" y1="104" x2="234" y2="140" stroke="var(--rose)" strokeWidth="1.5" />
          <circle cx="234" cy="143" r="4" fill="var(--rose-light)" />
        </g>

        {/* Sacred fire (havan kund) */}
        <g style={{ transformOrigin: '160px 195px' }}>
          {/* Kund base */}
          <rect x="148" y="188" width="24" height="16" rx="3" fill="var(--gold-dark)" />
          {/* Flame */}
          <g className="fire">
            <ellipse cx="160" cy="186" rx="7" ry="10" fill="url(#fireGrad)" filter="url(#glow)" />
            <ellipse cx="156" cy="188" rx="4" ry="7" fill="#FFD060" opacity="0.8" />
            <ellipse cx="164" cy="188" rx="3" ry="6" fill="#FF8030" opacity="0.7" />
          </g>
        </g>

        {/* Diya lamps (decorative) */}
        <g className="divas">
          <ellipse cx="100" cy="212" rx="7" ry="4" fill="var(--gold-dark)" />
          <ellipse cx="100" cy="210" rx="4" ry="2.5" fill="#FFD060" opacity="0.9" />
          <ellipse cx="220" cy="212" rx="7" ry="4" fill="var(--gold-dark)" />
          <ellipse cx="220" cy="210" rx="4" ry="2.5" fill="#FFD060" opacity="0.9" />
        </g>

        {/* ── BRIDE (right side, moves left) ── */}
        <g className="bride-walk">
          {/* Saree drape - flowing shape */}
          <ellipse cx="215" cy="190" rx="18" ry="28" fill="var(--crimson)" />
          <path d="M 204 175 Q 196 200 200 218 Q 208 225 220 218 Q 228 200 226 175 Z"
                fill="var(--rose)" opacity="0.85" />
          {/* Pallu / dupatta */}
          <path d="M 220 175 Q 236 180 238 200 Q 232 210 220 205 Z"
                fill="var(--rose-light)" opacity="0.7" />
          {/* Body */}
          <ellipse cx="215" cy="168" rx="10" ry="14" fill="#F4C8A8" />
          {/* Head */}
          <circle cx="215" cy="148" r="14" fill="#F0B898" />
          {/* Bindi */}
          <circle cx="215" cy="143" r="2.5" fill="var(--crimson)" />
          {/* Hair bun */}
          <ellipse cx="215" cy="136" rx="10" ry="7" fill="#1A0A06" />
          {/* Flowers in hair */}
          <circle cx="207" cy="135" r="3" fill="var(--rose-light)" />
          <circle cx="223" cy="135" r="3" fill="var(--gold-light)" />
          {/* Jewelry - necklace line */}
          <path d="M 208 162 Q 215 168 222 162" stroke="var(--gold)" strokeWidth="1.5" fill="none" />
          {/* Bangles */}
          <circle cx="206" cy="175" r="3" fill="none" stroke="var(--gold)" strokeWidth="1.2" />
          <circle cx="225" cy="175" r="3" fill="none" stroke="var(--gold)" strokeWidth="1.2" />
        </g>

        {/* ── GROOM (left side, moves right) ── */}
        <g className="groom-walk">
          {/* Sherwani */}
          <path d="M 95 175 Q 88 195 90 218 Q 100 224 115 218 Q 122 195 118 175 Z"
                fill="var(--gold-dark)" />
          {/* Sherwani front detail */}
          <path d="M 102 175 L 108 218" stroke="var(--gold-light)" strokeWidth="1" opacity="0.6" />
          {/* Body */}
          <ellipse cx="106" cy="168" rx="11" ry="14" fill="#D4996E" />
          {/* Head */}
          <circle cx="106" cy="148" r="13" fill="#C8906A" />
          {/* Turban/Sehra */}
          <ellipse cx="106" cy="137" rx="16" ry="8" fill="var(--gold-dark)" />
          <ellipse cx="106" cy="133" rx="12" ry="5" fill="var(--gold)" />
          {/* Sehra strings */}
          {[-6, -2, 2, 6].map((dx, i) => (
            <line key={i} x1={106 + dx} y1="140" x2={106 + dx + (dx > 0 ? 3 : -3)} y2="160"
                  stroke="var(--gold-light)" strokeWidth="0.8" opacity="0.7" />
          ))}
          {/* Mustache */}
          <path d="M 100 155 Q 106 158 112 155" stroke="#1A0A06" strokeWidth="1.5" fill="none" />
        </g>

        {/* ── Garland exchange ── */}
        <g className="garland" style={{ transformOrigin: '160px 175px' }}>
          <path d="M 215 165 Q 190 155 160 170 Q 130 155 106 165"
                stroke="var(--rose)" strokeWidth="2.5" fill="none"
                strokeDasharray="4 2" />
          {[160, 175, 190, 145, 130].map((x, i) => (
            <circle key={i} cx={x} cy={i % 2 === 0 ? 165 : 170} r="3.5"
                    fill={i % 2 === 0 ? 'var(--rose)' : 'var(--gold)'} />
          ))}
        </g>

        {/* ── Rising hearts ── */}
        <g>
          {[152, 160, 168].map((x, i) => (
            <g key={i} className={`heart-${i + 1}`} style={{ transformOrigin: `${x}px 175px` }}>
              <path
                d={`M ${x} 180 C ${x - 5} 173 ${x - 12} 173 ${x - 12} 180 C ${x - 12} 187 ${x} 192 ${x} 192 C ${x} 192 ${x + 12} 187 ${x + 12} 180 C ${x + 12} 173 ${x + 5} 173 ${x} 180 Z`}
                fill="var(--rose)"
                opacity="0.85"
                transform="scale(0.6)"
                style={{ transformOrigin: `${x}px 180px` }}
              />
            </g>
          ))}
        </g>

        {/* Stars / sparkle */}
        {[90, 135, 185, 230].map((x, i) => (
          <g key={i} opacity="0.5">
            <circle cx={x} cy={60 + (i % 3) * 15} r="1.5" fill="var(--gold)" />
          </g>
        ))}

        {/* Label */}
        <text x="160" y="238" textAnchor="middle"
              fontFamily="'Cinzel', serif" fontSize="9"
              fill="var(--text-muted)" letterSpacing="2">
          SHUBH VIVAH
        </text>
      </svg>
    </div>
  )
}

/* ═══════════════════════════════════════
   Ornate Divider
═══════════════════════════════════════ */
function OrnamentDivider({ label }: { label?: string }) {
  return (
    <div className="divider-ornament my-6">
      <div className="line" />
      <svg width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 2 L16 10 L24 10 L18 15 L20 23 L14 18 L8 23 L10 15 L4 10 L12 10 Z"
              fill="var(--gold)" opacity="0.7" />
      </svg>
      {label && (
        <span style={{ fontFamily: "'Cinzel', serif", fontSize: 10, color: 'var(--gold)', letterSpacing: 2, opacity: 0.8 }}>
          {label}
        </span>
      )}
      <svg width="28" height="28" viewBox="0 0 28 28" style={{ transform: 'scaleX(-1)' }}>
        <path d="M14 2 L16 10 L24 10 L18 15 L20 23 L14 18 L8 23 L10 15 L4 10 L12 10 Z"
              fill="var(--gold)" opacity="0.7" />
      </svg>
      <div className="line right" />
    </div>
  )
}

/* ═══════════════════════════════════════
   Section Title
═══════════════════════════════════════ */
function SectionTitle({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="text-center mb-6">
      <h2 className="font-display" style={{ fontSize: 18, letterSpacing: 3, color: 'var(--text-secondary)', marginBottom: 4, fontWeight: 600 }}>
        {title}
      </h2>
      {sub && <p className="font-body" style={{ fontSize: 13, color: 'var(--text-muted)', fontStyle: 'italic' }}>{sub}</p>}
      <OrnamentDivider />
    </div>
  )
}

/* ═══════════════════════════════════════
   Couple Photo Placeholder
═══════════════════════════════════════ */
function PersonPhoto({ initial, label, isGroom = false }: { initial: string; label: string; isGroom?: boolean }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{
        width: 100, height: 100, borderRadius: '50%',
        background: isGroom
          ? 'linear-gradient(135deg, var(--gold-dark), var(--gold))'
          : 'linear-gradient(135deg, var(--crimson), var(--rose-light))',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 8px',
        border: '3px solid var(--border-strong)',
        boxShadow: '0 4px 20px var(--shadow-strong)',
        fontSize: 38,
        fontFamily: "'Great Vibes', cursive",
        color: '#fff',
      }}>
        {initial}
      </div>
      <span style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: "'Cinzel', serif", letterSpacing: 1 }}>
        {label}
      </span>
    </div>
  )
}

/* ═══════════════════════════════════════
   Event Card
═══════════════════════════════════════ */
function EventCard({ event }: { event: typeof EVENTS[0] }) {
  return (
    <div className="wedding-card anim-fade-up" style={{ padding: '18px 20px', marginBottom: 14, position: 'relative', overflow: 'hidden' }}>
      {/* Color accent strip */}
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 4, background: event.color, borderRadius: '16px 0 0 16px' }} />
      <div style={{ paddingLeft: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
          <div>
            <span style={{ fontFamily: "'Cinzel', serif", fontSize: 10, color: 'var(--gold)', letterSpacing: 2, opacity: 0.7 }}>
              EVENT {event.no}
            </span>
            <h3 className="font-display" style={{ fontSize: 15, color: 'var(--text-primary)', margin: '2px 0', fontWeight: 600 }}>
              {event.title}
            </h3>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: 0, fontStyle: 'italic' }}>{event.subtitle}</p>
          </div>
          <span style={{ fontSize: 24 }}>{event.icon}</span>
        </div>
        <div style={{ display: 'flex', gap: 16, marginBottom: 10, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 4 }}>
            <CalIcon /> {event.date}
          </span>
          <span style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 4 }}>
            <ClockIcon /> {event.time}
          </span>
        </div>
        <a
          href={event.cal}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '7px 16px', borderRadius: 20,
            background: 'transparent',
            border: `1px solid ${event.color}55`,
            color: event.color,
            fontSize: 12, textDecoration: 'none',
            fontFamily: "'Cinzel', serif",
            letterSpacing: 1,
            transition: 'background 0.2s, transform 0.15s',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = `${event.color}22` }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}
        >
          <GoogleCalIcon color={event.color} />
          Save to Calendar
        </a>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════
   Inline Icon SVGs
═══════════════════════════════════════ */
function CalIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  )
}
function ClockIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}
function GoogleCalIcon({ color }: { color: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill={color}>
      <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z" />
    </svg>
  )
}
function MapPinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}
function MusicIcon({ playing }: { playing: boolean }) {
  return playing ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="6" y="4" width="4" height="16" />
      <rect x="14" y="4" width="4" height="16" />
    </svg>
  )
}
function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  )
}
function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}
function ShareIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  )
}

/* ═══════════════════════════════════════
   Countdown Timer Component
═══════════════════════════════════════ */
function CountdownTimer() {
  const tl = useCountdown(WEDDING_DATE)
  const boxes = [
    { value: tl.days, label: 'DAYS' },
    { value: tl.hours, label: 'HRS' },
    { value: tl.minutes, label: 'MIN' },
    { value: tl.seconds, label: 'SEC' },
  ]
  return (
    <div style={{ display: 'flex', gap: 8, justifyContent: 'center', margin: '20px 0' }}>
      {boxes.map(({ value, label }) => (
        <div key={label} className="countdown-box">
          <div className="font-display gold-shimmer" style={{ fontSize: 26, fontWeight: 700, lineHeight: 1 }}>
            {String(value).padStart(2, '0')}
          </div>
          <div style={{ fontSize: 9, color: 'var(--text-muted)', letterSpacing: 2, marginTop: 4, fontFamily: "'Cinzel', serif" }}>
            {label}
          </div>
        </div>
      ))}
    </div>
  )
}

/* ═══════════════════════════════════════
   Splash Screen
═══════════════════════════════════════ */
function SplashScreen({ onEnter }: { onEnter: () => void }) {
  return (
    <div
      onClick={onEnter}
      style={{
        position: 'fixed', inset: 0, zIndex: 10000,
        background: 'var(--bg-primary)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer',
      }}
    >
      <div style={{ position: 'absolute', inset: 0 }}>
        <div className="bg-pattern" style={{ opacity: 0.08 }} />
      </div>
      <div style={{ position: 'relative', textAlign: 'center', padding: '0 32px' }}>
        <div style={{ marginBottom: 20 }}>
          <Mandala size={160} opacity={0.35} />
        </div>
        <div style={{ fontSize: 13, fontFamily: "'Cinzel', serif", letterSpacing: 4, color: 'var(--gold)', marginBottom: 8 }}>
          WITH THE BLESSINGS OF
        </div>
        <div style={{ fontSize: 16, fontFamily: "'Lora', serif", color: 'var(--text-secondary)', fontStyle: 'italic', marginBottom: 24 }}>
          Sri Ganesh &amp; Lord Shiva
        </div>
        <div className="font-script" style={{ fontSize: 52, color: 'var(--crimson)', lineHeight: 1.2, marginBottom: 6 }}>
          Tripti Ranjan
        </div>
        <div style={{ fontFamily: "'Cinzel', serif", fontSize: 13, color: 'var(--gold)', letterSpacing: 4, marginBottom: 6 }}>
          WEDS
        </div>
        <div className="font-script" style={{ fontSize: 52, color: 'var(--gold-dark)', lineHeight: 1.2, marginBottom: 32 }}>
          Rajan Kumar
        </div>

        <div style={{
          display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 8,
          padding: '18px 36px', borderRadius: 40,
          border: '1px solid var(--border-strong)',
          background: 'var(--bg-glass)',
        }}>
          {/* Pulse ring */}
          <div style={{ position: 'relative', width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="pulse-ring" style={{
              position: 'absolute', inset: 0, borderRadius: '50%',
              border: '2px solid var(--gold)', opacity: 0.5,
            }} />
            <span style={{ fontSize: 26 }}>🎵</span>
          </div>
          <span className="splash-pulse" style={{
            fontFamily: "'Cinzel', serif", fontSize: 11,
            color: 'var(--gold)', letterSpacing: 3,
          }}>
            TAP TO OPEN INVITATION
          </span>
          <span style={{ fontSize: 10, color: 'var(--text-muted)', fontStyle: 'italic' }}>
            With Music
          </span>
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════
   Family Member Row
═══════════════════════════════════════ */
function FamilyRow({ names }: { names: string }) {
  return (
    <div style={{
      textAlign: 'center', padding: '8px 12px',
      borderBottom: '1px solid var(--border)',
      fontSize: 13, color: 'var(--text-secondary)',
      fontFamily: "'Lora', serif",
    }}>
      {names}
    </div>
  )
}

// function VideoStyleSlider() {
//   const slides = [
//     { img: "/DSC_7742.JPG.jpeg", text: "Our Beautiful Beginning 💫" },
//     { img: "/DSC_6915.JPG.jpeg", text: "Moments of Joy 😊" },
//     { img: "/DSC_7753.JPG.jpeg", text: "Together Forever ❤️" },
//     { img: "/DSC_7738.JPG.jpeg", text: "A Journey of Love 💍" }
//   ]

//   const [index, setIndex] = useState(0)
//   const [fade, setFade] = useState(true)

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setFade(false)

//       setTimeout(() => {
//         setIndex((prev) => (prev + 1) % slides.length)
//         setFade(true)
//       }, 300) // fade out first

//     }, 3000)

//     return () => clearInterval(interval)
//   }, [])

//   return (
//     <div style={{
//       width: '100%',
//       aspectRatio: '4/3',
//       borderRadius: 12,
//       overflow: 'hidden',
//       position: 'relative',
//       border: '2px solid var(--border-strong)'
//     }}>

//       {/* Image */}
//       <img
//         src={slides[index].img}
//         alt="memory"
//         style={{
//           width: '100%',
//           height: '100%',
//           objectFit: 'cover',
//           transition: 'all 1s ease',
//           transform: fade ? 'scale(1.05)' : 'scale(1)',
//           opacity: fade ? 1 : 0.3
//         }}
//       />

//       {/* Dark overlay */}
//       <div style={{
//         position: 'absolute',
//         inset: 0,
//         background: 'rgba(0,0,0,0.3)'
//       }} />

//       {/* Text overlay */}
//       <div style={{
//         position: 'absolute',
//         bottom: 20,
//         width: '100%',
//         textAlign: 'center',
//         color: '#fff',
//         fontFamily: "'Great Vibes', cursive",
//         fontSize: 24,
//         opacity: fade ? 1 : 0,
//         transform: fade ? 'translateY(0)' : 'translateY(20px)',
//         transition: 'all 0.8s ease'
//       }}>
//         {slides[index].text}
//       </div>

//     </div>
//   )
// }

// function LoveStorySection() {
//   const [visible, setVisible] = useState(false)

//   useEffect(() => {
//     setTimeout(() => setVisible(true), 200)
//   }, [])

//   const steps = [
//     "We met 💫",
//     "We laughed 😊",
//     "We fell in love ❤️",
//     "Now we promise forever 💍"
//   ]

//   return (
//     <section style={{ padding: '0 24px 24px' }}>
//       <div className="wedding-card ornate-border" style={{ padding: '28px 20px', textAlign: 'center' }}>

//         <SectionTitle title="OUR LOVE STORY" sub="A journey from hearts to forever" />

//         <div style={{
//           opacity: visible ? 1 : 0,
//           transform: visible ? 'translateY(0)' : 'translateY(20px)',
//           transition: 'all 0.8s ease'
//         }}>
//           Two souls, one beautiful journey…
//         </div>

//         <OrnamentDivider />

//         {steps.map((text, i) => (
//           <p key={i}>{text}</p>
//         ))}

//       </div>
//     </section>
//   )
// }

function MemorySlider() {
  const images = [
    "/DSC_7742.JPG.jpeg",
    "/DSC_6915.JPG.jpeg",
    "/DSC_7753.JPG.jpeg",
    "/DSC_7738.JPG.jpeg",
    "/DSC_7729.JPG.jpeg",
    "/couple full family.JPG.jpeg",
    "/DSC_7716.JPG.jpeg"
  ]
  
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [images.length])

  return (
    // <img
    //   src={images[index]}
    //   alt="memory"
    //   style={{
    //     width: 200,
    //     height: 200,
    //     borderRadius: '50%',
    //     objectFit: 'cover',
    //     border: '3px solid var(--border-strong)',
    //     transition: 'all 0.6s ease-in-out'
    //   }}

    <img
  src={images[index]}
  alt="memory"
  style={{
    width: '100%',
    height: 'auto',
    borderRadius: '12px', // optional (remove if you want full rectangle)
    objectFit: 'cover',
    border: '3px solid var(--border-strong)',
    transition: 'all 0.6s ease-in-out'
  }}
    />
  )
}

/* ═══════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════ */
function WeddingInvitation() {
  const [showSplash, setShowSplash] = useState(true)
  const [musicPlaying, setMusicPlaying] = useState(false)
  const [copied, setCopied] = useState(false)
  const { dark, toggle: toggleTheme } = useTheme()
  const audioRef = useRef<HTMLAudioElement>(null)

  const handleEnter = useCallback(() => {
    setShowSplash(false)
    if (audioRef.current) {
      audioRef.current.volume = 0.4
      audioRef.current.play().then(() => setMusicPlaying(true)).catch(() => {})
    }
  }, [])

  const toggleMusic = useCallback(() => {
    if (!audioRef.current) return
    if (musicPlaying) {
      audioRef.current.pause()
      setMusicPlaying(false)
    } else {
      audioRef.current.volume = 0.4
      audioRef.current.play().then(() => setMusicPlaying(true)).catch(() => {})
    }
  }, [musicPlaying])

  const copyLink = useCallback(() => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    })
  }, [])

  return (
    <>
      {/* Hidden audio player — replace /wedding-music.mp3 with your music file in /public */}
      <audio ref={audioRef} loop preload="none" src="/wedding-music.mp3" />

      {showSplash && <SplashScreen onEnter={handleEnter} />}

      <PetalRain />

      {/* Floating controls */}
      <button
        className="float-btn"
        style={{ top: 16, right: 16, color: 'var(--gold)' }}
        onClick={toggleMusic}
        title={musicPlaying ? 'Pause Music' : 'Play Music'}
      >
        <MusicIcon playing={!musicPlaying} />
      </button>

      <button
        className="float-btn"
        style={{ top: 16, left: 16, color: 'var(--text-secondary)' }}
        onClick={toggleTheme}
        title="Toggle Theme"
      >
        {dark ? <SunIcon /> : <MoonIcon />}
      </button>

      {/* Main content */}
      <div className="mobile-wrapper" style={{ minHeight: '100vh', paddingBottom: 60 }}>
        {/* Background pattern overlay */}
        <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
          <div className="bg-pattern" />
        </div>

        <div style={{ position: 'relative', zIndex: 1 }}>

          {/* ══════════════════════════
              HERO SECTION
          ══════════════════════════ */}
          <section style={{ padding: '72px 24px 32px', textAlign: 'center', position: 'relative' }}>
            {/* Mandala behind names */}
            <div style={{ position: 'absolute', top: 40, left: '50%', transform: 'translateX(-50%)', zIndex: 0 }}>
              <Mandala size={280} opacity={0.12} />
            </div>

            <div style={{ position: 'relative', zIndex: 1 }}>
              {/* Auspicious heading */}
              <div className="anim-fade-in" style={{
                fontFamily: "'Cinzel', serif", fontSize: 10, letterSpacing: 4,
                color: 'var(--gold)', marginBottom: 8, opacity: 0.8
              }}>
                ॐ श्री गणेशाय नमः
              </div>

              <div className="anim-fade-up" style={{ fontSize: 11, fontFamily: "'Cinzel', serif", letterSpacing: 3, color: 'var(--text-muted)', marginBottom: 4 }}>
                WITH DIVINE BLESSINGS
              </div>

              {/* Names */}
              <h1 className="font-script anim-fade-up delay-1" style={{ fontSize: 58, color: 'var(--crimson)', margin: '4px 0', lineHeight: 1.1 }}>
                Tripti Ranjan
              </h1>

              <div className="anim-fade-up delay-2" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, margin: '8px 0' }}>
                <div style={{ height: 1, width: 50, background: 'linear-gradient(90deg, transparent, var(--gold))' }} />
                <span className="font-display gold-shimmer" style={{ fontSize: 14, letterSpacing: 5, fontWeight: 700 }}>
                  WEDS
                </span>
                <div style={{ height: 1, width: 50, background: 'linear-gradient(90deg, var(--gold), transparent)' }} />
              </div>

              <h1 className="font-script anim-fade-up delay-3" style={{ fontSize: 58, color: 'var(--gold-dark)', margin: '4px 0', lineHeight: 1.1 }}>
                Rajan Kumar
              </h1>

              {/* Wedding date badge */}
              <div className="anim-scale-in delay-4" style={{
                display: 'inline-block', margin: '20px 0 0',
                padding: '10px 24px', borderRadius: 30,
                border: '1px solid var(--border-strong)',
                background: 'var(--bg-glass)',
                backdropFilter: 'blur(8px)',
              }}>
                <div className="font-display" style={{ fontSize: 13, color: 'var(--text-primary)', letterSpacing: 2 }}>
                  7th May 2026
                </div>
                <div style={{ fontSize: 11, color: 'var(--gold)', fontFamily: "'Cinzel', serif", letterSpacing: 1, marginTop: 2 }}>
                  THURSDAY · SHUBH MUHURAT
                </div>
              </div>
            </div>

            {/* Countdown */}
            <div className="anim-fade-up delay-5">
              <div style={{ fontSize: 10, fontFamily: "'Cinzel', serif", letterSpacing: 3, color: 'var(--text-muted)', marginBottom: 8, marginTop: 24 }}>
                COUNTING DOWN TO THE BIG DAY
              </div>
              <CountdownTimer />
            </div>

            {/* Share button */}
            <div className="anim-fade-up delay-6" style={{ position: 'relative', display: 'inline-block' }}>
              {copied && <div className="copy-feedback">Link copied!</div>}
              <button
                onClick={copyLink}
                style={{
                  marginTop: 16, padding: '10px 24px',
                  borderRadius: 24, border: '1px solid var(--border-strong)',
                  background: 'transparent', color: 'var(--gold)',
                  fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: 2,
                  cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8,
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--border)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}
              >
                <ShareIcon /> SHARE INVITATION
              </button>
            </div>
          </section>


          {/* <LoveStorySection />
          <section style={{ padding: '0 24px 24px' }}>
  <div className="wedding-card" style={{ padding: '24px 20px', textAlign: 'center' }}>
    
    <SectionTitle title="LOVE MEMORIES" sub="A cinematic journey of our love" />

    <VideoStyleSlider />

  </div>
</section> */}

          {/* ══════════════════════════
              WEDDING ANIMATION
          ══════════════════════════ */}
          <section style={{ padding: '0 24px 24px' }}>
            <div className="wedding-card ornate-border" style={{ padding: '24px 16px' }}>
              <SectionTitle title="THE SACRED CEREMONY" sub="A union blessed by the divine" />
              <WeddingCeremonyAnim />
              <p style={{ textAlign: 'center', fontStyle: 'italic', color: 'var(--text-muted)', fontSize: 13, marginTop: 8 }}>
                "Jaimala · Saptapadi · Sindoor · Saat Phere"
              </p>
            </div>
          </section>

          {/* ══════════════════════════
              EVENTS
          ══════════════════════════ */}
          <section style={{ padding: '0 24px 24px' }}>
            <div className="wedding-card" style={{ padding: '24px 20px' }}>
              <SectionTitle title="WEDDING EVENTS" sub="Four days of celebration & joy" />
              {EVENTS.map(evt => (
                <EventCard key={evt.no} event={evt} />
              ))}
            </div>
          </section>

          {/* ══════════════════════════
              BRIDE & GROOM
          ══════════════════════════ */}
          <section style={{ padding: '0 24px 24px' }}>
            <div className="wedding-card ornate-border" style={{ padding: '24px 20px' }}>
              <SectionTitle title="THE BLESSED COUPLE" />

              {/* Photos */}
              <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: 24 }}>
                <PersonPhoto initial="T" label="BRIDE" />
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="32" height="32" viewBox="0 0 32 32">
                    <path d="M16 4 L18 12 L26 12 L20 17 L22 25 L16 20 L10 25 L12 17 L6 12 L14 12 Z" fill="var(--gold)" opacity="0.6" />
                  </svg>
                </div>
                <PersonPhoto initial="R" label="GROOM" isGroom />
              </div>

              {/* Bride Details */}
              <div style={{ marginBottom: 20, padding: '16px', background: 'var(--bg-secondary)', borderRadius: 12, border: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                  <div style={{ width: 3, height: 20, background: 'var(--crimson)', borderRadius: 2 }} />
                  <h3 className="font-script" style={{ fontSize: 26, color: 'var(--crimson)', margin: 0 }}>Tripti Ranjan</h3>
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: 11 }}>
                  <div><span style={{ color: 'var(--gold)', fontWeight: 600 }}>Daughter of:</span> Mrs. Pushpa Kumari &amp; Mr. Narendra Kumar</div>
                  <div><span style={{ color: 'var(--gold)', fontWeight: 600 }}>Granddaughter of:</span> Mrs. Shail Kumari Gupta &amp; Late Brahmadev Prasad Akela</div>
                </div>
              </div>

              {/* Groom Details */}
              <div style={{ padding: '16px', background: 'var(--bg-secondary)', borderRadius: 12, border: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                  <div style={{ width: 3, height: 20, background: 'var(--gold-dark)', borderRadius: 2 }} />
                  <h3 className="font-script" style={{ fontSize: 26, color: 'var(--gold-dark)', margin: 0 }}>Rajan Kumar</h3>
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: 11 }}>
                  <div><span style={{ color: 'var(--gold)', fontWeight: 600 }}>Son of:</span> Mrs. Geeta Devi &amp; Mr. Ramkripal Sah (Seth Ji)</div>
                  <div><span style={{ color: 'var(--gold)', fontWeight: 600 }}>Grandson of:</span> Mrs. Suryavati Devi &amp; Late Ganesh Shah</div>
                  <div style={{ marginTop: 4 }}><span style={{ color: 'var(--gold)', fontWeight: 600 }}>Address:</span> Village &amp; Post – Nakardei, Raxaul East Champaran (Bihar)</div>
                </div>
              </div>
            </div>
          </section>

          {/* ══════════════════════════
              FAMILY PHOTO
          ══════════════════════════ */}


          <section style={{ padding: '0 24px 24px' }}>
  <div className="wedding-card" style={{ padding: '24px 20px', textAlign: 'center' }}>
    
    <SectionTitle title="MEMORIES" sub="Beautiful moments together" />

    <div style={{
      width: '100%',
      borderRadius: 12,
      border: '2px solid var(--border-strong)',
      background: 'linear-gradient(135deg, var(--bg-secondary), var(--bg-card))',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '30px',
      boxShadow: 'inset 0 2px 16px var(--shadow)',
    }}>
      <MemorySlider />
    </div>
  </div>
</section>

          {/* ══════════════════════════
              INVITATION MESSAGE
          ══════════════════════════ */}
          <section style={{ padding: '0 24px 24px' }}>
            <div className="wedding-card ornate-border" style={{ padding: '28px 24px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
              {/* Decorative corner elements */}
              {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map(pos => (
                <div key={pos} style={{
                  position: 'absolute',
                  top: pos.includes('top') ? 16 : 'auto',
                  bottom: pos.includes('bottom') ? 16 : 'auto',
                  left: pos.includes('left') ? 16 : 'auto',
                  right: pos.includes('right') ? 16 : 'auto',
                  width: 30, height: 30,
                  borderTop: pos.includes('top') ? '2px solid var(--gold)' : 'none',
                  borderBottom: pos.includes('bottom') ? '2px solid var(--gold)' : 'none',
                  borderLeft: pos.includes('left') ? '2px solid var(--gold)' : 'none',
                  borderRight: pos.includes('right') ? '2px solid var(--gold)' : 'none',
                  opacity: 0.5,
                }} />
              ))}

              <div style={{ fontSize: 24, marginBottom: 12 }}>🙏</div>
              <p className="font-body" style={{
                fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.9,
                fontStyle: 'normal', marginBottom: 16
              }}>
                On the auspicious occasion of this sacred wedding, you and your entire family are
                <span style={{ color: 'var(--crimson)', fontWeight: 600 }}> cordially invited.</span>
              </p>
              <p className="font-body" style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 16 }}>
                Your gracious presence will bless the newlyweds and make this divine occasion truly memorable.
              </p>
              <OrnamentDivider />
              <blockquote className="font-script" style={{
                fontSize: 24, color: 'var(--crimson)', lineHeight: 1.5,
                margin: '16px 0', fontStyle: 'normal'
              }}>
                "A bond of two hearts, tied with seven sacred vows…<br />
                On my sister's special day, we warmly welcome you."
              </blockquote>
            </div>
          </section>



          {/* Family Photo */}
          <section style={{ padding: '0 24px 24px' }}>
  <div className="wedding-card" style={{ padding: '24px 20px', textAlign: 'center' }}>
    
    <SectionTitle title="FAMILY PHOTO" sub="Our loving family" />

    <div style={{
      width: '100%',
      aspectRatio: '4/3',
      borderRadius: 12,
      overflow: 'hidden',
      border: '2px solid var(--border-strong)',
    }}>
      <img
        src="/family-photo.jpeg"
        alt="Family Photograph"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover"
        }}
      />
    </div>

    <p style={{
      fontFamily: "'Cinzel', serif",
      fontSize: 11,
      letterSpacing: 2,
      marginTop: 8
    }}>
      FAMILY PHOTOGRAPH
    </p>

  </div>
</section>

          {/* ══════════════════════════
              FAMILY MEMBERS
          ══════════════════════════ */}
          <section style={{ padding: '0 24px 24px' }}>
            <div className="wedding-card" style={{ padding: '24px 0 8px' }}>
              <div style={{ padding: '0 20px' }}>
                <SectionTitle title="INVITATION BY" sub="The family joyfully invites you" />
              </div>

              {/* Senior family */}
              <div style={{ padding: '0 20px 12px' }}>
                <div style={{ fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: 2, color: 'var(--gold)', marginBottom: 8, textAlign: 'center' }}>
                  SENIOR FAMILY
                </div>
                <FamilyRow names="Shail Kumari Gupta (Grand Mother of Bride)" />
                <FamilyRow names="Narendra Kumar Prasad  ·  Pushpa Kumari" />
                <FamilyRow names="Harendra Prasad  ·  Kiran Kumari" />
                <FamilyRow names="Jitendra Kumar  ·  Veena Kumari" />
                <FamilyRow names="Satyendra Kumar Gupta  ·  Renu Kumari" />
              </div>

              <OrnamentDivider />

              {/* Siblings & relatives */}
              <div style={{ padding: '0 20px 12px' }}>
                <div style={{ fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: 2, color: 'var(--gold)', marginBottom: 8, textAlign: 'center' }}>
                  SIBLINGS
                </div>
                <FamilyRow names="Dr. Prince Rajeev Ranjan" />
                <FamilyRow names="Sanjeev Ranjan" />
                <FamilyRow names="Shashi Ranjan" />
                <FamilyRow names="Ravi Ranjan" />
                <FamilyRow names="Raj Nandani" />
                <FamilyRow names="Ayush Raj  ·  Piyush Raj" />
                <FamilyRow names="Shubham Priyadarshi  ·  Amritesh Chandra" />
                <FamilyRow names="Shrishti Ranjan  ·  Siddharth Ranjan" />
                <FamilyRow names="&amp; Entire Family Members" />
              </div>

              <OrnamentDivider />

              {/* Young family */}
              {/* <div style={{ padding: '0 20px 12px' }}>
                <div style={{ fontFamily: "'Cinzel', serif", fontSize: 9, letterSpacing: 2, color: 'var(--gold)', marginBottom: 8, textAlign: 'center' }}>
                  YOUNG FAMILY
                </div>
                <FamilyRow names="Ayush Raj  ·  Piyush Raj" />
                <FamilyRow names="Shubham Priyadarshi  ·  Amritesh Chandra" />
                <FamilyRow names="Shrishti Ranjan  ·  Siddharth Ranjan" />
                <FamilyRow names="&amp; Entire Family Members" />
              </div> */}
            </div>
          </section>

          {/* ══════════════════════════
              LOCATION
          ══════════════════════════ */}
          <section style={{ padding: '0 24px 24px' }}>
            <div className="wedding-card ornate-border" style={{ padding: '24px 20px', textAlign: 'center' }}>
              <SectionTitle title="VENUE & LOCATION" sub="Come, be a part of the celebration" />

              <div style={{
                padding: '16px', borderRadius: 12,
                background: 'var(--bg-secondary)', border: '1px solid var(--border)',
                marginBottom: 16,
              }}>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                  <div style={{ fontFamily: "'Cinzel', serif", fontSize: 12, color: 'var(--text-primary)', marginBottom: 6, fontWeight: 600 }}>
                    Narendra Kumar Prasad
                  </div>
                  <div>{LOCATION_TEXT}</div>
                  <div style={{ marginTop: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                    <span style={{ fontSize: 16 }}>📞</span>
                    <a href="tel:8797860481" style={{ color: 'var(--gold)', textDecoration: 'none', fontWeight: 600 }}>
                      8797860481
                    </a>
                  </div>
                </div>
              </div>

              <a
                href={LOCATION_MAPS}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '12px 28px', borderRadius: 28,
                  background: 'linear-gradient(135deg, var(--crimson), var(--rose))',
                  color: '#fff', textDecoration: 'none',
                  fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: 2,
                  boxShadow: '0 4px 16px var(--shadow-strong)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.04)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)' }}
              >
                <MapPinIcon /> GET LOCATION
              </a>
            </div>
          </section>

          {/* ══════════════════════════
              FOOTER
          ══════════════════════════ */}
          <footer style={{ padding: '0 24px 40px', textAlign: 'center' }}>
            <OrnamentDivider />
            <div className="font-script" style={{ fontSize: 36, color: 'var(--crimson)', margin: '16px 0 8px' }}>
              Tripti &amp; Rajan
            </div>
            <div style={{ fontFamily: "'Cinzel', serif", fontSize: 10, letterSpacing: 3, color: 'var(--gold)', marginBottom: 12 }}>
              7TH MAY 2026
            </div>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', fontStyle: 'italic', margin: '0 0 16px' }}>
              May this union be blessed with eternal love, happiness, and prosperity.
            </p>
            <div style={{ fontSize: 20 }}>🌸 💍 🌸</div>
          </footer>

        </div>
      </div>
    </>
  )
}

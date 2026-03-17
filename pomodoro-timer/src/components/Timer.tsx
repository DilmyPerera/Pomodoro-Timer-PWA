// src/components/Timer.tsx
'use client';

import { useState, useEffect, CSSProperties } from 'react';

// ─────────────────────────────────────────────────────────────────
// Theme Palettes
// ─────────────────────────────────────────────────────────────────
const CINNA = {
    bg: 'linear-gradient(135deg, #F0F8FF 0%, #D6EEFF 50%, #EEF6FF 100%)',
    card: 'rgba(255,255,255,0.82)',
    border: '#AEE2FF',
    shadow: '0 8px 36px rgba(130,190,240,0.35)',
    accent: '#4DABF7',
    timerColor: '#1971C2',
    timerGlow: 'rgba(116,192,252,0.35)',
    title: '#1864AB',
    muted: '#74C0FC',
    label: '#339AF0',
    dotDone: '#4DABF7',
    dotActive: '#A5D8FF',
    dotPending: '#D0EBFF',
    btnWork: { on: 'linear-gradient(135deg,#74C0FC,#339AF0)', off: '#E7F5FF' },
    btnShort: { on: 'linear-gradient(135deg,#96F2D7,#38D9A9)', off: '#E6FCF5' },
    btnLong: { on: 'linear-gradient(135deg,#EEB2FF,#CC5DE8)', off: '#F8F0FF' },
    btnStart: 'linear-gradient(135deg,#74C0FC,#339AF0)',
    btnReset: '#E7F5FF',
    toggleBg: '#E7F5FF',
    toggleBorder: '#AEE2FF',
};

const KUROMI = {
    bg: 'linear-gradient(135deg, #0D0D1A 0%, #1A1025 60%, #1E1E2F 100%)',
    card: 'rgba(22,18,38,0.9)',
    border: '#9B5DE5',
    shadow: '0 8px 44px rgba(155,93,229,0.45)',
    accent: '#C77DFF',
    timerColor: '#E0AAFF',
    timerGlow: 'rgba(199,125,255,0.45)',
    title: '#E0AAFF',
    muted: '#9B5DE5',
    label: '#C77DFF',
    dotDone: '#C77DFF',
    dotActive: '#9B5DE5',
    dotPending: '#2D1B45',
    btnWork: { on: 'linear-gradient(135deg,#9B5DE5,#6A1FBE)', off: '#2D1B45' },
    btnShort: { on: 'linear-gradient(135deg,#5C6BC0,#3949AB)', off: '#1A2050' },
    btnLong: { on: 'linear-gradient(135deg,#C77DFF,#9B5DE5)', off: '#2D1B45' },
    btnStart: 'linear-gradient(135deg,#9B5DE5,#7B2FBE)',
    btnReset: '#2D1B45',
    toggleBg: '#1A0D30',
    toggleBorder: '#9B5DE5',
};

// ─────────────────────────────────────────────────────────────────
// Motivational Messages
// ─────────────────────────────────────────────────────────────────
const MSGS = {
    cinna: {
        work: ['Stay focused, sweetie ☁️', "You're doing great! ✨", 'One step at a time 🌸', 'Keep floating forward~ 🐾'],
        short: ['Rest time! Enjoy a snack ☁️', 'Float away for a bit~ ☁️', "Deep breath, you're amazing 🌤️"],
        long: ['Big break earned, take it easy ☁️', 'Float under the clouds~ ☁️🐶', 'Relax fully! You deserve it 🌸'],
    },
    kuromi: {
        work: ['Slay your tasks ✨', 'Dark focus mode: ON ⚡', 'Channel your inner rebel 🌙', 'Make darkness your strength ✨'],
        short: ['Even rebels need rest 🌙', 'Quick recharge, Kuromi style~', 'Breathe in the night vibes ✨'],
        long: ['Long rest, well deserved ⭐', 'Moon and stars await~ 🌙✨', 'Take a full gothic rest~ 🌙'],
    },
} as const;

// ─────────────────────────────────────────────────────────────────
// Decorative SVG Elements
// ─────────────────────────────────────────────────────────────────
function Cloud({ style }: { style?: CSSProperties }) {
    return (
        <svg style={style} viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="60" cy="42" rx="52" ry="20" fill="white" fillOpacity="0.85" />
            <ellipse cx="34" cy="35" rx="22" ry="17" fill="white" fillOpacity="0.85" />
            <ellipse cx="62" cy="28" rx="26" ry="21" fill="white" fillOpacity="0.9" />
            <ellipse cx="88" cy="35" rx="20" ry="15" fill="white" fillOpacity="0.85" />
        </svg>
    );
}

function Sparkle({ style }: { style?: CSSProperties }) {
    return (
        <svg style={style} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 2 L21.5 17 L36 14 L21.5 21 L36 28 L21.5 23 L20 38 L18.5 23 L4 28 L18.5 21 L4 14 L18.5 17 Z"
                fill="#C77DFF" fillOpacity="0.75" />
        </svg>
    );
}

// ─────────────────────────────────────────────────────────────────
// Cinnamoroll Mascot SVG
// ─────────────────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────────────────────
export default function Timer({ isDark: initialIsDark }: { isDark: boolean }) {
    const [minutes, setMinutes] = useState(25);
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [mode, setMode] = useState<'work' | 'short' | 'long'>('work');
    const [pomodoroCount, setPomodoroCount] = useState(0);
    const [msgIdx, setMsgIdx] = useState(0);

    // Use the isDark prop directly (no theme toggle needed here)
    const isDark = initialIsDark;

    // ── Derived theme + messages ──
    const t = isDark ? KUROMI : CINNA;
    const themeKey = isDark ? 'kuromi' : 'cinna';
    const isBreak = mode !== 'work';
    const messages = MSGS[themeKey][mode];

    // ── Rotate motivational message ──
    useEffect(() => {
        setMsgIdx(0);
        const interval = setInterval(() => setMsgIdx(i => (i + 1) % messages.length), 8000);
        return () => clearInterval(interval);
    }, [themeKey, mode, messages.length]);

    // ── Countdown ──
    const displayTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    useEffect(() => {
        if (!isActive) return;
        const interval = setInterval(() => {
            if (seconds === 0) {
                if (minutes === 0) {
                    setIsActive(false);
                    if (mode === 'work') {
                        const newCount = pomodoroCount + 1;
                        if (newCount >= 4) {
                            setPomodoroCount(0);
                            setMode('long');
                            setMinutes(20);
                            setSeconds(0);
                            alert('Great job! You completed 4 Pomodoros. Time for a long break! (20 min)');
                        } else {
                            setPomodoroCount(newCount);
                            setMode('short');
                            setMinutes(5);
                            setSeconds(0);
                            alert(`Pomodoro ${newCount}/4 done! Take a short break.`);
                        }
                    } else {
                        setMode('work');
                        setMinutes(25);
                        setSeconds(0);
                        alert('Break over! Back to work!');
                    }
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            } else {
                setSeconds(seconds - 1);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [isActive, minutes, seconds, mode, pomodoroCount]);

    const toggleTimer = () => setIsActive(a => !a);

    const resetTimer = () => {
        setIsActive(false);
        setMinutes(mode === 'work' ? 25 : mode === 'short' ? 5 : 20);
        setSeconds(0);
    };

    const changeMode = (m: 'work' | 'short' | 'long') => {
        setMode(m);
        setIsActive(false);
        setMinutes(m === 'work' ? 25 : m === 'short' ? 5 : 20);
        setSeconds(0);
    };

    // ─────────────────────────────────────────────────────────────
    // Render
    // ─────────────────────────────────────────────────────────────
    return (
        // Full-screen backdrop
        <div style={{
            position: 'fixed', inset: 0,
            background: t.bg,
            transition: 'background 0.8s ease',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden',
        }}>
            {/* ── Background decorations ── */}
            {isDark ? (
                // Kuromi: floating sparkles & moon glyphs
                <>
                    <Sparkle style={{ position: 'absolute', top: '7%', left: '10%', width: 30, opacity: 0.55, animation: 'kfloat 4s ease-in-out infinite' }} />
                    <Sparkle style={{ position: 'absolute', top: '18%', right: '12%', width: 22, opacity: 0.4, animation: 'kfloat 5.5s ease-in-out infinite 1.2s' }} />
                    <Sparkle style={{ position: 'absolute', bottom: '18%', left: '18%', width: 18, opacity: 0.45, animation: 'kfloat 6s ease-in-out infinite 0.7s' }} />
                    <Sparkle style={{ position: 'absolute', bottom: '28%', right: '9%', width: 26, opacity: 0.5, animation: 'kfloat 4.5s ease-in-out infinite 2s' }} />
                    <span style={{ position: 'absolute', top: '28%', left: '5%', fontSize: '1.5rem', opacity: 0.2, animation: 'kfloat 5s ease-in-out infinite' }}>🌙</span>
                    <span style={{ position: 'absolute', top: '62%', right: '5%', fontSize: '1.1rem', opacity: 0.2, animation: 'kfloat 4.5s ease-in-out infinite 1.8s' }}>✨</span>
                    <span style={{ position: 'absolute', bottom: '8%', right: '20%', fontSize: '1rem', opacity: 0.2, animation: 'kfloat 6s ease-in-out infinite 2.5s' }}>⭐</span>
                    <span style={{ position: 'absolute', top: '50%', left: '3%', fontSize: '1rem', opacity: 0.15, animation: 'kfloat 7s ease-in-out infinite 0.5s' }}>⭐</span>
                </>
            ) : (
                // Cinnamoroll: drifting clouds & soft icons
                <>
                    <Cloud style={{ position: 'absolute', top: '4%', left: '-6%', width: 200, opacity: 0.5, animation: 'cdrift 9s ease-in-out infinite' }} />
                    <Cloud style={{ position: 'absolute', top: '12%', right: '-10%', width: 240, opacity: 0.4, animation: 'cdrift 12s ease-in-out infinite 2.5s' }} />
                    <Cloud style={{ position: 'absolute', bottom: '8%', left: '3%', width: 160, opacity: 0.35, animation: 'cdrift 10s ease-in-out infinite 1s' }} />
                    <Cloud style={{ position: 'absolute', bottom: '22%', right: '4%', width: 130, opacity: 0.4, animation: 'cdrift 8s ease-in-out infinite 3.5s' }} />
                    <span style={{ position: 'absolute', top: '38%', left: '3%', fontSize: '1.5rem', opacity: 0.2, animation: 'cfloat 5s ease-in-out infinite' }}>☁️</span>
                    <span style={{ position: 'absolute', top: '55%', right: '3%', fontSize: '1.1rem', opacity: 0.18, animation: 'cfloat 6s ease-in-out infinite 1.2s' }}>🌸</span>
                    <span style={{ position: 'absolute', bottom: '32%', left: '6%', fontSize: '1rem', opacity: 0.18, animation: 'cfloat 7s ease-in-out infinite 2s' }}>🌸</span>
                    <span style={{ position: 'absolute', top: '22%', left: '8%', fontSize: '0.9rem', opacity: 0.15, animation: 'cfloat 8s ease-in-out infinite 0.5s' }}>🌟</span>
                </>
            )}

            {/* ── Timer Card ── */}
            <div style={{
                background: t.card,
                border: `2px solid ${t.border}`,
                boxShadow: t.shadow,
                backdropFilter: 'blur(14px)',
                WebkitBackdropFilter: 'blur(14px)',
                borderRadius: isDark ? '1.5rem' : '2.5rem',
                padding: '2.2rem 2.8rem',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.4rem',
                minWidth: 320, maxWidth: '90vw',
                position: 'relative',
                transition: 'all 0.7s ease',
                marginTop: '5rem',
            }}>

                {/* Mascot + motivational message */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
                    <div style={{
                        width: 100, height: 108,
                        flexShrink: 0,
                        position: 'relative',
                        filter: isDark
                            ? `drop-shadow(0 0 18px ${t.accent}99)`
                            : 'drop-shadow(0 6px 14px rgba(91,184,245,0.45))',
                        animation: 'cfloat 3.5s ease-in-out infinite',
                    }}>
                        <img
                            src={isDark
                                ? (isBreak ? '/mascots/kuromi-break.png' : '/mascots/kuromi.png')
                                : (isBreak ? '/mascots/cinnamoroll-break.png' : '/mascots/cinnamoroll.png')}
                            alt={isDark ? 'Kuromi' : 'Cinnamoroll'}
                            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                        />
                    </div>
                    <p style={{
                        margin: 0,
                        color: t.muted,
                        fontSize: '0.8rem',
                        fontStyle: 'italic',
                        textAlign: 'center',
                        maxWidth: 260,
                        lineHeight: 1.45,
                        transition: 'opacity 0.5s ease',
                    }}>
                        {messages[msgIdx % messages.length]}
                    </p>
                </div>

                {/* Pomodoro progress dots */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    {[0, 1, 2, 3].map(i => (
                        <div
                            key={i}
                            title={
                                i < pomodoroCount ? `Pomodoro ${i + 1} done`
                                    : i === pomodoroCount && mode === 'work' ? 'In progress'
                                        : 'Pending'
                            }
                            style={{
                                width: 14, height: 14,
                                borderRadius: '50%',
                                background: i < pomodoroCount
                                    ? t.dotDone
                                    : i === pomodoroCount && mode === 'work' && isActive
                                        ? t.dotActive
                                        : t.dotPending,
                                boxShadow: i < pomodoroCount ? `0 0 8px ${t.dotDone}` : 'none',
                                animation: i === pomodoroCount && mode === 'work' && isActive
                                    ? 'dotpulse 1.5s ease-in-out infinite' : 'none',
                                transition: 'background 0.4s, box-shadow 0.4s',
                            }}
                        />
                    ))}
                    <span style={{ marginLeft: 6, fontSize: '0.78rem', color: t.muted }}>{pomodoroCount}/4</span>
                </div>

                {/* Mode buttons (cleaner labels during focus) */}
                <div style={{ display: 'flex', gap: 8 }}>
                    {(['work', 'short', 'long'] as const).map(m => {
                        const btnColors = m === 'work' ? t.btnWork : m === 'short' ? t.btnShort : t.btnLong;
                        const labels = { work: 'Focus', short: 'Short Break', long: 'Long Break' };
                        const active = mode === m;
                        return (
                            <button
                                key={m}
                                onClick={() => changeMode(m)}
                                style={{
                                    padding: '0.4rem 0.95rem',
                                    borderRadius: '9999px',
                                    border: `2px solid ${active ? t.border : 'transparent'}`,
                                    background: active ? btnColors.on : btnColors.off,
                                    color: active ? (isDark ? '#fff' : '#1864AB') : t.label,
                                    fontWeight: active ? 700 : 500,
                                    fontSize: '0.82rem',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    boxShadow: active && isDark ? `0 0 14px ${t.accent}55` : 'none',
                                }}
                            >
                                {labels[m]}
                            </button>
                        );
                    })}
                </div>

                {/* Large timer display */}
                <div style={{
                    fontSize: 'clamp(4rem, 16vw, 6rem)',
                    fontWeight: 800,
                    fontFamily: '"Courier New", monospace',
                    letterSpacing: '0.06em',
                    color: t.timerColor,
                    textShadow: isDark
                        ? `0 0 30px ${t.timerGlow}, 0 0 64px ${t.timerGlow}`
                        : `0 2px 16px ${t.timerGlow}`,
                    lineHeight: 1,
                    userSelect: 'none',
                    transition: 'color 0.7s, text-shadow 0.7s',
                }}>
                    {displayTime}
                </div>

                {/* Break label — only shown during breaks */}
                {isBreak && (
                    <div style={{
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        color: t.accent,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        opacity: 0.9,
                    }}>
                        {mode === 'long'
                            ? (isDark ? '🌙 Long Break' : '☁️ Long Break')
                            : (isDark ? '✨ Short Break' : '🌸 Short Break')}
                    </div>
                )}

                {/* Controls */}
                <div style={{ display: 'flex', gap: 14 }}>
                    <button
                        onClick={toggleTimer}
                        style={{
                            padding: '0.85rem 2.3rem',
                            fontSize: '1.15rem',
                            fontWeight: 700,
                            borderRadius: '9999px',
                            border: 'none',
                            background: t.btnStart,
                            color: '#fff',
                            cursor: 'pointer',
                            boxShadow: isDark
                                ? `0 4px 22px ${t.accent}55, inset 0 1px 0 rgba(255,255,255,0.1)`
                                : '0 4px 18px rgba(116,192,252,0.45)',
                            transition: 'transform 0.15s ease, box-shadow 0.3s',
                            letterSpacing: '0.04em',
                        }}
                        onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
                        onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                    >
                        {isActive ? '⏸ Pause' : '▶ Start'}
                    </button>
                    <button
                        onClick={resetTimer}
                        style={{
                            padding: '0.85rem 1.8rem',
                            fontSize: '1.1rem',
                            fontWeight: 600,
                            borderRadius: '9999px',
                            border: `2px solid ${t.border}55`,
                            background: t.btnReset,
                            color: t.label,
                            cursor: 'pointer',
                            transition: 'transform 0.15s ease',
                            letterSpacing: '0.03em',
                        }}
                        onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
                        onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                    >
                        ↺ Reset
                    </button>
                </div>
            </div>
        </div>
    );
}
'use client';

import { CSSProperties } from 'react';

interface StatisticsProps {
    userName: string;
    isDark: boolean;
    totalStudyMinutes: number;
    totalBreakMinutes: number;
    completedPomodoros: number;
    onBackToTimer: () => void;
    onNewSession: () => void;
}

const CINNA = {
    bg: 'linear-gradient(135deg, #F0F8FF 0%, #D6EEFF 50%, #EEF6FF 100%)',
    card: 'rgba(255,255,255,0.88)',
    border: '#AEE2FF',
    shadow: '0 8px 36px rgba(130,190,240,0.35)',
    accent: '#4DABF7',
    title: '#1864AB',
    muted: '#74C0FC',
    btnPrimary: 'linear-gradient(135deg,#74C0FC,#339AF0)',
    btnSecondary: '#E7F5FF',
};

const KUROMI = {
    bg: 'linear-gradient(135deg, #0D0D1A 0%, #1A1025 60%, #1E1E2F 100%)',
    card: 'rgba(22,18,38,0.9)',
    border: '#9B5DE5',
    shadow: '0 8px 44px rgba(155,93,229,0.45)',
    accent: '#C77DFF',
    title: '#E0AAFF',
    muted: '#9B5DE5',
    btnPrimary: 'linear-gradient(135deg,#9B5DE5,#6A1FBE)',
    btnSecondary: '#2D1B45',
};

export default function Statistics({
    userName,
    isDark,
    totalStudyMinutes,
    totalBreakMinutes,
    completedPomodoros,
    onBackToTimer,
    onNewSession,
}: StatisticsProps) {
    const t = isDark ? KUROMI : CINNA;

    const studyHours = Math.floor(totalStudyMinutes / 60);
    const studyMins = totalStudyMinutes % 60;
    const breakHours = Math.floor(totalBreakMinutes / 60);
    const breakMins = totalBreakMinutes % 60;
    const totalMinutes = totalStudyMinutes + totalBreakMinutes;
    const totalHours = Math.floor(totalMinutes / 60);
    const totalMins = totalMinutes % 60;

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            background: t.bg,
            transition: 'background 0.8s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
        }}>
            {/* ── Main Stats Card ── */}
            <div className="resp-stats-card" style={{
                background: t.card,
                border: `2px solid ${t.border}`,
                boxShadow: t.shadow,
                backdropFilter: 'blur(14px)',
                WebkitBackdropFilter: 'blur(14px)',
                borderRadius: '2rem',
                padding: '2rem 2.2rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1.2rem',
                maxWidth: '90vw',
                width: 'clamp(280px, 400px, 90vw)',
                position: 'relative',
            } as CSSProperties}>
                {/* Header */}
                <div style={{ textAlign: 'center' }}>
                    <h1 className="resp-stats-title" style={{
                        margin: '0 0 0.3rem 0',
                        fontSize: '1.5rem',
                        fontWeight: 800,
                        color: t.title,
                        letterSpacing: '0.03em',
                    }}>
                        📊 Session Summary
                    </h1>
                    <p style={{
                        margin: 0,
                        fontSize: '0.88rem',
                        color: t.muted,
                    }}>
                        Great work, {userName}! 🎉
                    </p>
                </div>

                {/* Stats Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
                    gap: '0.9rem',
                    width: '100%',
                }}>
                    {/* Study Time */}
                    <div style={{
                        background: isDark ? 'rgba(155,93,229,0.1)' : 'rgba(74,171,247,0.08)',
                        border: `1px solid ${t.accent}55`,
                        borderRadius: '1rem',
                        padding: '1rem',
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.4rem',
                    } as CSSProperties}>
                        <div style={{
                            fontSize: '1.4rem',
                        }}>
                            ⏱️
                        </div>
                        <div style={{
                            fontSize: 'clamp(1rem, 4vw, 1.3rem)',
                            fontWeight: 700,
                            color: t.title,
                            lineHeight: 1,
                        }}>
                            {studyHours}h {studyMins}m
                        </div>
                        <div style={{
                            fontSize: '0.72rem',
                            color: t.muted,
                            fontWeight: 600,
                        }}>
                            Study Time
                        </div>
                    </div>

                    {/* Break Time */}
                    <div style={{
                        background: isDark ? 'rgba(155,93,229,0.1)' : 'rgba(74,171,247,0.08)',
                        border: `1px solid ${t.accent}55`,
                        borderRadius: '1rem',
                        padding: '1rem',
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.4rem',
                    } as CSSProperties}>
                        <div style={{
                            fontSize: '1.4rem',
                        }}>
                            ☕
                        </div>
                        <div style={{
                            fontSize: 'clamp(1rem, 4vw, 1.3rem)',
                            fontWeight: 700,
                            color: t.title,
                            lineHeight: 1,
                        }}>
                            {breakHours}h {breakMins}m
                        </div>
                        <div style={{
                            fontSize: '0.72rem',
                            color: t.muted,
                            fontWeight: 600,
                        }}>
                            Break Time
                        </div>
                    </div>

                    {/* Total Time */}
                    <div style={{
                        background: isDark ? 'rgba(155,93,229,0.1)' : 'rgba(74,171,247,0.08)',
                        border: `1px solid ${t.accent}55`,
                        borderRadius: '1rem',
                        padding: '1rem',
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.4rem',
                    } as CSSProperties}>
                        <div style={{
                            fontSize: '1.4rem',
                        }}>
                            ⏳
                        </div>
                        <div style={{
                            fontSize: 'clamp(1rem, 4vw, 1.3rem)',
                            fontWeight: 700,
                            color: t.title,
                            lineHeight: 1,
                        }}>
                            {totalHours}h {totalMins}m
                        </div>
                        <div style={{
                            fontSize: '0.72rem',
                            color: t.muted,
                            fontWeight: 600,
                        }}>
                            Total Time
                        </div>
                    </div>

                    {/* Pomodoros */}
                    <div style={{
                        background: isDark ? 'rgba(155,93,229,0.1)' : 'rgba(74,171,247,0.08)',
                        border: `1px solid ${t.accent}55`,
                        borderRadius: '1rem',
                        padding: '1rem',
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.4rem',
                    } as CSSProperties}>
                        <div style={{
                            fontSize: '1.4rem',
                        }}>
                            🍅
                        </div>
                        <div style={{
                            fontSize: 'clamp(1rem, 4vw, 1.3rem)',
                            fontWeight: 700,
                            color: t.title,
                            lineHeight: 1,
                        }}>
                            {completedPomodoros}
                        </div>
                        <div style={{
                            fontSize: '0.72rem',
                            color: t.muted,
                            fontWeight: 600,
                        }}>
                            Pomodoros
                        </div>
                    </div>
                </div>

                {/* Motivational Message */}
                <div style={{
                    background: isDark ? 'rgba(155,93,229,0.15)' : 'rgba(74,171,247,0.12)',
                    borderRadius: '0.9rem',
                    padding: '0.9rem',
                    textAlign: 'center',
                    width: '100%',
                }}>
                    <p style={{
                        margin: 0,
                        fontSize: '0.82rem',
                        color: t.title,
                        fontWeight: 600,
                        lineHeight: 1.5,
                    }}>
                        {completedPomodoros >= 4
                            ? '🌟 Incredible focus session! You\'re unstoppable!'
                            : completedPomodoros >= 2
                                ? '✨ Great productivity! Keep it up tomorrow!'
                                : '💪 Every session counts. You\'re building great habits!'}
                    </p>
                </div>

                {/* Action Buttons */}
                <div style={{
                    display: 'flex',
                    gap: '1rem',
                    width: '100%',
                    flexDirection: 'column',
                }}>
                    <button
                        onClick={onNewSession}
                        style={{
                            padding: '0.8rem',
                            fontSize: '0.95rem',
                            fontWeight: 700,
                            borderRadius: '1rem',
                            border: 'none',
                            background: t.btnPrimary,
                            color: '#fff',
                            cursor: 'pointer',
                            boxShadow: isDark
                                ? `0 4px 22px ${t.accent}55`
                                : '0 4px 18px rgba(116,192,252,0.45)',
                            transition: 'transform 0.15s ease, box-shadow 0.3s',
                            letterSpacing: '0.04em',
                        }}
                        onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
                        onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                    >
                        🚀 Start New Session
                    </button>

                    <button
                        onClick={onBackToTimer}
                        style={{
                            padding: '0.8rem',
                            fontSize: '0.95rem',
                            fontWeight: 600,
                            borderRadius: '1rem',
                            border: `2px solid ${t.border}`,
                            background: t.btnSecondary,
                            color: isDark ? t.accent : '#1864AB',
                            cursor: 'pointer',
                            transition: 'transform 0.15s ease',
                            letterSpacing: '0.03em',
                        }}
                        onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
                        onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                    >
                        ← Back to Timer
                    </button>
                </div>
            </div>
        </div>
    );
}

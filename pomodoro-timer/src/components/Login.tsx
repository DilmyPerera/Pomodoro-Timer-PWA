'use client';

import { useState } from 'react';

interface LoginProps {
    onLoginSuccess: (name: string) => void;
}

export default function Login({ onLoginSuccess }: LoginProps) {
    const [name, setName] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmedName = name.trim();

        if (!trimmedName) {
            setError('Please enter your name');
            return;
        }

        if (trimmedName.length < 2) {
            setError('Name must be at least 2 characters');
            return;
        }

        localStorage.setItem('pomodoroUserName', trimmedName);
        onLoginSuccess(trimmedName);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSubmit(e as unknown as React.FormEvent);
        }
    };

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            background: 'linear-gradient(135deg, #F0F8FF 0%, #D6EEFF 50%, #EEF6FF 100%)',
            transition: 'background 0.8s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
        }}>
            {/* Decorative clouds in background */}
            <svg style={{ position: 'absolute', top: '4%', left: '-6%', width: 200, opacity: 0.35 }}>
                <ellipse cx="60" cy="42" rx="52" ry="20" fill="white" fillOpacity="0.85" />
                <ellipse cx="34" cy="35" rx="22" ry="17" fill="white" fillOpacity="0.85" />
                <ellipse cx="62" cy="28" rx="26" ry="21" fill="white" fillOpacity="0.9" />
                <ellipse cx="88" cy="35" rx="20" ry="15" fill="white" fillOpacity="0.85" />
            </svg>

            <div className="resp-login-card" style={{
                background: 'rgba(255,255,255,0.88)',
                border: '2px solid #AEE2FF',
                boxShadow: '0 8px 48px rgba(130,190,240,0.45)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                borderRadius: '2.5rem',
                padding: '3.2rem 2.8rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1.8rem',
                width: 'min(90vw, 380px)',
                position: 'relative',
            }}>
                {/* Title */}
                <h1 className="resp-login-title" style={{
                    margin: 0,
                    fontSize: '1.68rem',
                    fontWeight: 800,
                    color: '#1864AB',
                    letterSpacing: '0.03em',
                    textAlign: 'center',
                }}>
                    Welcome to Pomodoro
                </h1>

                {/* Subtitle */}
                <p style={{
                    margin: 0,
                    fontSize: '0.95rem',
                    color: '#74C0FC',
                    textAlign: 'center',
                    lineHeight: 1.5,
                }}>
                    Let's stay focused and productive together. What's your name?
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    width: '100%',
                }}>
                    {/* Name Input */}
                    <div>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                                setError('');
                            }}
                            onKeyDown={handleKeyDown}
                            placeholder="Enter your name"
                            style={{
                                width: '100%',
                                padding: '1rem 1.2rem',
                                fontSize: '1rem',
                                border: '2px solid #AEE2FF',
                                borderRadius: '0.9rem',
                                background: '#F8FCFF',
                                color: '#1864AB',
                                boxSizing: 'border-box',
                                boxShadow: '0 2px 8px rgba(116,192,252,0.15)',
                                transition: 'all 0.3s ease',
                                outline: 'none',
                            }}
                            onFocus={(e) => {
                                e.currentTarget.style.borderColor = '#4DABF7';
                                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(74,171,247,0.2)';
                            }}
                            onBlur={(e) => {
                                e.currentTarget.style.borderColor = '#AEE2FF';
                                e.currentTarget.style.boxShadow = '0 2px 8px rgba(116,192,252,0.15)';
                            }}
                        />
                    </div>

                    {/* Error message */}
                    {error && (
                        <p style={{
                            margin: 0,
                            fontSize: '0.82rem',
                            color: '#F76707',
                            textAlign: 'center',
                            fontWeight: 500,
                        }}>
                            ⚠️ {error}
                        </p>
                    )}

                    {/* Submit button */}
                    <button
                        type="submit"
                        style={{
                            padding: '1rem 2rem',
                            fontSize: '1.1rem',
                            fontWeight: 700,
                            borderRadius: '0.9rem',
                            border: 'none',
                            background: 'linear-gradient(135deg,#74C0FC,#339AF0)',
                            color: '#fff',
                            cursor: 'pointer',
                            boxShadow: '0 4px 18px rgba(116,192,252,0.45)',
                            transition: 'transform 0.15s ease, box-shadow 0.3s',
                            letterSpacing: '0.04em',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.04)';
                            e.currentTarget.style.boxShadow = '0 6px 24px rgba(116,192,252,0.6)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.boxShadow = '0 4px 18px rgba(116,192,252,0.45)';
                        }}
                    >
                        Let's Begin
                    </button>
                </form>


            </div>
        </div>
    );
}

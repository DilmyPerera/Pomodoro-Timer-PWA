'use client';

interface HeaderProps {
    userName: string;
    isDark: boolean;
    onToggleTheme: () => void;
}

export default function Header({ userName, isDark, onToggleTheme }: HeaderProps) {
    return (
        <header className="resp-header" style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            height: '5rem',
            background: isDark
                ? 'linear-gradient(135deg, #0D0D1A 0%, #1A1025 100%)'
                : 'linear-gradient(135deg, #F0F8FF 0%, #D6EEFF 100%)',
            borderBottom: `2px solid ${isDark ? '#9B5DE5' : '#AEE2FF'}`,
            boxShadow: isDark
                ? '0 4px 24px rgba(155,93,229,0.3)'
                : '0 4px 20px rgba(130,190,240,0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingLeft: '2rem',
            paddingRight: '2rem',
            zIndex: 100,
            transition: 'all 0.8s ease',
        }}>
            {/* Left: Greeting */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.8rem',
            }}>
                <span className="resp-header-icon" style={{
                    fontSize: '1.8rem',
                }}>
                    {isDark ? '🌙' : '☁️'}
                </span>
                <h2 className="resp-header-title" style={{
                    margin: 0,
                    fontSize: '1.3rem',
                    fontWeight: 700,
                    color: isDark ? '#E0AAFF' : '#1864AB',
                    letterSpacing: '0.02em',
                    transition: 'color 0.8s ease',
                }}>
                    Hello, {userName}!
                </h2>
            </div>

            {/* Right: Theme toggle */}
            <button
                className="resp-header-toggle"
                onClick={onToggleTheme}
                title={isDark ? 'Switch to light mode ☀️' : 'Switch to dark mode 🌙'}
                style={{
                    background: isDark ? '#1A0D30' : '#E7F5FF',
                    color: isDark ? '#C77DFF' : '#339AF0',
                    border: `1.5px solid ${isDark ? '#9B5DE5' : '#AEE2FF'}`,
                    borderRadius: '9999px',
                    padding: '0.5rem 1.2rem',
                    fontSize: '1.2rem',
                    cursor: 'pointer',
                    fontWeight: 700,
                    transition: 'all 0.3s ease',
                    boxShadow: isDark ? `0 0 12px ${isDark ? '#9B5DE5' : 'rgba(116,192,252,0.3)'}44` : 'none',
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.08)';
                    e.currentTarget.style.boxShadow = isDark
                        ? `0 0 16px #9B5DE599`
                        : '0 2px 8px rgba(116,192,252,0.4)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = isDark ? `0 0 12px #9B5DE544` : 'none';
                }}
            >
                {isDark ? '☀️' : '🌙'}
            </button>
        </header>
    );
}

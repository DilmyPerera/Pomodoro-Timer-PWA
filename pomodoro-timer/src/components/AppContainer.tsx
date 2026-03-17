'use client';

import { useState, useEffect } from 'react';
import Login from './Login';
import Header from './Header';
import Timer from './Timer';

export default function AppContainer() {
    const [userName, setUserName] = useState<string | null>(null);
    const [isDark, setIsDark] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Load theme and name preferences on mount
    useEffect(() => {
        const saved = localStorage.getItem('pomodoroTheme');
        const savedName = localStorage.getItem('pomodoroUserName');

        if (saved !== null) {
            setIsDark(saved === 'dark');
        } else {
            setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
        }

        if (savedName) {
            setUserName(savedName);
        }

        setIsLoading(false);

        // Listen to system preference changes
        const mq = window.matchMedia('(prefers-color-scheme: dark)');
        const handler = (e: MediaQueryListEvent) => {
            if (!localStorage.getItem('pomodoroTheme')) setIsDark(e.matches);
        };
        mq.addEventListener('change', handler);
        return () => mq.removeEventListener('change', handler);
    }, []);

    const handleLoginSuccess = (name: string) => {
        setUserName(name);
    };

    const toggleTheme = () => {
        setIsDark(prev => {
            const next = !prev;
            localStorage.setItem('pomodoroTheme', next ? 'dark' : 'light');
            return next;
        });
    };

    if (isLoading) {
        return null; // or a loading spinner
    }

    if (!userName) {
        return <Login onLoginSuccess={handleLoginSuccess} />;
    }

    return (
        <>
            <Header userName={userName} isDark={isDark} onToggleTheme={toggleTheme} />
            <Timer isDark={isDark} />
        </>
    );
}

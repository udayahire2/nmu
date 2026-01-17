import React, { createContext, useContext, useEffect, useState } from 'react';

export interface BookmarkItem {
    id: string;
    type: 'unit' | 'subject';
    title: string;
    path: string;
}

export interface HistoryItem {
    title: string;
    path: string;
    timestamp: number;
}

export interface User {
    id: string;
    name: string;
    email: string;
    branch: string;
    studentId: string;
    avatar?: string;
    year: string;
}

interface UserContextType {
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
    bookmarks: BookmarkItem[];
    history: HistoryItem[];
    toggleBookmark: (item: BookmarkItem) => void;
    addToHistory: (item: Omit<HistoryItem, 'timestamp'>) => void;
    isBookmarked: (id: string) => boolean;
    theme: 'light' | 'dark';
    toggleTheme: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<'light' | 'dark'>(() => {
        const saved = localStorage.getItem('nmu_theme');
        if (saved === 'dark' || saved === 'light') return saved;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    });

    const [user, setUser] = useState<User | null>(() => {
        const saved = localStorage.getItem('nmu_user');
        return saved ? JSON.parse(saved) : null;
    });

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(theme);
        localStorage.setItem('nmu_theme', theme);
    }, [theme]);

    useEffect(() => {
        if (user) {
            localStorage.setItem('nmu_user', JSON.stringify(user));
        } else {
            localStorage.removeItem('nmu_user');
        }
    }, [user]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    const login = (userData: User) => {
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
    };

    const [bookmarks, setBookmarks] = useState<BookmarkItem[]>(() => {
        const saved = localStorage.getItem('nmu_bookmarks');
        return saved ? JSON.parse(saved) : [];
    });

    const [history, setHistory] = useState<HistoryItem[]>(() => {
        const saved = localStorage.getItem('nmu_history');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('nmu_bookmarks', JSON.stringify(bookmarks));
    }, [bookmarks]);

    useEffect(() => {
        localStorage.setItem('nmu_history', JSON.stringify(history));
    }, [history]);

    const toggleBookmark = (item: BookmarkItem) => {
        setBookmarks(prev => {
            const exists = prev.find(b => b.id === item.id);
            if (exists) {
                return prev.filter(b => b.id !== item.id);
            }
            return [...prev, item];
        });
    };

    const addToHistory = (item: Omit<HistoryItem, 'timestamp'>) => {
        setHistory(prev => {
            const newHistory = [{ ...item, timestamp: Date.now() }, ...prev.filter(h => h.path !== item.path)];
            return newHistory.slice(0, 20); // Keep last 20
        });
    };

    const isBookmarked = (id: string) => bookmarks.some(b => b.id === id);

    return (
        <UserContext.Provider value={{ user, login, logout, bookmarks, history, toggleBookmark, addToHistory, isBookmarked, theme, toggleTheme }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}

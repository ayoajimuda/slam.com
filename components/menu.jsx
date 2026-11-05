'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import '@/styles/components-css/menu.css'

function MenuLink({ href, index, onNavigate, children }) {
    const pathname = usePathname()
    const active = href === pathname

    return (
        <Link className="nav-link" href={href} aria-current={active ? 'page' : undefined} onClick={(e) => onNavigate(e, href)} style={{ '--i': index }} >
            {children}
        </Link>
    )
}

export default function Menu() {
    const [open, setOpen] = useState(false)
    const router = useRouter()
    const menuButtonRef = useRef(null)
    const closeButtonRef = useRef(null)
    const closeMenu = useCallback(() => setOpen(false), [])

    const handleNav = (event, href) => {
        // Let modified clicks (new tab, etc.) behave like normal links.
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return
        event.preventDefault()
        closeMenu()
        setTimeout(() => router.push(href), 80)
    }

    useEffect(() => {
        if (!open) return

        const menuButton = menuButtonRef.current
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') closeMenu()
        }

        document.body.style.overflow = 'hidden'
        window.addEventListener('keydown', handleKeyDown)
        closeButtonRef.current?.focus()

        return () => {
            document.body.style.overflow = ''
            window.removeEventListener('keydown', handleKeyDown)
            menuButton?.focus()
        }
    }, [open, closeMenu])

    return (
        <>
            <header>
                <div className="nav-top-actions">
                    <button className="nav-menu-toggle" ref={menuButtonRef} aria-expanded={open} aria-controls="main-menu" onClick={() => setOpen(true)}>
                        MENU
                    </button>
                </div>
            </header>

            {open && (
                <div className="nav-overlay" role="dialog" aria-modal="true" aria-label="Main navigation" onClick={closeMenu}>
                    <button type="button" className="nav-close" ref={closeButtonRef} onClick={closeMenu} aria-label="Close menu">
                        <svg aria-hidden="true" width="26" height="26" viewBox="0 0 26 26" fill="none">
                            <path d="M3 3L23 23M23 3L3 23" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" />
                        </svg>
                    </button>

                    <div className="nav-rule" />

                    <nav id="main-menu" className="nav-grid" onClick={(e) => e.stopPropagation()}>
                        <MenuLink href="/" index={0} onNavigate={handleNav}>HOME</MenuLink>
                        <MenuLink href="/tricks" index={1} onNavigate={handleNav}>TRICK LIBRARY</MenuLink>
                        <MenuLink href="/progress" index={2} onNavigate={handleNav}>DASHBOARD</MenuLink>
                        <MenuLink href="/map" index={3} onNavigate={handleNav}>SKATE MAP</MenuLink>
                        <MenuLink href="/customize" index={4} onNavigate={handleNav}>CUSTOMIZE</MenuLink>
                        <MenuLink href="/blog" index={5} onNavigate={handleNav}>BLOG</MenuLink>
                        <MenuLink href="/community" index={6} onNavigate={handleNav}>COMMUNITY</MenuLink>
                        <MenuLink href="/account" index={7} onNavigate={handleNav}>ACCOUNT</MenuLink>
                    </nav>

                    <p className="nav-footer">SLAM.COM — EST. 2026</p>
                </div>
            )}
        </>
    )
}
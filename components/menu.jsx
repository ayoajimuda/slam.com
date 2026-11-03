'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'
import '@/styles/menu.css'

function MenuLink({ href, index, onNavigate, children }) {
    const pathname = usePathname()
    const active = href === pathname

    return (
        <Link
            className="nav-link"
            href={href}
            aria-current={active ? 'page' : undefined}
            onClick={(e) => onNavigate(e, href)}
            style={{ '--i': index }}
        >
            {children}
            {active && <span className="nav-now">← NOW</span>}
        </Link>
    )
}

export default function Menu({ open, onClose, menuButtonRef }) {
    const router = useRouter()
    const closeButtonRef = useRef(null)

    const handleNav = (event, href) => {
        // Let modified clicks (new tab, etc.) behave like normal links.
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return
        event.preventDefault()
        onClose()
        setTimeout(() => router.push(href), 80)
    }

    useEffect(() => {
        if (!open) return

        const menuButton = menuButtonRef?.current
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') onClose()
        }

        document.body.style.overflow = 'hidden'
        window.addEventListener('keydown', handleKeyDown)
        closeButtonRef.current?.focus()

        return () => {
            document.body.style.overflow = ''
            window.removeEventListener('keydown', handleKeyDown)
            menuButton?.focus()
        }
    }, [open, onClose, menuButtonRef])

    if (!open) return null

    return (
        <div className="nav-overlay" role="dialog" aria-modal="true" aria-label="Main navigation" onClick={onClose}>
            <button type="button" className="nav-close" ref={closeButtonRef} onClick={onClose} aria-label="Close menu">
                <svg aria-hidden="true" width="26" height="26" viewBox="0 0 26 26" fill="none">
                    <path d="M3 3L23 23M23 3L3 23" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" />
                </svg>
            </button>

            <div className="nav-rule" />

            <nav id="main-menu" className="nav-grid" onClick={(e) => e.stopPropagation()}>
                <MenuLink href="/" index={0} onNavigate={handleNav}>HOME</MenuLink>
                <MenuLink href="/tricks" index={1} onNavigate={handleNav}>TRICKS</MenuLink>
                <MenuLink href="/progress" index={2} onNavigate={handleNav}>PROGRESS</MenuLink>
                <MenuLink href="/map" index={3} onNavigate={handleNav}>SKATE MAP</MenuLink>
            </nav>

            <p className="nav-footer">SLAM.COM — EST. 2026</p>
        </div>
    )
}

'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'
import '@/styles/menu.css'

// Replace with your real links, or keep your existing NAV_ITEMS
const NAV_ITEMS = [
  { label: 'HOME', href: '/' },
  { label: 'TRICKS', href: '/tricks' },
  { label: 'PROGRESS', href: '/progress' },
  { label: 'SKATE MAP', href: '/map' },
]


export default function Menu({ open, onClose, menuButtonRef }) {
  const pathname = usePathname()
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
    <div
      className="nav-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Main navigation"
      onClick={onClose}
    >
      <button
        type="button"
        className="nav-close"
        ref={closeButtonRef}
        onClick={onClose}
        aria-label="Close menu"
      >
        <svg aria-hidden="true" width="26" height="26" viewBox="0 0 26 26" fill="none">
          <path d="M3 3L23 23M23 3L3 23" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" />
        </svg>
      </button>

      <div className="nav-rule" />

      <nav id="main-menu" className="nav-grid" onClick={(e) => e.stopPropagation()}>
        {NAV_ITEMS.map((item, i) => {
          const active = item.href === pathname
          return (
            <Link
              className="nav-link"
              key={item.href}
              href={item.href}
              aria-current={active ? 'page' : undefined}
              onClick={(e) => handleNav(e, item.href)}
              style={{ '--i': i }}
            >
              {item.label}
              {active && <span className="nav-now">← NOW</span>}
            </Link>
          )
        })}
      </nav>

      <p className="nav-footer">SLAM.COM — EST. 2026</p>
    </div>
  )
}
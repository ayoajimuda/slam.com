'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import '@/styles/navbar.css'

export default function NavBar(){
    const [open, setOpen] = useState(false)
    const [authMessage, setAuthMessage] = useState('')
    const menuButtonRef = useRef(null)

    return (
      <div className="nav-top-actions">
        {!open && (
          <div className="nav-auth-actions">
            <button onClick={() => setAuthMessage('Login will be available soon.')} className="nav-auth-button nav-auth-secondary">
              LOG IN
            </button>
            <button onClick={() => setAuthMessage('Sign up will be available soon.')} className="nav-auth-button nav-auth-primary">
              SIGN UP
            </button>
            <span role="status" aria-live="polite" className="nav-auth-message">
              {authMessage}
            </span>
          </div>
        )}

        <button className="nav-menu-toggle" ref={menuButtonRef} aria-expanded={open} aria-controls="main-menu" onClick={() => setOpen(true)}>
          MENU
        </button>
      </div>
      )
}
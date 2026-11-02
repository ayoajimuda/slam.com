// components/install-prompt.tsx
'use client'
import { useEffect, useState } from 'react';

export default function InstallPrompt() {
  const [deferred, setDeferred] = useState(null)
  const [isIOS, setIsIOS] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    setIsIOS(/iPad|iPhone|iPod/.test(navigator.userAgent))
    setIsInstalled(window.matchMedia('(display-mode: standalone)').matches)

    const onPrompt = (e) => {
      e.preventDefault()                       // stop the browser's mini-infobar
      setDeferred(e)
    }
    const onInstalled = () => {
      setIsInstalled(true)
      setDeferred(null)
    }

    window.addEventListener('beforeinstallprompt', onPrompt)
    window.addEventListener('appinstalled', onInstalled)
    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt)
      window.removeEventListener('appinstalled', onInstalled)
    }
  }, [])

  if (isInstalled) return null

  if (isIOS) {
    return <p>To install, tap the Share button, then "Add to Home Screen".</p>
  }

  if (!deferred) return null

  return (
    <button
      onClick={async () => {
        await deferred.prompt()
        await deferred.userChoice
        setDeferred(null)                      // the event can only be used once
      }}
    >
      Install app
    </button>
  )
}
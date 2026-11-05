'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react';
import { HOME_BACKGROUNDS } from '@/data/photosHandle';
import '../styles/pages-css/home-page.css';
import '../styles/effects-css/glitch.css';

const STORAGE_KEY = 'slam-background'

/** Picks a background different from the last one shown in this tab. Runs only in the browser. */
function pickBackground() {
  let previous = -1

  try {
    previous = Number(sessionStorage.getItem(STORAGE_KEY) ?? -1)
  } catch {
    /* Storage may be unavailable. */
  }

  const offset = 1 + Math.floor(Math.random() * (HOME_BACKGROUNDS.length - 1))

  const next =
    previous >= 0
      ? (previous + offset) % HOME_BACKGROUNDS.length
      : Math.floor(Math.random() * HOME_BACKGROUNDS.length)

  try {
    sessionStorage.setItem(STORAGE_KEY, String(next))
  } catch {
    /* Rotation still works for this load. */
  }
  return next
}

const imgixLoader = ({ src, width, quality }) => `${src}?w=${width}&q=${quality ?? 70}&auto=format,compress&fit=crop`

export default function Home() {
  // Chosen after mount so the server and client render the same markup.
  const [index, setIndex] = useState(null)
  
  useEffect(() => {
    setIndex(pickBackground())
  }, [])

  const background = index === null ? null : HOME_BACKGROUNDS[index]
  
  return (
    <main className="home-hero">
      <title>SLAM.COM</title>
      <meta name="description" content="Learn to skate & explore the community" />
      {background && (<Image loader={imgixLoader} src={background.url} alt="" fill sizes="100vw" loading='eager' className="home-background" />)}
      <div className="home-fade" />
      <div className="home-grain" />
      <div className="home-accent-line" />
      <div className="home-title-wrap">
        <h1 className="home-title">SLAM.COM</h1>
        <span className="home-glitch-effect home-glitch--black" aria-hidden="true">SLAM.COM</span>
        <span className="home-glitch-effect home-glitch--white" aria-hidden="true">SLAM.COM</span>
      </div>
      <p className="home-subtitle">NO FEAR, NO OVERTHINKING, JUST GO SKATING</p>
      <p className="home-side-note">JUST GO SKATING, JUST GO SKATING, JUST GO SKATING, JUST GO SKATING, JUST GO SKATING</p>
    </main>
  );
}
'use client'

import { useId, useState } from 'react'
import { DIFFICULTY, STYLES, TRICKS } from '@/data/trickLibrary'
import PageHeader from '@/components/PageHeader'
import '@/styles/pages-css/tricks-page.css'

function FilterGroup({ name, options, active, onChange }) {
    const labelId = useId()

    return (
        <div role='group' aria-label={name}>
            <p id={labelId} className="label">{name}</p>
            <div className='tricks-chips'>
                {options.map((option) => (
                    <button key={option} type="button" className='chip' aria-pressed={active === option} onClick={() => onChange(option)}>
                        {option}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default function TricksPage() {
    const [difficulty, setDifficulty] = useState('All')
    const [style, setStyle] = useState('All')
    const visible = TRICKS.filter((trick) => (difficulty === 'All' || trick.difficulty === difficulty) && (style === 'All' || trick.style === style))

    return (
        <div className='page-shell'>
            <PageHeader number="004" title="Tricks Library" description="Library of Tricks"/>
            <div className='tricks-filters'>
                <FilterGroup name="Level" options={DIFFICULTY} active={difficulty} onChange={setDifficulty}/>
                <FilterGroup name="Style" options={STYLES} active={style} onChange={setStyle}/>
                <p aria-live="polite" className="label tricks-count">
                    {visible.length} {visible.length === 1 ? 'trick': 'tricks'} TRICKS SHOWN
                </p>
            </div>

            {visible.length === 0 ? (
                <p className="tricks-empty">No tricks match these filters yet.</p>
            ): (
            <div className="tricks-grid">
                {visible.map((trick) => (
                    <article key={trick.name} className={`tricks-card tricks-difficulty-${trick.level.toLowerCase()}`}>
                        <div className="tricks-card-top">
                            <span className="label">
                                {String(TRICKS.indexOf(trick) + 1).padStart(2, '0')} / {trick.level}
                            </span>
                            <span className="label tricks-styles">{trick.style}</span>
                        </div>
                        <h2 className="tricks-name">{trick.name}</h2>
                        <p className="tricks-note">{trick.note}</p>
                    </article>
                ))}
            </div>
            )}
        </div>
    )
}
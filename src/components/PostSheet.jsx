import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import './PostSheet.css'

const SLIDE_MS = 420

function Block({ block }) {
  switch (block.type) {
    case 'h':
      return <h3 className="post-sheet__subhead display">{block.text}</h3>
    case 'list':
      return (
        <ol className="post-sheet__list">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      )
    case 'photo':
      return block.src ? (
        <figure className="post-sheet__photo">
          <img src={block.src} alt={block.caption} loading="lazy" />
          <figcaption className="mono">{block.caption}</figcaption>
        </figure>
      ) : (
        <figure className="post-sheet__photo post-sheet__photo--pending">
          <span className="mono">Photo to come</span>
          <figcaption className="mono">{block.caption}</figcaption>
        </figure>
      )
    case 'link':
      return block.href.startsWith('/') ? (
        <p>
          <Link className="post-sheet__link" to={block.href}>
            {block.text} →
          </Link>
        </p>
      ) : (
        <p>
          <a className="post-sheet__link" href={block.href} target="_blank" rel="noopener noreferrer">
            {block.text} ↗
          </a>
        </p>
      )
    case 'todo':
      return <p className="post-sheet__todo mono">To come — {block.text}</p>
    default:
      return <p>{block.text}</p>
  }
}

/*
 * A blog post that slides up over the folder stack. Clicking the backdrop or the
 * folder tab, pressing Escape, or the Close button slides it back down, then
 * calls onClosed (which returns the URL to /blog).
 */
function PostSheet({ post, onClosed }) {
  const [closing, setClosing] = useState(false)
  const closeRef = useRef(null)

  const close = () => setClosing(true)

  useEffect(() => {
    if (!closing) return
    const timer = setTimeout(onClosed, SLIDE_MS)
    return () => clearTimeout(timer)
  }, [closing, onClosed])

  useEffect(() => {
    const previous = document.activeElement
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus({ preventScroll: true })

    const onKey = (event) => {
      if (event.key === 'Escape') setClosing(true)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = overflow
      window.removeEventListener('keydown', onKey)
      previous?.focus?.({ preventScroll: true })
    }
  }, [])

  // Rendered into <body> so it sits above the header and footer, not inside <main>
  return createPortal(
    <div className={`post-sheet ${closing ? 'is-closing' : ''}`} style={{ '--slide-ms': `${SLIDE_MS}ms` }}>
      <button type="button" className="post-sheet__backdrop" aria-label="Close post" onClick={close} tabIndex={-1} />
      <article className="post-sheet__panel" role="dialog" aria-modal="true" aria-labelledby="post-sheet-title">
        <button type="button" className="post-sheet__tab mono" onClick={close} ref={closeRef}>
          <span>{post.number}</span>
          <span>Close ↓</span>
        </button>
        <div className="post-sheet__scroll">
          <header className="post-sheet__head container">
            <p className="mono post-sheet__meta">
              <span>Field note {post.number}</span>
              <span>{post.date}</span>
            </p>
            <h2 id="post-sheet-title" className="post-sheet__title display">
              {post.title}
            </h2>
            <p className="post-sheet__kicker">{post.kicker}</p>
          </header>
          <div className="post-sheet__body container">
            {post.body.map((block, index) => (
              <Block key={index} block={block} />
            ))}
          </div>
        </div>
      </article>
    </div>,
    document.body,
  )
}

export default PostSheet

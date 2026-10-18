import { Link } from 'react-router-dom'
import './FolderStack.css'

/*
 * Blog posts as a stack of line-drawn folders, oldest at the back.
 * Each tab sits a little further along so every folder can be seen.
 * Hover or focus lifts a folder and reveals its title. On touch screens the
 * titles are always shown.
 */
function FolderStack({ posts }) {
  return (
    <ol className="folder-stack" style={{ '--folders': posts.length }}>
      {posts.map((post, index) => (
        <li key={post.slug} className="folder-stack__item" style={{ '--i': index }}>
          <Link to={`/blog/${post.slug}`} className="folder">
            <span className="folder__tab mono">
              <span>{post.number}</span>
              <span className="folder__date">{post.date}</span>
            </span>
            <span className="folder__body">
              <span className="folder__title">{post.title}</span>
              <span className="folder__kicker">{post.kicker}</span>
              <span className="folder__open mono" aria-hidden="true">
                Open ↑
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ol>
  )
}

export default FolderStack

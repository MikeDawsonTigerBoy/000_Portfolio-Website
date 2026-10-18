import { useCallback } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import FolderStack from '../components/FolderStack.jsx'
import PostSheet from '../components/PostSheet.jsx'
import Reveal from '../components/Reveal.jsx'
import SectionHero from '../components/SectionHero.jsx'
import { findPost, posts } from '../data/posts.js'
import { sections } from '../data/sections.js'
import './Blog.css'

const section = sections.find((item) => item.id === 'blog')

// /blog shows the folder stack; /blog/:slug also opens that post over it.
function Blog() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const post = slug ? findPost(slug) : null
  const backToStack = useCallback(() => navigate('/blog'), [navigate])

  if (slug && !post) return <Navigate to="/blog" replace />

  return (
    <>
      <SectionHero section={section}>
        <p>Field notes from building: what happened, what I learned, and who helped along the way.</p>
      </SectionHero>

      <section className="blog container" aria-labelledby="blog-stack-title">
        <div className="blog__head mono">
          <h2 id="blog-stack-title">Field notes</h2>
          <span>{posts.length} posts</span>
        </div>
        <Reveal>
          <FolderStack posts={posts} />
        </Reveal>
      </section>

      {post && <PostSheet key={post.slug} post={post} onClosed={backToStack} />}
    </>
  )
}

export default Blog

import ListenRow from '../components/ListenRow.jsx'
import Reveal from '../components/Reveal.jsx'
import SectionHero from '../components/SectionHero.jsx'
import { platforms, spotifyArtistId } from '../data/music.js'
import { sections } from '../data/sections.js'
import './Music.css'

const section = sections.find((item) => item.id === 'music')

function Music() {
  return (
    <>
      <SectionHero section={section}>
        <p>
          I release music as <strong>Dawson</strong>. It's electronic and melodic.
        </p>
      </SectionHero>

      <section className="music container" aria-labelledby="music-listen-title">
        <div className="music__head mono">
          <h2 id="music-listen-title">Listen — three channels</h2>
          <span>A—C</span>
        </div>
        <ul className="music__list">
          {platforms.map((platform, index) => (
            <Reveal as="li" key={platform.id} delay={index * 100}>
              <ListenRow platform={platform} />
            </Reveal>
          ))}
        </ul>

        <Reveal className="music__player">
          <div className="music__head mono">
            <h2>Now playing — Spotify</h2>
            <span>Preview</span>
          </div>
          <iframe
            title="Dawson on Spotify"
            src={`https://open.spotify.com/embed/artist/${spotifyArtistId}?utm_source=generator&theme=0`}
            width="100%"
            height="352"
            loading="lazy"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          />
        </Reveal>
      </section>
    </>
  )
}

export default Music

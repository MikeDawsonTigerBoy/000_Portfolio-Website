import Reveal from './Reveal.jsx'
import { tools } from '../data/tools.js'
import './ToolBelt.css'

// A labelled row of black-and-white tool logos (SCRUM-5). Each tile shows the logo, the name
// (so it reads for keyword search too) and a short detail line.
function ToolBelt({ id, title, meta, items, children }) {
  return (
    <Reveal as="section" className="tool-belt container" aria-labelledby={id}>
      <div className="tool-belt__head mono">
        <h2 id={id}>{title}</h2>
        {meta && <span>{meta}</span>}
      </div>
      {children && <p className="tool-belt__intro">{children}</p>}
      <ul className="tool-belt__grid">
        {items.map(({ id: toolId, detail }) => {
          const tool = tools[toolId]
          return (
            <li key={toolId} className="tool-belt__tile">
              {tool.icon ? (
                <svg className="tool-belt__logo" viewBox="0 0 24 24" aria-hidden="true">
                  <path d={tool.icon} />
                </svg>
              ) : (
                <span className="tool-belt__logo tool-belt__logo--text display" aria-hidden="true">
                  {tool.name.slice(0, 2)}
                </span>
              )}
              <span className="tool-belt__name">{tool.name}</span>
              {detail && <span className="tool-belt__detail mono">{detail}</span>}
            </li>
          )
        })}
      </ul>
    </Reveal>
  )
}

export default ToolBelt

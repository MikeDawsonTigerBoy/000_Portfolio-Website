import { useState } from 'react'
import { detectPlatform, launchUrlFor } from '../lib/platform.js'
import './DevicePreview.css'

// Screen sizes in CSS pixels, so the prototype lays out exactly as it would on the phone.
const devices = {
  ios: { label: 'iPhone', model: 'iPhone 15', width: 393, height: 852 },
  android: { label: 'Android', model: 'Pixel 8', width: 412, height: 915 },
}

const platformNames = { ios: 'iPhone', android: 'Android phone' }

/*
 * Shows a prototype running on a phone.
 * Desktop: iPhone / Android frames with a toggle, the web build running inside.
 * Phone:   a button that opens this platform's build (or the web build) full screen.
 */
function DevicePreview({ project }) {
  const [platform] = useState(detectPlatform)
  const [device, setDevice] = useState('ios')

  if (platform !== 'desktop') {
    const launchUrl = launchUrlFor(project, platform)
    return (
      <div className="device-launch">
        <p className="mono device-launch__label">On your {platformNames[platform]}</p>
        {launchUrl ? (
          <a className="device-launch__button display" href={launchUrl} target="_blank" rel="noopener noreferrer">
            Open {project.title} <span aria-hidden="true">↗</span>
          </a>
        ) : (
          <p className="device-launch__pending">The prototype is still being built. Check back soon.</p>
        )}
      </div>
    )
  }

  const spec = devices[device]

  return (
    <div className="device-preview">
      <div className="device-preview__toggle" role="tablist" aria-label="Preview device">
        {Object.entries(devices).map(([id, item]) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={device === id}
            className="device-preview__tab mono"
            onClick={() => setDevice(id)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div
        key={device}
        className={`device-frame device-frame--${device}`}
        style={{ '--screen-w': spec.width, '--screen-h': spec.height }}
      >
        <div className="device-frame__screen">
          <div className="device-frame__viewport">
            {project.demoUrl ? (
              <iframe
                title={`${project.title} on ${spec.label}`}
                src={project.demoUrl}
                width={spec.width}
                height={spec.height}
                loading="lazy"
                allow="camera; microphone; clipboard-write; autoplay"
              />
            ) : (
              <div className="device-frame__pending">
                <span className="mono">PRJ {project.number}</span>
                <span className="display device-frame__pending-title">{project.title}</span>
                <span className="mono">Prototype in progress</span>
              </div>
            )}
          </div>
          <span className="device-frame__camera" aria-hidden="true" />
        </div>
      </div>

      <p className="device-preview__caption mono">
        {spec.model} · {spec.width}×{spec.height}
        {project.demoUrl && (
          <>
            {' · '}
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
              Open full screen ↗
            </a>
          </>
        )}
      </p>
    </div>
  )
}

export default DevicePreview

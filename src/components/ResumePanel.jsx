import { Html } from "@react-three/drei"

export default function ResumePanel({ section, onClose }) {
  return (
    <Html center>
      <div className="glass-panel resume-panel">
        <button className="close-btn" onClick={onClose}>✕</button>
        <h2 className="panel-title">{section.title}</h2>
        <div className="resume-content">
          <p>Click below to download or view my professional resume.</p>
          <a href={section.content.file} download className="download-button">
            Download Resume (PDF)
          </a>
        </div>
      </div>
    </Html>
  )
}
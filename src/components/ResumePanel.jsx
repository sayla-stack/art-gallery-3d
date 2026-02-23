import { Html } from "@react-three/drei"

export default function ResumePanel({section, onClose}){
  return(
    <Html center>
      <div className="resumePanel">
        <button onClick={onClose}>✕</button>
        <h1>{section.title}</h1>
        <a href={section.content.file} download>
          <button className="downloadButton">
            Download Resume
          </button>
        </a>
      </div>
    </Html>   
  )
}
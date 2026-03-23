import { Html } from "@react-three/drei"

export default function AboutPanel({ section, onClose }) {
    return (
        <Html center>
            <div className="glass-panel about-panel">
                <button className="close-btn" onClick={onClose}>✕</button>
                <div className="about-flex">
                    <img src={section.content.photo} alt="profile" className="about-photo" />
                    <div className="about-info">
                        <h2 className="panel-title">{section.title}</h2>
                        <p className="about-description">{section.content.description}</p>
                    </div>
                </div>
            </div>
        </Html>
    )
}
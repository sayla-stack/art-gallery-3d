import { Html } from "@react-three/drei"

export default function TimelinePanel({ section, onClose }) {
    return (
        <Html center>
            <div className="glass-panel timeline-panel">
                <button className="close-btn" onClick={onClose}>✕</button>
                <h2 className="panel-title">{section.title}</h2>
                <div className="timeline-container">
                    {section.content.map((item, index) => (
                        <div key={index} className="timeline-item">
                            <div className="timeline-dot"></div>
                            <div className="timeline-content">
                                <span className="timeline-year">{item.year}</span>
                                <h3 className="timeline-title">{item.title}</h3>
                                <p className="timeline-desc">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Html>
    )
}

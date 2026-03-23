import { Html } from "@react-three/drei"

export default function SocialMediaPanel({ section, onClose }) {
    return (
        <Html center>
            <div className="glass-panel social-panel">
                <button className="close-btn" onClick={onClose}>✕</button>
                <h2 className="panel-title">{section.title}</h2>
                <div className="social-links">
                    {section.content.map((item, index) => (
                        <a
                            key={index}
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-button"
                        >
                            {item.title}
                        </a>
                    ))}
                </div>
            </div>
        </Html>
    )
}

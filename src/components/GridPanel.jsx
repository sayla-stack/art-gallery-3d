import { Html } from "@react-three/drei"

export default function GridPanel({ section, onClose }) {
    return (
        <Html center>
            <div className="glass-panel grid-panel">
                <button className="close-btn" onClick={onClose}>✕</button>
                <h2 className="panel-title">{section.title}</h2>
                <div className="grid-container">
                    {section.content.map((item, index) => (
                        <div key={index} className="grid-item">
                            {item.image && (
                                <div className="grid-image-container">
                                    <img src={item.image} alt={item.title} />
                                </div>
                            )}
                            <div className="grid-content">
                                <h3 className="grid-item-title">{item.title}</h3>
                                {item.description && <p className="grid-item-desc">{item.description}</p>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Html>
    )
}

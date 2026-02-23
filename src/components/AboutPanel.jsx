import { Html } from "@react-three/drei"

export default function AboutPanel({ section }) {
    return (
        <Html center>
            <div className="aboutPanel">
                <img src={section.content.photo} alt="profile" />
                <div>
                    <h1>{section.title}</h1>
                    <p>{section.content.description}</p>
                </div>
            </div>
        </Html>
    )
}
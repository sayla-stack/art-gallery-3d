export default function Lights(){
    return(
        <>
        <ambientLight intensity={0.4}/>
        <directionalLight position={[5, 10, 5]} intensity={1} castShadow/>
        <spotLight 
            position={[0, 4.5, -6]}
            angle={0.4}
            penumbra={0.5}
            intensity={2}
            castShadow
        />
        </>
    )
}
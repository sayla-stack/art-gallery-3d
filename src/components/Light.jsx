export default function Lights(){
    return(
        <>
        <ambientLight intensity={0.6}/>
        <directionalLight 
        position={[5, 10, 5]} 
        intensity={0.8} 
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-heigth={2048}
        />
       
        <directionalLight position={[-5, 8, -5]} intensity={0.4} />
         <spotLight 
            position={[0, 7, 0]}
            angle={0.4}
            penumbra={0.5}
            intensity={1}
            castShadow
        />
        </>
    )
}
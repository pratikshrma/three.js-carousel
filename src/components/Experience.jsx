import Card from './Card'

const Experience = () => {
    const count = 8
    const radius = 2

    const images = [
        "1.png",
        "2.png",
        "3.png",
        "4.png",
        "5.png",
        "6.png",
        "7.png",
        "8.png",
    ]

    return (
        <>
            <group>
                {images.map((each, index) => {
                    const angle = ((index / count) * Math.PI * 2)
                    return <Card url={`/AdiImages/${each}`} key={index} position={[Math.sin(angle) * radius, 0, Math.cos(angle) * radius]} rotation-y={angle + Math.PI} />
                })}
            </group>

        </>
    )
}

export default Experience

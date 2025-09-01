import React from 'react'
import Card from './Card'

const Experience = () => {
    const count = 10
    const radius = 2

    const images = [
        "img1.webp",
        "img2.webp",
        "img3.webp",
        "img4.webp",
        "img5.webp",
        "img6.webp",
        "img7.webp",
        "img8.webp",
        "img9.webp",
        "img10.webp"
    ]

    return (
        <>
            <group>
                {images.map((each, index) => {
                    const angle = ((index / count) * Math.PI * 2)
                    return <Card url={`./${each}`} key={index} position={[Math.sin(angle) * radius, 0, Math.cos(angle) * radius]} rotation-y={angle + Math.PI} />
                })}
            </group>

        </>
    )
}

export default Experience
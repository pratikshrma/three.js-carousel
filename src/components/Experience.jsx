import React from 'react'
import Card from './Card'

const Experience = () => {
    const count = 10
    const radius = 2

    const images = [
        "img1.jpg",
        "img2.jpg",
        "img3.jpg",
        "img4.jpg",
        "img5.jpg",
        "img6.jpg",
        "img7.jpg",
        "img8.jpg",
        "img9.jpg",
        "img10.jpg"
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
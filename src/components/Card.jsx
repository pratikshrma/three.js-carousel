import React, { useState, useRef } from 'react'
import { Image } from '@react-three/drei'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { easing } from 'maath'

const Card = ({ url, ...props }) => {
    const imageRef = useRef()
    const [hovered, setHovered] = useState(false)

    const out = (e) => { e.stopPropagation(); setHovered(false) }
    const over = (e) => { e.stopPropagation(); setHovered(true) }

    useFrame((_state, delta) => {
        easing.damp3(imageRef.current.scale, hovered ? [1, 1, 1] : [1.05, 1.05, 1.05], 0.1, delta)

        easing.damp(imageRef.current.material, 'radius', hovered ? 0.1 : 0.1, 0.2, delta)
        easing.damp(imageRef.current.material, 'zoom', hovered ? 1.3 : 1, 0.2, delta)
    })


    return (
        <Image
            ref={imageRef}
            url={url}
            transparent
            side={THREE.DoubleSide}
            onPointerOver={over}
            onPointerOut={out}
            {...props}
        >
            <bentPlaneGeometry />
        </Image>
    )
}

export default Card

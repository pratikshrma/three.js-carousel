import React, { Children, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import Experience from './components/Experience'
import style from './styles/App.module.css'
import { OrbitControls, Text, Float } from '@react-three/drei'
import Lights from './components/Lights'
import Effects from './components/Effects'
import { Environment } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { ScrollControls, useScroll } from '@react-three/drei'
import { easing } from 'maath'
import './components/Utils'


const Rig = ({ children, ...props }) => {
    const ref = useRef()
    const scroll = useScroll()
    useFrame((state, delta) => {
        ref.current.rotation.y = -scroll.offset * (Math.PI * 2)
        state.events.update()
        // console.log(scroll.offset)

        easing.damp3(
            state.camera.position,
            [-state.pointer.x * 2, state.pointer.y + 1.5, 10],
            0.3,
            delta
        )

        state.camera.lookAt(0, 0, 0)
    })

    return <group ref={ref} {...props}>{children}</group>

}


const App = () => {
    return (
        <div className={style.canvasContainer}>
            <Canvas camera={{ position: [0, 0, 100], fov: 15 }} dpr={[1, 2]}>
                <color args={["#161215"]} attach="background" />
                {/* <Environment preset='dawn' background blur={0.5} /> */}
                {/* <OrbitControls makeDefault /> */}
                <Lights />
                <Effects />
                <ScrollControls pages={4} infinite>
                    <Rig rotation={[0, 0, 0.15]}>
                        <Experience />
                    </Rig>
                </ScrollControls>
            </Canvas>
        </div>
    )
}

export default App
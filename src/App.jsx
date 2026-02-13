import { useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import Experience from './components/Experience'
import style from './styles/App.module.css'
import { useFrame } from '@react-three/fiber'
import { easing } from 'maath'
import './components/Utils'
import { useDrag } from '@use-gesture/react'

const Rig = ({ children, ...props }) => {
  const groupRef = useRef()
  const dragOffset = useRef(0.0)
  const velocity = useRef(0.0)
  const isDragging = useRef(false)

  const gesture = useDrag(({ active, movement: [x] }) => {
    if (active) {
      isDragging.current = true
      const speed = x * 0.000005
      dragOffset.current += speed
      velocity.current = speed
    } else {
      isDragging.current = false
    }
  })

  useFrame((state, delta) => {
    console.log(dragOffset.current)

    if (!isDragging.current) {
      velocity.current *= 0.95
      dragOffset.current += velocity.current

      state.events.update()

      easing.damp3(
        state.camera.position,
        [-state.pointer.x * 2, state.pointer.y + 1.5, 10],
        0.3,
        delta
      )
      state.camera.lookAt(0, 0, 0)
    }
    groupRef.current.rotation.y = dragOffset.current * (Math.PI * 2)

  })

  return <group ref={groupRef} {...props} {...gesture()}>{children}</group>
}


const App = () => {
  return (
    <div className={style.canvasContainer}>
      <Canvas camera={{ position: [0, 0, 100], fov: 15 }} dpr={[1, 2]}>
        <color args={["#f7f6f2"]} attach="background" />
        <Rig rotation={[0, 0, 0.15]}>
          <Experience />
        </Rig>
      </Canvas>
    </div>
  )
}

export default App

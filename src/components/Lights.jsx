import React from 'react'

const Lights = () => {
    return (
        <>
            <ambientLight />
            <pointLight position={[2, 2, 2]} color={'#ffff00'} intensity={10} />
        </>
    )
}

export default Lights
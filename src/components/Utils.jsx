import React from 'react'
import * as THREE from 'three'
import { extend } from '@react-three/fiber'

class BentPlaneGeometry extends THREE.PlaneGeometry {
    constructor(radius = 0.1, width = 1, height = 1, wSeg = 20, hSeg = 20) {
        super(width, height, wSeg, hSeg)
        const { width: W } = this.parameters
        const hw = W * 0.5 //half width
        const a = new THREE.Vector2(-hw, 0)
        const b = new THREE.Vector2(0, radius)
        const c = new THREE.Vector2(hw, 0)

        const ab = new THREE.Vector2().subVectors(a, b) //subtract vector to get the length of the line
        const bc = new THREE.Vector2().subVectors(b, c)
        const ac = new THREE.Vector2().subVectors(c, a)

        const r = (ab.length() * bc.length() * ac.length()) / (2 * Math.abs(ab.cross(ac))) //This is the radius of the circumcircle
        const center = new THREE.Vector2(0, radius - r)
        const baseV = new THREE.Vector2().subVectors(a, center)
        const baseAngle = baseV.angle() - Math.PI * 0.5
        const arc = baseAngle * 2

        const uv = this.attributes.uv
        const pos = this.attributes.position
        const tmp = new THREE.Vector2()

        for (let i = 0; i < uv.count; i++) {
            const u = uv.getX(i)
            const y = pos.getY(i)
            const t = 1 - u
            tmp.copy(c).rotateAround(center, arc * t)
            pos.setXYZ(i, tmp.x, y, -tmp.y)
        }
        pos.needsUpdate = true
    }
}


class MeshSineMaterial extends THREE.MeshBasicMaterial {
    constructor(params = {}) {
        super(params)
        this.time = { value: 0 }
    }

    oneBeforeCompile(shader) {
        shader.uniforms.time = this.time.time
        shader.vertexShader = `
            uniform float  time;
            ${shader.vertexShader}
        `

        shader.vertexShader = shader.vertexShader.replace(
            '#include <begin_vertex>',
            `vec3 transformed = vec3(position.x,position.y+sin(time+uv.x*3.14159*4.0)/4.0,position.z)`
        )
    }
}

extend({ MeshSineMaterial, BentPlaneGeometry })
"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

interface LogoProps {
  size?: number
  autoRotate?: boolean
}

export function GKVLogo3D({ size = 400, autoRotate = true }: LogoProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })

    renderer.setSize(size, size)
    renderer.setClearColor(0x000000, 0)
    containerRef.current.appendChild(renderer.domElement)

    camera.position.z = 2.5

    // Create GKV letters using box geometry
    const createLetter = (x: number, letterGeometry: THREE.BufferGeometry) => {
      const material = new THREE.MeshPhongMaterial({
        color: 0x00d9ff,
        emissive: 0x00d9ff,
        emissiveIntensity: 0.5,
        shininess: 100,
      })
      const mesh = new THREE.Mesh(letterGeometry, material)
      mesh.position.x = x
      scene.add(mesh)
      return mesh
    }

    // Create G
    const gGeo = new THREE.BoxGeometry(0.3, 0.6, 0.2)
    const g = createLetter(-0.5, gGeo)

    // Create K
    const kGeo = new THREE.BoxGeometry(0.25, 0.6, 0.2)
    const k = createLetter(0, kGeo)

    // Create V
    const vGeo = new THREE.BoxGeometry(0.3, 0.6, 0.2)
    const v = createLetter(0.5, vGeo)

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0x00d9ff, 1)
    directionalLight.position.set(5, 5, 5)
    scene.add(directionalLight)

    // Add point light for glow
    const pointLight = new THREE.PointLight(0x00d9ff, 1)
    pointLight.position.set(0, 0, 2)
    scene.add(pointLight)

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)

      if (autoRotate) {
        g.rotation.x += 0.005
        g.rotation.y += 0.008
        k.rotation.x += 0.005
        k.rotation.y += 0.008
        v.rotation.x += 0.005
        v.rotation.y += 0.008
      }

      renderer.render(scene, camera)
    }

    animate()

    // Cleanup
    return () => {
      containerRef.current?.removeChild(renderer.domElement)
      gGeo.dispose()
      kGeo.dispose()
      vGeo.dispose()
      renderer.dispose()
    }
  }, [size, autoRotate])

  return (
    <div
      ref={containerRef}
      className="animate-fade-in"
      style={{
        width: size,
        height: size,
      }}
    />
  )
}

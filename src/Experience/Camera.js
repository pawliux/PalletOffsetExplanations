import Experience from "./Experience"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as THREE from 'three'

export default class Camera
{
  constructor()
  {
    this.experience = new Experience()
    this.sizes = this.experience.sizes
    this.scene = this.experience.scene
    this.canvas = this.experience.canvas
    
    this.setInstance()
    this.setOrbitControls()
  }

  setInstance()
  {
    this.instance = new THREE.PerspectiveCamera(
      35,
      this.sizes.width / this.sizes.height,
      0.1,
      1000
    )

    this.instance.position.set(-8, 6, 10)
    this.scene.add(this.instance)
  }

  setOrbitControls()
  {
    this.controls = new OrbitControls(this.instance, this.canvas)
    this.controls.enablePan = true
    this.controls.enableRotate = true
    this.controls.maxPolarAngle = Math.PI
    this.controls.enableDamping = true
    this.controls.maxDistance = 30
    this.controls.minDistance = 1
    this.controls.maxTargetRadius = 10
    this.controls.target.set(5, 0, 0)
  }

  resize()
  {
    this.instance.aspect = this.sizes.width / this.sizes.height
    this.instance.updateProjectionMatrix()
  }

  update()
  {
    this.controls.update()
  }
}
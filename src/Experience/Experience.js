import Sizes from "./Utils/Sizes.js"
import Time from "./Utils/Time.js"
import * as THREE from 'three'
import Camera from "./Camera.js"
import AxisHelp from "./Utils/AxisHelper.js"
import Renderer from "./Renderer.js"
import World from "./World/world.js"
import Resources from "./Utils/Resources.js"
// import sources from "./source-export.js"
import sources from "./sources.js"
import Debug from "./Utils/Debug.js"


let instance = null

export default class Experience
{
  constructor(canvas)
  {

    //Singleton
    if(instance)
    {
      return instance
    }

    instance = this

    //Global access
    window.experience = this

    //Options
    this.canvas = canvas

    //Setup
    this.debug = new Debug()
    this.sizes = new Sizes()
    this.time = new Time()
    this.scene = new THREE.Scene()
    this.resources = new Resources(sources)
    this.camera = new Camera()
    this.renderer = new Renderer()
    this.world = new World()

    //sizes resize event
    this.sizes.on('resize', () => 
    {
      this.resize()
    })

    //time tick event
    this.time.on('tick', () =>
    {
      this.update()
    })

  }

  resize()
  {
    this.camera.resize()
    this.renderer.resize()
  }

  update()
  {
    this.camera.update()
    this.world.update()
    this.renderer.update()
  }

  destroy()
  {
    this.sizes.off('resize')
    this.time.off('tick')

    //traverse the whole scene

    this.scene.traverse((child) => 
    {
      
      if(child instanceof THREE.Mesh)
      {
        console.log(child)
        child.geometry.dispose()
        for (const key in child.material)
        {
          const value = child.material[key]
          console.log(value)
          if (value && typeof value.dispose === 'function')
          {
            value.dispose()
          }
        }

      }
    })
    // dispose of OrbitControls
    this.camera.controls.dispose()

    // dispose renderer
    this.renderer.instance.dispose()

    // debug
    if (this.debug.active)
    {
      this.debug.ui.destroy()
    }
  }
}
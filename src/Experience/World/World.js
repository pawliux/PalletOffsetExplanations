import Experience from "../Experience";
import Environment from "./Environment";
import Floor from "./Floor";
import Pallet from "./Pallet";
import AxisHelp from "../Utils/AxisHelper";
import * as THREE from 'three'
import SkyBackground from "./SkyBackground";

export default class World
{
  constructor ()
  {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources

    
    this.resources.on('ready', () =>
    {
      // load only when all resources are ready
      console.log('on ready loading in world')
      // Setup
      // this.floor = new Floor()
      this.AxisHelp = new AxisHelp()
      
      this.pallet = new Pallet()
      
      this.environment = new Environment() // add after everything to apply on meshes in scene 
      this.skyBackground = new SkyBackground()
      
      // const helperObjectGeo = new THREE.BoxGeometry(8.8, 1, 1)
      // this.mesh = new THREE.Mesh(helperObjectGeo, new THREE.MeshBasicMaterial({color: 'white'}))
      // this.mesh.position.x = 8.8/2
      // // this.mesh.position.z = -8.8 / 2 - .75
      // this.scene.add(this.mesh)

      

    })

    
  }

  update()
  {
    // Fox animation
    // if (this.fox)
    // {
    //   this.fox.update()
    // }

  }
}
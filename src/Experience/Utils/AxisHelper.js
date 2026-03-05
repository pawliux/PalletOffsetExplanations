import Experience from "../Experience";
import * as THREE from 'three'

export default class AxisHelp
{
  constructor()
  {
    this.experience = new Experience()
    this.scene = this.experience.scene

    this.instance = new THREE.AxesHelper(11.2)
    this.scene.add(this.instance)
  }
}
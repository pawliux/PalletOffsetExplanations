import Experience from "../Experience";
import * as THREE from 'three'

export default class SkyBackground
{
  constructor()
  {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.SKY_COLOR = 0x2B2B3B
    this.GROUND_COLOR = 0x5B5B4B
    this.SKY_SIZE = 100
    
    this.createSky()
  }

  createSky()
  {
    const vertexShader = `
    varying vec3 vWorldPosition;
    void main() {
        vec4 worldPosition = modelMatrix * vec4(position, 1.0);
        vWorldPosition = worldPosition.xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }`
    const fragmentShader = `
    uniform vec3 topColor;
    uniform vec3 bottomColor;
    varying vec3 vWorldPosition;
    void main() {
        // Normalize the world position vector to get a direction vector
        // The 'z' component represents height in a typical Three.js setup
        float h = normalize(vWorldPosition).y;
        
        // Use the height (z) to mix the colors.
        // Clamp 'h' to the range [0, 1] for a clean gradient
        // The mix function interpolates between bottomColor and topColor based on 'h'
        gl_FragColor = vec4(mix(bottomColor, topColor, 0.3 + (h+0.5 /  2.0)), 1.0);
        //gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); // Should be pure red
    }`
      const uniforms = {
        topColor: { value: new THREE.Color(this.SKY_COLOR) },
        bottomColor: { value: new THREE.Color(this.GROUND_COLOR) }
      }
      const skyGeo = new THREE.SphereGeometry(this.SKY_SIZE, 32, 15)
      const skyMat = new THREE.ShaderMaterial({
        uniforms,
        vertexShader,
        fragmentShader,
        side: THREE.BackSide
      })
      const sky = new THREE.Mesh(skyGeo, skyMat)
      this.scene.add(sky)
      sky.position.set(0, 0, 0); 
  }
}
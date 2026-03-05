import Experience from "../Experience";
import * as THREE from 'three'

export default class Environment
{
  constructor()
  {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources
    this.debug = this.experience.debug

    //Debug
    if (this.debug.active)
    {
      this.debugFolder = this.debug.ui.addFolder('Environment')
      this.debugFolder.close()
    }

    // this.setSunLight()
    this.setPointLight()
    this.setPointLight2()
    this.setPointLight3()
    this.setAmbientLight()
    // this.setEnvironmentMap()
  }

  setAmbientLight()
  {
    this.ambientLight = new THREE.AmbientLight('#ffffff', 0.21)
    this.scene.add(this.ambientLight)

    //Debug
    if (this.debug.active)
    {
      this.debugFolder.add(
        this.ambientLight, 'intensity')
        .name('ambientLightIntensity')
        .min(0)
        .max(2)
        .step(0.001)
    }
  }

  setSunLight()
  {
    this.sunLight = new THREE.DirectionalLight('#ffffff', 2)
    this.sunLight.castShadow = true
    this.sunLight.shadow.camera.far = 15
    this.sunLight.shadow.mapSize.set(1024, 1024)
    this.sunLight.shadow.normalBias = 0.05
    this.sunLight.position.set(3.5, 2, - 1.25)
    this.scene.add(this.sunLight)

    //Debug
    if (this.debug.active)
    {
      this.debugFolder.add(
        this.sunLight, 'intensity'
      ).name('sunLightIntensity')
      .min(0)
      .max(4)
      .step(0.001)
      
      this.debugFolder.add(
        this.sunLight.position, 'x'
      ).name('sunLightX')
      .min(-5)
      .max(5)
      .step(0.001)

      this.debugFolder.add(
        this.sunLight.position, 'y'
      ).name('sunLightY')
      .min(-5)
      .max(5)
      .step(0.001)

      this.debugFolder.add(
        this.sunLight.position, 'z'
      ).name('sunLightZ')
      .min(-5)
      .max(5)
      .step(0.001)
      
    }

  }

  setPointLight()
  {
    this.pointLight = new THREE.PointLight('#ffffff', 80)
    this.pointLight.castShadow = true
    this.pointLight.shadow.camera.far = 15
    this.pointLight.shadow.mapSize.set(1024, 1024)
    this.pointLight.shadow.normalBias = 0.05
    this.pointLight.position.set(10, 10, 8.5)
    this.scene.add(this.pointLight)

    //Debug
    if (this.debug.active)
    {
      this.debugFolder.add(
        this.pointLight, 'intensity'
      ).name('PointLightIntensity')
      .min(0)
      .max(100)
      .step(0.001)
      
      this.debugFolder.add(
        this.pointLight.position, 'x'
      ).name('pointLightX')
      .min(-10)
      .max(10)
      .step(0.001)

      this.debugFolder.add(
        this.pointLight.position, 'y'
      ).name('pointLightY')
      .min(-10)
      .max(10)
      .step(0.001)

      this.debugFolder.add(
        this.pointLight.position, 'z'
      ).name('pointLightZ')
      .min(-10)
      .max(10)
      .step(0.001)
      
    }

  }
  setPointLight2()
  {
    this.pointLight2 = new THREE.PointLight('#ffffff', 80)
    this.pointLight2.castShadow = true
    this.pointLight2.shadow.camera.far = 15
    this.pointLight2.shadow.mapSize.set(1024, 1024)
    this.pointLight2.shadow.normalBias = 0.05
    this.pointLight2.position.set(-10, 10, -10)
    this.scene.add(this.pointLight2)

    //Debug
    if (this.debug.active)
    {
      this.debugFolder.add(
        this.pointLight2, 'intensity'
      ).name('PointLight2Intensity')
      .min(0)
      .max(100)
      .step(0.001)
      
      this.debugFolder.add(
        this.pointLight2.position, 'x'
      ).name('pointLight2X')
      .min(-10)
      .max(10)
      .step(0.001)

      this.debugFolder.add(
        this.pointLight2.position, 'y'
      ).name('pointLight2Y')
      .min(-10)
      .max(10)
      .step(0.001)

      this.debugFolder.add(
        this.pointLight2.position, 'z'
      ).name('pointLight2Z')
      .min(-10)
      .max(10)
      .step(0.001)
      
    }

  }

  setPointLight3()
  {
    this.pointLight3 = new THREE.PointLight('#ffffff', 80)
    this.pointLight3.castShadow = true
    this.pointLight3.shadow.camera.far = 15
    this.pointLight3.shadow.mapSize.set(1024, 1024)
    this.pointLight3.shadow.normalBias = 0.05
    this.pointLight3.position.set(0, -10, 0)
    this.scene.add(this.pointLight3)

    //Debug
    if (this.debug.active)
    {
      this.debugFolder.add(
        this.pointLight3, 'intensity'
      ).name('PointLight3Intensity')
      .min(0)
      .max(100)
      .step(0.001)
      
      this.debugFolder.add(
        this.pointLight3.position, 'x'
      ).name('pointLight3X')
      .min(-10)
      .max(10)
      .step(0.001)

      this.debugFolder.add(
        this.pointLight3.position, 'y'
      ).name('pointLight3Y')
      .min(-10)
      .max(10)
      .step(0.001)

      this.debugFolder.add(
        this.pointLight3.position, 'z'
      ).name('pointLight3Z')
      .min(-10)
      .max(10)
      .step(0.001)
      
    }

  }

  setEnvironmentMap()
  {
    // this.environmentMap = {}
    // this.environmentMap.intensity = 0.4
    // this.environmentMap.texture = this.resources.items.environmentMapTexture
    // this.environmentMap.texture.colorSpace = THREE.SRGBColorSpace

    // this.scene.environment = this.environmentMap.texture

    // this.environmentMap.updateMaterial = () =>
    // {
    //   this.scene.traverse((child) => 
    //   {
    //     if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial)
    //     {
    //       child.material.envMap = this.environmentMap.texture
    //       child.material.envMapIntensity = this.environmentMap.intensity
    //       child.material.needsUpdate = true
    //     }
    //   })
    // }

    // this.environmentMap.updateMaterial()

    //Debug
    // if (this.debug.active)
    // {
    //   this.debugFolder.add(
    //     this.environmentMap, 'intensity'
    //   ).name('envMapIntensity')
    //   .min(0)
    //   .max(4)
    //   .step(0.001)
    //   .onChange(this.environmentMap.updateMaterial)
    // }

  }
}
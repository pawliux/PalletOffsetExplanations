
import Experience from "../Experience";
import * as THREE from 'three'

export default class Pallet
{
  constructor()
  {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources
    this.debug = this.experience.debug
  
    //Debug
    if(this.debug.active)
    {
      this.debugFolder = this.debug.ui.addFolder('Pallet')
      this.debugOptions = 
      {
        toggleMaterials: true
      }

      
      //changing material
      this.toggleMaterials = () => 
      {
        //TODO
        this.scene.traverse((child) => {
          if (child.name === "board")
          {
            for (let i = 0; i < child.material.length; i++) {
              if(this.debugOptions.toggleMaterials)
              {
                child.material[i].map = child.material[i].mapBackup
              } else 
              {
                child.material[i].mapBackup = child.material[i].map
                child.material[i].map = null
              }
      
              child.material[i].needsUpdate = true
            }
          }
        })
      }

      // this.debugFolder.add(this.debugOptions, 'toggleMaterials').onChange(this.toggleMaterials)

      // Switching between 2 Ways and 4 ways

      this.FourWaysSubfolder = null
      this.FourWaysTopFolder = null
      this.FourWaysSamlingFolder = null
      this.TwoWaysSubfolder = null
      this.TwoWaysTopFolder = null
      this.TwoWaysBottomFolder = null

      //-------- function to add 4 ways subfolder ----------
      this.addFourWaysSubfolder = () => {
        if (this.TwoWaysSubfolder) {
          this.TwoWaysSubfolder.destroy()
          this.TwoWaysSubfolder = null
        }
        this.FourWaysSubfolder = this.debugFolder.addFolder('4 WAYS OFFSETS')

        // default 4 ways view
        this.FourWaysDebugOptions = {
          view: 'Top'
        }

        // function to add 4 ways top offsets
        this.addFourWaysTopOffsets = () => {
          //destroy samling offsets
          if (this.FourWaysSamlingFolder) {
            this.FourWaysSamlingFolder.destroy()
            this.FourWaysSamlingFolder = null
          }

          //return to default positions
          this.FWTopBoardsGroup.position.x = this.FWTopBoardsGroupDefaultPosition
          this.FWStringerGroup.position.x = this.FWStringerGroupFefaultPosition
          this.FWTopLastBoard.position.x = this.FWTopLastBoardDefaultPosition
          this.FWLegsGroup.position.z = this.FWLegsGroupDefaultPosition
          this.FWLegLast.position.x = this.FWLegLastDefaultPosition

          // hide leg group
          this.FWLegsGroup.visible = false

          // create top offsets folder
          this.FourWaysTopFolder = this.FourWaysSubfolder.addFolder('TOP OFFSETS')

          // add offset controls to top offset folder

          this.topOffsetsDebugOptions = {
            topGroupOffset: 0,
            stringerGroupOffset: 0,
            topLastBoardOffset: 0
          }
          
          this.FourWaysTopFolder.add(this.topOffsetsDebugOptions, 'topGroupOffset').name('Dæk offset').min(-30).max(30).step(1).onChange((value) => {
            this.FWTopBoardsGroup.position.x = this.FWTopBoardsGroupDefaultPosition + value/100
          })

          this.FourWaysTopFolder.add(this.topOffsetsDebugOptions, 'stringerGroupOffset').name('Revle offset').min(-30).max(30).step(1).onChange((value) => {
            this.FWStringerGroup.position.x = this.FWStringerGroupFefaultPosition + value/100
          })

          this.FourWaysTopFolder.add(this.topOffsetsDebugOptions, 'topLastBoardOffset').name('1. dæk offset').min(-30).max(30).step(1).onChange((value) => {
            this.FWTopLastBoard.position.x = this.FWTopLastBoardDefaultPosition + value/100
          })

        }

        //function to add 4 ways samling offsets
        this.addFourWaysSamlingOffsets = () => {
          //destroy top offsets
          if (this.FourWaysTopFolder) {
            this.FourWaysTopFolder.destroy()
            this.FourWaysTopFolder = null
          }

          //return to default positions
          this.FWTopBoardsGroup.position.x = this.FWTopBoardsGroupDefaultPosition
          this.FWStringerGroup.position.x = this.FWStringerGroupFefaultPosition
          this.FWTopLastBoard.position.x = this.FWTopLastBoardDefaultPosition
          this.FWLegsGroup.position.z = this.FWLegsGroupDefaultPosition
          this.FWLegLast.position.x = this.FWLegLastDefaultPosition

          // show leg group
          this.FWLegsGroup.visible = true

          // create samling offsets folder
          this.FourWaysSamlingFolder = this.FourWaysSubfolder.addFolder('SAMLING OFFSETS')

          // add offsets to samling folder

          this.samlingOffsetsDebugOptions = {
            topGroupOffset: 0,
            legGroupOffset: 0,
            legLastOffset: 0
          }

          this.FourWaysSamlingFolder.add(this.samlingOffsetsDebugOptions, 'topGroupOffset').name('Palle top offset').min(-30).max(30).step(1).onChange((value) => {
            this.FWTopBoardsGroup.position.x = this.FWTopBoardsGroupDefaultPosition + value/100
            this.FWStringerGroup.position.x = this.FWStringerGroupFefaultPosition + value/100
          })

          this.FourWaysSamlingFolder.add(this.samlingOffsetsDebugOptions, 'legLastOffset').name('1. skammel offset').min(-30).max(30).step(1).onChange((value) => {
            this.FWLegLast.position.x = this.FWLegLastDefaultPosition + value/100
          })

          this.FourWaysSamlingFolder.add(this.samlingOffsetsDebugOptions, 'legGroupOffset').name('Skammel indskub offset').min(-30).max(30).step(1).onChange((value) => {
            this.FWLegsGroup.position.z = this.FWLegsGroupDefaultPosition - value/100
          })
        }

        // top / samling choice button
        this.FourWaysSubfolder.add(this.FourWaysDebugOptions, 'view', ['Top', 'Samling']).name('Machine').onChange((choice) => {
          if(choice === 'Top') {
            this.addFourWaysTopOffsets()
          } else if (choice === 'Samling') {
            this.addFourWaysSamlingOffsets()
          }
        })

        // default top view offsets
        this.addFourWaysTopOffsets()
      }

      //--------- function to add 2 ways subfolder ----------
      this.addTwoWaysSubfolder = () => {
        if (this.FourWaysSubfolder) {
          this.FourWaysSubfolder.destroy()
          this.FourWaysSubfolder = null
        }
        this.TwoWaysSubfolder = this.debugFolder.addFolder('2 WAYS OFFSETS')

        

        //function to add top machine offsets
        this.addTwoWaysTopOffsets = () => {
          this.TwoWaysTopFolder = this.TwoWaysSubfolder.addFolder('TOP OFFSETS')

          //hide bottom boards, show top
          this.TWBottomGroup.visible = false
          this.TWTopGroup.visible = true

          if (this.TwoWaysBottomFolder) {
            this.TwoWaysBottomFolder.destroy()
            this.TwoWaysBottomFolder = null
          }
          
          this.TwoWaysDebugOffsets = {
            BoardOffset : 0,
            StringerOffset: 0,
            TopLastBoardOffset: 0
          }

          // 2 ways top machine top boards offset

          this.TwoWaysTopFolder.add(this.TwoWaysDebugOffsets, 'BoardOffset').name('Bredder sømning position').min(-30).max(30).step(1).onChange((value) => {
            this.TWTopGroup.position.x = this.TWTopGroupDefaultPosition + value/100
          })

          // 2 ways top machine stringer boards offset

          this.TwoWaysTopFolder.add(this.TwoWaysDebugOffsets, 'StringerOffset').name('Bagkant position').min(-30).max(30).step(1).onChange((value) => {
            this.TWStringerGroup.position.x = this.TWStringerGroupDefaultPosition + value/100
          })

          // 2 ways top machine top last board offset

          this.TwoWaysTopFolder.add(this.TwoWaysDebugOffsets, 'TopLastBoardOffset').name('Korrektion').min(-30).max(30).step(1).onChange((value) => {
            this.TWTopLastBoard.position.x = this.TWTopBoardDefaultPosition + value/100
          })

        }

        //function to add bottom machine offsets
        this.addTwoWaysBottomOffsets = () => {
          this.TwoWaysBottomFolder = this.TwoWaysSubfolder.addFolder('BOTTOM OFFSETS')
          if (this.TwoWaysTopFolder) {
            this.TwoWaysTopFolder.destroy()
            this.TwoWaysTopFolder = null
          }
          // show bottom boards
          this.TWBottomGroup.visible = true
          this.TWTopGroup.visible = true

          this.TwoWaysDebugOffsets = {
            StringerOffset: 0,
            LastBoardOffset: 0
          }

          // 2 ways bottom machine stringer boards offset

          this.TwoWaysBottomFolder.add(this.TwoWaysDebugOffsets, 'StringerOffset').name('Bagkant position').min(-30).max(30).step(1).onChange((value) => {
            this.TWStringerGroup.position.x = this.TWStringerGroupDefaultPosition + value/100
            this.TWTopGroup.position.x = this.TWTopGroupDefaultPosition + value/100
          })

          // 2 ways bottom machine bottom last board offset

          this.TwoWaysBottomFolder.add(this.TwoWaysDebugOffsets, 'LastBoardOffset').name('Korrektion').min(-30).max(30).step(1).onChange((value) => {
            this.TWBottomLastBoard.position.x = this.TWBottomBoardDefaultPosition + value/100
          })
          
        }
        
        //default 2 ways view
        this.TwoWaysTopDebugOptions = {
          view: 'Top'
        }
        //default offsets
        this.addTwoWaysTopOffsets()

        this.TwoWaysSubfolder.add(this.TwoWaysTopDebugOptions, 'view', ['Top', 'Bottom']).name('Machine').onChange((choice) => {
          if (choice === 'Top') {

            //reset changes
            this.TWTopGroup.position.x = this.TWTopGroupDefaultPosition
            this.TWStringerGroup.position.x = this.TWStringerGroupDefaultPosition
            this.TWTopLastBoard.position.x = this.TWTopBoardDefaultPosition
            this.TWBottomLastBoard.position.x = this.TWBottomBoardDefaultPosition

            //Rotation of pallet
            let group = new THREE.Group()
            group.add(this.instance)
            this.scene.add(group)
            group.rotation.x = -Math.PI
            group.updateMatrixWorld(true)
            this.scene.attach(this.instance)
            group.remove(this.instance)
            this.scene.remove(group)

            // set up offsets
            this.addTwoWaysTopOffsets()

          } else if (choice === 'Bottom') {

            //reset changes
            this.TWTopGroup.position.x = this.TWTopGroupDefaultPosition
            this.TWStringerGroup.position.x = this.TWStringerGroupDefaultPosition
            this.TWTopLastBoard.position.x = this.TWTopBoardDefaultPosition
            this.TWBottomLastBoard.position.x = this.TWBottomBoardDefaultPosition

            //Rotation of pallet
            let group = new THREE.Group()
            group.add(this.instance)
            this.scene.add(group)
            group.rotation.x = Math.PI
            group.updateMatrixWorld(true)
            this.scene.attach(this.instance)
            group.remove(this.instance)
            this.scene.remove(group)
            
            //set up offsets
            this.addTwoWaysBottomOffsets()
          }
        })

      }

      this.debugOptions = {
        type: '2 ways'
      }

      this.debugFolder.add(this.debugOptions, 'type', ['2 ways', '4 ways']).name('Type').onChange((choice) => {
        this.clearScene()
        // IF 2 WAYS CHOSEN
        if (choice === '2 ways') {
          this.palletData = this.resources.items.palletData2Ways
          this.calculatePalletData()
          this.setModel()


          
          // default two ways groups positions
          this.TWTopGroupDefaultPosition = this.TWTopGroup.position.x;
          this.TWStringerGroupDefaultPosition = this.TWStringerGroup.position.x;
          this.TWTopBoardDefaultPosition = this.TWTopLastBoard.position.x
          this.TWBottomBoardDefaultPosition = this.TWBottomLastBoard.position.x

          this.addTwoWaysSubfolder()

        } 
        // IF 4 WAYS CHOSEN
        else if (choice === '4 ways') {
          this.palletData = this.resources.items.palletData4Ways
          this.calculatePalletData()
          this.setModel()


          
          // default four ways groups positions
          
          this.FWTopBoardsGroupDefaultPosition = this.FWTopBoardsGroup.position.x
          this.FWStringerGroupFefaultPosition = this.FWStringerGroup.position.x
          this.FWLegsGroupDefaultPosition = this.FWLegsGroup.position.z
          this.FWTopLastBoardDefaultPosition = this.FWTopLastBoard.position.x
          this.FWLegLastDefaultPosition = this.FWLegLast.position.x

          this.addFourWaysSubfolder()
        }




      })
    }

    this.TWTopGroup = null
    this.TWStringerGroup = null
    this.TWBottomGroup = null
    this.TWTopLastBoard = null
    this.TWBottomLastBoard = null
    
    this.FWTopBoardsGroup = null
    this.FWTopLastBoard = null
    this.FWStringerGroup = null
    this.FWLegsGroup = null
    this.FWLegLast = null
    

    this.palletData = this.resources.items.palletData2Ways
    this.calculatePalletData()
    this.setModel()

    // default two ways groups positions
    this.TWTopGroupDefaultPosition = this.TWTopGroup.position.x;
    this.TWStringerGroupDefaultPosition = this.TWStringerGroup.position.x;
    this.TWTopBoardDefaultPosition = this.TWTopLastBoard.position.x
    this.TWBottomBoardDefaultPosition = this.TWBottomLastBoard.position.x
    

    this.addTwoWaysSubfolder()
    
  }

  clearScene()
  {
    this.scene.remove(this.instance)
  }

  setModel()
  {
    
    console.log(this.palletData)
    if (this.palletData.type == 'FourWays') {
      this.instance = this.create4WaysPallet()
    } else if (this.palletData.type == 'TwoWays') {
      this.instance = this.create2WaysPallet()
    }
    this.scene.add(this.instance)
  }

  calculatePalletData()
  {
    if (this.palletData.type == "FourWays")
    {
      //if double striger then divide stringers into 2 layers
      this.palletData.stringer.count = this.palletData.doubleStringer ? this.palletData.stringer.count / 2 : this.palletData.stringer.count
      //calculate gaps
      this.palletData.blocksPerLeg = (this.palletData.block.count / this.palletData.bottom.count)
      this.palletData.top.gap = (this.palletData.stringer.length - (this.palletData.top.width * this.palletData.top.count)) / (this.palletData.top.count - 1) + this.palletData.top.width
      this.palletData.bottom.gap = (this.palletData.stringer.length - (this.palletData.bottom.width * this.palletData.bottom.count)) / (this.palletData.bottom.count - 1) + this.palletData.bottom.width
      this.palletData.stringer.gap = ((this.palletData.top.length - this.palletData.wingTop * 2) - (this.palletData.stringer.width * this.palletData.stringer.count)) / (this.palletData.stringer.count - 1) + this.palletData.stringer.width
      this.palletData.block.gap = ((this.palletData.bottom.length - this.palletData.wingBottom * 2) - (this.palletData.block.width * this.palletData.blocksPerLeg)) / (this.palletData.blocksPerLeg - 1) + this.palletData.block.width

      //calculate heights
      this.palletData.bottom.base = 0
      this.palletData.block.base = this.palletData.doubleStringer ? this.palletData.bottom.base + this.palletData.bottom.height * 2 : this.palletData.bottom.base + this.palletData.bottom.height
      this.palletData.stringer.base = this.palletData.block.base + this.palletData.block.height
      this.palletData.stringer.base2 = this.palletData.doubleStringer ? this.palletData.bottom.height : 0
      this.palletData.top.base = this.palletData.stringer.base + this.palletData.stringer.height

    }
    else if (this.palletData.type == "TwoWays")
    {
      //calculate gaps
      this.palletData.top.gap = (this.palletData.stringer.length - (this.palletData.top.width * this.palletData.top.count)) / (this.palletData.top.count - 1) + this.palletData.top.width
      this.palletData.bottom.gap = (this.palletData.stringer.length - (this.palletData.bottom.width * this.palletData.bottom.count)) / (this.palletData.bottom.count - 1) + this.palletData.bottom.width
      this.palletData.stringer.gap = ((this.palletData.top.length - this.palletData.wingTop * 2) - (this.palletData.stringer.height * this.palletData.stringer.count)) / (this.palletData.stringer.count - 1) + this.palletData.stringer.height

      //calculate heigths
      this.palletData.bottom.base = 0
      this.palletData.stringer.base = this.palletData.bottom.base + this.palletData.bottom.height
      this.palletData.top.base = this.palletData.stringer.base + this.palletData.stringer.width

    }
  }

  centerModel(group)
  {
    const box = new THREE.Box3().setFromObject(group)

    group.position.x -= box.max.x / 2
    group.position.z -= box.min.z / 2
  }

  moveModelToAxis(group, bottom=false)
  {
    const box = new THREE.Box3().setFromObject(group)
    // group.position.x -= box.max.x / 2
    if (!bottom){
      group.position.z -= box.min.z / 2
      group.position.y -= box.max.y
    } else {
      group.position.z -= 2 * box.min.z
      group.position.y -= box.max.y
    }
    
  }



  
  materialize(board)
  {
    const baseWoodTexture = this.resources.items.woodColorTexture
    const baseEndCutTexture = this.resources.items.woodEndCutColorTexture

    //aquire textures
    const t_xp = baseWoodTexture.clone()
    const t_xn = baseWoodTexture.clone()
    const t_yp = baseWoodTexture.clone()
    const t_yn = baseWoodTexture.clone()
    const t_zp = baseEndCutTexture.clone()
    const t_zn = baseEndCutTexture.clone()

    
    const repeatCountHorizontal = this.palletData[board].length / 2
    const repeatCountVertical = this.palletData[board].height * (Math.random() + 1)
    const repeatCountEndCutVertical = this.palletData[board].height


    //top
    t_yp.offset.set(Math.random() * 5 - 2, Math.random() * 10 - 5)
    t_yp.rotation = Math.PI / 2
    t_yp.repeat.set(repeatCountHorizontal, 1)
    t_yp.wrapS = THREE.MirroredRepeatWrapping
    t_yp.wrapT = THREE.MirroredRepeatWrapping

    //bottom
    t_yn.offset.set(Math.random() * 5 - 2, Math.random() * 10 - 5)
    t_yn.rotation = Math.PI / 2
    t_yn.repeat.set(repeatCountHorizontal,1)
    t_yn.wrapT = THREE.MirroredRepeatWrapping
    t_yn.wrapS = THREE.MirroredRepeatWrapping
    
    //right
    t_xp.repeat.set(repeatCountHorizontal,repeatCountVertical)
    t_xp.offset.set(Math.random() * 5 - 2, Math.random() * 10 - 5)
    t_xp.wrapT = THREE.MirroredRepeatWrapping
    t_xp.wrapS = THREE.MirroredRepeatWrapping

    //left
    t_xn.offset.set(Math.random() * 5 - 2, Math.random() * 10 - 5)
    t_xn.repeat.set(repeatCountHorizontal,repeatCountVertical)
    t_xn.wrapT = THREE.MirroredRepeatWrapping
    t_xn.wrapS = THREE.MirroredRepeatWrapping
    
    //front
    t_zp.repeat.set(1, repeatCountEndCutVertical)
    t_zp.wrapT = THREE.MirroredRepeatWrapping
    t_zp.wrapS = THREE.MirroredRepeatWrapping

    //rear
    t_zn.repeat.set(-1, repeatCountEndCutVertical)
    t_zn.wrapT = THREE.MirroredRepeatWrapping
    t_zn.wrapS = THREE.RepeatWrapping
 
    
    const mat_xp = new THREE.MeshStandardMaterial({
      map: t_xp,
    })
    const mat_xn = new THREE.MeshStandardMaterial({
      map: t_xn,
    })
    const mat_yp = new THREE.MeshStandardMaterial({
      map: t_yp,
    })
    const mat_yn = new THREE.MeshStandardMaterial({
      map: t_yn,
    })
    const mat_zp = new THREE.MeshStandardMaterial({
      map: t_zp,
    })
    const mat_zn = new THREE.MeshStandardMaterial({
      map: t_zn,
    })
    
    
    const materials = [
      mat_xp, // x positive
      mat_xn, // x negative
      mat_yp, // y positive
      mat_yn, // y negative
      mat_zp, // z positive
      mat_zn  // z negative
    ]
    
    return materials
  }

  createBoard(typeOfBoard){
    let geometry = null
    if (typeOfBoard === 'stringer' && this.palletData.type === 'TwoWays')
    {
      geometry = new THREE.BoxGeometry(this.palletData[typeOfBoard].height, this.palletData[typeOfBoard].width, this.palletData[typeOfBoard].length)
      // move the origin of geometry
      geometry.translate(this.palletData.stringer.height / 2, this.palletData.stringer.width /2 , - this.palletData.stringer.length / 2)
    }
    else
    {
      geometry = new THREE.BoxGeometry(this.palletData[typeOfBoard].width, this.palletData[typeOfBoard].height, this.palletData[typeOfBoard].length)
      //move the origin of geometry
      geometry.translate(this.palletData[typeOfBoard].width / 2, this.palletData[typeOfBoard].height /2 , - this.palletData[typeOfBoard].length / 2)

    } 

    const materials = this.materialize(typeOfBoard)
    const mesh = new THREE.Mesh(geometry, materials)
    mesh.name = "board"

    return mesh
  }

// 2 ways

  create2WaysPallet()
  {

    const group = new THREE.Group()
    const bottomGroup = this.create2WaysBottom()
    group.add(bottomGroup)

    const stringerGroup = this.create2WaysStringers()
    group.add(stringerGroup)
    
    const topGroup = this.create2WaysTop()
    group.add(topGroup)

    //center the pallet to 0,0,0
    // this.centerModel(group)
    this.moveModelToAxis(group) //TODO
    group.name = '2waysPalletGroup'
    return group
  }

  create2WaysTop()
  {
    const topGroup = new THREE.Group()
    const topArray = []

    for (let i = 0; i < this.palletData.top.count; i++)
    {
      const topBoard = this.createBoard('top')
      topBoard.position.x = i * this.palletData.top.gap

      topArray[i] = topBoard

      if(i == this.palletData.top.count-1) {
        this.TWTopLastBoard = topBoard
      }

      topGroup.add(topBoard)

    }

    // adjust top boards after custom top gaps
    //front
    for (let i=0; i < this.palletData.topGaps.length; i++)
    {
      topArray[i].position.x = this.palletData.topGaps[i]
    }
    //back
    for (let i=0; i < this.palletData.topGaps.length; i++)
    {
      topArray[topArray.length-i-1].position.x = this.palletData.stringer.length - this.palletData.topGaps[i] - this.palletData.top.width
    }


    topGroup.position.y = this.palletData.top.base
    topGroup.name = '2waysTopGroup'
    this.TWTopGroup = topGroup

    return topGroup
  }

  create2WaysStringers()
  {
    const stringerGroup = new THREE.Group()
    const stringerArray = []
    for (let i = 0; i < this.palletData.stringer.count; i++)
    {
      const stringer = this.createBoard('stringer')

      //spread equally along top board - 2x wings
      stringer.position.x = i * this.palletData.stringer.gap

      stringerArray[i] = stringer
      stringerGroup.add(stringer)
    }

    // adjust stringers after custom stringer gaps
    //front
    for (let i=0; i < this.palletData.stringerGaps.length; i++)
    {
      stringerArray[i].position.x = this.palletData.stringerGaps[i]
    }

    //back
    for (let i=0; i < this.palletData.stringerGaps.length; i++)
    {
      stringerArray[stringerArray.length-i-1].position.x = this.palletData.top.length - this.palletData.wingTop * 2 - this.palletData.stringer.height - this.palletData.stringerGaps[i]
    }

    // //move by top wing size
    stringerGroup.rotation.y = - Math.PI / 2
    stringerGroup.position.z = - this.palletData.top.length + this.palletData.wingTop
    
    stringerGroup.position.y = this.palletData.stringer.base
    stringerGroup.name = '2waysStringerGroup'

    this.TWStringerGroup = stringerGroup

    return stringerGroup

  }

  create2WaysBottom()
  {
    const bottomGroup = new THREE.Group()
    const bottomArray = []
    for (let i=0; i < this.palletData.bottom.count; i++)
    {
      const board = this.createBoard('bottom')
      //spread equally along stringer
      board.position.x = i * this.palletData.bottom.gap
      bottomArray[i] = board

      if (i == this.palletData.bottom.count-1) {
        this.TWBottomLastBoard = board
      }
      bottomGroup.add(board)
    }

    // adjust bottom boards after custom bottom gaps
    //front
    for (let i=0; i < this.palletData.bottomGaps.length; i++)
    {
      bottomArray[i].position.x = this.palletData.bottomGaps[i]
    }
    //back
    for (let i=0; i < this.palletData.bottomGaps.length; i++)
    {
      bottomArray[bottomArray.length-i-1].position.x = this.palletData.stringer.length - this.palletData.bottomGaps[i] - this.palletData.bottom.width
    }

    //move by wing sizes
    bottomGroup.position.z = - this.palletData.wingTop + this.palletData.wingBottom
    bottomGroup.name = '2waysBottomGroup'

    this.TWBottomGroup = bottomGroup

    return bottomGroup
  }

// 4 ways


  create4WaysPallet()
  {

    const group = new THREE.Group()

    const legs = this.create4WaysBottom()
    group.add(legs)

    const stringers = this.create4WaysStringers(false)
    group.add(stringers)

    if (this.palletData.doubleStringer)
    {
      const stringers2 = this.create4WaysStringers(true)
      group.add(stringers2)
    }

    const top = this.create4WaysTop()
    group.add(top)

    //center the pallet to 0,0,0
    // this.centerModel(group)

    // move to axis helper
    this.moveModelToAxis(group)

    group.name = '4WaysPalletGroup'

    return group
    
  }

  create4WaysBottom()
  {
    const group = new THREE.Group()
    for (let i = 0; i < this.palletData.bottom.count; i++)
    {
      const leg = this.create4WaysLeg()
      leg.position.x = i * this.palletData.bottom.gap
      group.add(leg)

      if (i == this.palletData.bottom.count-1) {
        this.FWLegLast = leg
      }
    }

    group.name = '4WaysBottomGroup'

    this.FWLegsGroup = group

    return group
  }

  create4WaysLeg()
  {
    const group = new THREE.Group()
    const bottomBoard = this.createBoard('bottom')
    bottomBoard.position.z = - this.palletData.wingTop + this.palletData.wingBottom
    

    const blockGroup = new THREE.Group()
    for (let j = 0; j < this.palletData.blocksPerLeg; j++)
    {
      const block = this.createBoard('block')
      block.position.x = this.palletData.wingTop + j * this.palletData.block.gap
      blockGroup.add(block)
    }
    group.add(blockGroup)
    blockGroup.rotation.y = Math.PI / 2
    blockGroup.position.x = this.palletData.block.length
    blockGroup.position.y = this.palletData.block.base
    
    group.add(bottomBoard)

    group.name = '4WaysLegsGroup'

    return group
  }

  create4WaysStringers(isDouble)
  {
    const group = new THREE.Group()

    for (let i = 0; i < this.palletData.stringer.count; i++)
    {
      const stringer = this.createBoard('stringer')
      stringer.position.x = this.palletData.wingTop + i * this.palletData.stringer.gap
      group.add(stringer)
    }
    group.rotation.y = Math.PI / 2
    group.position.x = this.palletData.stringer.length
    group.position.y = isDouble ? this.palletData.stringer.base2 : this.palletData.stringer.base

    group.name = '4WaysStringerGroup'

    this.FWStringerGroup = group

    return group
  }

  create4WaysTop()
  {
    const group = new THREE.Group()
    
    for (let i = 0; i < this.palletData.top.count; i++)
    {
      const topBoard = this.createBoard('top')
      topBoard.position.x = i * this.palletData.top.gap
      topBoard.position.y = this.palletData.top.base
      group.add(topBoard)
      
      if (i == this.palletData.top.count-1) {
        this.FWTopLastBoard = topBoard
      }
    }

    group.name = '4WaysTopGroup'

    this.FWTopBoardsGroup = group

    return group
  }

}
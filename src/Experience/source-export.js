
// Retrieve the data from the script tag
const json_field = document.getElementById('pallet-data-4js')
let palletData;
if (json_field) {
  palletData = JSON.parse(json_field.textContent); 
  palletData.wingTop = palletData.wingTop / 100
  palletData.wingBottom = palletData.wingBottom / 100
  for (let i = 0; i < palletData.topGaps.length; i++) {
    palletData.topGaps[i] = palletData.topGaps[i] / 100
  }
  for (let i = 0; i < palletData.stringerGaps.length; i++) {
    palletData.stringerGaps[i] = palletData.stringerGaps[i] / 100
  }
  for (let i = 0; i < palletData.bottomGaps.length; i++) {
    palletData.bottomGaps[i] = palletData.bottomGaps[i] / 100
  }

  console.log('in source', palletData)
} else {
  palletData = {
    'size': {
      'length': 1050,
      'width' : 1050
    },
    'top': {
      'height': 19 / 100,
      'width' : 100 / 100,
      'length': 1030 / 100,
      'count' : 10
    },
    'stringer':{
      'height': 88 / 100,
      'width' : 45 / 100,
      'length': 1120 / 100,
      'count' : 4
    },
    'bottom':{
      'height': 19 / 100,
      'width' : 100 / 100,
      'length': 880 / 100,
      'count' : 5
    },
    'bottomGaps': [50/100, 170 / 100],
    'topGaps': [],
    'stringerGaps' : [0, 350/100],
    'block':{
      'height': 0 / 100,
      'width' : 0 / 100,
      'length': 0 / 100,
      'count' : 0
    },
    'wingTop': 75 / 100,
    'wingBottom' : 0 / 100,
    
    'type' : 'TwoWays'
  }
}
export default [
  {
    name: 'palletData',
    type: 'infoDictionary',
    data: palletData
  },
  // {
  //   name: 'environmentMapTexture',
  //   type: 'cubeTexture',
  //   path:
  //   [
  //     'textures/environmentMap/px.jpg',
  //     'textures/environmentMap/nx.jpg',
  //     'textures/environmentMap/py.jpg',
  //     'textures/environmentMap/ny.jpg',
  //     'textures/environmentMap/pz.jpg',
  //     'textures/environmentMap/nz.jpg'
  //   ]
  // },
  {
    name: 'woodColorTexture',
    type: 'texture',
    path: '/static/textures/wood/spruce.jpg'
  },
  {
    name: 'woodEndCutColorTexture',
    type: 'texture',
    path: '/static/textures/wood/endcut.jpg'
  },
  // {
  //   name: 'grassNormalTexture',
  //   type: 'texture',
  //   path: 'textures/dirt/normal.jpg'
  // },
  // {
  //   name: 'foxModel',
  //   type: 'gltfModel',
  //   path: 'models/Fox/glTF/Fox.gltf'
  // }
]


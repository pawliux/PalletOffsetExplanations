
// Retrieve the data from the script tag
const json_field_2ways = document.getElementById('pallet-data1-4js')
let palletData2ways;
if (json_field_2ways) {
  palletData2ways = JSON.parse(json_field_2ways.textContent); 
  palletData2ways.wingTop = palletData2ways.wingTop / 100
  palletData2ways.wingBottom = palletData2ways.wingBottom / 100
  for (let i = 0; i < palletData2ways.topGaps.length; i++) {
    palletData2ways.topGaps[i] = palletData2ways.topGaps[i] / 100
  }
  for (let i = 0; i < palletData2ways.stringerGaps.length; i++) {
    palletData2ways.stringerGaps[i] = palletData2ways.stringerGaps[i] / 100
  }
  for (let i = 0; i < palletData2ways.bottomGaps.length; i++) {
    palletData2ways.bottomGaps[i] = palletData2ways.bottomGaps[i] / 100
  }

  console.log('in source', palletData2ways)

}

const json_field_4ways = document.getElementById('pallet-data2-4js')
let palletData4ways;
if (json_field_4ways) {
  palletData4ways = JSON.parse(json_field_4ways.textContent); 
  palletData4ways.wingTop = palletData4ways.wingTop / 100
  palletData4ways.wingBottom = palletData4ways.wingBottom / 100
  for (let i = 0; i < palletData4ways.topGaps.length; i++) {
    palletData4ways.topGaps[i] = palletData4ways.topGaps[i] / 100
  }
  for (let i = 0; i < palletData4ways.stringerGaps.length; i++) {
    palletData4ways.stringerGaps[i] = palletData4ways.stringerGaps[i] / 100
  }
  for (let i = 0; i < palletData4ways.bottomGaps.length; i++) {
    palletData4ways.bottomGaps[i] = palletData4ways.bottomGaps[i] / 100
  }

  console.log('in source', palletData4ways)

}

export default [
  {
    name: 'palletData2Ways',
    type: 'infoDictionary',
    data: palletData2ways,
  },
  {
    name: 'palletData4Ways',
    type: 'infoDictionary',
    data: palletData4ways,
  },
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
  
]


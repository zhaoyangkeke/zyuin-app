import { isObject } from './index'

/**
 * 格式化wkt数据
 * @param wkt
 * @param options
 */
const formatWKT = (wkt, options = {}) => {
  if (!wkt) return ''
  let wktFormat = new ol.format.WKT()
  let coordinates = []
  let featureGeom = wktFormat.readGeometry(wkt, {
    dataProjection: options['dataProjection'] ? options['dataProjection'] : undefined,
    featureProjection: options['featureProjection'] ? options['featureProjection'] : undefined
  })
  if (featureGeom) {
    coordinates = featureGeom.getCoordinates()
  }
  return coordinates
}

/**
 * 从要素获取图层名
 * @param $F
 * @returns {string}
 */
const getLayerNameFrom$F = $F => {
  let $LY = ''
  if ($F) {
    let $ATT = $F.getProperties()
    let $PR = $F.get('params')
    if ($PR && isObject($PR) && $PR['layerName']) {
      $LY = $PR['layerName']
    } else if ($ATT && $ATT.hasOwnProperty('params') && $ATT['params'] && $ATT['params']['layerName']) {
      $LY = $ATT['params']['layerName']
    } else if ($ATT && $ATT['layerName']) {
      $LY = $ATT['layerName']
    }
  }
  return $LY
}

export {
  formatWKT,
  getLayerNameFrom$F
}

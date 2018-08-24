import * as qiniu from 'qiniu-js'

export const config = {
  useCdnDomain: true,
  disableStatisticsReport: false,
  retryCount: 6,
  region: qiniu.region.z0
}

export const putExtra = {
  fname: "",
  params: {},
  mimeType: null
}
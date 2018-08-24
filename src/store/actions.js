import * as types from './mutation-types'
import axios from 'axios'
// export const login = function({ commit }, token) {
//   commit('LOGIN', token)
// }

// export const logout = function({ commit }, token) {
//   commit('LOGOUT', token)
// }

export const getVideoList = function({ commit }, idx) {
  const params = new URLSearchParams()
  params.append('status', idx)
  // console.log(1)
  axios.post(`${process.env.API_HOST}index.php?m=usermanager&c=usercontent&a=getVideos`, params)
  .then(res => {
    commit(types.SET_VIDEOLIST, res.data.list)
    // console.log(res)
  })
}
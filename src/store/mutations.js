import * as types from './mutation-types'

const mutations = {
  [types.LOGIN](state, token) {
    state.token = token
  },
  [types.SET_USERINFO](state, userInfo) {
    state.userInfo = userInfo
  },
  [types.SET_USER](state, user) {
    state.user = user
  },
  [types.SET_VIDEOFILE](state, file) {
    state.videoFile = file
  },
  [types.SET_MSGNUM](state, msgNum) {
    state.msgNum = msgNum
  },
  [types.SET_NICK](state, nick) {
    state.userInfo.username = nick
  },
  [types.SET_AVATAR](state, avatar) {
    state.userInfo.headface = avatar
  },
  [types.SET_VIDEOLIST](state, list) {
    state.videoList = list
  }
}

export default mutations
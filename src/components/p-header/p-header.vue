<template>
  <div class="header-wrap">
    <div class="header-inner" v-if="userInfo.headface">
      <router-link tag="h1" to="/index" class="logo">
        <img src="./logo.png" alt="" class="logo">
      </router-link>
      <div class="right-box">
        <router-link tag="div" to="/message" class="message-box">
          <el-badge :value="msgNum" :hidden="msgNum==0" :max="99">
            <i class="el-icon-message icon"></i>
          </el-badge>
        </router-link>
        <el-dropdown placement="bottom" @command="logout">
          <div class="user-info">
            <div class="avatar-wrap">
              <img :src="userInfo.headface" alt="" class="avatar">
            </div>
            <span class="nick">{{userInfo.nick}}</span>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item class="item" command="account"><i class="el-icon-setting icon"></i>账号信息</el-dropdown-item>
            <el-dropdown-item class="item" command="logout"><i class="logout-icon"></i>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'msgNum',
      'userInfo'
    ])
  },
  methods: {
    logout(command) {
      switch(command) {
        case 'account':
          this.$router.push({
            path: 'account-info'
          })
          break
        case 'logout':
          this._logOut()
          break
      }
    },
    _logOut() {
      this.$axios.post(`${process.env.API_HOST}index.php?m=usermanager&c=userloginapi&a=logout`)
      .then(res => {
        if(res.data.result === 1) {
          this.$router.push({
            path: '/login'
          })
          localStorage.removeItem('access_token')
        }
        // console.log(res)
      })
    },
    _getUserInfo() {
      this.$axios.post(`${process.env.API_HOST}index.php?m=usermanager&c=userloginapi&a=userInfo`)
      .then(res => {
        this.setUserInfo(res.data.userInfo)
        this.setUser(res.data.user)
        // console.log(res)
      })
    },
    _getMsgNum() {
      this.$axios.post(`${process.env.API_HOST}index.php?m=usermanager&c=usernews&a=getNoticeNum`)
      .then(res => {
        if(res.data.result === 1) {
          this.setMsgNum(res.data.num)
        }
        // console.log(res)
      })
    },
    ...mapMutations({
      setUser: 'SET_USER',
      setUserInfo: 'SET_USERINFO',
      setMsgNum: 'SET_MSGNUM'
    })
  },
  created() {
    this.$nextTick(() => {
      this._getUserInfo()
      this._getMsgNum()
    })
  }
}
</script>

<style lang="scss" scoped>
  @import '~common/scss/variable';
  @import '~common/scss/mixin';
  .header-wrap {
    width: 100%;
    height: 86px;
    box-shadow:0 2px 4px 0 rgba(51,51,51,.2);
    background-color: $color-background;
    .header-inner {
      width: 1000px;
      height: 100%;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: $color-background;
    }
    .logo {
      width: 163px;
      height: 50px;
      cursor: pointer;
    }
    .right-box {
      display: inline-flex;
      align-items: center;
    }
    .message-box {
      cursor: pointer;
    }
    .icon {
      font-size: 27px;
      color: #999;
    }
    .user-info {
      display: inline-flex;
      align-items: center;
      margin-left: 30px;
      cursor: pointer;
      .avatar-wrap {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        overflow: hidden;
        .avatar {
          width: 30px;
          height: 30px;
        }
      }
      .nick {
        width: 100px;
        display: inline-block;
        color: $color-text;
        font-size: 14px;
        margin-left: 10px;
        @include no-wrap;
      }
    }
  }
  .item {
    display: flex;
    align-items: center;
    .icon {
      color: $color-text;
      font-size: 16px;
      margin-right: 5px;
    }
    .logout-icon {
      width: 15px;
      height: 16px;
      display: inline-block;
      background: url('./23.jpg') no-repeat 100%;
      margin-right: 5px;
    }
  }
</style>
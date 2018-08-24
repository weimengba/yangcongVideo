<template>
  <div class="login-container">
    <div class="login-content">
      <img src="./login_bgimage.png" alt="">
      <div class="login-modal">
        <p class="modal-title">登录洋葱号</p>
        <div class="reg-box">
          <div class="input-wrap">
            <el-input v-model="telNumber" placeholder="请输入手机号码" maxlength="11"></el-input>
          </div>          
          <div class="input-wrap">
            <el-input v-model="verCode" placeholder="请输入验证码" maxlength="4">
              <template slot="suffix">
                <div class="code-wrap" @click="refreshCode">
                  <s-identify :identifyCode="identifyCode" :contentWidth="90"></s-identify>
                </div>
              </template>
            </el-input>            
          </div>
          <div class="input-wrap">
            <el-input v-model="telCode" placeholder="手机验证码" maxlength="6">
              <template slot="suffix">
                <div class="get-code" @click="getCode">
                  <span class="text" v-if="countDown == 60">{{codeText}}</span>
                  <span class="text count-down" v-else>{{codeText}}</span>
                </div>
              </template>
            </el-input>
          </div>
          <div class="input-wrap">
            <p class="login-btn" :class="{disabled: !userAgreement}" @click="login">登录</p>
          </div>
          <div class="y-box">
            <input type="checkbox" id="user_agreement" class="user_agreement" :checked="userAgreement" @change="userChange">
            <label for="user_agreement" class="box-text">我已阅读并同意<router-link tag="span" to="" class="link_text">用户协议</router-link>和<router-link tag="span" to="" class="link_text">隐私条款</router-link>
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SIdentify from 'base/identify/identify'
import { mapMutations, mapActions } from 'vuex'

export default {
  components: {
    SIdentify
  },
  data() {
    return {
      telNumber: '',
      verCode: '',
      telCode: '',
      codeText: '获取验证码',
      countDown: 60,
      disabled: true,
      // 图形验证码
      identifyCode: '',
      identifyCodes: '123456789',
      userAgreement: true
    }
  },
  methods: {
    // 随机数
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    },
    // 点击图片刷新验证码
    refreshCode() {
      this.identifyCode = ""
      this.makeCode(this.identifyCodes, 4)
    },
    // 初始化验证码
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ];
      }
      // console.log(this.identifyCode)
    },
    // 获取手机验证码
    getCode() {
      const isTelNumber = /^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(this.telNumber)
      // 倒计时开始后无法点击按钮
      if(this.countDown != 60) {
        return
      }
      if(this.telNumber && this.telNumber.length == 11 && isTelNumber) {
        if(this.verCode !== this.identifyCode | !this.verCode) {
          this.$message({
            message: '验证码为空或输入错误',
            type: 'error'
          })
        }else {
          this.$axios.get(`${process.env.API_HOST}index.php?m=usermanager&c=userloginapi&a=sendSms&mobile=${this.telNumber}`)
          .then(res => {
            if(res.data.result === 1) {
              this.countDown = 59
              this.codeText = `${this.countDown}s后重新获取`
              this.timer = setInterval(() => {
                this.countDown --
                this.codeText = `${this.countDown}s后重新获取`
                if(this.countDown < 1) {
                  clearInterval(this.timer)
                  this.countDown = 60
                  this.codeText = '获取验证码'
                }
              }, 1000)
            }
          })
        }
      }else {
        this.$message({
          message: '手机号码为空或输入错误',
          type: 'error'
        })
      }
    },
    // 登录
    login() {
      // 某项为空不可登录
      if(!this.telNumber) {
        this.$message({
          message: '手机号码为空或输入错误',
          type: 'error'
        })        
      }else if(this.verCode !== this.identifyCode | !this.verCode) {
        this.$message({
          message: '验证码为空或输入错误',
          type: 'error'
        })
      }else if(!this.telCode) {
        this.$message({
          message: '手机验证码为空或输入错误',
          type: 'error'
        })
      }else if(!this.userAgreement) {
        this.$message({
          message: '请同意用户协议和隐私条款',
          type: 'info'
        })
      }else {
        let loginLoading = this.$loading({
          text: '登录中',
          background: 'rgba(0, 0, 0, .8)'
        })
        // 格式化参数
        const params = new URLSearchParams()
        params.append('mobile', this.telNumber)
        params.append('code', this.telCode)
        this.$axios.post(`${process.env.API_HOST}index.php?m=usermanager&c=userloginapi&a=login`, params)
        .then(res => {
          localStorage.setItem('access_token', res.data.token)
          this.Login(res.data.token)
          setTimeout(() => {
            loginLoading.close()
          }, 800)
          this.$router.push({
            path: '/index'
          })
        })
      }
    },
    userChange() {
      this.userAgreement = !this.userAgreement
    },
    ...mapMutations({
      Login: 'LOGIN'
    })
  },
  mounted() {
    // 初始化图片验证码
    this.identifyCode = ""
    this.makeCode(this.identifyCodes, 4)
  }
}
</script>

<style lang="scss">
  @import '~common/scss/variable';
  .login-container {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 199;
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background-image:linear-gradient(90deg, #ff645b 0%, #f53648 100%);
    .login-content {
      width: 1160px;
      flex: 1;
      margin: 0 auto;
      display: flex;
      align-items: center;
    }
    .login-modal {
      width: 420px;
      height: 412px;
      background-color: $color-background;
      border-radius: 8px;
      padding: 35px 60px;
      box-sizing: border-box;
      margin-left: 113px;
      .modal-title {
        font-size: 20px;
        color: $color-text;
        margin: 0;
        text-align: center;
      }
      .reg-box {
        margin-top: 35px;
      }
      .input-wrap + .input-wrap {
        margin-top: 24px;
      }
      .el-input__suffix {
        right: 1px;
        top: 1px;
      }
      .el-input__inner {
        border-radius: 0;
      }
      .code-wrap {
        cursor: pointer;
      }
      .get-code {
        height: 38px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        .text {
          width: 82px;
          display: inline-block;
          padding: 6px 10px;
          font-size: 14px;
          border-left: 1px solid #dcdfe6;
          &.count-down {
            font-size: 12px;
          }
        }
      }
      .login-btn {
        width: 100%;
        height: 40px;
        margin: 0;
        background-color: $color-theme-d;
        color: $color-text-f;
        font-size: 18px;
        line-height: 40px;
        text-align: center;
        cursor: pointer;
        &.disabled {
          color: $color-text-d;
          background-color: #dcdfe6;
        }
      }
      .y-box {
        display: flex;
        align-items: center;
        margin-top: 20px;
        .user_agreement {
          cursor: pointer;
          outline: transparent;
        }
      }
      .box-text {
        cursor: pointer;        
        font-size: 12px;
        color: $color-text;
        margin-left: 5px;
        .link_text {
          color: $color-theme;
        }
      }
    }
  }
</style>

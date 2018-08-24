<template>
  <div class="account-container">
    <c-header :tab="tab" :active="active"></c-header>
    <div class="account-wrap">
      <div class="account-info__item">
        <div class="label required">账户名称</div>
        <div class="content">
          <div class="edit-wrap">
            <div class="edit-content">
              <el-input  v-model="userInfo.nick" :focus="!readonly" :readonly="readonly" ref="editinfo" :v-focus="!readonly" @input="editNick"></el-input>
            </div>
            <i @click="editinfo" v-show="readonly" class="el-icon-edit edit-icon"></i>
          </div>
        </div>
      </div>
      <div class="account-info__item">
        <div class="label required">洋葱视频头像</div>
        <div class="content">
          <img :src="!avatarUrl?userInfo.headface:avatarUrl" alt="" class="avatar">
          <el-upload
            class="upload-handler"
            :action="action"
            :beforeUpload="setThumb"
            :showFileList="false"
            :httpRequest="uploadAvatar">
            <el-button size="small">更改头像</el-button>
          </el-upload>
        </div>
      </div>
      <div class="account-info__item">
        <div class="label">账户ID</div>
        <div class="content">
          <div class="edit-wrap">
            <div class="edit-content">{{userInfo.memberid}}</div>
          </div>
        </div>
      </div>
      <div class="account-info__item">
        <div class="label">绑定手机</div>
        <div class="content">
          <div class="edit-wrap">
            <div class="edit-content">{{_formatMobile(userInfo.mobile)}}</div>
          </div>
        </div>
      </div>
      <div class="submit-set" @click="submitSet">提交</div>
    </div>
    <div class="dialog-wrap" v-show="dialogShow">
      <div class="masker"></div>
      <div class="dialog-inner">
        <div class="dialog-header">
          <div class="title">裁剪图片</div>
        </div>
        <div class="dialog-body">
          <div class="cropper-container">
            <div class="cropper-wrap">
              <vueCropper
                class="cropper"
                ref="cropper"
                :img="option.img"
                :outputSize="option.size"
                :outputType="option.outputType"
                :canScale="option.canScale"
                :fixedNumber="option.fixedNumber"
                :fixed="option.fixed"
                :autoCrop="option.autoCrop"
                :canMove="option.canMove"
                :info="option.info"
                @realTime="realTime"
              ></vueCropper>
            </div>
            <div class="preview-img">
              <img :src="previewImg" alt="" class="cropper-img">
            </div>
          </div>
          <div class="cropper-footer">
            <span class="cropper-btn confirm" @click="confirmAvatar">确认</span>
            <span class="cropper-btn cancel" @click="closeDialog">取消</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CHeader from 'base/c-header/c-header'
import { mapMutations, mapGetters } from 'vuex'
import vueCropper from 'vue-cropper'
import { upload, formatKey } from 'common/js/utils'
import Vue from 'vue'

Vue.directive('focus', {
    inserted: function (el) {
      el.querySelector('input').focus();
    },
});

export default {
  components: {
    CHeader,
    vueCropper
  },
  data() {
    return {
      tab: ['账号信息'],
      active: 0,
      action: '',
      readonly: true,      
      // 自定义封面配置
      option: {
        img: '',
        size: 1,
        outputType: 'jpeg',
        autoCrop: true,
        fixed: true,
        fixedNumber: [1, 1],
        canScale: false,
        canMove: false,
        full: true,
        info: false
      },
      previewImg: '',
      avatarUrl: '',
      nick: '',
      dialogShow: false,
      qiNiuKey: '',
      token: '',
      file: '',
      flag: false
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  methods: {
    // 实时预览
    realTime(data) {
      this.$refs.cropper.getCropBlob((data) => {
        this.previewImg = URL.createObjectURL(data)
      })
    },
    // 
    setThumb(file) {
      this.dialogShow = true
      this.option.img = URL.createObjectURL(file)
      this.file = file
      this.suffix = (file.name).substr((file.name).indexOf('.'))
      return false
    },
    // 确认头像
    confirmAvatar() {
      this.$refs.cropper.getCropBlob((data) => {
        this.avatarUrl = URL.createObjectURL(data)
        this.file = data
      })
      this.closeDialog()
    },
    
    closeDialog() {
      this.dialogShow = false
    },
    editinfo(e) {
      this.readonly = !this.readonly
      this.$refs.editinfo.active
      this.$nextTick(function() {
        this.$refs.editinfo.$el.querySelector('input').focus()
        this.$refs.editinfo.$el.querySelector('input').style.border = '1px solid #dcdfe6'
        this.$refs.editinfo.$el.querySelector('input').style.paddingLeft = '15px'
      })
    },
    // 提交修改
    submitSet() {
      if(!this.avatarUrl && !this.nick) {
        this.$message({
          type: 'info',
          message: '请至少修改一处！'
        })
      }else {
        if(this.flag) {
          return
        }
        this.flag = true
        this._getUploadToken()
      }
    },
    // 上传修改头像到七牛
    uploadAvatar() {
      const _this = this
      const observer = {
        // 上传中
        next(res) {
          // console.log(res)
        },
        // 上传错误
        error(err) {
          _this.$alert('上传过程中发生未知错误，请稍后再试', '提示', {
            type: 'wraning'
          })
          console.log(err)
        },
        // 上传成功后提交服务器修改
        complete(res) {
          _this.qiNiuKey = res.key
          _this._updateUserInfo()
        }
      }
      upload(this.file, formatKey(this.suffix), this.token, observer)
    },
    editNick(e) {
      this.nick = e
    },
    _formatMobile(mobile) {
      return `${mobile}`.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
    },
    // 修改个人信息
    _updateUserInfo() {
      // 格式化参数
      const params = new URLSearchParams()
      
      if(this.avatarUrl) {
        params.append('headface', `http://v.yangcongv.com/${this.qiNiuKey}`)
      }
      params.append('username', this.nick)

      this.$axios.post(`${process.env.API_HOST}index.php?m=usermanager&c=userupdate&a=updateUserInfo`, params)
      .then(res => {
        if(res.data.result === 1) {
          if(this.avatarUrl) {
            this.setAvatar(this.avatarUrl)
          }
          if(this.nick) {
            this.setNick(this.nick)
          }
          this.$message({
            type: 'success',
            message: '修改成功'
          })
          this.$router.push({
            path: '/index'
          })
        }
      })
    },
    // 获取七牛token
    _getUploadToken() {
      this.$axios.get(`${process.env.API_HOST}/index.php?m=usermanager&c=userloginapi&a=get_qiniu_data`)
      .then(res => {
        this.token = res.data.uptoken
      })
    },
    ...mapMutations({
      setAvatar: 'SET_AVATAR',
      setNick: 'SET_NICK'
    })
  },
  watch: {
    // 获取到token后上传七牛
    token() {
      this.uploadAvatar()
    },
    userInfo(newVal) {
      // console.log(this.nick)
      newVal.nick ? this.nick = newVal.nick : this.nick = ''
      // console.log(this.nick)
    }
  }
}
</script>

<style lang="scss">
  @import '~common/scss/variable';
  .account-wrap {
    padding: 20px 40px 10px;
    background-color: $color-background;
    .account-info__item {
      width: 100%;
      min-height: 55px;
      line-height: 55px;
      display: flex;
      align-items: center;
      padding-top: 10px;
      box-sizing: content-box;
      .label {
        width: 177px;
        margin-left: 10px;
        color: $color-text;
        font-size: 16px;
        &.required {
          position: relative;
          &:after {
            content: '';
            width: 5px;
            height: 5px;
            background-color: $color-theme-d;
            border-radius: 50%;
            position: absolute;
            left: -10px;
            top: 25px;
          }
        }
      }
      .content {
        flex: 1;
        display: flex;
        .edit-wrap {
          width: 100%;
          color: $color-text-d;
          font-size: 14px;
          position: relative;
        }
        .edit-content {
          margin-right: 20px;
        }
        .el-input__inner {
          padding-left: 0;
          width: 250px !important;
          border: none;
        }
        .edit-icon {
          display: inline-block;
          font-size: 18px;
          position: absolute;
          right: 0;
          top: 18px;
          cursor: pointer;
        }
        .avatar {
          width: 128px;
          height: 128px;
          border-radius: 4px;
        }
        .upload-handler {
          margin-left: 22px;
          display: flex;
          align-items: center;
          .title {
            color: $color-text;
            font-size: 16px;
          }
        }
      }
    }
    .submit-set {
      width: 164px;
      height: 40px;
      line-height: 40px;
      font-size: 16px;
      padding: 0;
      margin: 20px auto;
      border-radius: 4px;
      text-align: center;
      color: $color-text-f;
      background-color: $color-theme;
      cursor: pointer;
    }
  }
  .dialog-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 99999;
    .masker {
      width: 100%;
      height: 100%;
      background-color: $color-background-d;
      position: absolute;
    }
    .dialog-inner {
      position: relative;
      top: 200px;
      margin: 0 auto;
      width: 650px;
      border-radius: 5px;
      overflow: hidden;
      box-shadow: 0 0 5px $color-text;
      .dialog-header {
        padding: 15px;
        background-color: $color-background;
        border-bottom: 1px solid $color-border;
      }
      .cropper-container {
        padding: 20px;
        background-color: $color-background-g;
        font-size: 0;
        .cropper-wrap {
          width: 380px;
          height: 380px;
          display: inline-block;
        }
        .preview-img {
          display: inline-block;
          width: 172px;
          height: 172px;
          overflow: hidden;
          margin-left: 20px;
          vertical-align: top;
          .cropper-img {
            width: 100%;
          }
        }
      }
      .cropper-footer {
        padding: 20px;
        background-color: $color-background;
        text-align: center;
        font-size: 0;
        .cropper-btn {
          width: 140px;
          height: 40px;
          border-radius: 4px;
          font-size: 16px;
          background-color: $color-background;
          display: inline-block;
          margin-right: 20px;
          line-height: 40px;
          cursor: pointer;
          &.confirm {
            background-color: $color-theme;
            color: $color-text-f;
          }
          &.cancel {
            background-color: $color-border;
            color: $color-text-d;
          }
        }
      }
    }
  }
</style>

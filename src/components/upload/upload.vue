<template>
  <div class="inner-right">
    <c-header :tab="tab" :active="active"></c-header>
    <div class="upload-detault" v-if="!isUploadSuc">
      <img src="./upload_icon.jpg" alt="" class="upload-icon">
      <el-upload
        class="upload-btn__wrap"
        ref="upload"
        :action="action"
        :autoUpload="autoUpload"
        :limit="limit"
        :showFileList="showFileList"
        :onChange="selectFile"
        :httpRequest="uploadQiniu"
        :accept="accept"
        >
        <div class="upload-btn">上传视频</div>
      </el-upload>
      <p class="upload-tip">提示：为了获得更高的推荐量和点击量，建议上传清晰视频，大小不超过500M。</p>
    </div>
    <div class="upload-setting" v-else>
      <div class="setting-head">
        <img src="./uplpad_success_icon.png" alt="" class="suc-icon">
        <div class="right-wrap">
          <div class="right-inner">
            <p class="success-msg">上传成功</p>
            <p class="video-title">{{videoFile.name}}</p>
          </div>
          <div class="reset-upload" @click="reupload">
            <span class="reupload-text">重新上传</span>
            <input type="file" class="reupload" :accept="accept" @change="reselectFile">
          </div>
        </div>
      </div>
      <div class="setting-content">
        <div class="setting-item__wrap">
          <span class="item-name">说点什么</span>
          <div class="input-wrap">
            <el-input 
              v-model="videoTitle" 
              class="setting-input" 
              maxlength="30" 
              placeholder="说点什么把...."></el-input>
            <span class="input-length">{{videoTitle.length}}/30</span>
          </div>
        </div>
        <!-- <div class="setting-item__wrap">
          <span class="item-name">视频描述</span>
          <div class="input-wrap">
            <el-input 
              v-model="videoDesc" 
              class="setting-input" 
              maxlength="400" 
              type="textarea" 
              rows="4" 
              resize="none" 
              placeholder="请填写视频简介"></el-input>
            <span class="input-length">{{videoDesc.length}}/400</span>
            <span class="input-msg">准确的描述视频内容，有利于获得更多的推荐</span>
          </div>
        </div> -->
        <div class="setting-item__wrap">
          <span class="item-name">设置封面</span>
          <div class="setting-thumb" @click="togglePanel">
            <div class="thumb-wrap">
              <img v-if="thumbUrl" :src="thumbUrl" alt="" class="video-thumb">
            </div>
            <span class="text">设置封面</span>
          </div>          
        </div>
        <div class="setting-item__wrap">
          <span class="item-name">分类</span>
          <div class="setting-channel" :class="{selected: channelShow}" @click="toggleChannel">{{channelText}}
            <div class="channel-arrow__wrap">
              <span class="channel-arrow"></span>
            </div>
            <div class="channel-list" v-show="channelShow">
              <span 
                class="channel-item" 
                v-for="(channel, index) in channelList" 
                :key="index" 
                @click.stop="selectedChannel(index)">{{channel.name}}</span>
            </div>
          </div>
        </div>
        <div class="setting-item__wrap">
          <span class="item-name">标签</span>
          <div class="setting-channel" :class="{selected: channelShow}" @click="toggleSubCat">{{subCat}}
            <div class="channel-arrow__wrap">
              <span class="channel-arrow"></span>
            </div>
            <div class="channel-list" v-show="subCatShow">
              <span 
                class="channel-item" 
                v-for="(item, index) in subCatList" 
                :key="index" 
                @click.stop="selectedSubCat(index)">{{item}}</span>
            </div>
          </div>
        </div>
        <div class="content-bottom">
          <span class="bottom-btn submit" @click="submitSet">发布</span>
          <span class="bottom-btn cancel">取消</span>
        </div>
      </div>
    </div>
    <div class="masker" v-show="maskShow">
      <div class="upload-progress__panel" v-show="!isSelectFile">
        <el-progress 
          class="progress" 
          :percentage="uploadPercent"
          :text-inside="true"
          :stroke-width="20"
          ></el-progress>
        <p class="tips">注意：上传过程中请勿关闭页面</p>
      </div>
      <div class="setting-thumb__panel" v-show="isSelectFile">
        <div class="panel__close">
          <img src="./close_icon.jpg" alt="" class="close__icon" @click="togglePanel">
        </div>
        <div class="panel__header">
          <span class="tab-item" :class="current==0?'tab-selected':''" @click="thumbTabCtrl" data-idx="0">自定义封面</span>
          <span class="tab-item" :class="current==1?'tab-selected':''" @click="thumbTabCtrl" data-idx="1">系统封面</span>
        </div>
        <div class="panel__content" v-show="current==0">
          <div v-show="!isSelectedThumb">
            <div class="uploader-bg"></div>
            <el-upload
              class="setting-thumb"
              :action="action"
              :beforeUpload="setThumb"
              :showFileList="showFileList">
              <el-button type="danger">选择图片</el-button>
            </el-upload>
            <div class="uploader-note">
              <p class="tips">上传图片不超过5M</p>
              <div class="note-msg">提示：为了获得更好的推荐量和点击量，请尽可能使用大尺寸图片，建议分辨率：1280x720(最小宽度为640px)。请务必上传和视频内容相关、有引导价值的图片，如有作弊情况将被封号处理。</div>
            </div>
          </div>
          <div class="cropper-wrap" v-show="isSelectedThumb">
            <div class="cropper-inner">
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
              <div class="cropper-img__wrap" >
                <div class="preview-img">
                  <img :src="previewImage" alt="" class="cropper-img">
                </div>
                <el-upload
                  class="reset-upload"
                  :action="action"
                  :beforeUpload="setThumb"
                  :showFileList="showFileList">
                  <div>重新上传</div>
                </el-upload>
              </div>
            </div>
            <div class="footer-btns">
              <span class="bottom-btn submit" @click="confirmSelect">确认</span>
              <span class="bottom-btn cancel" @click="togglePanel">取消</span>
            </div>
          </div>
        </div>
        <div class="panel__content" v-show="current==1">
          <ul class="thumb-list">
            <li class="list-item" :class="{selected: thumbIndex==index}" v-for="(item, index) in pictures" :key="index" @click="selectedThumb(index)">
              <img :src="item" alt="" class="item-img">
              <div class="hover__mask"></div>
            </li>
          </ul>
          <div class="footer-btns"> 
            <span class="bottom-btn submit" @click="confirmSelect">确认</span>
            <span class="bottom-btn cancel" @click="togglePanel">取消</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CHeader from 'base/c-header/c-header'
import vueCropper from 'vue-cropper'
import { upload, formatKey } from 'common/js/utils'
import * as qiniu from 'qiniu-js'
import { mapMutations, mapGetters, mapActions } from 'vuex'
export default {
  components: {
    CHeader,
    vueCropper
  },
  data() {
    return {
      tab: ['上传视频'],
      active: 0,
      // 文件上传地址
      action: '', // https://upload.qiniup.com
      // 最大上传个数
      limit: 1,
      // 是否选择文件后自动上传
      autoUpload: false,
      // 是否显示已上传文件列表
      showFileList: false,
      // 是否已选择文件
      isSelectFile: false,
      // 上传文件格式
      accept: 'video/avi,video/rmvb,video/mp4,video/wmv,video/mpeg,video/mov,video/mkv,video/flv,video/f4v,video/m4v,video/rm,video/3gp,video/dat,video/ts,video/mts,video/vob',
      // 是否上传成功
      isUploadSuc: false,
      // 上传进度
      uploadPercent: 0,
      // 上传视频title
      videoTitle: '',
      // 上传视频简介
      videoDesc: '',
      // 频道id
      catid: '',
      // 视频封面
      thumbUrl: '',
      // 七牛存储key
      qiNiuKey: '',
      // 上传封面选项，默认为自定义
      current: 0,
      // 系统封面index, -1 不选中
      thumbIndex: -1,
      // 系统封面
      pictures: [],
      // 分类名称
      channelText: '精确选择分类更有利于推荐',
      // 频道列表
      channelList: [],
      // 频道列表是否显示
      channelShow: false,
      // 标签
      subCat: '选择一个标签更容易被推荐哦',
      // 标签列表
      subCatList: [],
      // 标签列表是否显示
      subCatShow: false,
      // 自定义封面是否已选择
      isSelectedThumb: false,
      // 弹出层是否显示
      maskShow: false,
      // 自定义封面配置
      option: {
        img: '',
        size: 1,
        outputType: 'jpeg',
        autoCrop: true,
        fixed: true,
        fixedNumber: [16, 9],
        canScale: false,
        canMove: false,
        full: true,
        info: false
      },
      // 自定义封面预览
      previewImage: '',
      // 上传token
      token: '',
      // 自定义封面文件
      thumbFile: '',
      flag: false
    }
  },
  methods: {
    // 选择文件
    selectFile(file) {
      const fileName = file.raw.name
      const aAccept = this.accept.split(',')
      const fileType = file.raw.type
      const fileSize = (file.size / 1024 / 1024).toFixed(2) > 500
      this.isSelectFile = false
      this.videoTitle = fileName.substr(0, fileName.lastIndexOf('.'))
      this.videoDesc = fileName.substr(0, fileName.lastIndexOf('.'))
      this.setVideoFile(file.raw)
      // this.uploadQiniu()
      this._getUploadToken()
      // 上传文件格式判断
      // for(let i = 0; i < aAccept.length; i++) {
      //   if(aAccept[i] == fileType && !fileSize) {
          
      //     // this.isSelectFile = true
      //     break
      //   }
      // }
      // if(!this.isSelectFile) {
      //   this.$alert('上传视频格式错误', '提示', {
      //     type: 'wraning'
      //   })
      // }
      if(fileSize) {
        this.$alert('请上传小于500MB的视频', '提示', {
          type: 'wraning'
        })
        return
      }
      this.maskShow = true
    },
    // 自定义七牛上传
    uploadQiniu() {
      const _this = this
      const fileName = this.videoFile.name
      const suffix = (fileName).substr((fileName).indexOf('.'))
      const observer = {
        // 上传中
        next(res) {
          _this.uploadPercent = parseFloat((res.total.percent).toFixed(2))
          if(res.total.percent === 100) {
            _this.maskShow = false
            _this.isUploadSuc = true
          }
          // console.log(res)
        },
        // 上传错误
        error(err) {
          _this.maskShow = false
          _this.isSelectFile = false
          _this.$alert(`上传过程中发生未知错误${err.code}，请稍后再试`, '提示', {
            type: 'wraning'
          })
          // console.log(err)
        },
        // 上传成功
        complete(res) {
          _this.qiNiuKey = res.key
          _this._getVideoThumb()
          // console.log(res)
        }
      }
      upload(this.videoFile, formatKey(suffix), this.token, observer)
    },
    // 是否重新选择视频
    reupload(e) {
      if(confirm('重新上传时当前信息会被丢弃，确认？')) {
        this.isSelectFile = false
      }else {
        e.preventDefault()
      }
    },
    // 重新选择视频上传
    reselectFile(e) {
      e.stopPropagation()
      const fileName = e.target.files[0].name
      const aAccept = this.accept.split(',')
      const fileType = e.target.files[0].type
      const fileSize = (e.target.files[0].size / 1024 / 1024).toFixed(2) > 500
      this.videoTitle = fileName.substr(0, fileName.lastIndexOf('.'))
      this.videoDesc = fileName.substr(0, fileName.lastIndexOf('.'))
      // return
      this.setVideoFile(e.target.files[0])
      this._getUploadToken()
      // 上传文件格式判断
      // for(let i = 0; i < aAccept.length; i++) {
      //   if(aAccept[i] == fileType && !fileSize) {
      //     // this.isSelectFile = true
      //     break
      //   }
      // }
      // if(!this.isSelectFile) {
      //   this.$alert('上传视频格式错误', '提示', {
      //     type: 'wraning'
      //   })
      // }
      if(fileSize) {
        this.$alert('请上传小于500MB的视频', '提示', {
          type: 'wraning'
        })
        return
      }
      this.maskShow = true
    },
    setThumb(file) {
      this.isSelectedThumb = true
      this.option.img = URL.createObjectURL(file)
      return false
    },
    // 实时预览封面
    realTime(data) {
      this.$refs.cropper.getCropBlob((data) => {
        this.previewImage = URL.createObjectURL(data)
      })
      this.$refs.cropper.getCropData((data) => {
        this.thumbFile = data
      })
    },
    // 封面选择切换
    thumbTabCtrl(e) {
      this.current = e.target.dataset.idx
    },
    // 选择系统封面
    selectedThumb(index) {
      this.thumbIndex = index
    },
    // 选择封面确认
    confirmSelect() {
      if(this.current == 0) {
        this.thumbUrl = this.previewImage
      }else {
        this.thumbUrl = this.pictures[this.thumbIndex]
        this.thumbFile = this.pictures[this.thumbIndex]
      }
      this.togglePanel()
    },
    // 
    togglePanel() {
      this.isSelectedThumb = false
      this.isSelectFile = true
      this.current = 0
      this.maskShow = !this.maskShow
    },
    toggleChannel() {
      this.channelShow = !this.channelShow
    },
    toggleSubCat() {
      if(!this.subCatList.length) {
        this.$message({
          type: 'warning',
          message: '选择分类后才可选择频道!'
        })
        return
      }
      this.subCatShow = !this.subCatShow
    },
    selectedChannel(index) {
      this.channelShow = false
      this.channelText = this.channelList[index].name
      this.catid = this.channelList[index].id
      this.subCatList = this.channelList[index].subCat
    },
    selectedSubCat(index) {
      this.subCat = this.subCatList[index]
      this.subCatShow = false
    },
    // 提交当前信息设置
    submitSet() {
      if(!this.thumbFile || !this.videoTitle || !this.catid) {
        this.$message({
          type: 'error',
          message: '全部设置后才能进行提交!'
        })
      }else{
        if(this.flag) {
          return
        }
        this.flag = true
        let uploading = this.$loading({
          text: '正在上传',
          background: 'rgba(0, 0, 0, .8)'
        })
        // 格式化参数
        const params = new URLSearchParams()
        params.append('videourl', `http://v.yangcongv.com/${this.qiNiuKey}`)
        params.append('thumb', this.thumbFile)
        params.append('title', this.videoTitle)
        params.append('subCat', this.subCat.length>10?'':this.subCat)
        params.append('catid', this.catid)
        
        this.$axios.post(`${process.env.API_HOST}index.php?m=usermanager&c=userupload&a=uploadVideo`, params)
        .then(res => {
          if(res.data.result === 1) {
            this.isUploadSuc = false
            this.isSelectFile = false
            this.thumbUrl = ''
            this.channelText = '精确选择分类更有利于推荐'
            uploading.close()
            this.$router.push({
              path: '/index'
            })
            this.$message({
              type: 'success',
              message: '上传成功!'
            })
          }
        })
      }
    },
    // 获取七牛上传凭证
    _getUploadToken() {
      this.$axios.get(`${process.env.API_HOST}/index.php?m=usermanager&c=userloginapi&a=get_qiniu_data`)
      .then(res => {
        this.token = res.data.uptoken
      })
    },
    // 获取频道
    _getChannel() {
      this.$axios.post(`${process.env.API_HOST}index.php?m=usermanager&c=userupload&a=getChannel`)
      .then(res => {
        this.channelList = res.data.data
      })
    },
    // 获取系统封面
    _getVideoThumb() {
      // 格式化参数
      const params = new URLSearchParams()
      params.append('videourl', `http://v.yangcongv.com/${this.qiNiuKey}`)

      this.$axios.post(`${process.env.API_HOST}index.php?m=usermanager&c=usercontent&a=cutPicture`, params)
      .then(res => {
        this.pictures = res.data.pictures
        // console.log(res)
      })
    },
    _readBlobAsDataURL(blob) {
      var reader = new window.FileReader()
      reader.readAsDataURL(blob)
      reader.onloadend = function() {
        return reader.result
      }
    },
    ...mapMutations({
      setVideoFile: 'SET_VIDEOFILE'
    })
  },
  created() {
    this._getChannel()
  },
  computed: {
    ...mapGetters([
      'videoFile'
    ])
  },
  watch: {
    token(newToken) {
      this.uploadQiniu()
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~common/scss/variable';
  @import '~common/scss/mixin';
  .upload-detault {
    width: 100%;
    height: 500px;
    overflow: hidden;
    background-color: $color-background;
    .upload-icon {
      width: 100px;
      height: 80px;
      display: block;
      margin: 0 auto;
      margin-top: 110px;
    }
    .upload-btn__wrap {
      width: 164px;
      height: 40px;
      overflow: hidden;
      margin: 0 auto;
      margin-top: 30px;
    }
    .upload-btn {
      width: 164px;
      height: 40px;
      background-color: $color-theme;
      border-radius: 4px;
      color: $color-text-f;
      font-size: 16px;
      line-height: 40px;
      text-align: center;
    }
    .upload-tip {
      text-align: center;
      margin: 0;
      margin-top: 30px;
      color: $color-text-d;
      font-size: 14px;
    }
  }
  .upload-setting {
    .setting-head {
      width: 100%;
      height: 175px;
      background-color: $color-background;
      display: flex;
      align-items: center;
      justify-content: center;
      border-bottom: 2px solid $color-border;
    }
    .right-wrap {
      display: inline-flex;
      margin-left: 20px;
      align-items: flex-end;
      color: $color-text;
      line-height: 1;
    }
    .success-msg {
      margin: 0;
      font-size: 20px;
    }
    .video-title {
      max-width: 286px;
      margin: 0;
      margin-top: 20px;
      font-size: 14px;
      color: $color-text-d;
      @include no-wrap;
    }
    .reset-upload {
      font-size: 14px;
      color: #34669d;
      line-height: 1;
      margin: 0;
      display: inline-block;
      position: relative;
      cursor: pointer;
      .reupload-text {
        margin-left: 35px;
      }
      .reupload {
        opacity: 0;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    }
    .setting-content {
      padding: 40px 20px 60px;
      background-color: $color-background;
    }
    .setting-item__wrap {
      width: 100%;
      // overflow: hidden;
      display: flex;
      // justify-content: space-between;
      align-items: flex-start;
      &+.setting-item__wrap {
        margin-top: 30px;
        .setting-input {
          height: 96px;
        }
        .input-length {
          bottom: 22px;
        }
      }
    }
    .item-name {
      display: inline-block;
      font-size: 16px;
      color: $color-text;
      width: 142px;
    }
    .input-wrap {
      width: 588px;
      position: relative;
      // margin-left: 78px;
      .input-length {
        line-height: 40px;
        text-align: center;
        position: absolute;
        right: 0;
        bottom: 0;
        font-size: 14px;
        color: $color-text-d;
        display: inline-block;
        letter-spacing: 1px;
        padding: 0 20px;
      }
      .input-msg {
        display: block;
        margin-top: 10px;
        font-size: 12px;
        color: $color-text-d;
      }
    }
    .setting-thumb {
      width: 164px;
      height: 118px;
      // margin-left: 78px;
      cursor: pointer;
      .thumb-wrap {
        width: 164px;
        height: 92px;
        overflow: hidden;
        background: url('./thumb_default.jpg') no-repeat;
        background-size: cover;
        font-size: 0;
        overflow: hidden;
      }
      .video-thumb {
        width: 100%;
      }
      .text {
        width: 100%;
        height: 26px;
        display: block;
        font-size: 14px;
        color: $color-text-f;
        text-align: center;
        line-height: 26px;
        background-color: #666;
        &:hover {
          color: $color-text-d;
        }
      }
    }
    .setting-channel {
      width: 248px;
      height: 40px;
      border: 1px solid $color-border;
      padding-left: 15px;
      color: $color-text-d;
      font-size: 14px;
      line-height: 38px;
      // margin-left: 110px;
      border-radius: 4px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      position: relative;
      cursor: default;
      &.setting-channel {
        border-radius: 4px 4px 0 0;
      }
      .channel-arrow__wrap {
        display: table-cell;
        position: relative;
        text-align: center;
        vertical-align: middle;
        width: 25px;
        padding-right: 5px;
        .channel-arrow {
          cursor: pointer;
          border-color: $color-text-d transparent transparent;
          border-width: 5px 5px 2.5px;
          border-style: solid;
          display: inline-block;
          width: 0;
          height: 0;
          &:hover {
            border-color: #666 transparent transparent;
          }
        }
      }
      .channel-list {
        width: 248px;
        position: absolute;
        left: -1px;
        top: 38px;
        background-color: $color-background;
        z-index: 999;
        border: 1px solid $color-border;
        padding: 5px 10px;
        font-size: 0;
        line-height: 1;
        box-sizing: border-box;
        .channel-item {
          display: inline-block;
          font-size: 12px;
          color: $color-text-d;
          padding: 10px;
          cursor: pointer;
          &:hover {
            background-color: $color-border;
          }
        }
      }
    }
    .content-bottom {
      width: 100%;
      margin-top: 64px;
      font-size: 0;
      text-align: center;
      cursor: pointer;
      .bottom-btn {
        width: 140px;
        height: 40px;
        border-radius: 4px;
        font-size: 16px;
        background-color: $color-background;
        display: inline-block;
        margin-right: 20px;
        line-height: 40px;
        &.submit {
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
  .masker {
    position: fixed;
    width: 100%;
    right: 0;
    left: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, .5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    .upload-progress__panel {
      width: 700px;
      height: 161px;
      background-color: $color-background;
      border-radius: 6px;
      padding: 0 50px;
      position: relative;
      .progress {
        margin-top: 80px;
        transform: translate3d(0, -50%, 0);
      }
      .tips {
        width: 100%;
        text-align: right;
        color: $color-text;
        font-size: 16px;
        margin: 0;
        position: absolute;
        right: 50px;
        bottom: 30px;
      }
    }
    .setting-thumb__panel {
      width: 900px;
      background-color: $color-background;
      border-radius: 8px;
      animation: scale .25s 1 ease-in-out;
      overflow: hidden;
      position: relative;
      .panel__close {
        background-color: transparent;
        position: absolute;
        right: 18px;
        top: 12px;
        padding: 4px 0 4px 18px;
        border-left: 1px solid #e9e9e9;
        z-index: 1000;
        .close__icon {
          width: 100%;
          cursor: pointer;
        }
      }
      .panel__header {
        padding: 0 20px;
        border-bottom: 2px solid $color-border;
        position: relative;
        font-size: 0;
        .tab-item {
          font-size: 16px;
          color: $color-text;
          display: inline-block;
          padding: 15px 2px;
          border-bottom: 2px solid transparent;
          transform: translate3d(0, 2px, 0);
          cursor: pointer;
          &+.tab-item {
            margin-left: 45px;
          }
          &.tab-selected {
            border-bottom: 2px solid $color-theme-d;
            color: $color-theme-d;
          }
        }
      }
      .cropper-wrap {
        .cropper-inner {
          padding: 20px;
          background-color: $color-background-g;
          display: flex;
          justify-content: center;
          .cropper {
            width: 380px;
            height: 380px;
          }
          .cropper-img__wrap {
            margin-left: 20px;
            width: 172px;
            display: inline-flex;
            flex-direction: column;
            align-items: center;
            .preview-img {
              width: 100%;
              height: 96px;
              overflow: hidden;
              margin-top: 100px;
            }
            .cropper-img {
              width: 100%;
              height: 100%;
              display: block;
            }
            .reset-upload {
              padding: 10px;
              color: #34669d;
              font-size: 12px;
            }
          }
        }
      }
      .footer-btns {
        padding: 20px 0;
        background-color: #fff;
        font-size: 0;
        text-align: center;
        cursor: pointer;
        .bottom-btn {
          width: 140px;
          height: 40px;
          border-radius: 4px;
          font-size: 16px;
          background-color: $color-background;
          display: inline-block;
          margin-right: 20px;
          line-height: 40px;
          &.submit {
            background-color: $color-theme;
            color: $color-text-f;
          }
          &.cancel {
            background-color: $color-border;
            color: $color-text-d;
          }
        }
      }
      .uploader-bg {
        height: 234px;
        background: url('./uploader_bg.jpg') no-repeat 50%;
      }
      .setting-thumb {
        text-align: center;
      }
      .uploader-note {
        padding-top: 12px;
        color: $color-text-d;
        font-size: 14px;
        text-align: center;
        .tips {
          margin: 0;
          text-align: center;
        }
        .note-msg {
          max-width: 620px;
          margin: 20px;
          display: inline-block;
          font-size: 13px;
          color: #ed4040;
          line-height: 20px;
          border: 1px solid $color-border;
          border-radius: 4px;
          background-color: $color-background-g;
          padding: 12px 20px;
          text-align: left;
        }
      }
      .thumb-list {
        padding: 20px 15px;
        background-color: $color-background-g;
        margin: 0;
        font-size: 0;
        margin-bottom: -18px;
        max-height: 450px;
        overflow-y: auto;
        .list-item {
          width: 200px;
          min-height: 112px;
          height: auto;
          cursor: pointer;
          list-style: none;
          display: inline-block;
          position: relative;
          margin: 0 9px 18px;
          .item-img {
            width: 100%;
          }
          .hover__mask {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            background-color: $color-background-d;
            display: none;
          }
          &:hover > .hover__mask {
            display: block;
          }
          &.selected {
            .hover__mask {
              display: block;
              background: $color-background-d url('./selected_thumb.png') no-repeat 50%;
            }
          }
        }
      }
    }
  }
  @keyframes scale {
    from {
      transform: scale(0)
    }
    to {
      transform: scale(1)
    }
  }
</style>

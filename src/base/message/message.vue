<template>
  <div class="message-wrap">
    <c-header :tab="tab" :active="active"></c-header>
    <div class="message-inner">
      <ul class="message-list">
        <li class="null-data" v-if="!messageList.length">
          <img src="./msgs_icon.png" alt="" class="msg-icon">
          <span class="msg">暂无通知消息</span>
        </li>
        <li class="message-item" v-for="item in messageList" :key="item.id">
          <img src="./msg_icon.png" alt="" class="message-icon">
          <div class="message-content">
            <p class="message-text">{{item.message}}</p>
            <span class="message-date">{{item.createtime}}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import CHeader from 'base/c-header/c-header'
import { mapMutations } from 'vuex'
export default {
  components: {
    CHeader
  },
  data() {
    return {
      tab: ['消息中心'],
      active: 0,
      messageList: []
    }
  },
  methods: {
    _getMessage() {
      this.$axios.post(`${process.env.API_HOST}index.php?m=usermanager&c=usernews&a=getNotice`)
      .then(res => {
        this.messageList = res.data.data
        // console.log(res)
      })
    },
    ...mapMutations({
      setMsgNum: 'SET_MSGNUM'
    })
  },
  created() {
    this._getMessage()
    this.setMsgNum(null)
  }
}
</script>

<style lang="scss" scoped>
  @import '~common/scss/variable';
  .message-wrap {
    width: 100%;
    background-color: $color-background;
    position: relative;
    font-size: 0;
    .null-data {
      text-align: center;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate3d(-50%, -50%, 0);
      .msg-icon {
        display: inline-block;
      }
      .msg {
        font-size: 14px;
        color: $color-text-d;
        display: block;
        margin-top: 30px;
      }
    }
    .message-inner {
      min-height: 500px;
    }
    .message-item {
      padding: 14px 20px;
      display: flex;
      align-items: center;
      .message-icon {
        width: 22px;
        height: 23px;
        display: inline-block;
        margin-right: 17px;
      }
      .message-content {
        font-size: 14px;
        color: $color-text;
      }
      .message-text {
        margin: 0;
      }
      .message-date {
        display: block;
        margin-top: 10px;
        color: $color-text-d;
      }
    }
  }
</style>

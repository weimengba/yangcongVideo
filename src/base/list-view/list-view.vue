<template>
  <div class="list-view">
    <div class="null-data" v-if="!data.length">
      <img src="./video_icon.png" alt="" class="msg-icon">
      <span class="msg">暂无视频</span>
    </div>
    <div class="list-item" v-for="(item, index) in data" :key="item.id">
      <div class="video-wrap">
        <img :src="item.thumb" alt="" class="poster">
        <span class="duration">{{item.duration}}</span>
      </div>
      <div class="video-info">
        <p class="video-title">{{item.title}}</p>
        <div class="abstruct">
          <span class="article-status">{{articleStatus(item.status)}}</span>
          <span class="date">{{item.createtime}}</span>
        </div>
        <div class="count">
          <span class="plays">播放：{{item.views}}</span>
          <span class="delete" @click="deleteItem(index)">
            <i class="el-icon-delete"></i>
          </span>
        </div>
      </div>
    </div>
    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
      <loading v-show="loading"></loading>
      <!-- <p class="nodata-msg" v-show="noData">没有更多数据了......</p> -->
    </div>
  </div>
</template>

<script>
import infiniteScroll from 'vue-infinite-scroll'
import Loading from 'base/loading/loading'
export default {
  directives: {
    infiniteScroll
  },
  props: {
    data: {
      type: Array,
      default: null
    },
    busy: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    noData: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    deleteItem(index) {
      this.$emit('deleteItem', index)
    },
    articleStatus(status) {
      switch(status) {
        case '9':
          return '已通过'
          break;
        case '-3':
          return '未通过'
          break;
        default:
          return '审核中'
          break;
      }
    },
    loadMore() {
      this.$emit('loadMore')
    }
  },
  components: {
    Loading
  }
}
</script>

<style lang="scss" scoped>
  @import '~common/scss/variable';
  @import '~common/scss/mixin';
  .list-view {
    min-height: 500px;
    padding: 0 40px;
    background-color: $color-background;
    position: relative;
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
    .list-item {
      width: 100%;
      padding: 14px 0;
      border-bottom: 1px solid $color-border;
      display: flex;
      align-items: center;
      // cursor: pointer;
    }
    .video-wrap {
      width: 192px;
      height: 108px;
      overflow: hidden;
      position: relative;
      margin-right: 20px;
      cursor: pointer;
      .poster {
        width: 100%;
        height: 100%;
        display: block;
      }
      .duration {
        width: 44px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        border-radius: 20px;
        display: inline-block;
        font-size: 12px;
        color: $color-text-f;
        position: absolute;
        right: 5px;
        bottom: 5px;
        background-color: $color-background-d;
      }
    }
    .video-info {
      flex: 1;
      color: $color-text-d;
      font-size: 0;
      .video-title {
        max-width: 478px;
        font-size: 20px;
        color: $color-text;
        font-weight: 600;
        display: inline-block;
        margin: 0;
        @include no-wrap;
        cursor: pointer;
        &:hover {
          color: $color-text-d;
        }
      }
      .abstruct,
      .count {
        font-size: 14px;
        margin-top: 20px;
        position: relative;
        .article-status {
          &:after {
            content: '·';
            margin: 0 4px;
          }
        }
        .delete {
          position: absolute;
          bottom: 0;
          right: 0;
          font-size: 18px;
          color: $color-text-d;
          cursor: pointer;
        }
      }
    }
    .nodata-msg {
      padding: 10px;
      margin: 0;
      font-size: 14px;
      color: $color-text;
      text-align: center;
    }
  }
</style>



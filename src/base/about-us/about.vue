<template>
  <div class="container">
    <p-header></p-header>
    <div class="content-wrap">
      <div class="con-inner">
        <c-header :tab="tab" :active="active"></c-header>
        <div class="article">
          <h4>洋葱视频平台侵权投诉指引</h4>
          <p class="bottom-space">“洋葱视频”于2018年2月上线，是一款基于数据挖掘技术的个性化推荐短视频产品，它为用户推荐有价值的、个性化的信息，提供连接人与信息的新型服务。</p>
          <p class="bottom-space">在信息爆炸的时代，人们面对的选择越来越多，选择过多，信息超载，也常常会使人无所适从。在这种情况下，推荐引擎便开始展现技术优势，发挥威力。今日头条就是一款基于数据挖掘的推荐短视频产品，洋葱视频没有采编人员，不生产内容，运转核心是一套由代码搭建而成的算法。算法模型会记录用户在洋葱视频上的每一次行为，在海量的视频里知道你感兴趣的内容，甚至知道你有可能感兴趣的内容，并将它们精准推送给你。</p>
          <p class="bottom-space">“洋葱视频”推出了开放的内容创作与分发平台--“洋葱号”，致力于帮助视频内容生产者在移动互联网上高效率地获得更多的曝光和关注。</p>
          <p class="">请下载我们的应用洋葱视频（iPhone、Android版）到你的手机上，不再错过任何你感兴趣的视频！</p>
        </div>
      </div>
    </div>
    <p-footer></p-footer>
  </div>
</template>
<script>
  import PHeader from 'components/p-header/p-header'
  import PFooter from 'components/p-footer/p-footer'
  import CHeader from 'base/c-header/c-header'
  export default {
    data() {
      return {
        tab: ['关于洋葱视频'],
        active: 0
      }
    },
    components: {
      PHeader,
      PFooter,
      CHeader
    }
  }
</script>
<style lang="scss">
  .container {
    position: relative;
    .content-wrap {
      .con-inner {
        margin: 20px auto 60px;
        width: 1000px;
        height: auto;
        background: #fff;
        .article {
          h4 {
            margin: 30px auto 51px;
            font-size:18px;
            color:#333333;
            line-height:18px;
            text-align:center;
          }
          p {
            padding: 0 20px;
            font-size:15px;
            line-height:1.5;
            color:#333333;
            &.bottom-space {
              margin-bottom: 30px;
            }
            &:last-child {
              padding-bottom: 53px;
            }
          }
        }
      }
    }
  }
</style>
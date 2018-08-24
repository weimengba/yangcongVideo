<template>
  <div class="container">
    <p-header></p-header>
    <div class="content-wrap">
      <div class="con-inner">
        <c-header :tab="tab" :active="active"></c-header>
        <div class="article">
          <h4>洋葱视频平台侵权投诉指引</h4>
          <p class="bottom-space">“洋葱视频”是一款基于数据挖掘技术的推荐短视频产品，它为用户推荐有价值的、个性化的短视频，鉴于第三方在平台发布信息数量庞大，洋葱视频作为网络服务提供者，为有效保护权利人，对于其中可能涉嫌侵犯权利人合法权益的信息，根据相关法律法规，特制定本指引。如果您作为权利人认为洋葱视频平台上的信息侵犯了您的合法权益，您可依据本指引通知我们，我们将依法处理。</p>

          <h5>一、 流程</h5>
          <h6>1 投诉通知</h6>
          <p class="bottom-space">权利人认为洋葱视频平台上的某些内容涉嫌侵犯其合法权益，可向洋葱视频发出书面投诉通知。根据《信息网络传播权保护条例》及《最高人民法院关于审理利用信息网络侵害人身权益民事纠纷案件适用法律若干问题的规定》等规定，投诉通知须包含以下内容：</p>
          <p class="title">1.1权利人主体信息和相关证明材料</p>
          <p class="list">(1)权利人的真实姓名、联系电话及邮箱、联系地址、身份证（中国公民）或护照（外国公民）的照片或扫描件等。</p>
          <p class="list">(2) 单位投诉： 权利人的名称、住所地、联系人、联系电话及邮箱、投诉通知（加盖公章）、营业执照（加盖公章）等。</p>
          <p class="list">(3) 代他人投诉： 除上述(1)、(2)中要求的投诉人和权利人双方的主体身份信息和证明材料外，还需提供权利人签名或盖章的委托书。</p>
          <p class="title">1.2 投诉事项</p>
          <p class="list">(1)被投诉内容的完整标题/名称和网络地址、所在位置描述等足以准确定位侵权内容的相关信息。</p>
          <p class="list">(2)被投诉内容侵犯的权利类型（如：信息网络传播权、著作权、名誉权、肖像权等）。</p>
          <p class="title">1.3 构成侵权的初步证明材料</p>
          <p class="list">(1) 著作权侵权投诉 A.著作权权属证明材料：包括但不限于版权证书、商标权证书、专利权证书、作品首次公开发表或发行日期证明材料、创作手稿、经权威机构签发的作品创作时间戳、作品备案证书等。 B. 被投诉内容构成侵权的证明材料：包括但不限于被投诉内容构成对权利人版权、商标权或专利权等权利侵权的有效证明材料。</p>
          <p class="list">(2) 人身权侵权投诉 A. 指明被投诉信息中具体哪些内容涉嫌侵犯权利人的人身权益。 B.被投诉内容对权利人人身权益构成侵权的事实和详细理由说明。</p>
          <p class="title">1.4 权利人保证</p>
          <p class="bottom-space">权利人应在通知书中保证：权利人在通知书中的陈述和所提供材料皆是真实、有效和合法的，保证承担和赔偿洋葱视频因根据权利人通知书对被投诉内容进行处理而遭受的全部损失。</p>
          <h6>2 对合法的投诉通知的处理</h6>
          <p class="title">2.1 洋葱视频收到权利人符合本指引要求的投诉通知后，会尽快依法对被投诉内容做删除或断开链接等处理。</p>
          <p class="title">2.2 对不符合本指引要求的投诉通知，洋葱视频有权在权利人补正前暂不处理。</p>
          <p class="title">2.3 对于侵犯权利人信息网络传播权的投诉通知，洋葱视频在进行处理投诉的同时可依法将投诉通知转送服务对象。若服务对象依法提交了反通知，洋葱视频会将反通知转送权利人。若权利人对反通知持有异议，依据法律规定，权利人应当且能够通过行政或司法程序直接和服务对象处理相关争议。</p>

          <h5>二 注意事项</h5>
          <h6>1 权利人应提供经签章或签名的书面通知书及相关证明材料的扫描件。为确保权利人提供相关材料的真实性和有效性，洋葱视频认为必要时，可要求您提供上述材料的原件，届时还请配合提供。</h6>
          <h6>2 若权利人确有合理理由不能提供证明材料原件的，应提供其复印件（复印件上应有权利人签章或签名）。</h6>
          <h6>3 若证明材料是在外国或港澳台地区形成的，应按照法律规定在所在国家或地区进行公证认证或其他法律要求的 证明程序。</h6>
          <h6>4 若权利人已经对被投诉人提起行政或司法争议解决程序的，请将通知书和相关受理证明、提交给争议解决机构的证据一并提交洋葱视频，这将有利于对投诉的处理。</h6>

          <h5>三 通知方式</h5>
          <p class="bottom-space">权利人可以点击本页面底端的“申请侵权投诉”入口，登陆后，线上填写投诉内容并提交。</p>
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
        tab: ['侵权投诉'],
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
          padding: 0 20px;
          color:#333333;
          h4 {
            // margin: 30px auto 51px;
            margin: 30px auto;
            font-size:18px;
            line-height:18px;
            text-align:center;
          }
          h5 {
            margin: 30px 0;
            font-size: 16px;
            letter-spacing: 1px;
          }
          h6 {
                margin: 0 0 8px;
                font-size: 14px;
                font-weight: 600;
                color: #333;
                line-height: 1.5;
                letter-spacing: 0.8px;
          }
          p {
            // padding: 0 20px;
            font-size:14px;
            line-height:1.5;
            &.bottom-space {
              margin-bottom: 30px;
            }
            &.list {
              margin: 0;
              line-height: 1.8;
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
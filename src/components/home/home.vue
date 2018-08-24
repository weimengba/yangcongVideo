<template>
  <div class="inner-right">
    <div class="inner-right__content">
      <c-header :tab="tab" :active="active" @tabChange="tabChange"></c-header>
      <div class="list-wrap" v-if="active == 0">
        <list-view 
          :data="homeData.list" 
          @deleteItem="deleteItem" 
          @loadMore="loadMore" 
          :busy="disabled" 
          :loading="loading"></list-view>
      </div>
      <div class="list-wrap" v-if="active == 1">
        <list-view 
          :data="homeData.list" 
          @deleteItem="deleteItem" 
          @loadMore="loadMore" 
          :busy="disabled" 
          :loading="loading"></list-view>
      </div>
      <div class="list-wrap" v-if="active == 2">
        <list-view 
          :data="homeData.list" 
          @deleteItem="deleteItem" 
          @loadMore="loadMore" 
          :busy="disabled" 
          :loading="loading"></list-view>
      </div>
    </div>
  </div>
</template>

<script>
import CHeader from 'base/c-header/c-header'
import ListView from 'base/list-view/list-view'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    CHeader,
    ListView
  },
  data() {
    return {
      tab: ['全部视频', '已通过', '未通过'],
      active: 0,
      page: 1,
      homeData: {
        list: []
      },
      disabled: true,
      loading: false,
      refresh: false
    }
  },
  computed: {
    ...mapGetters([
      'videoList'
    ])
  },
  methods: {
    tabChange(idx) {
      if(this.active == idx) {
        return
      }
      this.active = idx
      this.page = 1
      this._getVideoList(idx + 1)
    },
    // 删除前操作
    deleteItem(index) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this._deleteItem(index)
      }).catch(() => {
        
      })
    },
    // 滚动加载数据
    loadMore() {
      if(this.page > this.homeData.pagenum) {
        return
      }
      this.page ++
      this.loading = true
      this._getVideoList(this.active+1)
    },
    // 列表数据
    _getVideoList(idx) {
      const params = new URLSearchParams()
      params.append('status', idx)
      params.append('page', this.page)
      this.$axios.post(`${process.env.API_HOST}index.php?m=usermanager&c=usercontent&a=getVideos`, params)
      .then(res => {
        this.loading = false
        if(this.page == 1) {
          this.homeData = res.data
          this.disabled = false
        }else {
          this.homeData.list = this.homeData.list.concat(res.data.list)
          if(!res.data.list.length) {
            this.disabled = false
          }else {
            this.disabled = true
          }
        }
        // console.log(res)
      })
    },
    // 确认删除
    _deleteItem(idx) {
      // 格式化参数
      const params = new URLSearchParams()
      params.append('videoid', this.homeData.list[idx].id)
      this.$axios.post(`${process.env.API_HOST}index.php?m=usermanager&c=usercontent&a=delVideo`, params)
      .then(res => {
        if(res.data.result === 1) {
          this.homeData.list.splice(idx, 1)
          // this.getVideoList(this.active + 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }
      })
    }
  },
  created() {
    this._getVideoList(1)
  },
  watch: {
    
  }
}
</script>

<style lang="scss" scoped>
</style>

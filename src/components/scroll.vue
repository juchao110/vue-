<template>
    <div class="">
        <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
          <ul>
              <li v-for="p in listDataList">{{p.buy_id}}</li>
          </ul>
        </div>
    </div>
</template>

<script>

export default {
    components:{
    },
    data(){
        return{
            listDataList:[],
            listData:'',
            currentPage:1,
            busy:true
        }
    },
    mounted:function(){
        this.getData(1)
    },
    updated:function(){
        this.busy=false
    },
    methods:{
        getData(page){
            this.$http.get(`wap/match/buy/purchase_list?page=${page}`).then(data => {
                this.listData = data.data.data
                this.listDataList = data.data.data.list
            })
        },
        loadMore () {
            this.busy=false
          console.log('加载更多')
          this.currentPage = this.currentPage + 1
          this.$http.get(`wap/match/buy/purchase_list?page=${this.currentPage}`).then((data) => {
            if (data.data.data.list.length == 0) {
              this.busy = true
            }
            this.purchaseData = data.data.data
            this.listDataList = [...this.listDataList, ...data.data.data.list]
          })
        },
    }
}
</script>

<style lang="css">
</style>

<template>
    <div class="">
        <scroller
        :on-refresh="refresh"
        :on-infinite="infinite"
        ref="scroll">
            <ul>
                <li v-for="p in listDataList">{{p.buy_id}}</li>
            </ul>
        </scroller>
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
        console.log(this.$refs.scroll)
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
        infinite (done) {
        setTimeout(() => {
            console.log('加载更多')
            this.currentPage = this.currentPage + 1
            this.$http.get(`wap/match/buy/purchase_list?page=${this.currentPage}`).then((data) => {
              if (data.data.data.list.length == 0) {
                 done()
                 return
              }
              done()
              this.purchaseData = data.data.data
              this.listDataList = [...this.listDataList, ...data.data.data.list]
          }).catch((err)=>{
              done()
          })
        }, 1500)
    },

        refresh (done) {
        setTimeout(() => {
          this.getData(1)
          done()
        }, 1500)
      },
    }
}
</script>

<style lang="css">
</style>

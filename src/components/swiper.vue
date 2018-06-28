<template>
    <div class="">
        <div class="swiper-container">

            <div class="swiper-wrapper">
                <div class="refresh">释放刷新</div>
                <div class="swiper-slide" v-for="p in listDataList">{{p.buy_id}}</div>
                <div class="loadmore">加载更多</div>
            </div>
            <div class="swiper-scrollbar"></div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
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
        let refreshEnd= false;
    	let times=0;//加载次数
    	let oriSpeed=300
        let page=1
        var swiper = new Swiper('.swiper-container',{
    		speed: oriSpeed,
    		slidesPerView: 'auto',
    		freeMode: true,
            direction: 'vertical',
    		setWrapperSize: true,
    		scrollbar: {
                el: '.swiper-scrollbar',
            },
    		on:{
    			//下拉释放刷新
    			touchEnd: function(){
    				swiper=this
    				var refreshText=swiper.$el.find('.refresh')
                    if(this.translate>100){
    	                swiper.setTransition(this.params.speed);
                        swiper.setTranslate(100);
    		            swiper.touchEventsData.isTouched=false;//跳过touchEnd事件后面的跳转(4.0.5)
    		            refreshText.html('刷新中')

    		            swiper.allowTouchMove=false;
    					setTimeout(function(){//模仿AJAX
                            swiper.removeAllSlides();
                            axios.get(`http://sapi.ezhaoge.com/api/v1/wap/match/buy/purchase_list?page=${page}`).then(data => {
                                this.listData = data.data.data
                                this.listDataList = data.data.data.list
                                refreshText.html('刷新完成');
        						refreshEnd=true;
        						swiper.allowTouchMove=true;
                            })
    					},1000)

                     }

                },
    			touchStart: function(){
    				if(refreshEnd==true){
                        this.$el.find('.refresh').html('释放刷新');
    					refreshEnd=false;
    				}
                },

    			//加载更多
    			momentumBounce: function(){//非正式反弹回调函数，上拉释放加载更多可参考上例
    				swiper=this
    				//slidesheight=0;
    				//for(h=0;h<swiper.slides.length;h++){
    				//	slidesheight+=swiper.slides[h].offsetHeight;
    				//}
    				//endTranslate=this.height-slidesheight-20
    				//if(this.translate < endTranslate){}
    				if(swiper.translate<-100){

    					swiper.allowTouchMove=false;//禁止触摸
    					swiper.params.virtualTranslate=true;//定住不给回弹
                        setTimeout(function(){//模仿AJAX
    					    for(let m=0;m<20;m++){
    					        swiper.appendSlide('<div class="swiper-slide">moreSlide'+(times*20+m+1)+'</div>');
    						}
    						swiper.params.virtualTranslate=false;
    						swiper.allowTouchMove= true;
    						times++
    				    },1000)

    				}
    			},
    		}
    	});
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

<style>
    html, body {
      position: relative;
      height: 100%;
    }
    body {
      background: #eee;
      font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
      font-size: 14px;
      color:#000;
      margin: 0;
      padding: 0;
    }
    .swiper-container {
      width: 100%;
	  height:100%;
    }
    .swiper-slide {
      text-align: center;
      font-size: 18px;
      background: #fff;
	  height:100px;
	  line-height:100px;
      /* Center slide text vertically */
      display: -webkit-box;
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      -webkit-justify-content: center;
      justify-content: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      -webkit-align-items: center;
      align-items: center;
    }
	.refresh{
		position:absolute;
		line-height:100px;
		bottom:100%;
		text-align:center;
		width:100%;}
	.loadmore{
		position:absolute;
		line-height:20px;
		top:100%;
		text-align:center;
		width:100%;
		}
  </style>

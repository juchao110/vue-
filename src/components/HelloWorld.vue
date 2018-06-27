<template>
  <div class="hello">
      <!-- <v-touch v-on:swipeleft="onSwipeLeft()" v-on:pandown="pullDown()" class="touch_div">
          <div class="content">
12313
          </div>
      </v-touch> -->
      <Swiper v-if="list.length > 0" :autoPlay="false" ref="swiper" @transtionend="getIndex">
          <Slide v-for="(item,index) in data" :key="index">
              <div class="" v-for="data in item">
                  {{data.name}}
              </div>
          </Slide>
     </Swiper>
     <button type="button" @click="go" name="button">操作</button>
     <router-link tag="button" to="/upload" type="button" name="button">压缩图片</router-link>
     <router-link tag="button" to="/scroll" type="button" name="button">无限滚动</router-link>
     <router-link tag="button" to="/vuescroll" type="button" name="button">vue-scroll</router-link>
  </div>
</template>

<script>
import { Swiper, Slide } from 'vue-swiper-component';
export default {
    components: {
        Swiper,
        Slide
   },
  name: 'HelloWorld',
  data () {
    return {
        list:[1,2,3,4,1,2,313,'s'],
        data:[
            [{name:1,id:1},{name:2,id:2}],
            [{name:3,id:3},{name:4,id:4}]
        ]
    }
},
methods:{
    go(){
        this.$refs.swiper.prevSlide()
    },
    getIndex(num){
        console.log(num)
        if(num==7){
            alert('最后一页了')
            return
        }
    }

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="css">
.hello .touch_div{
    width: 50%;
    margin: 0 auto;
}
.hello .content{
    background: #ccc;
    height: 30rem
}
.btn-move {
    display: block;
    position: relative;
    width: 70%;
    height: 40px;
    margin: 0 auto;
    border-radius: 20px;
    background: #333333;
}
*{
    /* touch-action: auto!important; */
}

</style>

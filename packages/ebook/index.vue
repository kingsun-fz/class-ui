<template>
  <div class="ebook-wrap">
    <swipe v-show="show" class="ebook" ref="mySwipe" :auto="0" :defaultIndex="defaultPage" :continuous="false" @change="changeSwipe">

      <swipe-item :data-index="index/2" v-if="index % 2 === 0" v-for="(book, index) in bookList">
          <section :class="['left', 'page' + book['pageId']]" :data-page="book['pageId']" :data-original="book['pageImg']">
            第{{index+1}}页

            <a class="spot_reads" href="javascript: void(0)" v-if="book['buttons']" v-for="btn in (book.buttons && book.buttons.button)" @click="playAudio" :data-sort="btn['id']" :data-voicePath="btn['soundsrc']" :style="`width: ${btn['width']*pxRate}px;height:${btn['height']*pxRate}px;left: ${btn['x']*pxRate}px;top: ${btn['y']*pxRate}px;`"></a>

          </section>
          <section :class="['right', 'page' + bookList[index+1]['pageId']]" v-if="bookList[index+1]" :data-page="bookList[index+1]['pageId']" :data-original="bookList[index+1]['pageImg']">
            第{{index+2}}页

            <a class="spot_reads" href="javascript: void(0)" v-if="bookList[index+1]['buttons']" v-for="btn in (bookList[index+1].buttons && bookList[index+1].buttons.button)" @click="playAudio" :data-sort="btn['id']" :data-voicePath="btn['soundsrc']" :style="`width: ${btn['width']*pxRate}px;height:${btn['height']*pxRate}px;left: ${btn['x']*pxRate}px;top: ${btn['y']*pxRate}px;`"></a>

          </section>
      </swipe-item>

    </swipe>
    <audio id="audio">
      <source type="audio/mpeg">
    </audio>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /*@import "../../codeBlocks/water.css";*/
  .ebook-wrap {
    width: 100%;
    height: 100%;
    display: flex;
    align-items:center; /*垂直居中*/
    justify-content: center;
  }
  .ebook {
    /*margin: 0 auto;*/
    padding: .2rem;
    box-shadow: 0 0 15px #ccc;
    box-sizing: border-box;
    color: #fff;
    text-align: center;
  }
  .ebook li section {
    float: left;
    color: #ff0000;
    font-size: 30px;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: relative;
  }

  .ebook li section.left {
    /*background-color: rebeccapurple;*/
  }

  .ebook li section.right {
    /*background-color: olivedrab;*/
  }

  .ebook li section.left, .ebook li section.right {
    width: 50%;
    height: 100%;
  }

  /*点读样式*/
  .ebook .spot_reads {
    position: absolute;
    display: inline-block;
    box-sizing: border-box;
    z-index: 10;
  }

  .ebook .spot_reads.active {
    border: 2px solid #ff0000;
    border-radius: 10px;
  }
  /*水滴样式*/
  .ebook li section div.icon {
    background-size: 100%;
  }

  #audio {
    display: none;
  }
</style>

<script>
  import Swipe from './swipe.vue'
  import SwipeItem from './swipe-item.vue'
  export default {
    name: 'ebook',
    data() {
      return {
        bookList: [],
        pxRate: 0,
        show: false,
        defaultPage: 0,
        audioStatus: 'paused',
        audio: null
      }
    },
    components: {
      Swipe,
      SwipeItem
    },
    mounted () {
      this.audio = this.$el.querySelector('#audio')
      this.initBookWrap()
      window.addEventListener('resize', ()=>{
        this.initBookWrap()
      })
    },
    methods: {
      // 页码跳转
      goto(index) {
        let dom = this.$el.querySelector(`section.page${index}`)
        let idx = Number.parseInt(dom.parentNode.getAttribute('data-index'))
        this.$refs.mySwipe.goto(idx);
      },

      // 上一页
      prev () {
        this.$refs.mySwipe.prev();
      },

      // 下一页
      next () {
        this.$refs.mySwipe.next();
      },

      // 页码变换
      changeSwipe(newIndex, oldIndex) {
        let n = Number.parseInt(this.$el.querySelectorAll('li')[newIndex].querySelector('section.left').getAttribute('data-page'))
        let oDom = this.$el.querySelectorAll('li')[oldIndex]
        let o = Number.parseInt(oDom.querySelector('section.left').getAttribute('data-page'))

        /*切换电子书关闭点读的声音*/
        let audio = this.audio
        if(this.audioStatus === 'playing') {
          audio.pause()
          let aDom = oDom.querySelector('.active')
          aDom && aDom.classList.remove('active')
        }

        /*返回要懒加载的书页*/
        let lazyArr = []
        let tArr = [newIndex - 2, newIndex - 1, newIndex, newIndex + 1, newIndex + 2, newIndex + 3]

        tArr.forEach(item=>{
          if(this.needLazyLoad(item)) {
            lazyArr.push(item)
          }
        })

        this.$emit('change', n, o, lazyArr)
      },

      // 初始化电子书页
      initData (bookList) {
        this.bookList = bookList
        this.show = true
      },

      // 初始化页码
      initGoto (index) {
        // 计算页码所在的屏
        let dom = this.$el.querySelector(`section.page${index}`)
        let idx = Number.parseInt(dom.parentNode.getAttribute('data-index'))
        this.defaultPage = idx
      },

      // playAudio
      playAudio (e) {
        let dom = e.target
        let url = dom.getAttribute('data-voicePath')
        let audio = this.audio

        audio.addEventListener("playing", ()=>{
          this.audioStatus = "playing"
        })
        audio.addEventListener("pause", ()=>{
          this.audioStatus = "paused"
        })

        if(this.audioStatus === 'playing') {
          audio.pause()
          if(dom.classList.contains('active')) {
            dom.classList.remove('active')
            return
          }
          let aDom = this.$el.querySelector('.is-active').querySelector('.active')
          aDom && aDom.classList.remove('active')
        }
        dom.classList.add('active')
        audio.addEventListener('ended', ()=>{
          dom.classList.remove('active')
        })
        audio.querySelector('source').setAttribute('src', url)
        audio.load()
        audio.currentTime = 0
        audio.volume = 1
        audio.play()
      },

      // 检测当前页码是否需要懒加载
      needLazyLoad (num) {
        let dom = this.$el.querySelector(`section.page${num}`)
        if(!!dom) {
          return !dom.getAttribute('style')
        }else {
          return false
        }
      },

      // init bookWrap
      initBookWrap () {
        let bookRate = 1046 / 747; //教材内页图片比例，宽/高
        let w = document.body.offsetWidth
        let h = document.body.offsetHeight
        let bookH = h-20
        let bookW = Number.parseInt(bookH*bookRate)
        if(bookW > w) {
          bookW = w
          bookH = Number.parseInt(w/bookRate)
        }
        this.pxRate = (bookW/747).toFixed(2)
        this.$el.querySelector('.ebook').setAttribute('style', `width: ${bookW}px;height: ${bookH}px;`)
      }
    }
  }
</script>

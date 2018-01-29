<template>
  <div class="popup" v-show="popupShow">
    <section class="mask"></section>
    <header :class="popupType[config.type]" v-show="toolbarShow">
      <button v-if="popupType[config.type] === 'button'" @click="closePopup">{{menuList.close|t}}</button>
      <span v-if="popupType[config.type] === 'toolbar'" class="title">Let's study</span>
      <span v-if="popupType[config.type] === 'toolbar'" class="left close" @click="closePopup"></span>
      <button v-if="config.send" class="right">{{menuList.sendOver|t}}</button>
      <button v-if="config.commit" class="right">{{menuList.submission|t}}</button>
    </header>
    <iframe id="frame" name="OpenAct" src="http://183.47.42.218:8888/2017/11/07/a01389a5-6a69-4924-a58e-cd8da3f6f3f0/Let's study/Let's study.html?domainName=192.168.3.2:4322/PreLesson/Page&maxW=1920&maxH=949&hostName=192.168.3.2:4322&isExeUserAgent=false" frameborder="0"></iframe>
  </div>
</template>
<style scoped>
  .popup {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 110;
  }
  .popup iframe, .popup .mask {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
  }
  .popup .mask {
    height: 100%;
    background-color: #fff;
  }

  .popup header {
    position: absolute;
    z-index: 120;
    color: #fff;
  }
  /*状态栏*/
  .popup header.toolbar {
    left: 0;
    top: 0;
    width: 100%;
    height: .6rem;
    line-height: .6rem;
    background: rgba(255,255,255,0.8);
    box-shadow: 1px -1px 20px 0 #90949c;
  }
  .popup header.toolbar button {
    border: none;
    color: #fff;
    border-radius: .4rem;
    font-size: .2rem;
    background-color: #1976d2;
    padding: .1rem .2rem;
    cursor: pointer;
    margin-top: .06rem;
  }
  .popup header.toolbar .close{
    display: inline-block;
    cursor: pointer;
    width: .6rem;
    height: .6rem;
    margin-left: 0 !important;
    /*background: url(../../assets/close.png) center no-repeat;*/
    background: url(../../assets/close.png) center no-repeat;
  }
  .popup header.toolbar .title{
    color: #000;
    font-weight: bold;
    font-size: 20px;
  }
  .popup header.toolbar .left{
    margin-left: .2rem;
    float: left;
  }
  .popup header.toolbar .right{
    float: right;
    margin-right: .2rem;
  }
  /*关闭按钮*/
  .popup header.button {
    display: inline-block;
    top: .1rem;
    right: .1rem;
  }
  .popup header.button button {
    border-radius: .4rem;
    color: #fff;
    font-size: .2rem;
    background-color: #1976d2;
    border: none;
    padding: .1rem .2rem;
    cursor: pointer;
    outline: 0;
  }
  .popup header.button button:hover {
    transform: scale(1.1);
  }

  .popup iframe {
    height: 100%;
  }
</style>
<script>
  import Vue from 'vue'
  import Utils from '../../lib/utils'
  export default {
    name: 'popup',
    data () {
      return {
        // 提示栏多语言
        menuList: {
            close: ['关闭', 'Close'],
            back: ['返回', 'Back'],
            sendOver: ['发送给学生', 'Send over'],
            resend: ['再次发送', 'Resend'],
            submission: ['提交情况', 'Submission']
        },
        popupShow: false,
        toolbarShow: true,
        popupType: ['button', 'toolbar'],
        wareList: {
          1: ()=>{},
          2: ()=>{},
          3: ()=>{},
          4: ()=>{},
          5: ()=>{},
          6: ()=>{},
          7: ()=>{},
          101: ()=>{Object.assign(this.config, {type: 1})},
          103: ()=>{Object.assign(this.config, {type: 1})},
          104: ()=>{Object.assign(this.config, {type: 1})},
          105: ()=>{Object.assign(this.config, {type: 1})},
          106: ()=>{Object.assign(this.config, {type: 1})},
          107: ()=>{Object.assign(this.config, {type: 1})},
          108: ()=>{Object.assign(this.config, {type: 1})},
          200: ()=>{Object.assign(this.config, {type: 1})},
          300: ()=>{Object.assign(this.config, {type: 1})},
          666: ()=>{Object.assign(this.config, {type: 1})}
        }
      }
    },
    props: {
      config: {
        type: Object,
        default: ()=>{
          return {
            type: 0, // 弹窗类型0 button 弹窗类型1 toolbar
            send: false,  // 是否有下发
            commit: false // 是否有提交详情按钮
          }
        }
      }
    },
    created() {
      Vue.filter('t', (arr)=>{
        let subject = Utils.getQuery('subjectId')
        const CN = 0
        const EN = 1
        if(typeof subject !== 'undefined' && subject === '3') {
          return arr[EN]
        }else {
          return arr[CN]
        }
      })
    },
    mounted() {
      this.wareList['666']()
      setTimeout(()=>{
        this.hideToolbar()
      }, 3000)

    },
    methods: {
      showToolbar () {
        this.toolbarShow = true
        setTimeout(()=>{
          this.hideToolbar()
        }, 3000)
      },
      hideToolbar () {
        this.toolbarShow = false
      },
      closePopup () {
        this.popupShow = false
      },
      setTitle (title) {

      },
      getConfigJSON (url) {

      },
      open (url) {
        this.$el.querySelector('#frame').setAttribute('src', url)
        this.popupShow = true
        this.showToolbar()
      }
    }
  }
</script>

<template>
  <div class="btnGroup">
    <a class="menuA" href="javascript:void(0)" @click="toggleShow('.catalog','reset',$event)">目录</a><a class="prevA" href="javascript:void(0)" @click="prev">上一页<i></i></a><a class="nextA" href="javascript:void(0)" @click="next">下一页</a><a class="fullA" href="javascript:void(0)" @click="toggleShow('.toolBar','reset',$event)"><i></i></a>
  </div>
</template>

<script>

  export default {
    name: 'BtnGroup',
    methods: {
      //获取dom节点
      getDom(obj) {
        return document.querySelector(obj)
      },
      //显隐模块 dom-dom结构、className-切换class、e-点击对象
      toggleShow(dom,className,e) {
        let _dom = this.getDom(dom)
        let classN = className
        let _this = e.currentTarget;
        let b = _dom.classList.contains(classN)
        if (b)
          _dom.classList.remove(classN)
        else
        _dom.classList.add(classN)
      },
      //上一页
      prev () {
        this.$emit('prev');
      },
      //下一页
      next () {
        this.$emit('next');
      }
    }
  }
</script>

<style scoped>
  .btnGroup{
      width:100%;
      height:48px;
      position:fixed;
      left:0;
      bottom:10px;
      display:inline-block;
      text-align:center;
      /*background-color:rgba(59,89,152,0.85);*/
  }
  .btnGroup a{
      height:100%;
      line-height:48px;
      color:#fff;
      font-size:16px;
      vertical-align:top;
  }
  .btnGroup a.menuA{
      padding:14px 30px;
      margin:0 20px;
      border-radius:38px;
      background-color:rgba(18,29,52,0.4);
  }
  .btnGroup a.prevA{
      padding:14px 15px 14px 35px;
      background:rgba(18,29,52,0.4) url(../assets/toolsIco03.png) no-repeat 15px 14px;
      border-bottom-left-radius:48px;
      border-top-left-radius:48px;
      color:#fff;
      position:relative;
  }
  .btnGroup a.prevA i{
      border-left:1px #fff solid;
      display:inline-block;
      height:30px;
      position:absolute;
      top:9px;
      right:0;
  }
  .btnGroup a.nextA{
      padding:14px 35px 14px 15px;
      background:rgba(18,29,52,0.4) url(../assets/toolsIco03.png) no-repeat -186px 14px;
      border-bottom-right-radius:48px;
      border-top-right-radius:48px;
      color:#fff;
  }
  .btnGroup a.fullA{
      font-size:0;
      padding:24px;
      margin:0 20px;
      border-radius:48px;
      background-color:rgba(18,29,52,0.4);
      position:relative;
  }
  .btnGroup a.fullA i{
      position:absolute;
      top:11px;
      left:11px;
      width:28px;
      height:28px;
      background:url(../assets/toolsIco03.png) no-repeat left bottom;
  }
  .btnGroup a.fullA.on i{
      background:url(../assets/toolsIco03.png) no-repeat right bottom;
  }
</style>

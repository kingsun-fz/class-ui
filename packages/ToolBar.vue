<template>
  <div class="toolBar">
    <a class="goback" href="#"><i></i>返回</a>
    <h3 class="unitFull">2 金色的草地</h3>
  </div>
</template>

<script>
    export default {
        name: 'ToolBar'
    }
</script>

<style scoped>
    .toolBar{
        width:100%;
        height:60px;
        line-height:60px;
        font-size:20px;
        background-color:rgba(59,89,152,0.6);
        color:#fff;
        text-align:center;
        position:fixed;
        top:-60px;
        transition:top 0.5s;
        -moz-transition:top 0.5s; /* Firefox 4 */
        -webkit-transition:top 0.5s; /* Safari and Chrome */
        -o-transition:top 0.5s; /* Opera */
        left:0;
        z-index:100;
    }
    .toolBar.reset{
      top:0;
      transition:top 0.5s;
      -moz-transition:top 0.5s; /* Firefox 4 */
      -webkit-transition:top 0.5s; /* Safari and Chrome */
      -o-transition:top 0.5s; /* Opera */
    }
    .toolBar a.goback{
        display:inline-block;
        position:absolute;
        top:0;
        left:0;
        height:100%;
        line-height:60px;
        padding-left:2%;
        font-size:18px;
        vertical-align:middle;
        cursor:pointer;
        color:#fff;
    }
    .toolBar a.goback i{
        display:inline-block;
        width:13px;
        height:100%;
        margin-right:10px;
        vertical-align:top;
        cursor:pointer;
        background:url(../assets/toolsIco.png) left center no-repeat;
    }
    .toolBar h3{
        display:inline-block;
        padding:0;
        margin:0;
    }
</style>

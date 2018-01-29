<template>
    <div class="teachMap">
        <div class="mapTab" @click="clickToggle($event)"><i></i></div>
        <h3 class="currentName"><i></i><label>教学地图</label><em></em></h3>
        <div class="jxDiv">
            <div class="jxScroll">
                <div class="sortTab">
                    <div class="modList" v-for="(todo,index) in data">
                      <h4 class="open" @click="changeState($event)"><span class="ico showIco"></span><b>{{ todo.stepName }}</b><em class="setEm"></em></h4>
                      <ul :id="'sortlist'+(index+1)">
                        <li v-for="list in todo.liList" :pageNum="list.pageNum" @click="openSource($event)"><a href="#none">{{ list.sourceName }}</a></li>
                      </ul>
                    </div>
                    <!--<div class="modList">
                        <h4 class="open cur"><span class="ico showIco"></span><b>第一步：课堂导入</b><em class="setEm"></em></h4>
                        <ul id="sortlist2">
                            <li><a href="#none">全体跟读</a></li>
                            <li><a href="#none">全体跟读</a></li>
                        </ul>
                    </div>-->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'TeachMap',
        data () {
            return {
              "data":[
                {
                  "stepName": "第一步：课堂导入",
                  "liList": [
                    {
                      "id": "p_20",
                      "pageNum": 1,
                      "sourceSrc": "bd1c19e7-b468-4092-98ec-c40827ea6ef6",
                      "sourcetype": "6",
                      "comeFrom": "ModResource",
                      "randId": "1516175282984",
                      "sourceName": "观潮-动画"
                    },
                    {
                      "id": "p_53",
                      "pageNum": 2,
                      "sourceSrc": "8e2ad642-e8ff-4bed-8fd2-f9927aaca14c",
                      "sourcetype": "28",
                      "comeFrom": "ModResource",
                      "randId": "1516175287888",
                      "sourceName": "观潮"
                    }
                  ]
                },
                {
                  "stepName": "第二步：课堂导入",
                  "liList": [
                    {
                      "id": "p_20",
                      "pageNum": 3,
                      "sourceSrc": "bd1c19e7-b468-4092-98ec-c40827ea6ef6",
                      "sourcetype": "6",
                      "comeFrom": "ModResource",
                      "randId": "1516175282984",
                      "sourceName": "观潮-动画"
                    },
                    {
                      "id": "p_53",
                      "pageNum": 4,
                      "sourceSrc": "8e2ad642-e8ff-4bed-8fd2-f9927aaca14c",
                      "sourcetype": "28",
                      "comeFrom": "ModResource",
                      "randId": "1516175287888",
                      "sourceName": "观潮"
                    }
                  ]
                }
              ]
            }
        },

        methods: {
          clickToggle (e) {
            let _this = e.currentTarget
            let _obj = _this.parentNode
            let hasClass = _obj.classList.contains('reset')
            if(hasClass)
              _obj.classList.remove('reset')
            else
              _obj.classList.add('reset')
          },
          //展示资源
          openSource (e) {
            /*
            * code````
            * */


            let _this = e.currentTarget
            let index = _this.getAttribute('pageNum')
            let allLi = document.querySelectorAll('.modList ul li')
            allLi.forEach((item)=>{
              item.classList.remove('cur')
            })
            _this.classList.add('cur')
            let allDiv = document.querySelectorAll('.modList')
            allDiv.forEach((item)=>{
              item.classList.remove('cur')
            })
            _this.parentNode.parentNode.classList.add('cur')
            this.$emit('goto',index)
          },
          //步骤的收缩展开
          changeState (e) {
            let _this = e.currentTarget
            if(_this.classList.contains('open')){
              _this.parentNode.classList.add('endNode')
              _this.classList.remove('open')
              _this.nextElementSibling.classList.add('hide')
            }
            else{
              _this.parentNode.classList.remove('endNode')
              _this.classList.add('open')
              _this.nextElementSibling.classList.remove('hide')
            }

          }
        }
    }
</script>

<style scoped>
    .teachMap{
        position:fixed;
        top:0;
        /*left:-176px;*/
        left:-175px;
        transition:left 1s;
        -moz-transition:left 1s; /* Firefox 4 */
        -webkit-transition:left 1s; /* Safari and Chrome */
        -o-transition:left 1s; /* Opera */
        height:100%;
        background-color:#ffffff;
        width:175px;
        z-index:99;
        border-right:1px #999da4 solid;
        -moz-box-shadow:0px 0px 15px #ccc;
        -webkit-box-shadow:0px 0px 15px #ccc;
        box-shadow:0px 0px 15px #ccc;
    }
    .teachMap.reset{
      left:0;
      transition:left 1s;
      -moz-transition:left 1s; /* Firefox 4 */
      -webkit-transition:left 1s; /* Safari and Chrome */
      -o-transition:left 1s; /* Opera */
    }
    .mapTab{
        position:absolute;
        top:50%;
        right:-51px;
        margin-top:-25px;
        height:50px;
        line-height:50px;
        width:50px;
        border:#999da4 solid;
        border-width:1px 1px 1px 0;
        border-bottom-right-radius:50%;
        border-top-right-radius:50%;
        background-color:#fff;
        cursor:pointer;
        box-shadow: 6px 0px 10px rgba(204,204,204,0.5);
        font-size:16px;
    }
    .mapTab i{
        display:inline-block;
        border-style:solid;
        border-width:10px 14px;
        border-color:transparent transparent transparent #999da4;
        margin-left:17px;
        margin-bottom:-5px;
    }
    .teachMap.reset .mapTab i{
        border-color:transparent #999da4 transparent transparent;
        margin-left:-20px;
    }
    .teachMap .jxDiv .jxScroll{
        height:100%;
    }
    .teachMap .currentName{
        color:#ffffff;
        font-size:18px;
        line-height:30px;
        text-align:center;
    }
    .teachMap h3.currentName{
        position:relative;
        height:68px;
        line-height:68px;
        width:100%;
        margin-top:10px;
        text-align:center;
        background-color:#f9a158;
        color:#ffffff;
        outline:none;
        cursor:pointer;
        text-overflow:ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
    .teachMap h3.currentName i{
        display:inline-block;
        width:20px;
        height:24px;
        margin-right:10px;
        background:url(../assets/toolsIco01.png) no-repeat left top;
        vertical-align:middle;
    }
    .teachMap h3.currentName em{
        display:inline-block;
        border-width:7px 6px;
        border-color:#ffe1c9 transparent transparent transparent;
        border-style:solid;
        margin:0 0 -6px 10px;
    }
    .teachMap h3.currentName i{
        background-position:-279px top;
    }

    .jxDiv{
        display:none;
        padding:0 0px 0 5px;
        text-align:center;
    }
    .jxDiv .jxScroll{
        overflow-y:auto;
        padding-bottom:40px;
    }
    .teachMap .jxDiv{
        display:block;
    }

    .sortTab{
        width:100%;
    }
    .sortTab ul{
        display: block;
        margin-left:5px;
    }
    .sortTab ul.hide{
        display: none;
    }
    .sortTab h4{
        font-size:16.8px;
        height:50px;
        line-height:50px;
        display:block;
        color:#000;
        text-align:center;
        padding:0;
        margin:0;
        background:url(../assets/solid.gif) no-repeat  1px center;
        position:relative;
        text-align:left;
        padding-left:22px;
        text-overflow:ellipsis;
        white-space:nowrap;
        overflow:hidden;
    }
    /*.sortTab:first-child h4:first-child{
        background:url(../assets/firstsolid.gif) no-repeat  1px center;
    }*/
    .sortTab:first-child .modList:first-child h4:first-child{
        background:url(../assets/firstsolid.gif) no-repeat  1px center;
    }
    /*.sortTab h4.endNode{
        background:url(../assets/endsolid.gif) no-repeat  1px center;
    }*/
    .sortTab .modList.endNode h4{
        background:url(../assets/endsolid.gif) no-repeat  1px center;
    }
    .sortTab .modList.cur h4{
        color:#FFA04A;
    }
    /*小图标*/
    .sortTab h4 span.ico{
        display:none;
        width:11px;
        height:11px;
        position:absolute;
        left:0px;
        top:19px;
        background:url(../assets/ico.gif) no-repeat  center top;
    }
    .sortTab h4.open span.ico{
        background:url(../assets/ico.gif) no-repeat  center bottom;
    }
    .sortTab h4 span.ico.showIco{
        display:block;
    }
    .sortTab ul{
        min-height:10px;
        background-color:#fff;
        margin:0;
        padding:0;
        display:block;
        overflow:hidden;
    }
    .sortTab ul.close li{
        height:0;
    }
    .sortTab ul.nochild{
        background:#fff url(../assets/solid.gif) no-repeat 1px top;
    }/*没子节点时添加一个线条*/
    .sortTab ul li{
        height:50px;
        line-height:50px;
        font-size:16px;
        list-style:none;
        background:#fff url(../assets/solid.gif) no-repeat 1px center;
        padding-left:22px;
        text-align:left;
        text-overflow:ellipsis;
        white-space:nowrap;
        overflow:hidden;}
    /*.sortTab:last-child li:last-child{
        background:url(../assets/endsolid.gif) no-repeat 1px center;
    }*/
    .sortTab:last-child .modList:last-child li:last-child{
        background:url(../assets/endsolid.gif) no-repeat 1px center;
    }
    .sortTab ul li.lastclose{
        background:none;
    }

    .sortTab ul li a:link,.sortTab ul li a:visited{
        color:#000;
        text-decoration:none;
        font-size:16.8px;
        display:block;
        text-overflow:ellipsis;
        white-space:nowrap;
        overflow:hidden;
    }
    .sortTab ul li.cur a:link,.sortTab ul li.cur a:visited,.sortTab ul li.cur a:hover{
        color:#FFA04A;
    }
</style>

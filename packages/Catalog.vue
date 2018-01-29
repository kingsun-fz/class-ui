<template>
    <div>
        <div class="catalog">
            <ul>
                <li class="module" v-for="(todo,index) in data">
                  <h4 :id="todo.id" :pagestart="todo.StartPage" :pageend="todo.EndPage" @click="goToPage($event)">{{ todo.title }}</h4>
                  <ul>
                    <li class="unitclass" :id="sub.id" :pagestart="sub.StartPage" :pageend="sub.EndPage" v-for="sub in todo.children" @click="goToPage($event)">{{ sub.title}}</li>
                  </ul>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Catalog',
  data () {
    return {
      "success": true,
      "code": 0,
      "message": "",
      "data":[
        {
          "id": 294266,
          "title": "第一单元",
          "children": [
            {
              "id": 304419,
              "title": "第一组",
              "isFolder": false,
              "sord": 0,
              "StartPage": 1,
              "EndPage": 1
            },
            {
              "id": 294267,
              "title": "1 观潮",
              "isFolder": false,
              "sord": 1,
              "StartPage": 2,
              "EndPage": 5
            }
          ],
          "isFolder": true,
          "sord": 52,
          "StartPage": 1,
          "EndPage": 3
        },
        {
          "id": 294292,
          "title": "第五单元",
          "children": [
            {
              "id": 294296,
              "title": "语文园地五",
              "isFolder": false,
              "sord": 6,
              "StartPage": 3,
              "EndPage": 4
            }
          ],
          "isFolder": true,
          "sord": 52,
          "StartPage": 3,
          "EndPage": 4
        }
      ]
    }
  },
  methods: {
    goToPage(e) {
      let _this = e.currentTarget
      let pagestart = _this.getAttribute('pagestart')
      let pageend = _this.getAttribute('pageend')
      console.log('pagestart:'+pagestart+'pageend:'+pageend)
      this.$emit('goto',pagestart)
    }
  }
}
</script>

<style scoped>
    .catalog{
        width:300px;
        height:100%;
        position:fixed;
        top:0;
        left:-300px;
        transition:left 1s;
        -moz-transition:left 1s; /* Firefox 4 */
        -webkit-transition:left 1s; /* Safari and Chrome */
        -o-transition:left 1s; /* Opera */
        z-index:101;
        background-color:rgba(87,112,167,0.85);
    }
    .catalog.reset{
        left:0;
        transition:left 1s;
        -moz-transition:left 1s; /* Firefox 4 */
        -webkit-transition:left 1s; /* Safari and Chrome */
        -o-transition:left 1s; /* Opera */
    }
    .catalog ul{
        padding:0;
        margin:0;
        text-align:left;
    }
    .catalog ul li{
        color:#ffffff;
        min-height:40px;
        line-height:40px;
        border-top:1px #7991af solid;
        cursor:pointer;
        text-overflow:ellipsis;
        white-space:nowrap;
        overflow:hidden;
        font-size:16.8px;
        position:relative;
    }
    .catalog ul li.module h4{
        padding:0 10px 0 20px;
        background-color:rgba(59,89,152,0.85);
    }
    .catalog ul li.unitclass{
        padding:0 10px 0 35px;
    }
</style>

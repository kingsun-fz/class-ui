# ebook组件

> 基于vue的电子书组件@reamd

### 引入
```js
<ebook ref="swipe" @change="changeSwipe"/>

import ebook from './components/ebook'

components: {
      ebook
    }
````

### 暴露的方法
- api列表

| 方法         |     参数类型      |   参数说明    |
| ----------- | ---------------- |------------ |
| initData    | bookList,不可为空 |  电子书数据数组 |
| initGoto    | index,不可为空    |  电子书页码    |
| goto        | index,不可为空    |  电子书页码    |
| prev        | 无               |  无          |
| next        | 无               |  无          |
| changeSwipe |newIndex, oldIndex|  电子书页页码  |
| addWareWater| pageArr, btnArr  |页码数组，水滴数组 |

- 示例

```js
// 电子书初始化
initData (bookList) {
  this.$refs.swipe.initData(bookList)
}

// 电子书页码定位（优化为pageId）
initGoto (index) {
  this.$refs.swipe.initGoto(index)
},

// 电子书页码跳转(优化为pageId)
goto(index) {
  this.$refs.swipe.goto(index);
},

// 上一屏
prev () {
  this.$refs.swipe.prev();
},

// 下一屏
next () {
  this.$refs.swipe.next();
},

// 切换屏(优化为左侧页pageId)
changeSwipe (newIndex, oldIndex) {
  console.log(`swipe from ${oldIndex} to ${newIndex}`);
},

// 增加水滴
addWareWater (pageArr, btnArr) {
  this.$refs.swipe.addWareWater(pageArr, btnArr)
}
```

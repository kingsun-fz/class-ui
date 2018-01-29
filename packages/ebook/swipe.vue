<template>
  <div class="mint-swipe">
    <ul class="mint-swipe-items-wrap" ref="wrap">
      <slot></slot>
    </ul>
  </div>
</template>

<style>
  .mint-swipe {
    overflow: hidden;
    position: relative;
    height: 100%;
  }
  .mint-swipe-items-wrap {
    list-style: none;
    position: relative;
    overflow: hidden;
    height: 100%;
    -webkit-transform: translateZ(0);
    transform: translateZ(0)
  }

  /*子元素*/
  .mint-swipe-items-wrap > li {
    position: absolute;
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
    width: 100%;
    height: 100%;
    display: none;
  }
  .mint-swipe-items-wrap > li.is-active {
    display: block;
    -webkit-transform: none;
    transform: none;
  }

</style>

<script>
  export default {
    name: 'swipe',

    data() {
      return {
        flag: true,
        ready: false,
        dragging: false,
        userScrolling: false,
        animating: false,
        index: 0,
        pages: [],
        timer: null,
        reInitTimer: null,
        noDrag: false
      };
    },

    props: {
      speed: {
        type: Number,
        default: 300
      },

      defaultIndex: {
        type: Number,
        default: 0
      },

      disabled: {
        type: Boolean,
        default: false
      },

      auto: {
        type: Number,
        default: 3000
      },

      continuous: {
        type: Boolean,
        default: true
      },

      noDragWhenSingle: {
        type: Boolean,
        default: true
      },

      prevent: {
        type: Boolean,
        default: false
      },

      propagation: {
        type: Boolean,
        default: false
      }

    },

    created() {
      this.dragState = {};
    },

    mounted() {
    this.ready = true;

    if (this.auto > 0) {
      this.timer = setInterval(() => {
        if (!this.dragging && !this.animating) {
          this.next();
        }
      }, this.auto);
    }

    this.reInitPages();

    let element = this.$el;

    // todo://test
    element.addEventListener('touchstart', (event) => {
      if (this.prevent) {
        event.preventDefault();
      }
      if (this.propagation) {
        event.stopPropagation();
      }
      if (this.animating) return;
      this.dragging = true;
      this.userScrolling = false;
      this.doOnTouchStart(event);
    });
    element.addEventListener('touchmove', (event) => {
      if (!this.dragging) return;
      this.doOnTouchMove(event);
    });
    element.addEventListener('touchend', (event) => {
      if (this.userScrolling) {
        this.dragging = false;
        this.dragState = {};
        return;
      }
      if (!this.dragging) return;
      this.doOnTouchEnd(event);
      this.dragging = false;
    });

    // for mobile
    element.addEventListener('touchstart', this.dragStartEvent);
    element.addEventListener('touchmove', this.dragMoveEvent);
    element.addEventListener('touchend', this.dragEndEvent);

    // for pc
    element.addEventListener('mousedown', this.dragStartEvent);
    document.addEventListener('mousemove', this.dragMoveEvent);
    document.addEventListener('mouseup', this.dragEndEvent);
  },

    methods: {
      once (dom, event, handler) {
        let bHandler = function () {
          handler()
          dom.removeEventListener(event, bHandler)
        }
        dom.addEventListener(event, bHandler)
      },

      addClass (dom, className) {
        dom.classList.add(className)
      },

      removeClass (dom, className) {
        dom.classList.remove(className)
      },

      attr (dom, key, value) {
        if(typeof value === 'undefined') {
          return dom.getAttribute(key)
        }else {
          dom.setAttribute(key, value)
        }
      },

      swipeItemCreated() {
        if (!this.ready) return;

        clearTimeout(this.reInitTimer);
        this.reInitTimer = setTimeout(() => {
          this.reInitPages();
        }, 100);
      },

      swipeItemDestroyed() {
        if (!this.ready) return;

        clearTimeout(this.reInitTimer);
        this.reInitTimer = setTimeout(() => {
          this.reInitPages();
        }, 100);
      },

      translate(element, offset, speed, callback) {
        if (speed) {
          this.animating = true;
          element.style.webkitTransition = '-webkit-transform ' + speed + 'ms ease-in-out';
          setTimeout(() => {
            element.style.webkitTransform = `translate3d(${offset}px, 0, 0)`;
          }, 50);

          let called = false;

          let transitionEndCallback = () => {
            if (called) return;
            called = true;
            this.animating = false;
            element.style.webkitTransition = '';
            element.style.webkitTransform = '';
            if (callback) {
              callback.apply(this, arguments);
            }
          };

          this.once(element, 'webkitTransitionEnd', transitionEndCallback);
          setTimeout(transitionEndCallback, speed + 100); // webkitTransitionEnd maybe not fire on lower version android.
        } else {
          element.style.webkitTransition = '';
          element.style.webkitTransform = `translate3d(${offset}px, 0, 0)`;
        }
      },

      reInitPages() {
        let children = this.$children; // slot里面的组件
        this.noDrag = children.length === 1 && this.noDragWhenSingle;

        let pages = [];
        this.index = this.defaultIndex;

        children.forEach((child, index) => {
          pages.push(child.$el);

          this.removeClass(child.$el, 'is-active'); // 防止用户增加了is-active

          if (index === this.defaultIndex) {
            /*懒加载电子书页代码*/
            this.lazyLoadImg(child.$el, index)

            this.addClass(child.$el, 'is-active');
          }
        });

        this.pages = pages;
      },

      lazyLoadImg (page, index) {
        /*检查并加载电子书页*/
        let newPrevPage = this.$children[index - 1]? this.$children[index - 1].$el:'';
        let newNextPage = this.$children[index + 1]? this.$children[index + 1].$el:'';
        let domArr = [page];
        if(!!newPrevPage){domArr.push(newPrevPage)}
        if(!!newNextPage){domArr.push(newNextPage)}
        domArr.forEach(item=>{
          if(!this.attr(item.querySelector('section'), 'style')){
            let domArr = item.querySelectorAll('section')
            domArr.forEach(tItem=>{
              let imgPath = this.attr(tItem, 'data-original')
//              let img = new Image()
              this.attr(tItem, 'style', `background-image: url(${imgPath})`)
//              img.src = imgPath
            })

          }
        })
      },

      doAnimate(towards, options) {
        if (this.$children.length === 0) return;
        if (!options && this.$children.length < 2) return;

        var prevPage, nextPage, currentPage, pageWidth, offsetLeft;
        var speed = this.speed || 300;
        var index = this.index;
        var pages = this.pages;
        var pageCount = pages.length;

        if (!options || towards === 'goto') {
          options = options || {};
          pageWidth = this.$el.clientWidth;
          currentPage = pages[index];
          if (towards === 'goto') {
            prevPage = options.prevPage;
            nextPage = options.nextPage;
          } else {
            prevPage = pages[index - 1];
            nextPage = pages[index + 1];
          }

          if (this.continuous && pages.length > 1) {
            if (!prevPage) {
              prevPage = pages[pages.length - 1];
            }
            if (!nextPage) {
              nextPage = pages[0];
            }
          }
          if (prevPage) {
            prevPage.style.display = 'block';
            this.translate(prevPage, -pageWidth);
          }
          if (nextPage) {
            nextPage.style.display = 'block';
            this.translate(nextPage, pageWidth);
          }
        } else {
          prevPage = options.prevPage;
          currentPage = options.currentPage;
          nextPage = options.nextPage;
          pageWidth = options.pageWidth;
          offsetLeft = options.offsetLeft;
        }

        var newIndex;

        var oldPage = this.$children[index].$el;

        if (towards === 'prev') {
          if (index > 0) {
            newIndex = index - 1;
          }
          if (this.continuous && index === 0) {
            newIndex = pageCount - 1;
          }
        } else if (towards === 'next') {
          if (index < pageCount - 1) {
            newIndex = index + 1;
          }
          if (this.continuous && index === pageCount - 1) {
            newIndex = 0;
          }
        } else if (towards === 'goto') {
          if (options.newIndex > -1 && options.newIndex < pageCount) {
            newIndex = options.newIndex;
          }
        }

        var callback = () => {
          if (newIndex !== undefined) {
            let newPage = this.$children[newIndex].$el;

            /*懒加载电子书页代码*/
            this.lazyLoadImg(newPage, newIndex)

            this.removeClass(oldPage, 'is-active');
            this.addClass(newPage, 'is-active');

            this.index = newIndex;
            this.$emit('change', newIndex, index);
          }

          if (prevPage) {
            prevPage.style.display = '';
          }

          if (nextPage) {
            nextPage.style.display = '';
          }
        };

        setTimeout(() => {
          if (towards === 'next') {
            this.translate(currentPage, -pageWidth, speed, callback);
            if (nextPage) {
              this.translate(nextPage, 0, speed);
            }
          } else if (towards === 'prev') {
            this.translate(currentPage, pageWidth, speed, callback);
            if (prevPage) {
              this.translate(prevPage, 0, speed);
            }
          } else if (towards === 'goto') {
            if (prevPage) {
              this.translate(currentPage, pageWidth, speed, callback);
              this.translate(prevPage, 0, speed);
            } else if (nextPage) {
              this.translate(currentPage, -pageWidth, speed, callback);
              this.translate(nextPage, 0, speed);
            }
          } else {
            this.translate(currentPage, 0, speed, callback);
            if (typeof offsetLeft !== 'undefined') {
              if (prevPage && offsetLeft > 0) {
                this.translate(prevPage, pageWidth * -1, speed);
              }
              if (nextPage && offsetLeft < 0) {
                this.translate(nextPage, pageWidth, speed);
              }
            } else {
              if (prevPage) {
                this.translate(prevPage, pageWidth * -1, speed);
              }
              if (nextPage) {
                this.translate(nextPage, pageWidth, speed);
              }
            }
          }
        }, 10);
      },

      next() {
        this.doAnimate('next');
      },

      prev() {
        this.doAnimate('prev');
      },

      goto(newIndex) {
        if (this.index === newIndex) return;

        if (newIndex < this.index) {
          this.doAnimate('goto', {
            newIndex,
            prevPage: this.pages[newIndex]
          });
        } else {
          this.doAnimate('goto', {
            newIndex,
            nextPage: this.pages[newIndex]
          });
        }
      },

      doOnTouchStart(event) {
        if (this.noDrag || this.disabled) return;
        let element = this.$el;
        let dragState = this.dragState;
        let touch = event.changedTouches ? event.changedTouches[0] : event;
        //
        dragState.startTime = new Date();
        dragState.startLeft = touch.pageX;
        dragState.startTop = touch.pageY;
        dragState.startTopAbsolute = touch.clientY;
        dragState.pageWidth = element.offsetWidth;
        dragState.pageHeight = element.offsetHeight;

        let prevPage = this.$children[this.index - 1];
        let dragPage = this.$children[this.index];
        let nextPage = this.$children[this.index + 1];

        if (this.continuous && this.pages.length > 1) {
          if (!prevPage) {
            prevPage = this.$children[this.$children.length - 1];
          }
          if (!nextPage) {
            nextPage = this.$children[0];
          }
        }

        dragState.prevPage = prevPage ? prevPage.$el : null;
        dragState.dragPage = dragPage ? dragPage.$el : null;
        dragState.nextPage = nextPage ? nextPage.$el : null;

        if (dragState.prevPage) {
          dragState.prevPage.style.display = 'block';
        }

        if (dragState.nextPage) {
          dragState.nextPage.style.display = 'block';
        }
      },

      doOnTouchMove(event) {
        /*(pageX, offsetX) screenX, clientX*/
        if (this.noDrag || this.disabled) return;
        let dragState = this.dragState;
        let touch = event.changedTouches ? event.changedTouches[0] : event;
        dragState.currentLeft = touch.pageX;
        dragState.currentTop = touch.pageY;
        dragState.currentTopAbsolute = touch.clientY;

        let offsetLeft = dragState.currentLeft - dragState.startLeft;
        let offsetTop = dragState.currentTopAbsolute - dragState.startTopAbsolute;

        let distanceX = Math.abs(offsetLeft);
        let distanceY = Math.abs(offsetTop);
        if (distanceX < 5 || (distanceX >= 5 && distanceY >= 1.73 * distanceX)) { //判断是否垂直滚动
          this.userScrolling = true;
          return;
        } else {
          this.userScrolling = false;
          event.preventDefault();
        }

        offsetLeft = Math.min(Math.max(-dragState.pageWidth + 1, offsetLeft), dragState.pageWidth - 1);

        let towards = offsetLeft < 0 ? 'next' : 'prev';
        if (dragState.prevPage && towards === 'prev') {
          this.translate(dragState.prevPage, offsetLeft - dragState.pageWidth);
        }
        this.translate(dragState.dragPage, offsetLeft);
        if (dragState.nextPage && towards === 'next') {
          this.translate(dragState.nextPage, offsetLeft + dragState.pageWidth);
        }
      },

      doOnTouchEnd() {
        if (this.noDrag || this.disabled) return;

        let dragState = this.dragState;

        let dragDuration = new Date() - dragState.startTime;
        let towards = null;

        let offsetLeft = dragState.currentLeft - dragState.startLeft;
        let offsetTop = dragState.currentTop - dragState.startTop;
        let pageWidth = dragState.pageWidth;
        let index = this.index;
        let pageCount = this.pages.length;

        if (dragDuration < 300) {
          let fireTap = Math.abs(offsetLeft) < 5 && Math.abs(offsetTop) < 5;
          if (isNaN(offsetLeft) || isNaN(offsetTop)) {
            fireTap = true;
          }
          if (fireTap) {
            this.$children[this.index].$emit('tap');
          }
        }

        if (dragDuration < 300 && dragState.currentLeft === undefined) return;

        if (dragDuration < 300 || Math.abs(offsetLeft) > pageWidth / 2) {
          towards = offsetLeft < 0 ? 'next' : 'prev';
        }

        if (!this.continuous) {
          if ((index === 0 && towards === 'prev') || (index === pageCount - 1 && towards === 'next')) {
            towards = null;
          }
        }

        if (this.$children.length < 2) {
          towards = null;
        }

        this.doAnimate(towards, {
          offsetLeft: offsetLeft,
          pageWidth: dragState.pageWidth,
          prevPage: dragState.prevPage,
          currentPage: dragState.dragPage,
          nextPage: dragState.nextPage
        });

        this.dragState = {};
      },

      dragStartEvent(event) {
        if (this.prevent) {
          event.preventDefault();
        }
        if (this.animating) return;
        this.dragging = true;
        this.userScrolling = false;
        this.doOnTouchStart(event);
      },

      dragMoveEvent(event) {
        if (!this.dragging) return;
        this.doOnTouchMove(event);
      },

      dragEndEvent(event) {
        if (this.userScrolling) {
          this.dragging = false;
          this.dragState = {};
          return;
        }
        if (!this.dragging) return;
        this.doOnTouchEnd(event);
        this.dragging = false;
      }
    },

    destroyed() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
      if (this.reInitTimer) {
        clearTimeout(this.reInitTimer);
        this.reInitTimer = null;
      }
    }
  };
</script>

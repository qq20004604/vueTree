/**
* Created by 王冬 on 2017/9/5.
* QQ: 20004604
* weChat: qq20004604
*/

<template>
  <div>
    <div class="line" :style="style" :lv="level" ref="parent">
      <div class="afterBackSpace" :style="itemStyle">
        <div class="content" ref="child">
          <button v-if="data.children" @click="hideOrShow(data)">
            {{data.hidden ? '隐' : '显'}}
          </button>
          <button v-if="!data.children">无</button>
          <span class="text-box" @mouseover="mouseHover" @mouseout="mouseOut">
            <span class="text" :class="{'isMouseover':isMouseover}"
                  :style="textMoveLeft">{{level}}：{{data.name}}
            <span :class="{underline:settings.underLine}"></span></span>
          </span>
        </div>
      </div>
    </div>
    <transition
      v-on:before-enter="beforeEnter"
      v-on:enter="enter"
      v-on:leave="leave">
      <div style="transform-origin: 50% 0;" v-if="!data.hidden">
        <template v-for="(val, k) in data.children">
          <tree-item :data="val" :level="Number(level + 1)" :options="options" :settings="settings"
                     key="{{k}}"></tree-item>
        </template>
      </div>
    </transition>
  </div>
</template>
<style scoped>
  .line {
    display: block;
    overflow: hidden;
    white-space: nowrap;
  }

  .afterBackSpace {
    cursor: pointer;
    position: relative;
  }

  .content {
    position: relative;
    display: inline-block;
    overflow: hidden;
    height: 20px;
    line-height: 20px;
    float: left;
  }

  .content > button {
    height: 20px;
    margin-left: -2px;
  }

  .text-box {
    height: 20px;
    line-height: 20px;
    display: inline-block;
    margin-left: -3px;
    overflow: hidden;
    position: relative;
  }

  .underline {
    position: absolute;
    left: 0;
    bottom: 1px;
    height: 1px;
    z-index: 1;
    width: 0;
    background-color: #fff;
    width: 0%;
  }

  /* duang的特效 */
  .text-box:hover .underline {
    width: 100%;
    transition: width 1s ease;
  }

  .text {
    display: inline-block;
  }
</style>
<script>
  import Velocity from 'velocity-animate'

  export default {
    name: 'tree-item',
    props: {
      data: {
        type: Object
      },
      level: {
        type: Number
      },
      options: {
        type: Object,
        default () {
          return {
            topItemStyle: {},
            itemStyle: {},
            backSpace: 20
          }
        }
      },
      settings: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    data () {
      return {
        itemDefaultStyle: {
          height: '20px',
          lineHeight: '20px'
        },
        val: '',
        isMouseover: false,
        textMoveLeft: {}
      }
    },
    methods: {
      addItem () {
        if (this.val.length === 0) {
          return
        }
        if (!this.data.children) {
          this.$set(this.data, 'children', [])
        }
        this.data.children.push({
          name: this.val
        })
      },
      // 隐藏显示子节点
      hideOrShow (val) {
        if (val.hidden === undefined) {
          this.$set(val, 'hidden', false)
        }
        val.hidden = !val.hidden
      },
      // 过渡动画，过渡过程中点击无效
      beforeEnter (el) {
        if (this.settings.transitions.enabled) {
          el.style.pointerEvents = 'none'
        }
      },
      // 进入时主要执行函数
      enter (el, done) {
        // 这个只执行一次
        if (this.settings.transitions.enabled) {
          // 需要获取真实时间
          let height = el.offsetHeight
          Velocity(el, {scaleY: 0, height: 0}, {duration: 1})
          Velocity(el, {scaleY: 1, height}, {
            duration: this.settings.transitions.enterDuration,
            complete () {
              el.style.pointerEvents = 'auto'
              // 必须额外加下面这句，否则相当于height被设置了，而不是自适应
              el.style.height = ''
              done()
            }
          })
        } else {
          done()
        }
      },
      // 退出时主要执行函数
      leave (el, done) {
        if (this.settings.transitions.enabled) {
          el.style.pointerEvents = 'none'
          Velocity(el, {scaleY: 0, height: 0}, {
            duration: this.settings.transitions.leaveDuration,
            complete () {
              el.style.pointerEvents = 'auto'
              el.style.height = ''
              done()
            }
          })
        } else {
          done()
        }
      },
      // 鼠标移动到结点上时，假如结点显示内容超出范围，则自动左移一段距离
      mouseHover () {
        // 如果没有隐藏超出的，直接返回
        if (!this.settings.isOverflowHidden.enabled) {
          return
        }
        // 这个可以算出来当前有没有超出范围，大于等于0则超出，小于0则未超出范围
        let DOM = this.$refs.parent
        let DOM2 = this.$refs.child
        // offset是额外偏差值，即给动画后的文字的右边留空
        let offset = this.settings.isOverflowHidden.offset
        // 动画时间
        let anitmateTime = this.settings.isOverflowHidden.animateTime
        let result = DOM2.clientWidth + Number(this.settings.backSpace ? this.settings.backSpace : '20') * this.level - DOM.clientWidth + offset
        if (result > 0) {
          this.isMouseover = true
          this.textMoveLeft.transform = `translateX(-${result}px)`
          this.textMoveLeft.transition = `transform ${anitmateTime}s 1s ease`
        }
      },
      mouseOut () {
        if (!this.settings.isOverflowHidden.enabled) {
          return
        }
        this.isMouseover = false
        this.textMoveLeft.transform = `translateX(0)`
        this.textMoveLeft.transition = ``
      }
    },
    computed: {
      itemStyle () {
        let style = {
          paddingLeft: (this.settings.backSpace ? this.settings.backSpace : '20') * this.level + 'px'
        }

        if (this.settings.isOverflowHidden) {
          style['max-width'] = '100%'
          style['overflow-x'] = 'hidden'
          style['text-overflow'] = 'ellipsis'
          style['white-space'] = 'no-wrap'
        }

        style['height'] = this.style.height
        style['line-height'] = this.style.lineHeight
        return style
      },
      style () {
        let style = Object.assign({}, this.options.itemStyle, this.itemDefaultStyle)
        return style
      }
    }
  }
</script>

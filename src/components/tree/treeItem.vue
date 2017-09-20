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
          <div class="btn-box" :style="btnBoxStyle" ref="btnBox">
            <button v-if="data.children" @click="hideOrShow(data)">
              {{data.hidden ? '隐' : '显'}}
            </button>
            <button v-if="!data.children">无</button>
          </div>
          <span class="text-box" @mouseover="mouseHover" @mouseout="mouseOut">
            <span class="text" :class="textClass"
                  :style="textSpan" ref="textSpan">{{level}}：{{data.name}}
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
                     key="{{k}}" ref="item"></tree-item>
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

  .btn-box {
    display: inline-block;
    float: left;
    position: relative;
  }

  .btn-box > button {
    display: inline-block;
    vertical-align: top;
    position: relative;
    top: 50%;
    -webkit-transform: translateY(-50%);
    -moz-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    -o-transform: translateY(-50%);
    transform: translateY(-50%);
  }

  .text-box {
    height: 20px;
    line-height: 20px;
    display: inline-block;
    /*margin-left: -3px;*/
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

  .text-is-ellipsis {
    text-overflow: ellipsis;
    overflow: hidden;
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
    mounted () {
      this.setTextSpanWidth()
    },
    data () {
      return {
        itemDefaultStyle: {
          height: '20px',
          lineHeight: '20px'
        },
        val: '',
        isMouseover: false,
        textSpan: {}
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
        if (!this.settings.isOverflowHidden.enabled || this.settings.isOverflowHidden.isEllipsis) {
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
          this.textSpan.transform = `translateX(-${result}px)`
          this.textSpan.transition = `transform ${anitmateTime}s 1s ease`
        }
        console.log(this.textSpan)
      },
      mouseOut () {
        if (!this.settings.isOverflowHidden.enabled) {
          return
        }
        this.isMouseover = false
        this.textSpan.transform = `translateX(0)`
        this.textSpan.transition = ``
      },
      // 设置文本显示区域的宽度
      setTextSpanWidth () {
        if (this.settings.isOverflowHidden.isEllipsis) {
          let parentDOM = this.$refs.parent
          let btnBoxDOM = this.$refs.btnBox
          let textSpanDOM = this.$refs.textSpan
          let width = parentDOM.clientWidth -
            Number(this.settings.backSpace ? this.settings.backSpace : '20') * this.level -
            btnBoxDOM.clientWidth
          if (width > textSpanDOM.clientWidth) {
            this.$delete(this.textSpan, 'width', width + 'px')
            return
          }
          this.$set(this.textSpan, 'width', width + 'px')
        }
      },
      // 如果改变了根节点的宽度，或者其他需要重绘的情况，需要手动调用这个方法
      resize () {
        // 重绘时需要被触发的函数
        this.setTextSpanWidth()
        if (!this.$refs.item || this.$refs.item.length === 0) {
          return
        }
        this.$refs.item.forEach(item => {
          item.resize()
        })
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
      },
      btnBoxStyle () {
        let style = {}
        style['height'] = this.options.itemStyle.height ? this.options.itemStyle.height : '20px'
        style['line-height'] = this.options.itemStyle.lineHeight ? this.options.itemStyle.lineHeight : '20px'
        return style
      },
      textClass () {
        return {
          'isMouseover': this.isMouseover,
          'text-is-ellipsis': this.settings.isOverflowHidden.enabled && this.settings.isOverflowHidden.isEllipsis
        }
      }
    }
  }
</script>

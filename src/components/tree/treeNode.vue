/**
* Created by 王冬 on 2017/9/5.
* QQ: 20004604
* weChat: qq20004604
*/

<template>
  <div>
    <div class="line" :style="style" :lv="level" ref="parent">
      <div class="afterBackSpace" :style="nodeStyle">
        <div class="content" ref="child">
          <div v-if="settings.openBtn.enabled" class="btn-box" :style="btnBoxStyle" ref="btnBox">
            <!-- 默认图标 -->
            <template v-if="!settings.openBtn.customIcon">
              <span class="btn-span" :style="btnSpanStyle" @click="hideOrShow()">{{isOpened ? '－' : '＋'}}</span>
            </template>

            <!-- 自定义图标 -->
            <template v-if="settings.openBtn.customIcon">

            </template>
          </div>
          <span class="text-box" @mouseover="mouseover" @mouseout="mouseout">
            <span class="text" :class="textClass"
                  :style="textSpan" ref="textSpan">
              <!--{{level}}：-->
              {{data.name}}
            <span :class="{underline:settings.underLine}"></span></span>
          </span>
        </div>
      </div>
    </div>
    <transition
      v-on:before-enter="beforeEnter"
      v-on:enter="enter"
      v-on:leave="leave">
      <div style="transform-origin: 50% 0;" v-if="isOpened">
        <template v-for="(val, k) in data.children">
          <tree-node :data="val" :level="Number(level + 1)" :styleOptions="styleOptions" :settings="settings"
                     key="{{k}}" ref="node"></tree-node>
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

  .open-btn-nochildren {
    white-space: pre;
    display: inline-block;
  }

  .btn-box {
    display: inline-block;
    float: left;
    position: relative;
  }

  .btn-span {
    display: inline-block;
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
  import {
    DOMAnimationWhenBeforeEnter,
    DOMAnimationWhenEnter,
    DOMAnimationWhenLeave,
    whenMouseOver,
    whenMouseOut
  } from './public'

  export default {
    name: 'tree-node',
    props: {
      data: {
        type: Object
      },
      level: {
        type: Number
      },
      styleOptions: {
        type: Object,
        default () {
          return {
            topNodeStyle: {},
            nodeStyle: {},
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
    created () {
      if (this.settings.openBtn.defaultOpened) {
        this.isOpened = true
      } else {
        this.isOpened = false
      }
    },
    mounted () {
      this.setTextSpanWidth()
    },
    data () {
      return {
        nodeDefaultStyle: {
          height: '20px',
          lineHeight: '20px'
        },
        isMouseover: false,
        textSpan: {},
        isOpened: false
      }
    },
    methods: {
      /* addNode () {
        if (this.val.length === 0) {
          return
        }
        if (!this.data.children) {
          this.$set(this.data, 'children', [])
        }
        this.data.children.push({
          name: this.val
        })
      }, */
      // 隐藏显示子节点
      hideOrShow () {
        this.isOpened = !this.isOpened
      },
      // 过渡动画，过渡过程中点击无效
      beforeEnter (el) {
        DOMAnimationWhenBeforeEnter(el, this.settings)
      },
      // 进入时执行函数
      enter (el, done) {
        // 这个只执行一次
        DOMAnimationWhenEnter(el, done, this.settings)
      },
      // 退出时执行函数
      leave (el, done) {
        DOMAnimationWhenLeave(el, done, this.settings)
      },
      // 鼠标移动到结点上时，假如结点显示内容超出范围，则自动左移一段距离
      mouseover () {
        whenMouseOver.call(this, true)
      },
      mouseout () {
        whenMouseOut.apply(this)
      },
      // 设置文本显示区域的宽度
      setTextSpanWidth () {
        let parentDOM = this.$refs.parent
        let btnBoxDOM = this.settings.openBtn.enabled ? this.$refs.btnBox : 0
        let textSpanDOM = this.$refs.textSpan
        let width = parentDOM.clientWidth -
          Number(this.settings.backSpace.enabled ? this.settings.backSpace.value : 20) * this.level -
          this.settings.backSpace.additionalBackSpaceForChildNode -
          btnBoxDOM.clientWidth
        if (width >= textSpanDOM.clientWidth && this.textSpan.width) {
          this.$delete(this.textSpan, 'width', width + 'px')
          return
        }
        if (this.settings.isOverflowHidden.isEllipsis) {
          this.$set(this.textSpan, 'width', width + 'px')
        }
      },
      // 如果改变了根节点的宽度，或者其他需要重绘的情况，需要手动调用这个方法
      resize () {
        // 重绘时需要被触发的函数
        this.setTextSpanWidth()
        if (!this.$refs.node || this.$refs.node.length === 0) {
          return
        }
        this.$refs.node.forEach(node => {
          node.resize()
        })
      }
    },
    computed: {
      nodeStyle () {
        let style = {
          paddingLeft: (this.settings.backSpace.enabled ? this.settings.backSpace.value : 20) * this.level + 'px'
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
        let style = Object.assign({}, this.styleOptions.nodeStyle, this.nodeDefaultStyle)
        style['padding-left'] = this.settings.backSpace.additionalBackSpaceForChildNode + 'px'
        return style
      },
      btnBoxStyle () {
        let style = {}
        style['height'] = this.styleOptions.nodeStyle.height ? this.styleOptions.nodeStyle.height : '20px'
        style['line-height'] = this.styleOptions.nodeStyle.lineHeight ? this.styleOptions.nodeStyle.lineHeight : '20px'
        return style
      },
      textClass () {
        return {
          'isMouseover': this.isMouseover,
          'text-is-ellipsis': this.settings.isOverflowHidden.enabled && this.settings.isOverflowHidden.isEllipsis
        }
      },
      btnSpanStyle () {
        return Object.assign({}, this.btnBoxStyle, {opacity: (this.data.children ? 1 : 0)})
      }
    }
  }
</script>

/**
* Created by 王冬 on 2017/9/20.
* QQ: 20004604
* weChat: qq20004604
*/

<template>
  <div :style="rootStyle" class="root">
    <div class="topNode" :style="topNodeStyle" lv="topNodeStyle" ref="parent">
      <div class="content" :style="contentStyle" ref="child">
        <div v-if="settings.openBtn.enabled" class="btn-box" :style="btnBoxStyle" ref="btnBox">
          <span class="btn-span" :style="btnSpanStyle" @click="hideOrShow()">{{isOpened ? '－' : '＋'}}</span>
        </div>
        <span class="text-box" :style="textBoxStyle" @mouseover="mouseover" @mouseout="mouseout">
              <span class="text" :class="textClass" :style="textStyle"
                    ref="textSpan">
                <!--{{level}}：-->
                {{data.name}}
                <span :class="{underline:settings.underLine}"></span>
              </span>
          </span>
      </div>
    </div>

    <transition
      v-on:before-enter="beforeEnter"
      v-on:enter="enter"
      v-on:leave="leave">
      <div v-if="isOpened" style="transform-origin: 50% 0;">
        <template v-for="(val, key) in data.children">
          <node :data="val" :level="Number(level + 1)" :styleOptions="styleOptions" :settings="settings"
                ref="node"></node>
        </template>
      </div>
    </transition>
  </div>
</template>
<style scoped>

  /* 列表的根结点的样式（可能有多个根结点）（含他的子节点部分） */
  .root {
    min-width: 100%;
  }

  /* 第一层根结点（只有根节点）（不含其它子节点） */
  .topNode {
    width: 100%;
    font-size: 20px;
    background-color: red;
    cursor: pointer;
    position: relative;
    white-space: nowrap;
    overflow: hidden;
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

  .btn-span {
    display: inline-block;
  }

  .text-box {
    height: 20px;
    line-height: 20px;
    display: inline-block;
    /*margin-left: -3px; !*处理空格带来的空白*!*/
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
  import node from './treeNode.vue'
  import {
    DOMAnimationWhenBeforeEnter,
    DOMAnimationWhenEnter,
    DOMAnimationWhenLeave,
    whenMouseOver,
    whenMouseOut
  } from './public'

  export default {
    props: {
      data: {
        type: Object
      },
      styleOptions: {
        type: Object,
        default () {
          return {}
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
        level: 0,
        isMouseover: false, // 当前鼠标是否移动上去了
        textSpan: {},
        isOpened: true
      }
    },
    methods: {
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
        whenMouseOver.apply(this)
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
          this.settings.backSpace.additionalBackSpaceForRootNode -
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
      defaultRootStyle () {
        let style = {}
        // 如果overflow隐藏，那么添加overflow
        if (this.settings.isOverflowHidden.enabled) {

        }
        return style
      },
      rootStyle () {
        if (this.styleOptions.listStyle) {
          return Object.assign(this.styleOptions.rootStyle, this.defaultRootStyle)
        } else {
          return this.rootStyle
        }
      },
      topNodeStyle () {
        let style = {}
        style['height'] = this.styleOptions.topNodeStyle.height ? this.styleOptions.topNodeStyle.height : '40px'
        style['line-height'] = this.styleOptions.topNodeStyle.lineHeight ? this.styleOptions.topNodeStyle.lineHeight : '40px'
        style['padding-left'] = this.settings.backSpace.additionalBackSpaceForRootNode + 'px'
        if (this.styleOptions.topNodeStyle) {
          return Object.assign({}, this.styleOptions.topNodeStyle, style)
        } else {
          return style
        }
      },
      contentStyle () {
        let style = {}
        style['height'] = this.styleOptions.topNodeStyle.height ? this.styleOptions.topNodeStyle.height : '40px'
        style['line-height'] = this.styleOptions.topNodeStyle.lineHeight ? this.styleOptions.topNodeStyle.lineHeight : '40px'
        return style
      },
      btnBoxStyle () {
        let style = {}
        style['height'] = this.styleOptions.topNodeStyle.height ? this.styleOptions.topNodeStyle.height : '40px'
        style['line-height'] = this.styleOptions.topNodeStyle.lineHeight ? this.styleOptions.topNodeStyle.lineHeight : '40px'
        return style
      },
      textBoxStyle () {
        let style = {}
        style['height'] = this.styleOptions.topNodeStyle.height ? this.styleOptions.topNodeStyle.height : '40px'
        style['line-height'] = this.styleOptions.topNodeStyle.lineHeight ? this.styleOptions.topNodeStyle.lineHeight : '40px'
        return style
      },
      textStyle () {
        let style = {}
        style['height'] = this.styleOptions.topNodeStyle.height ? this.styleOptions.topNodeStyle.height : '40px'
        style['line-height'] = this.styleOptions.topNodeStyle.lineHeight ? this.styleOptions.topNodeStyle.lineHeight : '40px'
        return Object.assign({}, this.textSpan, style)
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
    },
    components: {
      node
    }
  }
</script>

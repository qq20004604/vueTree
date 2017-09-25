/**
* Created by 王冬 on 2017/9/20.
* QQ: 20004604
* weChat: qq20004604
*/

<template>
  <div :style="rootStyle" class="root">
    <div class="topNode" :style="topNodeStyle" lv="topNodeStyle" ref="parent">
      <div class="content" :style="contentStyle">
        <div class="btn-box" :style="btnBoxStyle" ref="btnBox">
          <!-- 点击下拉图标组 -->
          <template v-if="settings.openBtn.enabled">
            <!-- 默认图标 -->
            <template v-if="!settings.openBtn.customIcon">
              <span class="btn-span" :style="dropBtnStyle" @click="hideOrShow()">{{isOpened ? '－' : '＋'}}</span>
            </template>

            <!-- 自定义图标 -->
            <template v-if="settings.openBtn.customIcon">
              <!-- 有子节点时 -->
              <template v-if="data.children">
                <!-- 自定义打开 -->
                <img v-if="isOpened" :src="settings.openBtn.openedIcon" alt="" :style="dropBtnStyle"
                     @click="hideOrShow()">
                <!-- 自定义关闭 -->
                <img v-if="!isOpened" :src="settings.openBtn.closedIcon" alt=""
                     :style="dropBtnStyle"
                     @click="hideOrShow()">
              </template>
              <!-- 无子节点时 -->
              <template v-if="!data.children">
                <!-- 关闭自定义图标（显示空白） -->
                <template v-if="!settings.openBtn.noChildIcon.enabled">
                  <img class="openbtn-nochildren" :src="settings.openBtn.noChildIcon.defaultImage" alt=""
                       :style="dropBtnStyle">
                </template>
                <!-- 打开自定义图标 -->
                <template v-if="settings.openBtn.noChildIcon.enabled">
                  <!-- 统一使用指定自定义图标 -->
                  <img v-if="settings.openBtn.noChildIcon.useDefaultImage"
                       class="openbtn-nochildren" :src="settings.openBtn.noChildIcon.defaultImage" alt=""
                       :style="btnBoxStyle">
                  <!-- 使用用户自定义图标 -->
                  <template v-if="!settings.openBtn.noChildIcon.useDefaultImage">
                    <!-- 有用户自定义图标时，使用用户自定义图标 -->
                    <img v-if="data[settings.openBtn.noChildIcon.customIconKey]" class="openbtn-nochildren"
                         :src="data[settings.openBtn.noChildIcon.customIconKey]" alt=""
                         :style="btnBoxStyle">
                    <!-- 没有用户自定义图标时，使用用户默认自定义图标 -->
                    <img v-if="!data[settings.openBtn.noChildIcon.customIconKey]" class="openbtn-nochildren"
                         :src="settings.openBtn.noChildIcon.withOutCustomIconKey" alt=""
                         :style="btnBoxStyle">
                  </template>
                </template>
              </template>
            </template>
          </template>

          <!-- 点击选中图标组 -->
          <template v-if="settings.checkBox.enabled">
            <img v-if="checkedStatus===2" :src="settings.checkBox.checkedIcon" alt=""
                 :style="checkBoxStyle" @click="changeSelectStatus()">
            <img v-if="checkedStatus===1" :src="settings.checkBox.halfCheckedIcon" alt=""
                 :style="checkBoxStyle" @click="changeSelectStatus()">
            <img v-if="checkedStatus===0" :src="settings.checkBox.uncheckedIcon" alt=""
                 :style="checkBoxStyle" @click="changeSelectStatus()">
          </template>
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
          <tree-node :data="val" :level="Number(level + 1)" :styleOptions="styleOptions" :settings="settings"
                     ref="child"></tree-node>
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
    cursor: pointer;
  }

  .btn-box {
    display: inline-block;
    float: left;
    position: relative;
  }

  .btn-span {
    display: inline-block;
    vertical-align: top;
  }

  .openbtn-nochildren {
    cursor: default;
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
  import treeNode from './treeNode.vue'
  import {
    DOMAnimationWhenBeforeEnter,
    DOMAnimationWhenEnter,
    DOMAnimationWhenLeave,
    whenMouseOver,
    whenMouseOut,
    setTextSpanWidth
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
    created () {
      if (!this.data._check) {
        this.data._check = 0
      }
      // 将当前变量的选中状态，设置给_check
      this.checkedStatus = this.data._check
      this.$watch('checkedStatus', function (newValue, oldValue) {
        this.data._check = newValue
      })
    },
    mounted () {
      this.setTextSpanWidth()
    },
    data () {
      return {
        level: 0,
        isMouseover: false, // 当前鼠标是否移动上去了
        textSpan: {},
        isOpened: true,
        checkedStatus: 0
      }
    },
    methods: {
      // 子节点显示或者隐藏
      hideOrShow () {
        this.isOpened = !this.isOpened
      },
      // 选中或者取消选中，会影响子节点和父节点
      changeSelectStatus () {
        // 未选中->选中
        // 半选->选中
        // 选中->未选中
        this.checkedStatus = this.checkedStatus === 2 ? 0 : 2

        // 根节点无需触发该方法
        // this.$parent.whenChildNodeCheckedStatusChanged()
        if (this.$refs.child) {
          this.$refs.child.forEach(child => {
            child.whenParentNodeCheckStatusChanged(this.checkedStatus)
          })
        }
      },
      // 当子节点选中状态变化时，触发本方法
      whenChildNodeCheckedStatusChanged () {
        let count = {
          0: 0,
          1: 0,
          2: 0
        }
        this.$refs.child.forEach(child => {
          count[child.getCheckboxStatus()]++
        })
        // 如果半选的数目大于0，那么就是即有选中也有未选中，当前节点设为半选
        // 剩余情况为只有选中和未选中
        if (count[1] > 0) {
          this.checkedStatus = 1
        } else if (count[0] > 0 && count[2] > 0) {
          // 两种都有的话，就是半选了
          this.checkedStatus = 1
        } else if (count[0] === 0) {
          // 未选中为0说明全选，不然就是未选
          this.checkedStatus = 2
        } else {
          this.checkedStatus = 0
        }
      },
      // 当父节点选中状态变化时，触发本方法
      whenParentNodeCheckStatusChanged (parentNodeIsChecked) {
        // 如果当前状态和父节点传递过来的状态相同，说明无需改变
        if (this.checkedStatus === parentNodeIsChecked) {
          return
        }
        // 设置当前子节点状态为父节点状态，并向下递归传递
        this.checkedStatus = parentNodeIsChecked
        if (this.$refs.child) {
          this.$refs.child.forEach(child => {
            child.whenParentNodeCheckStatusChanged(parentNodeIsChecked)
          })
        }
      },
      // 返回当前子节点的状态
      getCheckboxStatus () {
        return this.checkedStatus
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
        setTextSpanWidth.call(this)
      },
      // 如果改变了根节点的宽度，或者其他需要重绘的情况，需要手动调用这个方法
      resize () {
        // 重绘时需要被触发的函数
        this.setTextSpanWidth()
        if (!this.$refs.child || this.$refs.child.length === 0) {
          return
        }
        this.$refs.child.forEach(child => {
          child.resize()
        })
      },
      // 获取选中的节点
      getSelectedNode (notOnlyLeaf) {
        // 参数为true时，包括非叶子节点
        // 否则只返回叶子节点
        // 返回是数组形式
        let result = []
        if (this.checkedStatus !== 0) {
          let data = this.data
          result.push(data)
        }
        if (!this.$refs.child || this.$refs.child.length === 0) {
          return result
        }
        this.$refs.child.forEach(child => {
          let arr = child.getSelectedNode(notOnlyLeaf)
          result = result.concat(arr)
        })
        return result
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
      dropBtnStyle () {
        return Object.assign({}, this.btnBoxStyle, {opacity: (this.data.children ? 1 : 0)})
      },
      checkBoxStyle () {
        return Object.assign({}, this.btnBoxStyle)
      }
    },
    components: {
      treeNode
    }
  }
</script>

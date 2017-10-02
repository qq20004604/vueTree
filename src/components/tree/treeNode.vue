/**
* Created by 王冬 on 2017/9/5.
* QQ: 20004604
* weChat: qq20004604
*/

<template>
  <div>
    <div class="line" :style="style" :lv="level" ref="parent">
      <div class="content" :style="nodeStyle">
        <div class="btn-box" :style="btnBoxStyle" ref="btnBox">
          <!-- 点击下拉图标组 -->
          <template v-if="settings.openBtn.enabled">
            <!-- 默认图标 -->
            <template v-if="!settings.openBtn.customIcon">
              <span class="btn-span" :style="dropBtnStyle" @click="hideOrShow">{{isOpened ? '－' : '＋'}}</span>
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
        <span class="text-box" @mouseover="mouseoverTransition" @mouseout="mouseoutTransition">
            <span class="text" :class="textClass" :style="textSpan" ref="textSpan"
                  @click="clickEvent"
                  @dblclick="debouleClickEvent"
                  @mouseover="mouseoverEvent"
                  @mouseout="mouseoutEvent">
              <!--{{level}}：-->
              {{data.name}}
            <span :class="{underline:settings.underLine}"></span></span>
          </span>
      </div>
    </div>
    <transition
      v-on:before-enter="beforeEnter"
      v-on:enter="enter"
      v-on:leave="leave">
      <div style="transform-origin: 50% 0;" v-if="isOpened">
        <template v-for="(val, k) in data.children">
          <tree-node :data="val" :level="Number(level + 1)" :styleOptions="styleOptions" :settings="settings"
                     :events="events" key="{{k}}" ref="child"></tree-node>
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

  .content {
    position: relative;
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
    DOMTransitionWhenBeforeEnter,
    DOMTransitionWhenEnter,
    DOMTransitionWhenLeave,
    whenMouseOver,
    whenMouseOut,
    setTextSpanWidth,
    getNodeData,
    getSelectedNodeData
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
      },
      events: {
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

      if (!this.data.checked) {
        if (this.$parent.data.checked !== 2) {
          this.data.checked = 0
        } else {
          this.data.checked = 2
        }
      } else {
        // 如果父元素是选中或未选中，子元素和其保持一致
        if (this.$parent.data.checked !== 1) {
          this.data.checked = this.$parent.data.checked
        }
      }
      // 将当前变量的选中状态，设置给checked
      this.data.checked = Number(this.data.checked)
      this.checkedStatus = this.data.checked

      this.$watch('checkedStatus', function (newValue, oldValue) {
        this.data.checked = newValue
      })
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
        isOpened: false,
        checkedStatus: 0
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
      // 子节点显示或者隐藏
      hideOrShow () {
        if (this.data.children) {
          this.isOpened = !this.isOpened
        }
      },
      // 选中或者取消选中，会影响子节点和父节点
      changeSelectStatus () {
        // 未选中->选中
        // 半选->选中
        // 选中->未选中
//        debugger
        this.checkedStatus = this.checkedStatus === 2 ? 0 : 2
        this.$parent.whenChildNodeCheckedStatusChanged()
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
        let oldCheckedStatus = this.checkedStatus
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
        if (this.checkedStatus !== oldCheckedStatus) {
          this.$parent.whenChildNodeCheckedStatusChanged()
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
        // 如果有子节点，那么利用子节点自身的方法执行
        if (this.$refs.child) {
          this.$refs.child.forEach(child => {
            child.whenParentNodeCheckStatusChanged(parentNodeIsChecked)
          })
        }
        // 然而，假如有children属性，但是由于当前节点未展开，无法触发子组件对应的方法
        // 那么，需要处理children属性的checked属性（仅需要处理当前层级即可）
        if (!this.isOpened && this.data.children) {
          for (let i of this.data.children) {
            i.checked = parentNodeIsChecked
          }
        }
      },
      // 返回当前子节点的状态
      getCheckboxStatus () {
        return this.checkedStatus
      },
      // 过渡动画，过渡过程中点击无效
      beforeEnter (el) {
        DOMTransitionWhenBeforeEnter(el, this.settings)
      },
      // 进入时执行函数
      enter (el, done) {
        // 这个只执行一次
        DOMTransitionWhenEnter(el, done, this.settings)
      },
      // 退出时执行函数
      leave (el, done) {
        DOMTransitionWhenLeave(el, done, this.settings)
      },
      // 鼠标移动到结点上时，假如结点显示内容超出范围，则自动左移一段距离
      mouseoverTransition () {
        whenMouseOver.call(this, true)
      },
      mouseoutTransition () {
        whenMouseOut.apply(this)
      },
      // 单击事件
      clickEvent () {
        this.events.click(this.getData(), this, this.data.children, this.$parent)
      },
      // 双击事件
      debouleClickEvent () {
        return this.events.dblclick(this.getData(), this, this.data.children, this.$parent) ? undefined : this.hideOrShow()
      },
      // 鼠标移动上去后的事件
      mouseoverEvent () {
        this.events.mouseover(this.getData(), this, this.data.children, this.$parent)
      },
      // 鼠标移动走的事件
      mouseoutEvent () {
        this.events.mouseout(this.getData(), this, this.data.children, this.$parent)
      },
      // 设置文本显示区域的宽度
      setTextSpanWidth () {
        setTextSpanWidth.call(this, true)
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
      getSelectedNode () {
        return getSelectedNodeData.call(this)
      },
      // 获取当前节点的数据
      getData () {
        return getNodeData.call(this, this.data, true)
      },
      // 获取根节点组件
      getRootElement () {
        let node = this
        while (node.level !== 0) {
          node = node.$parent
        }
        return node
      },
      // 获取children
      getChildren () {
        let arr = []
        if (this.children) {
          this.children.forEach(item => {
            arr.push(item)
          })
          return arr
        }
        return undefined
      },
      // 获取子组件，有children属性不一定有子组件（因为可能未渲染）
      // 三种返回情况，无返回undefined，有子组件返回子组件，其他情况返回空数组
      getChildrenElement () {
        // 没有children返回undefined
        if (!this.children) {
          return undefined
        }
        // 如果打开了，那么返回child
        return this.$refs.child ? this.$refs.child : []
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
      dropBtnStyle () {
        return Object.assign({}, this.btnBoxStyle, {opacity: (this.data.children ? 1 : 0)})
      },
      checkBoxStyle () {
        return Object.assign({}, this.btnBoxStyle)
      }
    }
  }
</script>

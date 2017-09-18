/**
* Created by 王冬 on 2017/9/5.
* QQ: 20004604
* weChat: qq20004604
*/

<template>
  <div>
    <!--<div>level: {{level}}</div>-->
    <div :style="style" class="line-textarea" :lv="level" @click="log">
      <div :style="itemStyle" class="item">
        <button v-if="data.children" @click="hideOrShow(data)">
          {{data.hidden ? '隐' : '显'}}
        </button>
        <button v-if="!data.children">无</button>
        <div class="item-text">
          <span class="text">{{level}}：{{data.name}}<span :class="{animation:settings.underLine}"></span></span>

        </div>
      </div>
      <!--<input type="text" v-model="val">-->
      <!--<button @click="addItem">+</button>-->
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
  .line-textarea {
    position: relative;
    display: block;
    overflow: hidden;
    white-space: nowrap;
  }

  .item {
    cursor: pointer;
    position: relative;
    height: 20px;
    line-height: 20px;
    /*display: inline-block;*/
    /*white-space: nowrap;*/
  }

  .item > button {
    text-align: center;
    height: 20px;
  }

  .item-text {
    position: relative;
    display: inline-block;
    overflow: hidden;
    height: 20px;
    line-height: 20px;
  }

  .text {
    height: 20px;
    line-height: 20px;
    display: inline-block;
  }

  .animation {
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
  .item:hover .animation {
    width: 100%;
    transition: width 1s ease;
  }

  .item:hover .text {
    transition: transform 3s 1s ease;
    transform: translateX(-100%);
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
        val: ''
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
      log () {
        console.log(this.data.name)
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
      enter: function (el, done) {
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
      leave: function (el, done) {
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
      }
    },
    computed: {
      itemStyle () {
        let style = {
          paddingLeft: (this.settings.backSpace ? this.settings.backSpace : '20') * this.level + 'px'
        }

        if (this.settings.isOverflowHidden) {
          style.maxWidth = '100%'
          style['overflow-x'] = 'hidden'
          style['text-overflow'] = 'ellipsis'
          style['white-space'] = 'no-wrap'
        }

        return style
      },
      style () {
        let style = Object.assign({}, this.options.itemStyle, this.itemDefaultStyle)
        return style
      }
    }
  }
</script>

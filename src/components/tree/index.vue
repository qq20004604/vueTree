/**
* Created by 王冬 on 2017/9/5.
* QQ: 20004604
* weChat: qq20004604
* 传入的data是一个数组（测试数据用testData），因此支持多根结点
*/

<template>
  <div :style="listStyle" class="list">
    <template v-for="(v, k) in testData">
      <div :style="rootStyle" class="root">
        <div class="topItem" :style="topItemStyle" lv="topItemStyle" ref="parent">
          <div class="content" :style="contentStyle" ref="child">
            <div class="btn-box" :style="btnBoxStyle" ref="btnBox">
              <button v-if="v.children" @click="hideOrShow(v)">
                {{v.hidden ? '隐' : '显'}}
              </button>
              <button v-if="!v.children">无</button>
            </div>
            <span class="text-box" :style="textBoxStyle" @mouseover="mouseHover(k)" @mouseout="mouseOut(k)">
              <span class="text" :class="textClass"
                    :style="textStyle">{{level}}：{{v.name}}
                <span :class="{underline:mixinSetting.underLine}"></span>
              </span>
          </span>
          </div>
        </div>

        <transition
          v-on:before-enter="beforeEnter"
          v-on:enter="enter"
          v-on:leave="leave">
          <div v-if="!v.hidden" style="transform-origin: 50% 0;">
            <template v-for="(val, key) in v.children">
              <item :data="val" :level="Number(level + 1)" :options="options" :settings="mixinSetting"></item>
            </template>
          </div>
        </transition>
      </div>
    </template>
  </div>
</template>
<style scoped>
  .item {
    cursor: pointer;
  }

  /* 整个列表的样式 */
  .list {
    position: relative;
    overflow: auto; /*可以确保所有都基于根的列表元素（不会超出这个范围）*/
    background-color: #232a30; /*列表的背景颜色*/
    color: #ddd; /*整体文字颜色*/
    width: 100%; /*宽度（默认撑满）*/
    height: 100%; /*宽度（默认撑满）*/
  }

  /* 列表的根结点的样式（可能有多个根结点）（含他的子节点部分） */
  .root {
    min-width: 100%;
  }

  /* 第一层根结点（只有根节点）（不含其它子节点） */

  .topItem {
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
  import item from './treeItem.vue'
  import Velocity from 'velocity-animate'

  export default {
    props: {
      options: {
        type: Object,
        default () {
          return {
            // 整个列表的样式
            listStyle: {},
            // 根结点的样式（包括他的子节点）
            rootStyle: {},
            // 根结点，这里指的是层级为0的结点，不包括更深层级的结点
            topItemStyle: {},
            // 下层子节点的样式
            itemStyle: {}
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
//      if (this.mixinSetting.isOverflowHidden.isEllipsis) {
//        let parentDom = this.$refs.parent
//        let btnBoxDom = this.$refs.btnBox
//        console.log(parentDom, btnBoxDom)
//        let width = $refs.parent.clientWidth -
//          $refs.btnBox.clientWidth + 'px'
//        this.$set(this.textSpan, 'width', width)
//      }
    },
    data () {
      return {
        defaultSettings: {
          // 下划线动画
          underLine: true,
          // 每行相对父节点缩进
          backSpace: 20,
          // 过渡动画
          transitions: {
            // 启用开关
            enabled: true,
            // 进入动画时间
            enterDuration: 500,
            // 退出动画时间
            leaveDuration: 500
          },
          // list的overflow是否是隐藏，这个影响背景颜色等能否单独设置给子节点。
          // 默认打开
          isOverflowHidden: {
            enabled: true,
            // 这个表示是否超出部分显示三个点（本项生效将导致下面的跑马灯方式不生效）
            isEllipsis: true,
            offset: 5,  // 单位px
            animateTime: 1.5  // 单位秒
          }
        },
        testData: [
          {
            'name': '前端工程师1231231',
            'children': [
              {
                'name': '页面',
                'children': [
                  {
                    'name': 'HTML'
                  },
                  {
                    'name': 'CSS',
                    'children': [
                      {
                        'name': 'CSS reset'
                      },
                      {
                        'name': '选择器'
                      },
                      {
                        'name': '盒模型',
                        'children': [
                          {
                            'name': '传统盒模型'
                          },
                          {
                            'name': '弹性盒子布局Flex'
                          }
                        ]
                      }
                    ]
                  },
                  {
                    'name': '脚本',
                    'children': [
                      {
                        'name': 'EcmaScript'
                      },
                      {
                        'name': 'BOM',
                        'children': [
                          {
                            'name': 'history'
                          },
                          {
                            'name': 'window'
                          },
                          {
                            'name': 'location'
                          }
                        ]
                      },
                      {
                        'name': 'DOM',
                        'children': [
                          {
                            'name': 'DOM类型'
                          },
                          {
                            'name': 'DOMapi'
                          },
                          {
                            'name': '事件流'
                          },
                          {
                            'name': '表单',
                            'children': [
                              {
                                'name': '富文本编辑器'
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                'name': '工程化',
                'children': [
                  {
                    'name': 'MV*框架',
                    'children': [
                      {
                        'name': 'Angular'
                      },
                      {
                        'name': 'VueJs'
                      },
                      {
                        'name': 'ReactJs'
                      }
                    ]
                  },
                  {
                    'name': '自动化、模块化工具',
                    'children': [
                      {
                        'name': 'Gulp'
                      },
                      {
                        'name': 'Webpack'
                      }
                    ]
                  },
                  {
                    'name': '编辑器',
                    'children': [
                      {
                        'name': 'VScode'
                      },
                      {
                        'name': 'WebStorm'
                      },
                      {
                        'name': 'Sublime'
                      }
                    ]
                  }
                ]
              },
              {
                'name': '移动端',
                'children': [
                  {
                    'name': '响应式设计'
                  },
                  {
                    'name': 'WebView'
                  },
                  {
                    'name': 'Web端',
                    'children': [
                      {
                        'name': '响应式编程'
                      },
                      {
                        'name': '尺寸rem,em'
                      }
                    ]
                  },
                  {
                    'name': 'IOS'
                  },
                  {
                    'name': 'Android'
                  }
                ]
              },
              {
                'name': '网络通信',
                'children': [
                  {
                    'name': '服务器及服务器中间件'
                  },
                  {
                    'name': 'http协议'
                  },
                  {
                    'name': 'ajax请求',
                    'children': [
                      {
                        'name': '同源策略，跨域请求'
                      }
                    ]
                  }
                ]
              },
              {
                'name': '版本管理工具',
                'children': [
                  {
                    'name': 'Git'
                  },
                  {
                    'name': 'SVN'
                  }
                ]
              },
              {
                'name': '浏览器',
                'children': [
                  {
                    'name': '浏览器种类',
                    'children': [
                      {
                        'name': 'Chrome'
                      },
                      {
                        'name': 'firefox'
                      },
                      {
                        'name': 'Internet'
                      }
                    ]
                  },
                  {
                    'name': '浏览器渲染流程'
                  }
                ]
              },
              {
                'name': 'SEO搜索引擎优化'
              }
            ]
          },
          {
            'name': '前端工程师',
            'children': [
              {
                'name': '页面',
                'children': [
                  {
                    'name': 'HTML'
                  },
                  {
                    'name': 'CSS',
                    'children': [
                      {
                        'name': 'CSS reset'
                      },
                      {
                        'name': '选择器'
                      },
                      {
                        'name': '盒模型',
                        'children': [
                          {
                            'name': '传统盒模型'
                          },
                          {
                            'name': '弹性盒子布局Flex'
                          }
                        ]
                      }
                    ]
                  },
                  {
                    'name': '脚本',
                    'children': [
                      {
                        'name': 'EcmaScript'
                      },
                      {
                        'name': 'BOM',
                        'children': [
                          {
                            'name': 'history'
                          },
                          {
                            'name': 'window'
                          },
                          {
                            'name': 'location'
                          }
                        ]
                      },
                      {
                        'name': 'DOM',
                        'children': [
                          {
                            'name': 'DOM类型'
                          },
                          {
                            'name': 'DOMapi'
                          },
                          {
                            'name': '事件流'
                          },
                          {
                            'name': '表单',
                            'children': [
                              {
                                'name': '富文本编辑器'
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                'name': '工程化',
                'children': [
                  {
                    'name': 'MV*框架',
                    'children': [
                      {
                        'name': 'Angular'
                      },
                      {
                        'name': 'VueJs'
                      },
                      {
                        'name': 'ReactJs'
                      }
                    ]
                  },
                  {
                    'name': '自动化、模块化工具',
                    'children': [
                      {
                        'name': 'Gulp'
                      },
                      {
                        'name': 'Webpack'
                      }
                    ]
                  },
                  {
                    'name': '编辑器',
                    'children': [
                      {
                        'name': 'VScode'
                      },
                      {
                        'name': 'WebStorm'
                      },
                      {
                        'name': 'Sublime'
                      }
                    ]
                  }
                ]
              },
              {
                'name': '移动端',
                'children': [
                  {
                    'name': '响应式设计'
                  },
                  {
                    'name': 'WebView'
                  },
                  {
                    'name': 'Web端',
                    'children': [
                      {
                        'name': '响应式编程'
                      },
                      {
                        'name': '尺寸rem,em'
                      }
                    ]
                  },
                  {
                    'name': 'IOS'
                  },
                  {
                    'name': 'Android'
                  }
                ]
              },
              {
                'name': '网络通信',
                'children': [
                  {
                    'name': '服务器及服务器中间件'
                  },
                  {
                    'name': 'http协议'
                  },
                  {
                    'name': 'ajax请求',
                    'children': [
                      {
                        'name': '同源策略，跨域请求'
                      }
                    ]
                  }
                ]
              },
              {
                'name': '版本管理工具',
                'children': [
                  {
                    'name': 'Git'
                  },
                  {
                    'name': 'SVN'
                  }
                ]
              },
              {
                'name': '浏览器',
                'children': [
                  {
                    'name': '浏览器种类',
                    'children': [
                      {
                        'name': 'Chrome'
                      },
                      {
                        'name': 'firefox'
                      },
                      {
                        'name': 'Internet'
                      }
                    ]
                  },
                  {
                    'name': '浏览器渲染流程'
                  }
                ]
              },
              {
                'name': 'SEO搜索引擎优化'
              }
            ]
          }
        ],
        level: 0,
        isMouseover: false, // 当前鼠标是否移动上去了
        textSpan: {}
      }
    },
    methods: {
      hideOrShow (val) {
        if (val.hidden === undefined) {
          this.$set(val, 'hidden', false)
        }
        val.hidden = !val.hidden
      },
      // 过渡动画，过渡过程中点击无效
      beforeEnter (el) {
        if (this.mixinSetting.transitions.enabled) {
          el.style.pointerEvents = 'none'
        }
      },
      // 进入时主要执行函数
      enter (el, done) {
        // 这个只执行一次
        if (this.mixinSetting.transitions.enabled) {
          // 需要获取真实时间
          let height = el.offsetHeight
          Velocity(el, {scaleY: 0, height: 0}, {duration: 1})
          Velocity(el, {scaleY: 1, height}, {
            duration: this.mixinSetting.transitions.enterDuration,
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
        if (this.mixinSetting.transitions.enabled) {
          el.style.pointerEvents = 'none'
          Velocity(el, {scaleY: 0, height: 0}, {
            duration: this.mixinSetting.transitions.leaveDuration,
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
      mouseHover (index) {
        // 如果没有隐藏超出的，直接返回
        if (!this.mixinSetting.isOverflowHidden.enabled || this.mixinSetting.isOverflowHidden.isEllipsis) {
          return
        }
        // 这个可以算出来当前有没有超出范围，大于等于0则超出，小于0则未超出范围
        let DOM = this.$refs.parent[index]
        let DOM2 = this.$refs.child[index]
        // offset是额外偏差值，即给动画后的文字的右边留空
        let offset = this.mixinSetting.isOverflowHidden.offset
        // 动画时间
        let anitmateTime = this.mixinSetting.isOverflowHidden.animateTime
        let result = DOM2.clientWidth + Number(this.mixinSetting.backSpace ? this.mixinSetting.backSpace : '20') * this.level - DOM.clientWidth + offset
        if (result > 0) {
          this.isMouseover = true
          this.textSpan.transform = `translateX(-${result}px)`
          this.textSpan.transition = `transform ${anitmateTime}s 1s ease`
        }
      },
      mouseOut () {
        if (!this.mixinSetting.isOverflowHidden.enabled || this.mixinSetting.isOverflowHidden.isEllipsis) {
          return
        }
        this.isMouseover = false
        this.textSpan.transform = `translateX(0)`
        this.textSpan.transition = ``
      }
    },
    computed: {
      defaultListStyle () {
        let style = {}
        // 如果overflow隐藏，那么添加overflow
        if (this.mixinSetting.isOverflowHidden.enabled) {
          style['overflow-x'] = 'hidden'
        }
        return style
      },
      listStyle () {
        // 如果配置有listStyle，则返回混合后的
        // 来源于setting的css的优先级高于普通配置（下同）
        if (this.options.listStyle) {
          return Object.assign(this.options.listStyle, this.defaultListStyle)
        } else {
          return this.defaultListStyle
        }
      },
      defaultRootStyle () {
        let style = {}
        // 如果overflow隐藏，那么添加overflow
        if (this.mixinSetting.isOverflowHidden.enabled) {

        }
        return style
      },
      rootStyle () {
        if (this.options.listStyle) {
          return Object.assign(this.options.rootStyle, this.defaultRootStyle)
        } else {
          return this.rootStyle
        }
      },
      topItemStyle () {
        let style = {}
        style['height'] = this.options.topItemStyle.height ? this.options.topItemStyle.height : '40px'
        style['line-height'] = this.options.topItemStyle.lineHeight ? this.options.topItemStyle.lineHeight : '40px'

        if (this.options.topItemStyle) {
          return Object.assign({}, this.options.topItemStyle, style)
        } else {
          return style
        }
      },
      mixinSetting () {
        return Object.assign({}, this.defaultSettings, this.settings)
      },
      contentStyle () {
        let style = {}
        style['height'] = this.options.topItemStyle.height ? this.options.topItemStyle.height : '40px'
        style['line-height'] = this.options.topItemStyle.lineHeight ? this.options.topItemStyle.lineHeight : '40px'
        return style
      },
      btnBoxStyle () {
        let style = {}
        style['height'] = this.options.topItemStyle.height ? this.options.topItemStyle.height : '40px'
        style['line-height'] = this.options.topItemStyle.lineHeight ? this.options.topItemStyle.lineHeight : '40px'
        return style
      },
      textBoxStyle () {
        let style = {}
        style['height'] = this.options.topItemStyle.height ? this.options.topItemStyle.height : '40px'
        style['line-height'] = this.options.topItemStyle.lineHeight ? this.options.topItemStyle.lineHeight : '40px'
        return style
      },
      textStyle () {
        let style = {}
        style['height'] = this.options.topItemStyle.height ? this.options.topItemStyle.height : '40px'
        style['line-height'] = this.options.topItemStyle.lineHeight ? this.options.topItemStyle.lineHeight : '40px'
        return Object.assign({}, this.textSpan, style)
      },
      textClass () {
        return {
          'isMouseover': this.isMouseover,
          'text-is-ellipsis': this.mixinSetting.isOverflowHidden.enabled && this.mixinSetting.isOverflowHidden.isEllipsis
        }
      }
    },
    components: {
      item
    }
  }
</script>

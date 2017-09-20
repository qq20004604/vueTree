/**
* Created by 王冬 on 2017/9/5.
* QQ: 20004604
* weChat: qq20004604
* 传入的data是一个数组（测试数据用testData），因此支持多根结点
*/

<template>
  <div :style="listStyle" class="list">
    <template v-for="(v, k) in testData">
      <root-item :options="options" :data="v" :settings="mixinSetting" ref="item"></root-item>
    </template>
  </div>
</template>
<style scoped>
  /* 整个列表的样式 */
  .list {
    position: relative;
    overflow: auto; /*可以确保所有都基于根的列表元素（不会超出这个范围）*/
    background-color: #232a30; /*列表的背景颜色*/
    color: #ddd; /*整体文字颜色*/
    width: 100%; /*宽度（默认撑满）*/
    height: 100%; /*宽度（默认撑满）*/
  }

</style>
<script>
  import rootItem from './rootItem.vue'

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
            // 当启用这个选项时，需要在组件的根节点的宽度变化时，手动触发本组件的resize()方法
            // 另注：需要通过$nextTick的回调函数来触发（见示例）
            isEllipsis: false,
            offset: 5,  // 单位px
            animateTime: 1.5  // 单位秒
          },
          // 展开结点的配置
          openBtn: {
            // 是否启用，默认是
            enabled: true,
            // 初始情况是否全部展开，默认false，只展开第一级。true则全部展开
            defaultOpened: false
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
        ]
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
      mixinSetting () {
        return this.deepMixin(this.defaultSettings, this.settings)
      }
    },
    methods: {
      // 如果改变了根节点的宽度，或者其他需要重绘的情况，需要手动调用这个方法
      resize () {
        if (!this.$refs.item || this.$refs.item.length === 0) {
          return
        }
        this.$refs.item.forEach(item => {
          item.resize()
        })
      },
      // 深度合并
      deepMixin (first, second) {
        function deepCopy (from, base) {
          let temp
          if (base) {
            temp = base
          } else {
            temp = {}
          }
          Object.keys(from).forEach(function (key) {
            let type = Object.prototype.toString.call(from[key])
            if (type === '[object Object]' || type === '[object Array]') {
              temp[key] = deepCopy(from[key], temp[key])
              if (type === '[object Array]') {
                temp[key] = Array.from(temp[key])
              }
            } else {
              temp[key] = from[key]
            }
          })
          return temp
        }

        let newFirst = deepCopy(first)
        let result = deepCopy(second, newFirst)
        return result
      }
    },
    components: {
      rootItem
    }
  }
</script>

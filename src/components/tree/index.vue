/**
* Created by 王冬 on 2017/9/5.
* QQ: 20004604
* weChat: qq20004604
* 传入的data是一个数组（测试数据用testData），因此支持多根结点
*/

<template>
  <div :style="listStyle">
    <template v-for="(v, k) in testData" :style="rootStyle">
      <div>
        <div :style="topItemStyle">
          <span class="item">{{level}}：{{v.name}}</span>
          <button v-if="v.children" @click="hideOrShow(v)">{{v.hidden?'隐':'显'}}</button>
        </div>
        <template v-for="(val, key) in v.children" v-if="!v.hidden">
          <item :data="val" :level="Number(level + 1)" :options="options" :settings="mixinSetting"></item>
        </template>
      </div>
    </template>
  </div>
</template>
<style scoped>
  .item {
    cursor: pointer;
  }

</style>
<script>
  import item from './treeItem.vue'

  export default {
    props: {
      options: {
        type: Object,
        default () {
          return {
            // 整个列表的样式
            listStyle: {},
            // 列表的根结点的样式（可能有多个根结点）（含他的子节点部分）
            rootStyle: {},
            // 第一层根结点（只有根节点）（不含其它子节点）
            topItemStyle: {},
            // 下层子节点的样式
            itemStyle: {},
            // 每层子结点的缩进
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
    },
    data () {
      return {
        listOptions: {
          backgroundColor: '#232a30',
          color: ' #ddd'
        },
        rootOptions: {
          borderBottom: '1px solid #ddd',
          padding: '10px'
        },
        topItemDefaultStyle: {
          height: '30px',
          lineHeight: '30px',
          padding: '0 10px',
          borderBottom: '1px solid #bbb'
        },
        defaultSettings: {
          underLine: true,
          backSpace: 20
        },

        testData: [
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
        level: 0
      }
    },
    methods: {
      hideOrShow (val) {
        if (val.hidden === undefined) {
          this.$set(val, 'hidden', false)
        }
        val.hidden = !val.hidden
      }
    },
    computed: {
      listStyle () {
        let style = Object.assign({}, this.listOptions, this.options.listStyle ? this.options.listStyle : {})
        console.log(style)
        return style
      },
      rootStyle () {
        let style = Object.assign({}, this.rootOptions, this.options.rootStyle ? this.options.rootStyle : {})
        return style
      },
      topItemStyle () {
        let style = Object.assign({}, this.topItemDefaultStyle, this.options.topItemStyle ? this.options.topItemStyle : {})
        return style
      },
      mixinSetting () {
        return Object.assign({}, this.defaultSettings, this.settings)
      }
    },
    components: {
      item
    }
  }
</script>

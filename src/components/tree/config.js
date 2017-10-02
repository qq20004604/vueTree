/**
 * Created by 王冬 on 2017/10/2.
 * QQ: 20004604
 * weChat: qq20004604
 * 配置文件和测试数据
 */
// 默认配置
const defaultSettings = {
  // 下划线动画
  underLine: true,
  // 每行相对父节点缩进
  backSpace: {
    // 是否启用缩进（只针对不同层之间产生的缩进）
    enabled: true,
    // 每层缩进值
    value: 20,
    // 父节点额外缩进（必然生效）
    additionalBackSpaceForRootNode: 0,
    // 子节点额外缩进（必然生效）
    additionalBackSpaceForChildNode: 0
  },
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
    defaultOpened: false,
    // 自定义图标，默认为false。这里值为false时下面全部不生效
    customIcon: false,
    // 开启时图标（如果图片比较小的话，建议转为base64字符串直接赋值）
    // 自动转码页面（我自己的）：http://www.jianwangsan.cn/%E5%9B%BE%E7%89%87tobase64.html
    openedIcon: '',
    // 关闭时图标
    closedIcon: '',
    // 没有子节点时图标
    noChildIcon: {
      // 是否启用，不启用的话则显示为空白，默认false
      enabled: false,
      // 是否使用统一的自定义图标，默认为true
      useDefaultImage: true,
      // 统一的自定义图标的url，useDefaultImage设置为true时生效
      defaultImage: '',
      // 使用自定义图标，这里传key，会自动取这个key的值
      customIconKey: 'img',
      // 当自定义图标的key检测不到时，会使用下面这个url作为链接
      withOutCustomIconKey: ''
    }
  },
  // 选中按钮（不选、全选、半选）
  checkBox: {
    enabled: true,
    checkedIcon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAQAAABKfvVzAAAAd0lEQVR4Ac3LzQnFIBDE8YX0F0xDwWLy0Y9VvLWJieEdFmFw9SBk5vr/yWeHDYrWMgLkveB/hTetQcf6QRoDBxZEF1S5MODnFKRGTsBegpvnHERIiS6aE2DkpDkBRlhOgBGWE2CE5QzYJoAMb78aBKiTrwaGPh88kDQO8EIv0iYAAAAASUVORK5CYII=',
    halfCheckedIcon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAfElEQVRIie2UQQqAMAwEJ+IX1GeJj+jjq49YD1IoBau26MUO9BBCstlDFxpPkLRI8ipnlTRLIjxLBDwwVt65AlMoUgEBmJlRQJiP93Yli57Q55rRRVlyjl930ASaQBO4+MmlmRTzuYMNGO5m0Ak+LlIHjiPPa5a7ivk/sgO4oWjNa/J75wAAAABJRU5ErkJggg==',
    uncheckedIcon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAQAAABKfvVzAAAAPklEQVQ4y2NgGKzgf+D/l//xgVf//VE14FcOAi9RNQABXhegy49qGNUwcBpeEUzeL1A1+BPIES/++w7a3A8AARf7kVFAnRoAAAAASUVORK5CYII='
  }
}

// 标签的事件函数
const treeNodeEvents = {
  // 参数一是当前标签的数据
  // 参数二是当前组件
  // 单机标签事件
  click (data, vueElement, children, parentElement) {

  },
  // 双击标签，return true会阻止标签双击的时候关闭/打开子节点
  dblclick (data, vueElement, children, parentElement) {

  },
  // 鼠标移动上去
  mouseover (data, vueElement, children, parentElement) {

  },
  // 鼠标离开
  mouseout (data, vueElement, children, parentElement) {

  }
}

// 测试数据
const testData = [
  {
    'name': '前端工程师1231231',
    'checked': '2',
    'children': [
      {
        'name': '页面',
        'children': [
          {
            'name': 'HTML（这个可以用于测试有img属性时，当没有子节点会使用img的图片）',
            'img': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAQAAABKfvVzAAAAdklEQVQ4y+WTuQ3AIBAEaQKK8NN/BEUArmccgGyj43MMIZo5TqtFqbUPJxYtbg2OvS44IJQKhguwdUETSiXjXr77KhGICRjihWKm8Dw3KXP4Z5VZ/Lfw7B5kyD1cy5C7uAx5iJcht6vhRTUi4OrC0Szftvi/vAFNdbZ2Dp661QAAAABJRU5ErkJggg==',
            testSign: 'a'
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

export {
  defaultSettings,
  testData,
  treeNodeEvents
}

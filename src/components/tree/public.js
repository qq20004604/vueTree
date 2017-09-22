/**
 * Created by 王冬 on 2017/9/21.
 * QQ: 20004604
 * weChat: qq20004604
 */
import Velocity from 'velocity-animate'

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
    // 开启时图标
    openedIconImage: '',
    // 关闭时图标
    closedIconImage: '',
    // 没有子节点时图标
    noneIconImage: {
      // 是否启用，不启用的话则显示为空白
      enabled: true,
      // 是否使用统一的自定义图标，默认为false
      useDefaultImage: false,
      // 统一的自定义图标的url，useDefaultImage设置为true时生效
      defaultImage: '',
      // 使用自定义图标，这里传key，会自动取这个key的值
      customIconKey: ''
    }
  }
}

const testData = [
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

// 深度复制
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

// 组件进入动画（进入之前的第一帧）
function DOMAnimationWhenBeforeEnter (el, settings) {
  if (settings.transitions.enabled) {
    el.style.pointerEvents = 'none'
  }
}

// 组件进入时执行的动画（只执行一次），done表示进入完成
function DOMAnimationWhenEnter (el, done, settings) {
  if (settings.transitions.enabled) {
    // 需要获取真实高度
    let height = el.offsetHeight
    // 这行是给一个初始的状态
    Velocity(el, {scaleY: 0, height: 0}, {duration: 0})
    Velocity(el, {scaleY: 1, height}, {
      duration: settings.transitions.enterDuration,
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
}

// 组件离开时执行的动画（只执行一次），done表示离开完成
function DOMAnimationWhenLeave (el, done, settings) {
  if (settings.transitions.enabled) {
    el.style.pointerEvents = 'none'
    Velocity(el, {scaleY: 0, height: 0}, {
      duration: settings.transitions.leaveDuration,
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

/*  当鼠标移动上去时触发本事件
*   参数isNode表示是否是子节点，true为是，默认不是
* */
function whenMouseOver (isChildNode) {
  // 如果没有隐藏超出的，直接返回
  if (!this.settings.isOverflowHidden.enabled || this.settings.isOverflowHidden.isEllipsis) {
    return
  }
  // 这个可以算出来当前有没有超出范围，大于等于0则超出，小于0则未超出范围
  let parentDOM = this.$refs.parent
  let btnBoxDOM = this.settings.openBtn.enabled ? this.$refs.btnBox : 0
  let textSpanDOM = this.$refs.textSpan
  // offset是额外偏差值，即给动画后的文字的右边留空
  let offset = this.settings.isOverflowHidden.offset
  // 动画时间
  let anitmateTime = this.settings.isOverflowHidden.animateTime
  let result
  if (isChildNode) {
    result = textSpanDOM.clientWidth +
      Number(this.settings.backSpace.enabled ? this.settings.backSpace.value : 20) * this.level +
      this.settings.backSpace.additionalBackSpaceForChildNode +
      btnBoxDOM.clientWidth -
      parentDOM.clientWidth + offset
  } else {
    result = textSpanDOM.clientWidth +
      this.settings.backSpace.additionalBackSpaceForRootNode +
      btnBoxDOM.clientWidth -
      parentDOM.clientWidth + offset
  }
  if (result > 0) {
    this.isMouseover = true
    if (this.textSpan.transform) {
      this.textSpan.transform = `translateX(-${result}px)`
      this.textSpan.transition = `transform ${anitmateTime}s 1s ease`
    } else {
      this.$set(this.textSpan, 'transform', `translateX(-${result}px)`)
      this.$set(this.textSpan, 'transition', `transform ${anitmateTime}s 1s ease`)
    }
  }
}

function whenMouseOut () {
  if (!this.settings.isOverflowHidden.enabled) {
    return
  }
  this.isMouseover = false
  this.$delete(this.textSpan, 'transform')
  this.$delete(this.textSpan, 'transition')
}

export {
  deepCopy,
  defaultSettings,
  testData,
  DOMAnimationWhenBeforeEnter,
  DOMAnimationWhenEnter,
  DOMAnimationWhenLeave,
  whenMouseOver,
  whenMouseOut
}

/**
 * Created by 王冬 on 2017/10/3.
 * QQ: 20004604
 * weChat: qq20004604
 * 测试用
 */
const styleOptions = {
  listStyle: {
    overflow: 'visible'
  },
  rootStyle: {},
  topNodeStyle: {},
  nodeStyle: {}
}

const settings = {
  // backSpace: 20,
  // isOverflowHidden: false,
  // list的overflow是否是隐藏，这个影响背景颜色等能否单独设置给子节点。
  // 默认打开

  isOverflowHidden: {
    enabled: true,
    // 这个表示是否超出部分显示三个点（本项生效将导致下面的跑马灯方式不生效）
    // 当启用这个选项时，需要在组件的根节点的宽度变化时，手动触发本组件的resize()方法
    // 另注：需要通过$nextTick的回调函数来触发（见示例）
    isEllipsis: false
    // offset: 5,  // 单位px
    // animateTime: 1.5  // 单位秒
  },

  openBtn: {
    // 是否启用，默认是
    enabled: true,
    // 初始情况是否全部展开，默认false，只展开第一级。true则全部展开
    defaultOpened: true,
    // 自定义图标，默认为false。这里值为false时下面全部不生效
    customIcon: true,
    // 开启时图标（如果图片比较小的话，建议转为base64字符串直接赋值）
    // 自动转码页面（我自己的）：http://www.jianwangsan.cn/%E5%9B%BE%E7%89%87tobase64.html
    openedIcon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAJJJREFUeNpi/P//PwMtA' +
    'RMDjcGoBaMWMHAQYQYHuRZ4AfFtINbBo0YPqsYDpwpQRsOBN/6HgFdArINFXg+IX0PVbMBlDj4LOIB4Bw5LkA3fAVVLsgXoloAM1CXFcGIswGYJ0YYTawG6JUQbDsKMJJSmoOS4AcoOAOIfxGhiJLG4hqX5H8RqY' +
    'BytD0YtGLWAASDAAHi0kiyxXhROAAAAAElFTkSuQmCC',
    // penedIconImage: '',
    // 关闭时图标
    closedIcon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAKBJREFUeNrslcENwyAM' +
    'RQGpUto9emuUNRilG6Vj0BszpQs0uZBvhfaK7cANS09cjJ8lLGxTSqZlONM4uqCa4AqGVoIbeIOgktCYFriDJR0RwcC484eb+NBKjKAbknykEomAGKUSqYCYwJYloZTvFFP3BBewgleNKfrhwJw7/wJf8w1Uxb' +
    'kCdXGuYMyFxcUJy1w4Pp9R+lPYvtG64HTsAgwAI5KsQrd35xcAAAAASUVORK5CYII=',
    // closedIcon: '',
    // 没有子节点时图标
    noChildIcon: {
      // 是否启用，不启用的话则显示为空白，默认false
      enabled: true,
      // 是否使用统一的自定义图标，默认为true
      useDefaultImage: false,
      // 统一的自定义图标的url，useDefaultImage设置为true时生效
      defaultImage: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAQAAABKfvVzAAABFklEQVR4Ab3TQUpbURhH8e8J3reAQncQxEV00C0IiqI4cfAQ3YEuooUH3UOCLsWEQKcJjyRbKE0' +
      'mv4ZMbvLIHQn9zvQcuIP/jf99avfedTZbOm/u1GKfsM+1lf4tXR0PTvwCHxoDyamBxhi0TvSDnf7Hgzig8grafnC907+JHl/9BlzKgdoKDwV94gULKQf3+CjqX1QmuM3BO5qiHsIjRjnoMCjrwhnmOdgglXUhYX0YnJ' +
      'Z1oc5BflJZD+eY5eANTVkXnjHMwR3GqqJemeImB7UlXgt6eEIn5SBcQUH/7i8u+uNrwYuq95innf7z2LxbMPHoTFI792wKfhzOO3NpoX+di/KPC8mtkbn1lpmhG0kUghKfDP4BfQiXOjukRGgAAAAASUVORK5CYII=',
      // defaultImage: '',
      // 使用自定义图标，这里传key，会自动取这个key的值
      customIconKey: 'img',
      // 当自定义图标的key检测不到时，会使用下面这个url作为链接
      withOutCustomIconKey: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAQAAABKfvVzAAABFklEQVR4Ab3TQUpbURhH8e8J3reAQncQxEV00C0IiqI4cfAQ3YEuooUH3UOCLsWEQKcJjyRbKE0' +
      'mv4ZMbvLIHQn9zvQcuIP/jf99avfedTZbOm/u1GKfsM+1lf4tXR0PTvwCHxoDyamBxhi0TvSDnf7Hgzig8grafnC907+JHl/9BlzKgdoKDwV94gULKQf3+CjqX1QmuM3BO5qiHsIjRjnoMCjrwhnmOdgglXUhYX0YnJ' +
      'Z1oc5BflJZD+eY5eANTVkXnjHMwR3GqqJemeImB7UlXgt6eEIn5SBcQUH/7i8u+uNrwYuq95innf7z2LxbMPHoTFI792wKfhzOO3NpoX+di/KPC8mtkbn1lpmhG0kUghKfDP4BfQiXOjukRGgAAAAASUVORK5CYII='
      // withOutCustomIconKey: ''
    }
  }
}

const events = {
  // 单击事件
  // click (data, vueElement, children, parentElement) {
  //   console.log('click')
  //   console.log(...arguments)
  // },
//          // 双击标签，return true会阻止标签双击的时候关闭/打开子节点
//          dblclick (data, vueElement, children, parentElement) {
//            console.log('dblclick')
//            console.log(data, vueElement)
//          },
//          // 鼠标移动上去
//          mouseover (data, vueElement, children, parentElement) {
//            console.log('mouseover')
//            console.log(data, vueElement)
//          },
//          // 鼠标离开
//          mouseout (data, vueElement, children, parentElement) {
//            console.log('mouseout')
//            console.log(data, vueElement)
//          }
}

const asyncLoad = {
  // 当展开子节点时，会执行本函数
  // 当返回值为true时，会去执行load，否则不会执行
  // 参数一是当前组件的数据
  // 参数二是data目前已有的children的元素
  // 参数三是当前组件
  beforeLoad (data, children, VueElement) {
    if (children.length < 2) {
      return true
    }
  },
  // 异步加载，ajax应放入load里面
  // 参数一是当前组件
  // 参数二是成功（会进入insert）
  // 参数三是失败（会进入catch）
  load (VueElement, resolve, reject) {
    let data = {
      name: 'test'
    }
    setTimeout(() => {
      resolve(data)
    }, 1000)
  },
  // 插入函数，这里是成功加载到数据时应执行的函数，
  // 上面resolve执行后，传的参数会被作为insert的第一个参数
  // 当前组件的children是第二个参数，应当push到这里面去
  // 这里【return true】的话，会【放弃】在加载完成后【展开】已加载好的子节点
  insert (data, children) {
    children.push(data)
  },
  // 错误捕获函数，报错时（load执行reject），会执行这个
  errorCatch (errorMsg) {
    // console.error(err)
  }
}
// 测试数据
/* const testData = [
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
            testSign: 'a',
            children: []
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
] */

const testData = [{
  name: 'App.vue',
  text: '整个系统的根组件，包括移动端和PC端的',
  children: [
    {
      name: 'page/m_index，移动端根组件',
      text: '移动端的根组件',
      children: [
        {
          name: 'page/m_login，登录页',
          text: '登录页',
          image: 'static/m_login.png'
        },
        {
          name: 'page/m_member_detail，登陆后的会员用户详情页',
          image: 'static/m_member_detail.png',
          text: '登录后会员详情页'
        },
        {
          name: 'page/m_markets，列表页（全部社会网店，营业厅，超市便利店）',
          image: 'static/m_markets.png',
          text: '列表页（全部社会网店，营业厅，超市便利店）',
          children: [
            {
              name: 'page/m_all_channels，全部社会渠道网点',
              text: '全部社会渠道网点，画红框处',
              image: 'static/m_all_channels.png',
              children: [
                {
                  name: 'components/m_commodity_list，热门业务和商品',
                  text: '热门业务和商品，画红框处',
                  image: 'static/m_commodity_list.png'
                },
                {
                  name: 'components/m_hall_details_item_with_business_volume，商品列表的单项（星级）',
                  text: `商品列表的单项
包含：
1、名字；
2、距离；
3、折扣和充值优惠；
4、星级（其他的没有星级）`,
                  image: 'static/m_hall_details_item_with_business_volume.png'
                },
                {
                  name: 'components/m_hall_details_item_with_distance，商品列表的单项（排队人数）',
                  text: `* 商品列表的单项
包含：
1、名字；
2、距离；
3、折扣和充值优惠；
4、排队人数（主要区别是这一点）`,
                  image: 'static/m_hall_details_item_with_distance.png'
                },
                {
                  name: 'components/m_deal_with_business，业务办理组件（单项）（暂时放于此）',
                  text: '业务办理组件（单项）（暂时放于此）',
                  image: 'static/m_deal_with_business.png'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      name: 'components/m_bulletscreen，弹幕'
    }
  ]
}]

export {
  styleOptions,
  settings,
  events,
  asyncLoad,
  testData
}

<template>
  <div>
    <div class="app" :style="boxStyle">
      <tree
        :styleOptions="styleOptions"
        :settings="settings"
        ref="tree"
        :data="data"
        :userEvents="events"
        :async="asyncLoad"></tree>
    </div>
    <a href="https://github.com/qq20004604/vueTree" style="text-decoration: underline;">点击查看Github链接</a>
    <button @click="repaint">改变组件父容器宽度并触发重绘</button>
    <button @click="changeOverflow">改变超出部分的处理方式（三个点或者是走马灯）</button>
    <button @click="getSelected">获取选中的元素</button>
  </div>
</template>
<script>
  import tree from 'component/tree'
  import {testData} from 'component/tree/config.js'

  export default {
    mounted () {
      window.tree = this.$refs.tree
    },
    data () {
      return {
        styleOptions: {
          listStyle: {
            overflow: 'visible'
          },
          rootStyle: {},
          topNodeStyle: {},
          nodeStyle: {}
        },
        settings: {
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
            defaultOpened: false,
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
        },
        test: {
          isWider: true
        },
        data: testData,
        events: {
//          // 单击事件
//          click (data, vueElement, children, parentElement) {
//            console.log('click')
//            console.log(...arguments)
//          },
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
        },
        // 测试异步加载，可以通过第一个根节点-》页面-》HTML 来进行
        asyncLoad: {
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
      }
    },
    name: 'Homepage',
    methods: {
      repaint () {
        this.test.isWider = !this.test.isWider
        this.$nextTick(() => {
          this.$refs.tree.resize()
        })
      },
      changeOverflow () {
        this.settings.isOverflowHidden.isEllipsis = !this.settings.isOverflowHidden.isEllipsis
        this.$nextTick(() => {
          this.$refs.tree.resize()
        })
      },
      getSelected () {
        console.log(this.$refs.tree.getSelectedNode())
      }
    },
    computed: {
      boxStyle () {
        return {
          width: this.test.isWider ? '500px' : '200px'
        }
      }
    },
    components: {
      tree
    }
  }

</script>
<style>
  .app {
    width: 200px;
    margin: 0 auto;
    box-sizing: border-box;
    overflow: auto;
    background-color: red;

  }
</style>

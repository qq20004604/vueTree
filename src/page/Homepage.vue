<template>
  <div>
    <div class="app" :style="boxStyle">
      <tree :styleOptions="styleOptions" :settings="settings" ref="tree"></tree>
    </div>
    <a href="https://github.com/qq20004604/vueTree" style="text-decoration: underline;">点击查看Github链接</a>
    <button @click="repaint">改变组件父容器宽度并触发重绘</button>
    <button @click="changeOverflow">改变超出部分的处理方式（三个点或者是走马灯）</button>
  </div>
</template>
<script>
  import tree from 'component/tree'

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
            // enabled: true,
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
            openedIconImage: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAJJJREFUeNpi/P//PwMtA' +
            'RMDjcGoBaMWMHAQYQYHuRZ4AfFtINbBo0YPqsYDpwpQRsOBN/6HgFdArINFXg+IX0PVbMBlDj4LOIB4Bw5LkA3fAVVLsgXoloAM1CXFcGIswGYJ0YYTawG6JUQbDsKMJJSmoOS4AcoOAOIfxGhiJLG4hqX5H8RqY' +
            'BytD0YtGLWAASDAAHi0kiyxXhROAAAAAElFTkSuQmCC',
//            openedIconImage: '',
            // 关闭时图标
            closedIconImage: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAKBJREFUeNrslcENwyAM' +
            'RQGpUto9emuUNRilG6Vj0BszpQs0uZBvhfaK7cANS09cjJ8lLGxTSqZlONM4uqCa4AqGVoIbeIOgktCYFriDJR0RwcC484eb+NBKjKAbknykEomAGKUSqYCYwJYloZTvFFP3BBewgleNKfrhwJw7/wJf8w1Uxb' +
            'kCdXGuYMyFxcUJy1w4Pp9R+lPYvtG64HTsAgwAI5KsQrd35xcAAAAASUVORK5CYII=',
//            closedIconImage: '',
            // 没有子节点时图标
            noneIconImage: {
              // 是否启用，不启用的话则显示为空白，默认false
              enabled: true,
              // 是否使用统一的自定义图标，默认为true
              useDefaultImage: false,
              // 统一的自定义图标的url，useDefaultImage设置为true时生效
              defaultImage: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAQAAABKfvVzAAABFklEQVR4Ab3TQUpbURhH8e8J3reAQncQxEV00C0IiqI4cfAQ3YEuooUH3UOCLsWEQKcJjyRbKE0' +
              'mv4ZMbvLIHQn9zvQcuIP/jf99avfedTZbOm/u1GKfsM+1lf4tXR0PTvwCHxoDyamBxhi0TvSDnf7Hgzig8grafnC907+JHl/9BlzKgdoKDwV94gULKQf3+CjqX1QmuM3BO5qiHsIjRjnoMCjrwhnmOdgglXUhYX0YnJ' +
              'Z1oc5BflJZD+eY5eANTVkXnjHMwR3GqqJemeImB7UlXgt6eEIn5SBcQUH/7i8u+uNrwYuq95innf7z2LxbMPHoTFI792wKfhzOO3NpoX+di/KPC8mtkbn1lpmhG0kUghKfDP4BfQiXOjukRGgAAAAASUVORK5CYII=',
//              defaultImage: '',
              // 使用自定义图标，这里传key，会自动取这个key的值
              customIconKey: 'img',
              // 当自定义图标的key检测不到时，会使用下面这个url作为链接
              withOutCustomIconKey: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAQAAABKfvVzAAABFklEQVR4Ab3TQUpbURhH8e8J3reAQncQxEV00C0IiqI4cfAQ3YEuooUH3UOCLsWEQKcJjyRbKE0' +
              'mv4ZMbvLIHQn9zvQcuIP/jf99avfedTZbOm/u1GKfsM+1lf4tXR0PTvwCHxoDyamBxhi0TvSDnf7Hgzig8grafnC907+JHl/9BlzKgdoKDwV94gULKQf3+CjqX1QmuM3BO5qiHsIjRjnoMCjrwhnmOdgglXUhYX0YnJ' +
              'Z1oc5BflJZD+eY5eANTVkXnjHMwR3GqqJemeImB7UlXgt6eEIn5SBcQUH/7i8u+uNrwYuq95innf7z2LxbMPHoTFI792wKfhzOO3NpoX+di/KPC8mtkbn1lpmhG0kUghKfDP4BfQiXOjukRGgAAAAASUVORK5CYII='
//              withOutCustomIconKey: ''
            }
          }
        },
        test: {
          isWider: true
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
    height: 500px;
    margin: 0 auto;
    box-sizing: border-box;
    overflow: auto;
    background-color: red;

  }
</style>

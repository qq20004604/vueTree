<template>
  <div>
    <div class="app" :style="boxStyle">
      <tree :options="options" :settings="settings" ref="tree"></tree>
    </div>
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
        options: {
          listStyle: {
            overflow: 'visible'
          },
          rootStyle: {},
          topItemStyle: {},
          itemStyle: {}
        },
        settings: {
//          backSpace: 20,
//          isOverflowHidden: false,
          // list的overflow是否是隐藏，这个影响背景颜色等能否单独设置给子节点。
          // 默认打开
          isOverflowHidden: {
//            enabled: true,
            // 这个表示是否超出部分显示三个点（本项生效将导致下面的跑马灯方式不生效）
            // 当启用这个选项时，需要在组件的根节点的宽度变化时，手动触发本组件的resize()方法
            // 另注：需要通过$nextTick的回调函数来触发（见示例）
            isEllipsis: false
//            offset: 5,  // 单位px
//            animateTime: 1.5  // 单位秒
          }
        },
        test: {
          isWider: false
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

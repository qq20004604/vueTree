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
  import {styleOptions, settings, events, asyncLoad, testData} from 'component/tree/test.js'

  export default {
    mounted () {
      window.tree = this.$refs.tree
    },
    data () {
      return {
        styleOptions: styleOptions,
        settings: settings,
        test: {
          isWider: true
        },
        data: testData,
        events: events,
        // 测试异步加载，可以通过第一个根节点-》页面-》HTML 来进行
        asyncLoad: asyncLoad
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

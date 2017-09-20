<template>
  <div>
    <div class="app" :style="boxStyle">
      <tree :options="options" :settings="settings" ref="tree"></tree>
    </div>
    <button @click="repaint">改变组件父容器宽度并触发重绘</button>
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
//          isOverflowHidden: false
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

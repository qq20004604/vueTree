<template>
  <div class="app">
    <tree :options="options" :settings="settings" ref="tree"></tree>
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
        }
      }
    },
    name: 'Homepage',
    methods: {},
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

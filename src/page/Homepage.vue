<template>
  <div class="app">
    <tree :options="options"></tree>
  </div>
</template>
<script>
  import tree from 'component/tree'

  export default {
    data () {
      return {
        options: {
          listStyle: {},
          rootStyle: {},
          topItemStyle: {},
          itemStyle: {},
          backSpace: 30
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
    width: 500px;
    height: 500px;
    margin: 0 auto;
    box-sizing: border-box;
    overflow: auto;
  }
</style>

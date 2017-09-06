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
    width: 555px;
    height: 500px;
    margin: 0 auto;
    padding: 10px;
    box-sizing: border-box;
    overflow: auto;
    background-color: #232a30;
  }
</style>

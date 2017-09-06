/**
* Created by 王冬 on 2017/9/5.
* QQ: 20004604
* weChat: qq20004604
*/

<template>
  <div :style="backSpace">
    <!--<div>level: {{level}}</div>-->
    <div :style="style">
      <span>{{level}}：{{data.name}}</span>
      <button @click="hideOrShow(data)">{{data.hidden?'隐':'显'}}</button>
      <!--<input type="text" v-model="val">-->
      <!--<button @click="addItem">+</button>-->
    </div>
    <template v-for="(val, key) in data.children" v-if="!data.hidden">
      <tree-item :data="val" :level="Number(level + 1)" :options="options"></tree-item>
    </template>
  </div>
</template>
<style scoped>


</style>
<script>
  export default {
    name: 'tree-item',
    props: {
      data: {
        type: Object
      },
      level: {
        type: Number
      },
      marginLeft: {
        type: Number,
        default: 20
      },
      options: {
        type: Object,
        default () {
          return {
            topItemStyle: {},
            itemStyle: {},
            backSpace: 20
          }
        }
      }
    },
    data () {
      return {
        itemDefaultStyle: {
          height: '20px',
          lineHeight: '20px'
        },
        val: ''
      }
    },
    methods: {
      addItem () {
        if (this.val.length === 0) {
          return
        }
        if (!this.data.children) {
          this.$set(this.data, 'children', [])
        }
        this.data.children.push({
          name: this.val
        })
      },
      hideOrShow (val) {
        console.log(val)
        if (val.hidden === undefined) {
          this.$set(val, 'hidden', false)
        }
        val.hidden = !val.hidden
      }
    },
    computed: {
      backSpace () {
        if (this.options.backSpace) {
          return {
            marginLeft: this.options.backSpace + 'px'
          }
        } else {
          return {
            marginLeft: '20px'
          }
        }
      },
      style () {
        let style = Object.assign({}, this.options.itemStyle, this.itemDefaultStyle)
        return style
      }
    }
  }
</script>

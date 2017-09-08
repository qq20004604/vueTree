/**
* Created by 王冬 on 2017/9/5.
* QQ: 20004604
* weChat: qq20004604
*/

<template>
  <div :style="backSpace" class="line">
    <!--<div>level: {{level}}</div>-->
    <div :style="style" class="line-textarea">
      <span class="item">{{level}}：{{data.name}}<span :class="{animation:settings.underLine}"></span></span>
      <button v-if="data.children" @click="hideOrShow(data)">{{data.hidden?'隐':'显'}}</button>
      <!--<input type="text" v-model="val">-->
      <!--<button @click="addItem">+</button>-->
    </div>
    <template v-for="(val, key) in data.children" v-if="!data.hidden">
      <tree-item :data="val" :level="Number(level + 1)" :options="options" :settings="settings"></tree-item>
    </template>
  </div>
</template>
<style scoped>
  .item {
    cursor: pointer;
    overflow: hidden;
    position: relative;
  }

  .line-textarea {
    overflow: hidden;
    position: relative;
  }

  .animation {
    position: absolute;
    left: 0;
    bottom: 1px;
    height: 1px;
    z-index: 1;
    width: 0;
    background-color: #fff;
    width: 0%;
  }

  /* duang的特效 */
  .item:hover .animation {
    width: 100%;
    transition: width 1s ease;
  }


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
      options: {
        type: Object,
        default () {
          return {
            topItemStyle: {},
            itemStyle: {},
            backSpace: 20
          }
        }
      },
      settings: {
        type: Object,
        default () {
          return {}
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
      // 隐藏显示子节点
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
        return {
          marginLeft: (this.settings.backSpace ? this.settings.backSpace : '20') + 'px'
        }
      },
      style () {
        let style = Object.assign({}, this.options.itemStyle, this.itemDefaultStyle)
        return style
      }
    }
  }
</script>

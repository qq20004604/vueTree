/**
* Created by 王冬 on 2017/9/5.
* QQ: 20004604
* weChat: qq20004604
* 传入的data是一个数组（测试数据用testData），因此支持多根结点
*/

<template>
  <div :style="listStyle" class="list">
    <template v-for="(v, k) in Data">
      <keep-alive>
        <root-node :styleOptions="styleOptions" :data="v" :settings="mixinSetting" ref="root"
                   :events="events" :asyncLoad="asyncLoad"></root-node>
      </keep-alive>
    </template>
  </div>
</template>
<style scoped>
  /* 整个列表的样式 */
  .list {
    position: relative;
    overflow: auto; /*可以确保所有都基于根的列表元素（不会超出这个范围）*/
    background-color: #232a30; /*列表的背景颜色*/
    color: #ddd; /*整体文字颜色*/
    width: 100%; /*宽度（默认撑满）*/
    height: 100%; /*宽度（默认撑满）*/
  }

</style>
<script>
  import rootNode from './rootNode.vue'
  import {
    defaultSettings,
    treeNodeEvents,
    asyncLoad as load
  } from './config.js'
  import {deepCopy} from './public'

  export default {
    props: {
      styleOptions: {
        type: Object,
        default () {
          return {
            // 整个列表的样式
            listStyle: {},
            // 根结点的样式（包括他的子节点）
            rootStyle: {},
            // 根结点，这里指的是层级为0的结点，不包括更深层级的结点
            topNodeStyle: {},
            // 下层子节点的样式
            nodeStyle: {}
          }
        }
      },
      settings: {
        type: Object,
        default () {
          return {}
        }
      },
      data: {
        type: [Object, Array],
        default () {
          return {}
        }
      },
      userEvents: {
        type: Object,
        default () {
          return {}
        }
      },
      async: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    created () {
    },
    data () {
      return {}
    },
    computed: {
      defaultListStyle () {
        let style = {}
        // 如果overflow隐藏，那么添加overflow
        if (this.mixinSetting.isOverflowHidden.enabled) {
          style['overflow-x'] = 'hidden'
        }
        return style
      },
      listStyle () {
        // 如果配置有listStyle，则返回混合后的
        // 来源于setting的css的优先级高于普通配置（下同）
        if (this.styleOptions.listStyle) {
          return Object.assign(this.styleOptions.listStyle, this.defaultListStyle)
        } else {
          return this.defaultListStyle
        }
      },
      mixinSetting () {
        return this.deepMixin(defaultSettings, this.settings)
      },
      Data () {
        if (Object.prototype.toString.call(this.data) !== '[object Array]') {
          return [this.data]
        } else {
          return this.data
        }
      },
      events () {
        return Object.assign({}, treeNodeEvents, this.userEvents)
      },
      asyncLoad () {
        return Object.assign({}, load, this.async)
      }
    },
    methods: {
      // 如果改变了根节点的宽度，或者其他需要重绘的情况，需要手动调用这个方法
      resize () {
        if (!this.$refs.root || this.$refs.root.length === 0) {
          return
        }
        this.$refs.root.forEach(root => {
          root.resize()
        })
      },
      // 深度合并
      deepMixin (first, second) {
        let newFirst = deepCopy(first)
        let result = deepCopy(second, newFirst)
        return result
      },
      // 获取选中的节点
      getSelectedNode () {
        // 返回是数组形式
        let result = []
        if (!this.$refs.root || this.$refs.root.length === 0) {
          return result
        }
        this.$refs.root.forEach(root => {
          let arr = root.getSelectedNode()
          result = result.concat(arr)
        })
        return result
      }
    },
    components: {
      rootNode
    }
  }
</script>

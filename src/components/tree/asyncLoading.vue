/**
* Created by 王冬 on 2017/10/3.
* QQ: 20004604
* weChat: qq20004604
* 表示加载中的组件
*/

<template>
  <div>
    <div class="line" :style="style">
      <div class="content" :style="nodeStyle">
        <span class="text-box">
            <span class="text">Loading<template v-for="n in number">.</template></span>
          </span>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .line {
    display: block;
    overflow: hidden;
    white-space: nowrap;
  }

  .content {
    position: relative;
    overflow: hidden;
    height: 20px;
    line-height: 20px;
    cursor: pointer;
  }

  .text-box {
    height: 20px;
    line-height: 20px;
    display: inline-block;
    overflow: hidden;
    position: relative;
  }

  .text {
    display: inline-block;
  }

</style>
<script>
  export default {
    name: 'async-loading',
    props: {
      styleOptions: {
        type: Object,
        default () {
          return {
            topNodeStyle: {},
            nodeStyle: {},
            backSpace: 20
          }
        }
      },
      settings: {
        type: Object,
        default () {
          return {}
        }
      },
      level: {
        type: Number
      }
    },
    created () {
      this.timer = setInterval(() => {
        if (this.number > 6) {
          this.number = 1
        } else {
          this.number++
        }
      }, 500)
    },
    destroyed () {
      clearInterval(this.timer)
    },
    data () {
      return {
        nodeDefaultStyle: {
          height: '20px',
          lineHeight: '20px'
        },
        timer: null,
        number: 0
      }
    },
    computed: {
      style () {
        let style = Object.assign({}, this.styleOptions.nodeStyle, this.nodeDefaultStyle)
        style['padding-left'] = this.settings.backSpace.additionalBackSpaceForChildNode + 'px'
        return style
      },
      nodeStyle () {
        let style = {
          paddingLeft: (this.settings.backSpace.enabled ? this.settings.backSpace.value : 20) * this.level + 'px'
        }

        if (this.settings.isOverflowHidden) {
          style['max-width'] = '100%'
          style['overflow-x'] = 'hidden'
          style['text-overflow'] = 'ellipsis'
          style['white-space'] = 'no-wrap'
        }

        style['height'] = this.style.height
        style['line-height'] = this.style.lineHeight
        return style
      }
    }
  }
</script>

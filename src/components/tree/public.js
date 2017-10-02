/**
 * Created by 王冬 on 2017/9/21.
 * QQ: 20004604
 * weChat: qq20004604
 * 抽象出的公共方法
 */
import Velocity from 'velocity-animate'

// 普通复制，只复制当前层，并且不会复制参数2里的key
function copy (from, ignoreArray) {
  let data = {}
  Object.keys(from).forEach(key => {
    if (ignoreArray.indexOf(key) === -1) {
      data[key] = from[key]
    }
  })
  return data
}

// 深度复制
function deepCopy (from, base) {
  let temp
  if (base) {
    temp = base
  } else {
    temp = {}
  }
  Object.keys(from).forEach(function (key) {
    let type = Object.prototype.toString.call(from[key])
    if (type === '[object Object]' || type === '[object Array]') {
      temp[key] = deepCopy(from[key], temp[key])
      if (type === '[object Array]') {
        temp[key] = Array.from(temp[key])
      }
    } else {
      temp[key] = from[key]
    }
  })
  return temp
}

// 组件进入动画（进入之前的第一帧）
function DOMTransitionWhenBeforeEnter (el, settings) {
  if (settings.transitions.enabled) {
    el.style.pointerEvents = 'none'
  }
}

// 组件进入时执行的动画（只执行一次），done表示进入完成
function DOMTransitionWhenEnter (el, done, settings) {
  if (settings.transitions.enabled) {
    // 需要获取真实高度
    let height = el.offsetHeight
    // 这行是给一个初始的状态
    Velocity(el, {scaleY: 0, height: 0}, {duration: 0})
    Velocity(el, {scaleY: 1, height}, {
      duration: settings.transitions.enterDuration,
      complete () {
        el.style.pointerEvents = 'auto'
        // 必须额外加下面这句，否则相当于height被设置了，而不是自适应
        el.style.height = ''
        done()
      }
    })
  } else {
    done()
  }
}

// 组件离开时执行的动画（只执行一次），done表示离开完成
function DOMTransitionWhenLeave (el, done, settings) {
  if (settings.transitions.enabled) {
    el.style.pointerEvents = 'none'
    Velocity(el, {scaleY: 0, height: 0}, {
      duration: settings.transitions.leaveDuration,
      complete () {
        el.style.pointerEvents = 'auto'
        el.style.height = ''
        done()
      }
    })
  } else {
    done()
  }
}

/*  当鼠标移动上去时触发本事件
 *   参数isNode表示是否是子节点，true为是，默认不是
 * */
function whenMouseOver (isChildNode) {
  // 如果没有隐藏超出的，直接返回
  if (!this.settings.isOverflowHidden.enabled || this.settings.isOverflowHidden.isEllipsis) {
    return
  }
  // 这个可以算出来当前有没有超出范围，大于等于0则超出，小于0则未超出范围
  let parentDOMWidth = this.$refs.parent.clientWidth
  let btnBoxDOM = this.$refs.btnBox
  let btnBoxDOMWidth
  if (btnBoxDOM) {
    btnBoxDOMWidth = btnBoxDOM.clientWidth
  } else {
    btnBoxDOMWidth = 0
  }
  let textSpanDOMWidth = this.$refs.textSpan.clientWidth
  // offset是额外偏差值，即给动画后的文字的右边留空
  let offset = this.settings.isOverflowHidden.offset
  // 动画时间
  let anitmateTime = this.settings.isOverflowHidden.animateTime
  // result表示实际总宽度减去父容器总宽度
  let result
  if (isChildNode) {
    result = textSpanDOMWidth +
      Number(this.settings.backSpace.enabled ? this.settings.backSpace.value : 20) * this.level +
      this.settings.backSpace.additionalBackSpaceForChildNode +
      btnBoxDOMWidth - parentDOMWidth + offset
  } else {
    result = textSpanDOMWidth +
      this.settings.backSpace.additionalBackSpaceForRootNode +
      btnBoxDOMWidth - parentDOMWidth + offset
  }
  // 实际宽度比父容器总宽度大，说明超出，所以执行跑马灯动画
  if (result > 0) {
    this.isMouseover = true
    if (this.textSpan.transform) {
      this.textSpan.transform = `translateX(-${result}px)`
      this.textSpan.transition = `transform ${anitmateTime}s 1s ease`
    } else {
      this.$set(this.textSpan, 'transform', `translateX(-${result}px)`)
      this.$set(this.textSpan, 'transition', `transform ${anitmateTime}s 1s ease`)
    }
  }
}

function whenMouseOut () {
  if (!this.settings.isOverflowHidden.enabled) {
    return
  }
  this.isMouseover = false
  this.$delete(this.textSpan, 'transform')
  this.$delete(this.textSpan, 'transition')
}

function setTextSpanWidth (isChildNode) {
  let parentDOMWidth = this.$refs.parent.clientWidth
  let btnBoxDOM = this.$refs.btnBox
  let btnBoxDOMWidth
  if (btnBoxDOM) {
    btnBoxDOMWidth = btnBoxDOM.clientWidth
  } else {
    btnBoxDOMWidth = 0
  }
  let textSpanDOMWidth = this.$refs.textSpan.clientWidth
  // offset是额外偏差值，即给动画后的文字的右边留空
  let offset = this.settings.isOverflowHidden.offset
  // if (this.data.testSign) {
  //   debugger
  // }

  // result表示实际总宽度减去父容器总宽度
  let result
  if (isChildNode) {
    result = parentDOMWidth - (Number(this.settings.backSpace.enabled ? this.settings.backSpace.value : 20) * this.level +
      this.settings.backSpace.additionalBackSpaceForChildNode +
      btnBoxDOMWidth + offset)
  } else {
    result = parentDOMWidth - (this.settings.backSpace.additionalBackSpaceForRootNode +
      btnBoxDOMWidth + offset)
  }
  if (result >= textSpanDOMWidth && this.textSpan.width) {
    this.$delete(this.textSpan, 'width')
  }
  if (this.settings.isOverflowHidden.isEllipsis) {
    this.$set(this.textSpan, 'width', result + 'px')
  }
}

// 当前组件未展开，但处于选中状态时，递归获取所有子元素，并以数组形式返回
// 参数一是children属性
// 参数二表示父节点是选中状态（1或者2）
// 参数三是当前节点的level（直接传this.level即可）
function getSelectedNodeDataWhenCloseed (children, parentCheckStatus, level) {
  // 如果不是数组，直接返回空数组
  if (Object.prototype.toString.call(children) !== '[object Array]') {
    return []
  }
  // 返回数组
  let result = []
  children.forEach(child => {
    // 如果子节点是不是半选或选中，跳过
    if (child.checked !== 1 || child.checked !== 2) {
      return
    } else if (child.checked === 2) {
      // 如果是选中，则添加进去
      let data = getNodeData(child, false, level)
      result.push(data)
    }
    let arr = getSelectedNodeDataWhenCloseed(child.children, parentCheckStatus, level + 1)
    result.concat(arr)
  })
  return result
}

// 输入节点，获取数据
// 参数一是数据来源
// 参数二表示调用本方法的是组件或者非组件
// 参数三、四，仅当参数二为false时生效，
// 参数三表示父节点层级
// 参数四表示父节点是否选中（一般是选中才进入，为后期丰富功能预设本参数）
function getNodeData (from, byComponent, parentLevel, isParentChecked = true) {
  let data = copy(from, ['children'])
  if (byComponent) {
    data.isOpened = this.isOpened
    data.level = this.level
  } else {
    // 父节点如果是2
    data.checked = isParentChecked ? 2 : 0
    data.level = parentLevel + 1
    data.isOpened = false
  }
  return data
}

// 获取选中的节点，及他的子节点的数据
function getSelectedNodeData () {
  // 返回是数组形式
  let result = []
  // 只有选中的时候，才会添加进去（半选状态不会）
  // 添加进去当前节点的数据
  let data
  if (this.checkedStatus === 2) {
    data = this.getData()
    result.push(data)
  } else if (this.checkedStatus === 0) {
    // 如果当前节点未选中，直接返回空数组
    return result
  }
  // 剩下的情况，是当前节点是【半选】或者【选中】的情况
  // 需要特别注意的是【半选】，半选的时候需要注意子节点的checked属性
  // 假如checked属性不存在，应视为0

  // 如果没有子组件，并且没有children属性，直接返回result
  if ((!this.$refs.child || this.$refs.child.length === 0) && !this.data.children) {
    return result
  }
  // 此时说明组件至少有children属性，那么要要this.data.children的数据添加到children属性中
  // 并且children不能影响this.data.children的状态（但元素是按引用传递的）
  data.children = []
  for (let i of this.data.children) {
    // 注意，由于只有在生成节点的时候，才会添加/纠正当前节点以及子节点的checked属性
    // 因此假如初始数据是错误的，那么这里返回某个子节点的checked属性就有可能是错误的
    // 为了性能，所以并没有递归去纠正所有子节点的数据
    // 因此【请勿完全相信children属性里的checked的值的正确性】，除非他曾经被渲染为节点
    data.children.push(i)
  }

  // 如果有子组件
  if (this.$refs.child && this.$refs.child.length > 0) {
    // 递归将子节点内容添加进去
    this.$refs.child.forEach(child => {
      let arr = child.getSelectedNode()
      result = result.concat(arr)
    })
  } else {
    // 剩下情况是没有子组件但有children属性
    // 调用本方法时，父元素必定是1或2（0的时候之前已经退出了）
    let arr = getSelectedNodeDataWhenCloseed(this.data.children, this.checkedStatus, this.level)
    result.concat(arr)
  }
  return result
}

export {
  deepCopy,
  DOMTransitionWhenBeforeEnter,
  DOMTransitionWhenEnter,
  DOMTransitionWhenLeave,
  whenMouseOver,
  whenMouseOut,
  setTextSpanWidth,
  copy,
  getNodeData,
  getSelectedNodeData
}

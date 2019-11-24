import React, { Component } from 'react';
import { BatteryContext } from '../utils/Context'

class Leaf extends Component {
  // 这是一个静态属性
  static contextType = BatteryContext
  render() {
    // 使用this.context 拿到当前的这个 context
    const battery = this.context
    return (
      <h1>Battery:{battery}</h1>
    )
  }
}

export default Leaf;
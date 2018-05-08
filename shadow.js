import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import Svg, { Rect, Defs, LinearGradient, Stop, RadialGradient, Path } from 'react-native-svg'
/**
 * @author liupengfei 
 * 使用此组件必须传确定的width和height，onlyBorder确定只显示某一条边
 * 此组件借鉴于react-native-shadow
 */
export default class Shadow extends Component {
  render = () => {
    const { style, onlyBorder, children } = this.props
    const styleObject = StyleSheet.flatten(style);
    const { width = 0, height = 0, shadowColor = "#000", shadowRadius = 2, borderRadius = 0, shadowOpacity = 1, } = styleObject;
    //删除shadowColor  shadowRadius    borderRadius  shadowOpacity 四个参数，有这四个参数显示有问题
    var viewStyle = {};
    for (var attr in styleObject) {
      if (attr != 'shadowColor' && attr != 'shadowRadius' && attr != 'borderRadius' && attr != 'shadowOpacity') {
        viewStyle[ attr ] = styleObject[ attr ];
      }
    }
    const x = 0, y = 0
    const lineWidth = shadowRadius,
      rectWidth = width - borderRadius * 2,
      rectHeight = height - borderRadius * 2
    const outerWidth = lineWidth + borderRadius;

    const linear = (key) => {
      return [
        <Stop offset="0" stopColor={shadowColor} stopOpacity={shadowOpacity} key={key + 'Linear0'} />,
        <Stop offset="1" stopColor={shadowColor} stopOpacity="0" key={key + 'Linear1'} />
      ]
    }
    const radial = (key) => {
      return [
        <Stop offset="0" stopColor={shadowColor} stopOpacity={shadowOpacity} key={key + 'Radial0'} />,
        <Stop offset={(borderRadius / (lineWidth + borderRadius)).toString()} stopColor={shadowColor} stopOpacity={shadowOpacity} key={key + 'Radial1'} />,
        <Stop offset="1" stopColor={shadowColor} stopOpacity="0" key={key + 'Radial2'} />
      ]
    }
    const d = `M 0 ${outerWidth},Q 0 0 ${outerWidth} 0,v ${lineWidth},q ${-borderRadius} 0 ${-borderRadius} ${borderRadius},h ${-lineWidth},z`;

    return (
      <View style={viewStyle} >
        <Svg height={height + lineWidth * 2 + borderRadius * 2} width={width + lineWidth * 2 + borderRadius * 2} style={{ position: "absolute", top: y - lineWidth, left: x - lineWidth }}>
          <Defs>
            <LinearGradient id="top" x1="0%" x2="0%" y1="100%" y2="0%">{linear('BoxTop')}</LinearGradient>
            <LinearGradient id="bottom" x1="0%" x2="0%" y1="0%" y2="100%">{linear('BoxBottom')}</LinearGradient>
            <LinearGradient id="left" x1="100%" y1="0%" x2="0%" y2="0%">{linear('BoxLeft')}</LinearGradient>
            <LinearGradient id="right" x1="0%" y1="0%" x2="100%" y2="0%" >{linear('BoxRight')}</LinearGradient>

            <RadialGradient id="border-left-top" r="100%" cx="100%" cy="100%" fx="100%" fy="100%">{radial('BoxLeftTop')}</RadialGradient>
          </Defs>
          {!onlyBorder ? [
            <Path d={d} fill="url(#border-left-top)" />,
            <Path d={d} fill="url(#border-left-top)" rotate={90} origin={`${shadowRadius + width / 2},${shadowRadius + width / 2}`} />,
            <Path d={d} fill="url(#border-left-top)" rotate={-90} origin={`${shadowRadius + height / 2},${shadowRadius + height / 2}`} />,
            <Path d={d} fill="url(#border-left-top)" rotate={180} origin={`${shadowRadius + width / 2},${shadowRadius + height / 2}`} /> ]
            : null}
          {!onlyBorder || onlyBorder == 'top' ? <Rect x={outerWidth} y="0" width={rectWidth} height={lineWidth} fill="url(#top)" /> : null}
          {!onlyBorder || onlyBorder == 'left' ? <Rect x="0" y={outerWidth} width={lineWidth} height={rectHeight} fill="url(#left)" /> : null}
          {!onlyBorder || onlyBorder == 'right' ? <Rect x={rectWidth + lineWidth + 2 * borderRadius} y={outerWidth} width={lineWidth} height={rectHeight} fill="url(#right)" /> : null}
          {!onlyBorder || onlyBorder == 'bottom' ? <Rect x={outerWidth} y={rectHeight + lineWidth + 2 * borderRadius} width={rectWidth} height={lineWidth} fill="url(#bottom)" /> : null}

        </Svg>
        {children}
      </View>
    )
  }
}

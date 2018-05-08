# rn-shadow
rn-shadow finfosoft used
## 准备工作
npm i rn-shadow --save

根据你的项目版本安装 [react-native-svg](https://github.com/react-native-community/react-native-svg)

## 使用方法
可以把这个组件当成一个View来使用，这个View可以包含多个组件

## 示例
import Shadow from 'rn-shadow';
//……
<Shadow style={styles.boxShadow}></Shadow>
//……
const styles = StyleSheet.create({
  boxShadow: {
    width: width - 60, // 必须
    height: height - 120, // 必须
    shadowColor: "#999", // 阴影颜色
    shadowOpacity: 0.5, // 阴影透明度
    shadowRadius: 5, // 阴影宽度
    borderRadius: 10, // 阴影圆角大小
    marginVertical: 80,
    alignSelf: "center",
    alignItems: "center",
  },
}）
## 感谢 
[react-native-shadow](https://github.com/879479119/react-native-shadow)
const { sep } = require('path') // path.sep获取文件路径分隔符，win7和mac系统不一样'\\'或'/'
module.exports = ({ file }) => {
  let rootValue = file.dirname.indexOf(`node_modules${sep}vant`) !== -1 ? 37.5 : 75 // vant基于375像素开发，而一般ui设计稿是750像素
  return {
    plugins: {
      autoprefixer: {},
      'postcss-pxtorem': {
        rootValue,
        propList: ['*']
      }
    }
  }
}

module.exports ={
  plugins: {
    autoprefixer:{},
    "postcss-px-to-viewport":{
      viewportWidth:375,//视窗的宽度，对应的是我们设计稿的宽度
      viewportHeight:667,//视窗的高度，对应的是我们设计稿的高度（也可以不设置）
      unitPrecision:5,//指定'px'转换为视窗单位值的小数位数
      viewportUnit:'vw',//指定需要装换成的视窗单位，建议使用vw
      selectorBlackList:['ignore'],//指定不需要装换的类，后面再讲
      minPiexlValue:1,//小于或等于'1px'不转换为视窗单位
      mediaQuery:false,//运行媒体查询中转换'px'
      exclude:[/TabBar\.vue$/]//不包含某些文件，正则表达式
    }
  }
}
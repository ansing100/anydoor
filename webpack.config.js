/* eslint-disable */
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractLess = new ExtractTextPlugin({
  filename: "../css/[name].css",
  disable: process.env.NODE_ENV === "development"
});
const webpack = require('webpack');


module.exports = {
  mode: "production", // "production" | "development" | "none"
  // Chosen mode tells webpack to use its built-in optimizations accordingly.

  entry: {
    index:"./test/index.js", // string | object | array
    vendor:["react","react-dom"]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: "initial",
          test: "vendor",
          name: "vendor",
          enforce: true
        }
      }
    }
  },
  // 这里应用程序开始执行
  // webpack 开始打包

  output: {
    // webpack 如何输出结果的相关选项

    path: path.resolve(__dirname, "build/script"), // string
    // 所有输出文件的目标路径
    // 必须是绝对路径（使用 Node.js 的 path 模块）

    filename: "[name].js", // string
    // 「入口分块(entry chunk)」的文件名模板（出口分块？）


  },


  module: {
    // 关于模块配置
    // loaders: [
    //   {
    //     test:/\.js|jsx$/,
    //     loaders: ['babel-loader']
    //   }
    // ],

    rules: [
      // 模块规则（配置 loader、解析器等选项）

      {
        test:/\.js|jsx$/,
        include: [
          path.resolve(__dirname, "test")
        ],
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["react"]
            },
            // loader 的可选项
          }
        ],

        // issuer: {test,include},
        // issuer 条件（导入源）


        // loader: "babel-loader",
        // 应该应用的 loader，它相对上下文解析
        // 为了更清晰，`-loader` 后缀在 webpack 2 中不再是可选的
        // 查看 webpack 1 升级指南。


      },
      {
        test: /\.less$/,
        use: extractLess.extract({
          use: [{
            loader: "css-loader"
          }, {
            loader: "less-loader"
          }],
          // use style-loader in development
          fallback: "style-loader"
        })
      }

    ],

    /* 高级模块配置（点击展示） */
  },
  plugins: [
    // ...
    extractLess,

  ],

  // 附加插件列表
  /* 高级配置（点击展示） */
};

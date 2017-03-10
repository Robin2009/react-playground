var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
const {resolve} = require('path');

module.exports = {

    context: resolve(__dirname, 'src'),
    devtool: debug
        ? "inline-sourcemap"
        : false, //webpack2:should be a String type value or a Boolean type value.
    entry: [
        //HMR的webpack配置见这里:  https://doc.webpack-china.org/guides/hmr-react/
        'react-hot-loader/patch',
        // 开启 React 代码的模块热替换(HMR)

        'webpack-dev-server/client?http://localhost:8080',
        // 为 webpack-dev-server 的环境打包代码 然后连接到指定服务器域名与端口

        'webpack/hot/only-dev-server',
        // 为热替换(HMR)打包好代码 only- 意味着只有成功更新运行代码才会执行热替换(HMR)

        "./js/index.js"
    ],
    output: {
        path: resolve(__dirname, 'dist/js'),
        publicPath: '/assets/',
        filename: "bundle.js"
    },
    devServer: {
        hot: true,
        // 开启服务器的模块热替换(HMR)

        contentBase: resolve(__dirname, 'dist'),
        // 输出文件的路径

        publicPath: '/assets/'
        // 和上文 output 的“publicPath”值保持一致
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            }, {
                test: /\.css$/,
                use: ['style-loader', 'css-loader?modules', 'postcss-loader']
            }
        ]
    },
    plugins: debug
        ? [
            new webpack.HotModuleReplacementPlugin(),
            // 开启全局的模块热替换(HMR)

            new webpack.NamedModulesPlugin(),
            // 当模块热替换(HMR)时在浏览器控制台输出对用户更友好的模块名字信息
        ]
        : [
            new webpack
                .optimize
                .DedupePlugin(),
            new webpack
                .optimize
                .OccurrenceOrderPlugin(), //webpack2: rename from OccurenceOrderPlugin ==> OccurrenceOrderPlugin
            new webpack
                .optimize
                .UglifyJsPlugin({mangle: false, sourcemap: false})
        ]
};
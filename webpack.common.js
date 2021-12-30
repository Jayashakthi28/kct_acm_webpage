const path=require("path")
const htmlPlugin=require("html-webpack-plugin")
const cssPlugin=require('mini-css-extract-plugin')
const webpack=require('webpack')
module.exports={
    entry:{
        index:'./src/js/first.js',
        second:'./src/js/second.js'
    },
    plugins:[
        new htmlPlugin({
            template:'./src/index.html',
            chunks:['index'],
            filename:'index.html'
        }),
        new htmlPlugin({
            template:'./src/events.html',
            chunks:['second'],
            filename:'events.html'
        }),
        new cssPlugin({
            filename:'[name].[hash].css'
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        })
    ],
    module:{
        rules:[
            {
                test:/\.html$/,
                use:[
                    "html-loader"
                ]
            },
            {
                test:/\.css$/,
                use:[
                    cssPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test:/\.(png|jpg|jpeg|ttf|svg|gif)$/,
                type:'asset/resource',
                generator:{
                    filename:'assets/[name].[hash].[ext]'
                }
            },
            {
                test:/\.json$/,
                type:'asset/resource',
                generator:{
                    filename:'assets/[name][ext]'
                }
            }
        ]
    }
};

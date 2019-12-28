const path = require('path');

module.exports = {
    mode: "development",
    entry: "./www/app/main.js",
    output: {
        path: path.resolve(__dirname, "www/dist"), // string
        filename: "all.js", // string
        // publicPath: "simu", // for dev_server
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|assets)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015','react'],
                        plugins: ['transform-object-rest-spread']
                    }
                }
            },
            // {
            //     test: /\.less$/,
            //     use: [
            //         {
            //             loader: 'style-loader'
            //         },
            //         {
            //             loader: 'css-loader'
            //         },
            //         {
            //             loader: 'less-loader'
            //         },
            //     ]
            // },
        ]
    },
    watch: true, // enable this line when there's no dev_server
}

// start back-end: node app.js
// start front-end: webpack
module.exports = {
    // options...
    devServer: {
        disableHostCheck: true,
        watchOptions: {
            poll: true
        },
        public: 'http://codeserver:8082',
	proxy: 'http://codeserver:8082'
    },
}

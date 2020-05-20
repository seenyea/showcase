const basicConfig = require('./basic');
const merge = require('webpack-merge');

module.exports = merge(basicConfig, {
    optimization: {
        minimize: true
    }
});
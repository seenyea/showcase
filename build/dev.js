const path = require('path');
const basicConfig = require('./basic');
const merge = require('webpack-merge');

const port = '8001';
module.exports = merge(basicConfig, {
    devServer: {//configure the dev server
        inline: true,
        port,
        setup: function(app, server) {
            app.post('/api/person/create', function(req, res) {
              res.json({ msg: 'create' });
            });

            app.put('/api/person/update', function (req, res) {
                res.json({ msg: 'update' });
            });

            app.get('/api/person/get', function (req, res) {
                res.json({ msg: 'get', data: [{
                    cellNumber: "650-353-1239",
                    id: "501",
                    key: "501",
                    location: "Shang Hai",
                    name: "Khali Zhang",
                    offcie: "C-103",
                    offcieNumber: "x55778"
                }] });
            });

            app.delete('/api/person/delete', function (req, res) {
                res.json({ msg: 'delete' });
            });
        }

    }
});
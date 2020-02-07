/* Magic Mirror
 * Module: MMM-EveryNews
 *
 * By Mykle1
 *
 */
const NodeHelper = require('node_helper');
const request = require('request');

module.exports = NodeHelper.create({

    start: function() {
        console.log("Starting node_helper for: " + this.name);
    },
    getNatGeo: function(url) {
        request({
               url: 'https://newsapi.org/v2/top-headlines?sources='+this.config.source+'&pageSize=50&sortBy=popularity&apiKey='+this.config.apiKey,
            method: 'GET'
        }, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                var result = JSON.parse(body).articles;
                this.sendSocketNotification('NATGEO_RESULT', result);
            }
        });
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === 'GET_NATGEO') {
            this.getNatGeo(payload);
        }
        if (notification === 'CONFIG') {
            this.config = payload;
      //  console.log(this.config);
        }
    }
});

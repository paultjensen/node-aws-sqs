
/*global Promise*/
/*global Set*/
/* SQS Data Access Example
 * consumer.js
 *
 * Purpose: Examples to consume SQS messages using the AWS SDK and bbc sqs-consumer.
 * Author: Paul Jensen (paul.t.jensen@gmail.com)
 */

(function() {
    'use strict';
    const Logger = require('./lib/logger');
    const { Consumer } = require('sqs-consumer');

    const app = Consumer.create({
        queueUrl: 'https://sqs.us-east-1.amazonaws.com/[AWS Account ID]/test1',
        handleMessage: async (message) => {
            Logger.log.info(JSON.stringify(message));
        }
    });

    app.on('error', (err) => {
        Logger.log.error(err.message);
    });

    app.on('processing_error', (err) => {
        Logger.log.error(err.message);
    });

    app.start();

})();

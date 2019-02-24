/*global Promise*/
/*global Set*/
/* SQS Data Producer Example
 * producer.js
 *
 * Purpose: Examples to exercise functions for SQS using the AWS SDK.
 * Author: Paul Jensen (paul.t.jensen@gmail.com)
 */

(function() {
    'use strict';

    const Logger = require('./lib/logger');
    const SQS = require('./lib/sqs').sqs;

    SQS.init();
    const queueUrl = 'https://sqs.us-east-1.amazonaws.com/[AWS Account ID]/test1';
    let queueData = [{ 'date': Date.now()}];

    SQS.init();
    let producer = SQS.getProducer(queueUrl);

    producer.send([{
        id: 'id1',
        body: JSON.stringify(queueData)
    }], function(err) {
        if (err) Logger.log.error(err);
    });

})();

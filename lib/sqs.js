/*global Promise*/
/*global Set*/
/*global Buffer*/
/*global require*/

/* SQS Data Access
 * sqs.js
 *
 * Purpose: Provides functions for working with SQS using the AWS SDK.
 * Author: Paul Jensen (paul.t.jensen@gmail.com)
 */

(function() {
    'use strict';

    const Aws = require('aws-sdk');
    const SqsConsumer = require('sqs-consumer');
    const SqsProducer = require('sqs-producer');
    const Logger = require('../lib/logger');
    let _config = require('../lib/config').config;

    let sqs = {};

    sqs.init = function(config) {
        if (config) {
            _config = config;
        }
        sqs.region = _config.sqs_region;
    };

    sqs.getConsumer = function(sqsUrl, msgHandler, isSerial, requestAttributes) {

        let batchSize = 10;
        if (isSerial){
            batchSize = 1;
        }

        Logger.log.debug('Building SQS consumer.');
        try {
            return SqsConsumer.create({
                queueUrl: sqsUrl,
                region: sqs.region,
                batchSize: batchSize,
                waitTimeSeconds:20,
                handleMessage: msgHandler,
                attributeNames: requestAttributes
            });
        }
        catch(error){
            Logger.log.error('Failed to build an SQS consumer:', error);
        }
        return null;
    };

    sqs.getProducer = function(sqsUrl){
        Logger.log.debug('Building SQS producer.');
        try {
            return SqsProducer.create({
                queueUrl: sqsUrl,
                region: sqs.region
            });
        }
        catch(error){
            Logger.log.error('Failed to build an SQS producer:', error);
        }
        return null;
    };

    module.exports = {sqs: sqs};

})();
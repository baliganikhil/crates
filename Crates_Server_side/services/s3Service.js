const aws = require('aws-sdk');
const config = require('./config');
const bucket = config.bucket;

const S3 = new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

exports.getLevelKey = (game, difficulty, userId, timestamp) => {
    return [game, 'levels', difficulty, userId, timestamp + '.json'].join('/');
}

exports.upload = (levelMetadataJSON, callback) => {
    const params = {
        Bucket: bucket, 
        Key: exports.getLevelKey(
            levelMetadataJSON.game, 
            levelMetadataJSON.difficulty, 
            levelMetadataJSON.createdBy, 
            levelMetadataJSON.createdAt),
        Body: JSON.stringify(levelMetadataJSON)
    };
    S3.upload(params, callback);
}

exports.download = (game, difficulty, createdBy, createdAt, callback) => {
    const params = {
        Bucket: bucket, 
        Key: exports.getLevelKey(game, difficulty, createdBy, createdAt) 
    };
    S3.getObject(params, callback);
}

exports.delete = (game, difficulty, createdBy, createdAt, callback) => {
    const params = {
        Bucket: bucket, 
        Key: exports.getLevelKey(game, difficulty, createdBy, createdAt) 
    };
    S3.deleteObject(params, callback);
}

exports.listObjects = (marker, prefix) => {
    const params = { 
        Bucket: bucket,
        Delimiter: '',
        Prefix: prefix
    };
    if (marker) params.Marker = marker;
    return S3.listObjects(params).promise();
}

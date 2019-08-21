let aws = require('aws-sdk');

let s3 = new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

let getLevelKey = (game, difficulty, userId, timestamp) => {
    return game + "/Levels/" + difficulty + "/" + userId + "/" + timestamp + ".json";
}

let listAllObjectKeysFromS3Bucket = async (bucket, delimiter, prefix) => {
    let isTruncated = true;
    let marker;
    let allObjectKeysList = [];
    while(isTruncated) {
        let params = { Bucket: bucket };
        if (delimiter) params.Delimiter = delimiter;
        if (prefix) params.Prefix = prefix;
        if (marker) params.Marker = marker;
        try {
            const response = await s3.listObjects(params).promise();
            response.Contents.forEach(item => {
                allObjectKeysList.push(item.Key);
            });
            isTruncated = response.IsTruncated;
            if (isTruncated) {
                marker = response.Contents.slice(-1)[0].Key;
            }
        } catch(error) {
            throw error;
        }
    }
    return allObjectKeysList;
}

let getAllLevelKeysList = (allObjectKeysList) => {
    let allLevelKeysList = [];
    allObjectKeysList.forEach(objectKey => {
        if (objectKey[objectKey.length - 1] != "/") allLevelKeysList.push(objectKey);
    });
    return allLevelKeysList;
}

exports.saveLevel = (levelMetadataJSON) => {
    return new Promise((resolve, reject) => {
        const params = {
            Bucket: 'nikhilgamehub', 
            Key: getLevelKey(
                levelMetadataJSON.game, 
                levelMetadataJSON.difficulty, 
                levelMetadataJSON.createdBy, 
                levelMetadataJSON.createdAt),
            Body: JSON.stringify(levelMetadataJSON)
        };
        s3.upload(params, function(error, data) {
            if (error) reject(error);
            else {
                console.log(levelMetadataJSON);
                console.log("Level Metadata file uploaded successfully at " + data.Location);
                let response = {
                    err: false,
                    data: data
                };
                resolve(response);
            }
            });
    });
};

exports.getLevel = (game, difficulty, createdBy, createdAt) => {
    return new Promise((resolve, reject) => {
        const params = {
            Bucket: 'nikhilgamehub', 
            Key: getLevelKey(game, difficulty, createdBy, createdAt) 
        };
        s3.getObject(params, function(error, data) {
            if (error) reject(error); 
            else {
                let levelMetadataJSON = JSON.parse(data.Body.toString());
                console.log(levelMetadataJSON);
                console.log("Retrieved level Metadata of the level: " + 
                    getLevelKey(game, difficulty, createdBy, createdAt) + " successfully");
                let response = {
                    err: false,
                    data: levelMetadataJSON
                };
                resolve(response); 
            }           
        });
    });
};

exports.getAllLevels = (game) => {
    return new Promise((resolve, reject) => {
        try {
            listAllObjectKeysFromS3Bucket('nikhilgamehub', '', game + '/Levels/').
            then((allObjectKeysList) => {
                let allLevelKeysList = getAllLevelKeysList(allObjectKeysList);
                console.log("List of All Level Keys:");
                console.log(allLevelKeysList);
                let response = {
                    err: false,
                    data: allLevelKeysList
                };
                resolve(response); 
            });
        } catch (error) {
            reject(error);
        }
    });
};

exports.getLevelsOfReqDifficulty = (game, difficulty) => {
    return new Promise((resolve, reject) => {
        try {
            listAllObjectKeysFromS3Bucket('nikhilgamehub', '', game + '/Levels/' + difficulty).
            then((allObjectKeysList) => {
                let allLevelKeysList = getAllLevelKeysList(allObjectKeysList);
                console.log("List of Level Keys of difficulty level: " + difficulty);
                console.log(allLevelKeysList);
                let response = {
                    err: false,
                    data: allLevelKeysList
                };
                resolve(response); 
            });
        } catch (error) {
            reject(error);
        }
    });
};

exports.deleteLevel = (game, difficulty, createdBy, createdAt) => {
    return new Promise((resolve, reject) => {
        const params = {
            Bucket: 'nikhilgamehub', 
            Key: getLevelKey(game, difficulty, createdBy, createdAt) 
        };
        s3.deleteObject(params, function(error, data) {
            if (error) reject(error); 
            else {
                console.log("Deleted level Metadata of the level: " +
                    getLevelKey(game, difficulty, createdBy, createdAt) + " successfully");
                let response = {
                    err: false,
                    data: data
                };
                resolve(response); 
            }           
        });
    });
};
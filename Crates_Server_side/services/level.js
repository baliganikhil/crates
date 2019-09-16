const uuidv1 = require('uuid/v1');
const s3Service = require('./s3Service');

let listAllObjectKeysFromS3Bucket = async (prefix) => {
    let isTruncated = true;
    let marker;
    let allObjectKeysList = [];
    while(isTruncated) {
        const response = await s3Service.listObjects(marker, prefix);
        response.Contents.forEach(item => {
            allObjectKeysList.push(item.Key);
        });
        isTruncated = response.IsTruncated;
        if (isTruncated) {
            marker = response.Contents.slice(-1)[0].Key;
        }
    }
    return allObjectKeysList;
}

let listAllLevelKeys = (allObjectKeysList) => {
    return allObjectKeysList.filter( objectKey => {
        return objectKey[objectKey.length - 1] !== "/"; });
}

exports.saveLevel = (levelMetadataJSON, userId) => {
    levelMetadataJSON.updatedAt = Date.now();
    if (!levelMetadataJSON.createdAt) {
        levelMetadataJSON.createdAt = levelMetadataJSON.updatedAt;
    }
    if (!levelMetadataJSON.id) {
        levelMetadataJSON.id = uuidv1();
        levelMetadataJSON.createdBy = userId;
    }
    return new Promise((resolve, reject) => {
        s3Service.upload(levelMetadataJSON, (error, data) => {
            if (error) {
                let response = {
                    err: true,
                    data: error
                };
                reject(response);
            }
            else {
                console.log(levelMetadataJSON);
                console.log("Level Metadata file uploaded successfully at " + data.Location);
                let response = {
                    err: false,
                    data: data
                };
                resolve(response);
            }
        })
    });
};

exports.getLevel = (game, difficulty, createdBy, createdAt) => {
    return new Promise((resolve, reject) => {
        s3Service.download(
            game, 
            difficulty, 
            createdBy, 
            createdAt,
            (error, data) => {
                if (error) {
                    let response = {
                        err: true,
                        data: error
                    };
                    reject(response);
                }
                else {
                    let levelMetadataJSON = JSON.parse(data.Body.toString());
                    console.log(levelMetadataJSON);
                    console.log("Retrieved level Metadata of the level: " + 
                        s3Service.getLevelKey(game, difficulty, createdBy, createdAt) + " successfully");
                    let response = {
                        err: false,
                        data: levelMetadataJSON
                    };
                    resolve(response); 
                }
            }
        );
    });
};

exports.getAllLevels = (game) => {
    return new Promise((resolve, reject) => {
        try {
            listAllObjectKeysFromS3Bucket(game + '/levels/').
            then((allObjectKeysList) => {
                let allLevelKeysList = listAllLevelKeys(allObjectKeysList);
                console.log("List of All Level Keys:");
                console.log(allLevelKeysList);
                let response = {
                    err: false,
                    data: allLevelKeysList
                };
                resolve(response); 
            });
        } catch (error) {
            let response = {
                err: true,
                data: error
            };
            reject(response);
        }
    });
};

exports.getLevelsOfReqDifficulty = (game, difficulty) => {
    return new Promise((resolve, reject) => {
        try {
            listAllObjectKeysFromS3Bucket(game + '/levels/' + difficulty).
            then((allObjectKeysList) => {
                let allLevelKeysList = listAllLevelKeys(allObjectKeysList);
                console.log("List of Level Keys of difficulty level: " + difficulty);
                console.log(allLevelKeysList);
                let response = {
                    err: false,
                    data: allLevelKeysList
                };
                resolve(response); 
            });
        } catch (error) {
            let response = {
                err: true,
                data: error
            };
            reject(response);
        }
    });
};

exports.deleteLevel = (game, difficulty, createdBy, createdAt) => {
    return new Promise((resolve, reject) => {
        s3Service.delete(
            game, 
            difficulty, 
            createdBy, 
            createdAt, 
            (error, data) => {
                if (error) {
                    let response = {
                        err: true,
                        data: error
                    };
                    reject(response);
                }
                else {
                    console.log("Deleted level Metadata of the level: " +
                        s3Service.getLevelKey(game, difficulty, createdBy, createdAt) + " successfully");
                    let response = {
                        err: false,
                        data: data
                    };
                    resolve(response); 
                }           
            }
        );
    });
};
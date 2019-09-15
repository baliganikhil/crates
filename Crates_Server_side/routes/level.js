const LevelService = require('../services/level');

exports.getLevel = (req, res) => {
    const game = req.params.game;
    const difficulty = req.params.difficulty;
    const createdBy = req.params.createdBy;
    const createdAt = req.params.createdAt;
    LevelService.
        getLevel(game, difficulty, createdBy, createdAt).
        then((response) => {
            res.send(response);
        }).
        catch((error) => {
            res.status(404);
            res.send(error);
        });
};

exports.getAllLevels = (req, res) => {
    const game = req.params.game;
    LevelService.
        getAllLevels(game).
        then((response) => {
            res.send(response);
        }).
        catch((error) => {
            res.status(404);
            res.send(error);
        });
};

exports.getLevelsOfReqDifficulty = (req, res) => {
    const game = req.params.game;
    const difficulty = req.params.difficulty;
    LevelService.
        getLevelsOfReqDifficulty(game, difficulty).
        then((response) => {
            res.send(response);
        }).
        catch((error) => {
            res.status(404);
            res.send(error);
        });
};

exports.saveLevel = (req, res) => {
    const levelMetadataJSON = req.body;
    const createdBy = req.user.id;
    LevelService.
        saveLevel(levelMetadataJSON, createdBy).
        then((response) => {
            res.send(response);
        }).
        catch((error) => {
            res.status(400);
            res.send(error);
        });
};

exports.deleteLevel = (req, res) => {
    const game = req.params.game;
    const difficulty = req.params.difficulty;
    const createdBy = req.user.id;
    const createdAt = req.params.createdAt;
    LevelService.
        deleteLevel(game, difficulty, createdBy, createdAt).
        then((response) => {
            res.send(response);
        }).
        catch((error) => {
            res.status(404);
            res.send(error);
        });
};
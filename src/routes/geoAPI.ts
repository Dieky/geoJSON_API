import express from "express";
import gameFacade from "../facades/gameFacade";
import {gameArea, players } from "../config/gameData";
const gju = require("geojson-utils")
const router = express.Router();


let polygonForClient:any = {};
polygonForClient.coordinates = gameArea.coordinates[0].map(point => {
    return { latitude: point[1], longitude: point[0] }
})

//Returns a polygon, representing the gameArea
router.get("/geoapi/gamearea", (req, res) => {
    res.json(polygonForClient);
});

router.get('/geoapi/isuserinarea/:lon/:lat', function (req, res) {
    const lon = req.params.lon;
    const lat = req.params.lat;
    const point = { "type": "Point", "coordinates": [lon, lat] }
    let isInside = gju.pointInPolygon(point, gameArea);
    let result:any = {};
    result.status = isInside;
    let msg = isInside ? "Point was inside the tested polygon" :
        "Point was NOT inside tested polygon";
    result.msg = msg;
    res.json(result);
});

router.get('/geoapi/findNearbyPlayers/:lon/:lat/:rad', function (req, res) {
    const lon = Number(req.params.lon);
    const lat = Number(req.params.lat);
    const rad = Number(req.params.rad);
    const point = { "type": "Point", "coordinates": [lon, lat] }
    let isInside = gju.pointInPolygon(point, gameArea);
    let result:any = [];
    players.forEach(player => {
        if (gju.geometryWithinRadius(player.geometry, point, rad)) {
            result.push(player);
        }
    })
    res.json(result);
});

router.get('/geoapi/distanceToUser/:lon/:lat/:username', function (req, res) {
    const { lon, lat, username } = req.params
    const point = { "type": "Point", "coordinates": [Number(lon), Number(lat)] }
    console.log(point, username);
    const user = players.find((player) => {
        return player.properties.name === username
    });
    if (!user) {
        res.status(404);
        return res.json({ msg: "User not found" });
    }
    let distance = gju.pointDistance(point, user.geometry);
    let result = { distance: distance, to: username }
    res.json(result);
});



module.exports = router;
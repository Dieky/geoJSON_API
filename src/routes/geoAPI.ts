import express from "express";
import gameFacade from "../facades/gameFacade";
const router = express.Router();

//Just to check this router is up and running
router.get('/', async function (req, res, next) {
  res.json({ msg: "game API" })
})

// router.post("/mobile", async function(req,res,next){
//   try {
//     let {username,lon,lat} = req.body;
//     //Read the exercise and check what must be sent with the request. Grab this information from the request body, and 
//     //call the method (the skeleton is already there) nearbyPlayers(....) in the gameFacade and send back the result to the client
    
//     const response = await gameFacade.updateLocationMobile(username,lon,lat)
//     return res.json(response)
//     /*
//      */
//   } catch (err) {
//     next(err)
//   }
  
// })

// router.post('/nearbyplayers', async function (req, res, next) {
//   try {
//     let {username,password,lon,lat,radius} = req.body;
//     //Read the exercise and check what must be sent with the request. Grab this information from the request body, and 
//     //call the method (the skeleton is already there) nearbyPlayers(....) in the gameFacade and send back the result to the client
    
//     const response = await gameFacade.nearbyPlayers(username,password,lon,lat,radius)
//     return res.json(response)
//     /*
//      */
//   } catch (err) {
//     next(err)
//   }
// })

// router.post('/getPostIfReached', async function (req, res, next) {
//   throw new Error("Not yet implemented")
// })

module.exports = router;
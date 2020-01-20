const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/ParseStringAsArray');
const { findConnections, sendMessage} = require('../websocket');

module.exports = {
    async index(request, response){
        const dev =  await Dev.find();
        return response.json(dev);
    },
    async store(request, response) {
        const {github_username, techs, latitude, longitude} = request.body;
        let dev = await Dev.findOne({ github_username });
        
        if(!dev){
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
            const { name = login, avatar_url, bio } = apiResponse.data;
            const techsArray = parseStringAsArray(techs);
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            };
        
            dev = await Dev.create({
                github_username,
                name, 
                avatar_url,
                bio,
                techs: techsArray,
                location,
            });

            //Filtrar  as conexões  que estão no máximo há 10km de distância 
            // e que o novo dev tenha pelo menos uma das tecnologias filtradas
             const sendSocketMessageTo = findConnections(
                 {latitude, longitude },
                 techsArray,
             )

             sendMessage(sendSocketMessageTo, 'new-dev', dev);
        }

        return response.json(dev);
    }, 
    async update(request, response){
        const { name, avatar_url, bio, techs } = request.body;
        const Id = request.params.id;
        const techsArray = parseStringAsArray(techs);

        let filterId = { _id : Id}
        let queryUpdate = { $set : {name,avatar_url,bio,techs:techsArray}}
 
        const dev = await Dev.updateOne(filterId,queryUpdate);
        
        return response.json( dev );
    },
    async destroy(request, response){

        return response.json({dev});
    }
}
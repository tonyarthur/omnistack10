const axios = require('axios');
const Dev = require('../models/Dev');
const ParseStringAsArray = require('../utils/ParseStringAsArray');


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
            const techsArray = ParseStringAsArray(techs);
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
        }
        return response.json(dev);
    }, 
    async update(request, response){
        const { name, avatar_url, bio, techs } = request.body;
        const Id = request.params.id;
        const techsArray = ParseStringAsArray(techs);

        let filterId = { _id : Id}
        let queryUpdate = { $set : {name,avatar_url,bio,techs:techsArray}}
 
        const dev = await Dev.updateOne(filterId,queryUpdate);
        
        return response.json( dev );
    },
    async destroy(request, response){

        return response.json({dev});
    }
}
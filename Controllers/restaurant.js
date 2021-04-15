const Restaurant = require('../Models/restaurant');
const Item = require('../Models/Item');

exports.getRestaurantByLocation = (req, res) => {
    const locationId = req.params.locationId;
    Restaurant.find({ location_id: Number(locationId) })
        .then(response => {
            res.status(200).json({ message: "Restaurant Fetched Successfully", restaurants: response })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}


exports.filterRestaurants = (req, res) => {
    const requestBody = req.body;
    const mealtype_id = requestBody.mealtype_id;
    const location_id = requestBody.location_id;
    const cuisine = requestBody.cuisine;
    const hcost = requestBody.hcost;
    const lcost = requestBody.lcost;
    const sort = requestBody.sort ? requestBody.sort : 1;
    const page = requestBody.page ? requestBody.page : 1;
    const countPerPage =  3;

    let payload = {};
    

 

    let startIndex;
    let endIndex;

    startIndex =  Number((page * countPerPage) - countPerPage);
    endIndex =  Number((page * countPerPage) - 1);

    if (mealtype_id) {
        payload = { mealtype_id: Number(mealtype_id) }
    }
    if (mealtype_id && location_id) {
        payload = { mealtype_id: Number(mealtype_id), location_id: Number(location_id) }
    }
    if (mealtype_id && cuisine) {
        payload = { mealtype_id: Number(mealtype_id), 
            cuisine: {$elemMatch:{id:{$in:cuisine }}}
        }
    }
    if (mealtype_id && location_id && cuisine) {
        payload = { mealtype_id: Number(mealtype_id), location_id: Number(location_id), cuisine: cuisine }
    }
    if (mealtype_id && lcost && hcost) {
        payload = {
            mealtype_id: Number(mealtype_id),
            min_price: { $lte: hcost, $gte: lcost }
        }
    }
    if (mealtype_id && location_id && lcost && hcost) {
        payload = {
            mealtype_id: Number(mealtype_id),
            location_id: Number(location_id),
            min_price: { $lte: hcost, $gte: lcost }
        }
    }
    if (mealtype_id && cuisine && lcost && hcost) {
        payload = {
            mealtype_id: Number(mealtype_id),
            cuisine: {$elemMatch:{id:{$in:cuisine }}},
            min_price: { $lte: hcost, $gte: lcost }
        }
    }
    if (mealtype_id && location_id && cuisine && lcost && hcost) {
        payload = {
            mealtype_id: Number(mealtype_id),
            location_id: Number(location_id),
            cuisine: {$elemMatch:{id:{$in:cuisine }}},
            min_price: { $lte: hcost, $gte: lcost }
        }
    }

    Restaurant.find(payload).sort({ min_price: sort })
        .then(response => {
            const filteredResponse = response.slice(startIndex, endIndex+1);
            const pageCount = Math.ceil(filteredResponse.length / countPerPage);
            const pageCountArr = [];
            for(let i = 0; i<= pageCount; i++){
                pageCountArr.push(i);
            }
            res.status(200).json({ message: "Restaurant Filtered Successfully", restaurants: filteredResponse, pageCount: pageCountArr, totalCount: filteredResponse.length })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}

exports.getRestaurantDetailsById = (req, res) => {
    const restaurantId = req.params.restaurantId;
    Restaurant.findById(restaurantId)
        .then(response => {
            res.status(200).json({ message: "Restaurant Fetched Successfully", restaurants: response })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}

exports.getItemsByRestaurant = (req, res) => {
    const resId = req.params.resId;
    Item.find({restaurantId: resId})
        .then(response => {
            res.status(200).json({ message: "Restaurant Item Fetched Successfully", itemList: response })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}





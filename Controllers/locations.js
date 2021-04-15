const City = require('../Models/locations');

exports.getLocations = (req, res) => {
    City.find()
        .then(response => { res.status(200).json({ message: "Locations Fetched Successfully", locations: response }) }
        )
        .catch(err => console.log(err)
        )
}
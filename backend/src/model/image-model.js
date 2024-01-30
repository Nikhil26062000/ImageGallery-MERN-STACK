const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    image:String
},
{
    collection:"ImageDetails",
}
)

const Image = new mongoose.model("Image",imageSchema)

module.exports = Image;
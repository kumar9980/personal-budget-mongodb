const mongoose = require('mongoose');

function validateColor(color) { 
    if (color.length == 7) {
        if (color.indexOf('#') == 0) {
            return true;
        }
        else{
            return false;
        } 
    }
    else{
        return false;
    }
};

const budgetSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique : true,
        trim: true
    },
    budget: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        required : true,
        validate: [validateColor, 'Not a valid color. Color value should be in Hexadecimal']
    }
},{collection: 'budget_data_collection'})

module.exports = mongoose.model('budget_data_collection', budgetSchema);
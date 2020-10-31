const mongoose = require('mongoose');

function colorValidation(color) { 
    var pattern =/[#0-9a-fA-F]/;
    var check = pattern.test(color);
    if (color.indexOf('#') == 0 && check) {
        return true;
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
        minlength: 7,
        maxlength: 7,
        required : true,
        validate: [colorValidation, 'Not valid, Color value should be in Hexadecimal value with # and 6 digit HEXA value']
    }
},{collection: 'budget_data_collection'})

module.exports = mongoose.model('budget_data_collection', budgetSchema);
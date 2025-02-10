const mongoose = require('mongoose');

const userEducationSchema = new mongoose.Schema({
    universityName: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    degree: {
        type: String,
        required: true
    },
    major: {
        type: String,
        required: true
    },
    description: {
        type: String
    }
});

module.exports = mongoose.model('UserEducation', userEducationSchema);

const mongoose = require("mongoose");
const User = mongoose.model("User");

exports.getAll = async() => {
    return await User.find({
        active: true
    }, "_id name age phones");
}

exports.getByName = async(request_name) => {
    return await User.findOne({
        name: request_name, 
        active: true
    }, "_id name age phones");
}

exports.getByPhone = async(request_phone) => {
    return await User.find({
        phones: request_phone, 
        active: "true"
    });
}

exports.create = async(request_data) => {
    let user = new User(request_data);
    await user.save();
}

exports.update = async(request_id, request_data) => {
    await User.findByIdAndUpdate(request_id, {
        $set: {
            name: request_data.name,
            age: request_data.age,
            active: request_data.active,
            phones: request_data.phones
        }
    });
}

exports.delete = async(request_id) => {
    await User.findByIdAndDelete({_id: request_id})
    //console.log(User.findByIdAndDelete({_id: request_id}))
}
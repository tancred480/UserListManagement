const Joi=require("@hapi/joi");
const userEntryValidation=(data)=>{
    const schema=Joi.object({
        name:Joi.string().max(50).required(),
        email:Joi.string().min(10).required().email(),
        phoneno:Joi.string().required(),
        address:Joi.string().required()
    });
    return schema.validate(data);
}

module.exports={
    userEntryValidation
}
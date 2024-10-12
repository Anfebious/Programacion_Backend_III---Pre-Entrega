import PetDTO from "../dto/Pet.dto.js";
import { petsService } from "../services/index.js"
import __dirname from "../utils/index.js";
import CustomError from '../services/errors/CustomError.js'
import EErrors from '../services/errors/enums.js';
import { generatePetErrorInfo } from '../services/errors/info.js'

const getAllPets = async(req,res)=>{
    const pets = await petsService.getAll();
    res.send({status:"success",payload:pets})
}

const createPet = async(req,res,next)=> {
    const {name,specie,birthDate} = req.body;
    if(!name||!specie||!birthDate){
        const error = CustomError.createError({
            name:"Pet Creation Error",
            cause:generatePetErrorInfo({name, specie, birthDate}),
            message:"Error Trying to create Pet",
            code: EErrors.INVALID_TYPES_ERROR
        })
        return next(error);
    }
    const pet = PetDTO.getPetInputFrom({name,specie,birthDate});
    const result = await petsService.create(pet);
    res.send({status:"success",payload:result})
}

const updatePet = async(req,res,next) =>{
    const petUpdateBody = req.body;
    if(!petUpdateBody.name||!petUpdateBody.specie||!petUpdateBody.birthDate){
        if(!name||!specie||!birthDate){
            const error = CustomError.createError({
                name:"Pet Update Error",
                cause:generatePetErrorInfo(petUpdateBody),
                message:"Error Trying to update Pet",
                code: EErrors.INVALID_TYPES_ERROR
            })
            return next(error);
        }
    }
    const petId = req.params.pid;
    const result = await petsService.update(petId,petUpdateBody);
    res.send({status:"success",message:"pet updated"})
}

const deletePet = async(req,res)=> {
    const petId = req.params.pid;
    const result = await petsService.delete(petId);
    res.send({status:"success",message:"pet deleted"});
}

const createPetWithImage = async(req,res,next) =>{
    const file = req.file;
    const {name,specie,birthDate} = req.body;
    if(!name||!specie||!birthDate){
        if(!name||!specie||!birthDate){
            const error = CustomError.createError({
                name:"Pet Creation Error",
                cause:generatePetErrorInfo({name, specie, birthDate}),
                message:"Error Trying to create Pet",
                code: EErrors.INVALID_TYPES_ERROR
            })
            return next(error);
        }
    }
    const pet = PetDTO.getPetInputFrom({
        name,
        specie,
        birthDate,
        image:`${__dirname}/../public/img/${file.filename}`
    });
    const result = await petsService.create(pet);
    res.send({status:"success",payload:result})
}
export default {
    getAllPets,
    createPet,
    updatePet,
    deletePet,
    createPetWithImage
}
import { usersService } from "../services/index.js"
import CustomError from '../services/errors/CustomError.js'
import EErrors from '../services/errors/enums.js';
import { generateUserErrorInfo } from '../services/errors/info.js'

const getAllUsers = async(req,res)=>{
    const users = await usersService.getAll();
    res.send({status:"success",payload:users})
}

const getUser = async(req,res)=> {
    const userId = req.params.uid;
    const user = await usersService.getUserById(userId);
    if(!user) return res.status(404).send({status:"error",error:"User not found"})
    res.send({status:"success",payload:user})
}

const updateUser =async(req,res, next)=>{
    const updateBody = req.body;
    if(!updateBody.first_name || !updateBody.last_name || !updateBody.email){
        const error = CustomError.createError({
            name:"User Update Error",
            cause:generateUserErrorInfo(updateBody),
            message:"Error Trying to update User",
            code: EErrors.INVALID_TYPES_ERROR
        })
        return next(error); // Esto se necesita para que lo atrape el middleware que maneja las excepciones
    }
    const userId = req.params.uid;
    const user = await usersService.getUserById(userId);
    if(!user) return res.status(404).send({status:"error", error:"User not found"})
    const result = await usersService.update(userId,updateBody);
    res.send({status:"success",message:"User updated"})
}

const deleteUser = async(req,res) =>{
    const userId = req.params.uid;
    const result = await usersService.getUserById(userId);
    res.send({status:"success",message:"User deleted"})
}

export default {
    deleteUser,
    getAllUsers,
    getUser,
    updateUser
}
import EErrors from "../../services/errors/enums.js";
export default (error, req, res, next) => {
    console.log(error.cause);
    switch (error.code) {
        case EErrors.INVALID_TYPES_ERROR:
            return res.status(400).send({status:"error", error: error.name})
            break;
        default:
            return res.status(400).send({status:"error", error: "Unexpected Error"})
    }
}
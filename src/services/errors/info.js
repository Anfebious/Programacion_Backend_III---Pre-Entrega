export const generateUserErrorInfo = (user) => {
    return `Invalid properties
    Required properties
    first_name  : needs to be String, recieved ${user.first_name}
    last_name   : needs to be String, recieved ${user.last_name}
    email       : needs to be String, recieved ${user.email}`
}

export const generatePetErrorInfo = (pet) => {
    return `Invalid properties
    Required properties
    name        : needs to be String, recieved ${pet.name}
    specie      : needs to be String, recieved ${pet.specie}
    birthDate   : needs to be String, recieved ${pet.birthDate}`
}
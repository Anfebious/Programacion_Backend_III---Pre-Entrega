import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';
import PetDTO from '../dto/Pet.dto.js';
import UserDTO from '../dto/User.dto.js';

const generatePets = (num) => {
    const pets = [];
    for (let i = 0; i < num; i++) {
        const pet = PetDTO.getPetInputFrom({
            name: faker.animal.dog(),
            specie: faker.animal.type(),
            birthDate: faker.date.past(5).toISOString().split('T')[0],
            image: faker.image.url(),
        });
        pets.push(pet);
    }
    return pets;
};

export const generateUsers = (num) => {
    const users = [];
    const hashedPassword = bcrypt.hashSync('coder123', 10); // Encriptar la contraseña

    for (let i = 0; i < num; i++) {
        const user = UserDTO.getUserInputFrom({
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: faker.internet.email(),
            password: hashedPassword,
            role: faker.helpers.arrayElement(['user', 'admin']), // Asigna aleatoriamente 'user' o 'admin'
            pets: [] // Array vacío para mascotas
        });
        users.push(user);
    }
    return users;
};

export default {
    generatePets,
    generateUsers
};
import mock from '../utils/mocking.js';
import { usersService } from "../services/index.js";
import { petsService } from "../services/index.js";

const getMockingPets = (req, res) => {
    const num = parseInt(req.query.num) || 100; // Permite especificar el número de mascotas, por defecto 100
    const pets = mock.generatePets(num);
    res.send({ status: "success", payload: pets });
};

const getMockingUsers = (req, res) => {
    const num = parseInt(req.query.num) || 100; // Permite especificar el número de usuarios, por defecto 100
    const users = mock.generateUsers(num);
    res.send({ status: "success", payload: users });
};

const generateData = (req, res) => {
    const { users, pets } = req.body; // Representan numericamente cuantos se quiere generar

    if (!users && !pets) {
        return res.status(400).send({ status: "error", error: "At least one of 'users' or 'pets' must be specified" });
    }

    try {
        if (users) {
            const userData = mock.generateUsers(users);
            userData.forEach(data => {
                usersService.create(data);
            });
        }

        if (pets) {
            const petData = mock.generatePets(pets);
            petData.forEach(data => {
                petsService.create(data); 
            });
        }

        res.send({ status: "success", message: "Data generated and inserted successfully" });
    } catch (error) {
        res.status(500).send({ status: "error", error: error.message });
    }
};

export default {
    getMockingPets,
    getMockingUsers,
    generateData
}
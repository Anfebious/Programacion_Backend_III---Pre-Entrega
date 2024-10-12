export default class UserDTO {
    static getUserTokenFrom = (user) =>{
        return {
            name: `${user.first_name} ${user.last_name}`,
            role: user.role,
            email: user.email
        }
    }
    static getUserInputFrom = (user) =>{
        return {
            first_name: user.first_name,
            last_name: user.last_name,
            name: `${user.first_name} ${user.last_name}`,
            role: user.role,
            email: user.email,
            password: user.password,
            pets: user.pets 
        }
    }
}
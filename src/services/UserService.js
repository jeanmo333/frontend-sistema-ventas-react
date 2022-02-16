import axios from "axios";

const url = "http://localhost:8080/api/users";

class UserService {
  getUsers() {
    return axios.get(url);
  }

  Validar(email,password) {
    return axios.get(url + "/" + email, password);
  }

  Login(email,password) {
    return axios.get(url + "/" + email, password);
  }


  createUser(user) {
    return axios.post(url, user);
  }

  getUserById(userId) {
    return axios.get(url + "/" + userId);
  }

  updateUser(user, userId) {
    return axios.put(url + "/" + userId, user);
  }

  deleteUser(userId) {
    return axios.delete(url + "/" + userId);
  }
}

export default new UserService();

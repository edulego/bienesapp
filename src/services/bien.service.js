import http from "../http-common";

class BienDataService {
  getAll() {
    return http.get("/bienes");
  }

  get(id) {
    return http.get(`/bienes/${id}`);
  }

  create(data) {
    return http.post("/bienes", data);
  }

  update(id, data) {
    return http.put(`/bienes/${id}`, data);
  }

  delete(id) {
    return http.delete(`/bienes/${id}`);
  }

  deleteAll() {
    return http.delete(`/bienes`);
  }

  findByTitle(title) {
    return http.get(`/bienes?title=${title}`);
  }
}

export default new BienDataService();
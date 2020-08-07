import http from "./httpService";

const endPointUrl = "/foods";

export function getFoods() {
  return http.get(endPointUrl);
}

export function getFood(id) {
  return http.get(`${endPointUrl}/${id}`);
}

export function createFood(body) {
  return http.post(endPointUrl, body);
}

export function updateFood(id, body) {
  return http.put(`${endPointUrl}/${id}`, body);
}

export function deleteFood(id) {
  return http.delete(`${endPointUrl}/${id}`);
}

import http from "./httpService";

const endPointUrl = "/cities";

export function getCities() {
  return http.get(endPointUrl);
}

export function getCity(id) {
  return http.get(`${endPointUrl}/${id}`);
}

export function createCity(body) {
  return http.post(endPointUrl, body);
}

export function updateCity(id, body) {
  return http.put(`${endPointUrl}/${id}`, body);
}

export function deleteCity(id) {
  return http.delete(`${endPointUrl}/${id}`);
}

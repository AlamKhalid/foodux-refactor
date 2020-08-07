import http from "./httpService";

const endPointUrl = "/types";

export function getTypes() {
  return http.get(endPointUrl);
}

export function getType(id) {
  return http.get(`${endPointUrl}/${id}`);
}

export function createType(body) {
  return http.post(endPointUrl, body);
}

export function updateType(id, body) {
  return http.put(`${endPointUrl}/${id}`, body);
}

export function deleteType(id) {
  return http.delete(`${endPointUrl}/${id}`);
}

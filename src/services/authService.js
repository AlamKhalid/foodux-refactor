import http from "./httpService";

const endPointUrl = "/auth";

export function login(obj) {
  return http.post(endPointUrl, obj);
}

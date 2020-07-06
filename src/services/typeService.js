import http from "./httpService";

const endPointUrl = "/types";

export function getTypes() {
  return http.get(endPointUrl);
}

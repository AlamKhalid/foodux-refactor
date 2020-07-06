import http from "./httpService";

const endPointUrl = "/likes";

export function like(body) {
  return http.post(`${endPointUrl}/inc`, body);
}

export function unlike(body) {
  return http.post(`${endPointUrl}/dec`, body);
}

export function getAllLikedPosts(userId) {
  return http.post(`${endPointUrl}/${userId}/posts`);
}

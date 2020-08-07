import http from "./httpService";

const endPointUrl = "/posts";

export function getPosts() {
  return http.get(endPointUrl);
}

export function getPost(id) {
  return http.get(`${endPointUrl}/${id}`);
}

export function updatePost(id, body) {
  return http.put(`${endPointUrl}/${id}`, body);
}

export function deletePost(post) {
  return http.delete(endPointUrl, { data: post });
}

export function submitPost(post) {
  return http.post(endPointUrl, post);
}

export function getSearchResult(val) {
  return http.get(`${endPointUrl}/search?value=${val}`);
}

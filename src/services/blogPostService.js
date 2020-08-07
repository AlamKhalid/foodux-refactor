import http from "./httpService";

const endPointUrl = "/blog-posts";

export function getPosts() {
  return http.get(endPointUrl);
}

export function submitPost(obj) {
  return http.post(endPointUrl, obj);
}

export function getSinglePost(id) {
  return http.get(endPointUrl + "/" + id);
}

export function deleteBlogPost(id) {
  return http.delete(endPointUrl + "/" + id);
}

export function editPost(id, body) {
  return http.put(endPointUrl + "/" + id, body);
}

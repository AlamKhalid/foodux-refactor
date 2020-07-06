import http from "./httpService";

const endPointUrl = "/blog-posts";

export function getPosts() {
  return http.get(endPointUrl);
}

export function submitPost(obj) {
  return http.post(endPointUrl, obj);
}

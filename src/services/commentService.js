import http from "./httpService";

const endPointUrl = "/comments";

export function postComment(comment) {
  return http.post(endPointUrl, comment);
}

export function updateComment(comment) {
  return http.put(endPointUrl, comment);
}

export function deleteComment(commentDetails) {
  return http.delete(endPointUrl, { data: commentDetails });
}

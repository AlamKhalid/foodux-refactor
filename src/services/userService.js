import http from "./httpService";

const endPointUrl = "/users";

export function register(user) {
  return http.post(endPointUrl, user);
}

export function isUserVerified(id) {
  return http.get(`${endPointUrl}/${id}/is-verified`);
}

export function detailsFilled(id) {
  return http.get(`${endPointUrl}/${id}/details-filled`);
}

export function addDetails(id, body) {
  return http.post(`${endPointUrl}/${id}/add-details`, body);
}

export function verifyUser(id) {
  return http.get(`${endPointUrl}/${id}/verify`);
}

export function updateProfileSettings(id, body) {
  return http.put(`${endPointUrl}/${id}/profile-settings`, body);
}

export function updateBasicSettings(id, body) {
  return http.put(`${endPointUrl}/${id}/basic-settings`, body);
}

export function changePassword(id, body) {
  return http.put(`${endPointUrl}/${id}/change-password`, body);
}

export function getHiddenPosts(id) {
  return http.get(`${endPointUrl}/${id}/hidden-posts`);
}

export function getHiddenComments(id) {
  return http.get(`${endPointUrl}/${id}/hidden-comments`);
}

export function savePost(body) {
  return http.post(`${endPointUrl}/save-post/add`, body);
}

export function unsavePost(body) {
  return http.post(`${endPointUrl}/save-post/remove`, body);
}

export function hidePost(body) {
  return http.post(`${endPointUrl}/hidden-post/add`, body);
}

export function unhidePost(body) {
  return http.post(`${endPointUrl}/hidden-post/remove`, body);
}

export function hideComment(body) {
  return http.post(`${endPointUrl}/hidden-comment/add`, body);
}

export function getAllUserPosts(id) {
  return http.get(`${endPointUrl}/${id}/posts`);
}

export function unhideComment(body) {
  return http.post(`${endPointUrl}/hidden-comment/remove`, body);
}

export function getUser(id) {
  return http.get(`${endPointUrl}/${id}`);
}

export function getRestaurantsCity(city) {
  return http.get(`${endPointUrl}/restaurants/${city}`);
}

export function getBranches(id) {
  return http.get(`${endPointUrl}/${id}/get-branches`);
}

export function updateProfilePic(id, body) {
  return http.put(`${endPointUrl}/${id}/change-pic`, body);
}

export function getBlogPosts(id) {
  return http.get(`${endPointUrl}/${id}/blog-posts`);
}

export function getServes(id) {
  return http.get(`${endPointUrl}/${id}/get-serves`);
}

export function getFollowers(id) {
  return http.get(`${endPointUrl}/${id}/followers`);
}

export function getFollowing(id) {
  return http.get(`${endPointUrl}/${id}/following`);
}

export function startFollowing(id, body) {
  return http.post(`${endPointUrl}/${id}/start-following-user`, body);
}

export function stopFollowing(id, body) {
  return http.post(`${endPointUrl}/${id}/stop-following-user`, body);
}

export function getFeaturedRestaurants() {
  return http.get(`${endPointUrl}/restaurants/featured`);
}

export function getSavedPosts(id) {
  return http.get(`${endPointUrl}/${id}/saved-posts`);
}

export function getDeals() {
  return http.get(`${endPointUrl}/restaurants/get-deals-and-discounts`);
}

export function getUserNotifications(id) {
  return http.get(`${endPointUrl}/${id}/notifications`);
}

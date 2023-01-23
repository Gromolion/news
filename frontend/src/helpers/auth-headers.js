export function authHeader(user) {
  if (user && user.access_token) {
    return "Bearer " + user.access_token;
  }
}

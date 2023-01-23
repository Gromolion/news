export const userService = {
  login,
  logout,
  register,
};

function login(name, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, password }),
  };

  return fetch(`/api/auth/login`, requestOptions)
    .then(handleResponse)
    .then((user) => {
      if (user.token) {
        localStorage.setItem("user", JSON.stringify(user));
      }

      return user;
    });
}

function register(name, password, repeatedPassword) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, password, repeatedPassword }),
  };

  return fetch(`/api/auth/register`, requestOptions).then(handleResponse);
}

function logout() {
  localStorage.removeItem("user");
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        logout();
        location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}

export const API_SERVER = 'http://192.168.123.10';

const USER_ID_TOKEN = 'user_id_token';

export function setToken(idToken) {
  localStorage.setItem(USER_ID_TOKEN, idToken);
}

export function loadToken() {
  // return JSON.parse(localStorage.getItem(USER_ID_TOKEN));
  return localStorage.getItem(USER_ID_TOKEN);
}

export function setUserInfo(user) {
  localStorage.setItem('user', JSON.stringify(user));
}

export function setLevel(info) {
  sessionStorage.setItem('user_level', info.level);
}

export function getLevel() {
  return sessionStorage.getItem('user_level');
}

export function getUserInfo() {
  return JSON.stringify(localStorage.getItem('user'));
}

// "proxy": {
//     "/": {
//       "target": "http://192.168.123.10",
//       "changeOrigin": true
//     }
//   }

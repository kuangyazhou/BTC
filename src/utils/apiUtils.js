export const API_SERVER = 'http://192.168.123.10';

const USER_ID_TOKEN = 'user_id_token';

export function setToken(idToken) {
  localStorage.setItem(USER_ID_TOKEN, idToken);
}

export function loadToken() {
  // return JSON.parse(localStorage.getItem(USER_ID_TOKEN));
  return localStorage.getItem(USER_ID_TOKEN);
}

// "proxy": {
//     "/": {
//       "target": "http://192.168.123.10",
//       "changeOrigin": true
//     }
//   }

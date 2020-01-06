/* ajax requests to the backend */
import axios from 'axios';


export function setTokenHeader(token) {
  if(token) {
    // attach token to any request when the user logs in
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
  } else {
    // remove token
    delete axios.defaults.headers.common["Authorization"];

  }
}

/**
* a wrapper around axios API call that formates errors, etc
* @param {string} method the HTTP method like get, post, delete, update
* @param {string} path the route path / endpoint
* @param {object} data data in JSON from post request
**/
export function apiCall(method, path, data) {
  /* Return new Promise, resolve this promise when action is resolved */
  return new Promise ((resolve, reject) => {
    return axios[method.toLowerCase()](path, data) //method can be get, post..., then invoke function
      .then(res => {
        return resolve(res.data);
      })
      .catch(err => {
      // when we get back information from axios, it always comes in
      // certain object err.response.data.error
      return reject(err.response.data.error);
    });
  });
}

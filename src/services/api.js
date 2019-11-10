/* ajax requests to the backend */
import axios from "axios";

export function apiCall(method, path, data) {
  /* Return new Promise, resolve this promise when action is resolved */
  return new Promise ((resolve, reject) => {
    debugger
    return axios[method](path, data)
      .then(res => {
        return resolve(res.data)
      })
      .catch(err => {
      // when we get back information from axios, it always comes in
      // certain object err.response.data.error
      return reject(err.response.data.error);
    })
  })
}

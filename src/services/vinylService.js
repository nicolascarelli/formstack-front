import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl ;


function vinylUrl(id) {
    return `${apiEndpoint}/vinyl/${id}`;
  }

export function getVinyls() {
  return http.get(`${apiEndpoint}/vinyls`);
}

export function getVinyl(vinylId) {
  return http.get(vinylUrl(vinylId));
}

export function saveVinyl(vinyl) {
  const id = vinyl.id
  const body = { ...vinyl };
  delete body.id;
  if (id != "new") {
    return http.put(vinylUrl(vinyl.id), body);
  }

  return http.post(`${apiEndpoint}/vinyl`, body);
}

export function deleteVinyl(vinylId) {
  return http.delete(vinylUrl(vinylId));
}

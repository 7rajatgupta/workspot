import axios from "axios";
import { COUNTRIES_API_URL } from "../utils/constants/API_URLS";

export function fetchCountries() {
  return axios.get(COUNTRIES_API_URL).then((res) => res.data);
}

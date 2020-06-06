import axios from "axios";
import * as CONSTANTS from '../config/constants'

export default axios.create({
  baseURL: CONSTANTS.API_URL,
  responseType: "json"
});
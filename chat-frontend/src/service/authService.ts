import request from "utils/request";
import { API_URLS } from "constants/apiConstants";

export const login = (apiData: {email: string, password: string}) => {
  return request.post(API_URLS.LOGIN, apiData)
}
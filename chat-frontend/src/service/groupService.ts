import request from "utils/request";
import { API_URLS } from "constants/apiConstants";

export const getGroupList = () => {
  let userId = localStorage.getItem('id')
  return request.get(`${API_URLS.GROUP_LIST}?id=${userId}`)
}

export const createGroup = (apiData: {name: string, id: string}) => {
  return request.post(API_URLS.CREATE_GROUP, apiData)
}

export const joinGroup = (apiData: {name: string, id: string}) => {
  return request.post(API_URLS.JOIN_GROUP, apiData)
}
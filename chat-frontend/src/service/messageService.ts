import request from "utils/request";
import { API_URLS } from "constants/apiConstants";

export const getMessages = (apiData: {groupId: string}) => {
  return request.get(`${API_URLS.GET_MESSAGES}?groupId=${apiData.groupId}`)
}

export const sendMessage = (apiData: {message: string, groupId: string, userId: string}) => {
  return request.post(API_URLS.SEND_MESSAGE, apiData)
}
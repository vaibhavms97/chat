import axios from 'axios'
import { API_TIMEOUT } from 'constants/config'
import { CONSTANTS } from 'constants/constants'
import { ROUTES } from 'constants/routes'

const axiosConfig = {
  baseURL: `${process.env.REACT_APP_BASE_URL}`,
  timeout: API_TIMEOUT,
}

/**
 * Create an Axios Client for Auth Module
 */
const request = axios.create(axiosConfig)

request.interceptors.request.use(
  async (apiConfig: any) => {
    const config = apiConfig ? apiConfig : {}

    const cancelController = new AbortController()
    if (!config.signal) {
      config.signal = cancelController.signal
    }

    try {
      config['headers']['Content-Type'] = 'application/json'
    } catch (error) {
      cancelController.abort()
      return Promise.reject(error)
    }
    return config
  },
  (error) => Promise.reject(error),
)

request.interceptors.response.use(
  function (response) {
    //successToast(response?.data?.message)
    // Any status code that lie within the range of 2xx cause this function to trigger
    return response
  },
  function (error) {
    if (
      error.response?.data?.status === 401 ||
      error.response?.data?.code === 401 ||
      error.response?.data?.status === 500 ||
      error.response?.data?.status === 503 ||
      error.response?.data?.code === 422
      // && error.response.data.errorCode == 11
    ) {
      window.location.href = ROUTES.LOGIN
      localStorage.clear()
      console.error(error.response?.data?.message)
    } else {
      console.error(error.response?.data?.message)
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    return Promise.reject(error.response?.data || CONSTANTS.ERROR_SOMETHING_WENT_WRONG)
  },
)

export default request

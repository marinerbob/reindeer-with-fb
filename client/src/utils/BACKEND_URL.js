const url = 'https://reindeer-api-v1.herokuapp.com'
const BACKEND_PIN = '/api'

export const end_points = {
  getallItems: `${url}${BACKEND_PIN}/menus`,
  //getAllTrainModels: 'https://rata.digitraffic.fi/api/v1/live-trains?version=0',
  getAllCities: `${url}${BACKEND_PIN}/cities`,
  getAllOptions: `${url}${BACKEND_PIN}/foodchoices`,
  getAllTrainModels: `${url}${BACKEND_PIN}/trainmodels`,
}

import axios from 'axios'

export default class PostSerivce {
  static async getSneakers() {
    try {
      const response = await axios.get('https://665cb2d73e4ac90a04da6151.mockapi.io/sneakers');
      return response.data;
    } catch (e) {
      console.log('Error with API (getSneakers)', e)
    }
  }
}
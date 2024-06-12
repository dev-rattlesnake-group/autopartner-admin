import axios from 'axios'
const API_URL = import.meta.env.VITE_API_URL

class AuthService {
  async login({ email, password }: { email: string; password: string }) {
    try {
      const { data } = await axios.post(API_URL + '/auth', {
        login: email,
        password,
      })
      if (data.access_token) {
        localStorage.setItem('user', JSON.stringify(data))
      }
      return data
    } catch (error) {
      console.log({ error })
      throw error
    }
  }

  logout() {
    localStorage.removeItem('user')
  }
}
export default new AuthService()

import axios from "axios"

export class AxiosApi {

   static async Get(path) {
        return await axios.get(`http://localhost:3000${path}`)
    }
    static async Post(path, body) {
        return await axios.post(`http://localhost:3000${path}`,
        body)
    }
}
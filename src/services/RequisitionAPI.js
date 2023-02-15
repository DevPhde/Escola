import axios from "axios"

export class AxiosApi {

   static async Get(path) {
        return await axios.get(`https://escola-4888.onrender.com${path}`)
    }
    static async Post(path, body) {
        return await axios.post(`https://escola-4888.onrender.com${path}`,
        body)
    }
    static async Put(path, body) {
        return await axios.put(`https://escola-4888.onrender.com${path}`,
        body)
    }
    static async Delete(path) {
        return await axios.delete(`https://escola-4888.onrender.com${path}`)
    }
}
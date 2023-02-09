import axios from "axios"

export class AxiosApi {

   static async Get(path) {
        return await axios.get(`http://localhost:3000${path}`)
        // return await axios.get(`https://hotel-9crs.onrender.com${path}`)
    }
    static async Post(path, body) {
        return await axios.post(`http://localhost:3000${path}`,
        body)
    }
    static async Put(path, body) {
        return await axios.put(`http://localhost:3000${path}`,
        body)
    }
    static async Delete(path) {
        return await axios.delete(`http://localhost:3000${path}`)
    }
}
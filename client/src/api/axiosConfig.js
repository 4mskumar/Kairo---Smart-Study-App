// src/lib/api.ts
import axios from "axios"

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000/api",
  headers: {
    "Content-Type": "application/json",
  },
})


// token getter injected from React
let getTokenFn = null

export const setAuthTokenGetter = (fn) => {
  getTokenFn = fn
  // console.log(fn);
  
}

api.interceptors.request.use(async (config) => {
    if (getTokenFn) {
      const token = await getTokenFn()
      // console.log(token);
      
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    return config
  })
  

// import React from 'react'
import { useAxios } from '../../lib/AxiosProvider'

const useAuth = () => {
    const axios = useAxios()
    async function sendSignupOtp(payload) {
        const { data } = await axios.post('temp/send-otp', payload)
        return data
    }

    async function registrationReqeust(payload) {
        const data = await axios.post("auth/register", payload);
        return data
    }

    // Login
    async function LoginRequest(payload) {
        const { data } = await axios.post('auth/login', payload)
        return data
    }

    async function getVisitorInfo(payload) {
        try {
            // const { data } = await axios.get(
            //     'https://www.cloudflare.com/cdn-cgi/trace'
            // )
            // return data
            return null;
        } catch (error) {
            // console.log(error)
        }
    }

    return {
        sendSignupOtp,
        getVisitorInfo,
        registrationReqeust,
        LoginRequest
    }
}

export default useAuth

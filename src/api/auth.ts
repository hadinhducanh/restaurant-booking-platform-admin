import { User } from '@/models/User';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

// const BASE_URL = "https://motherlove-api.onrender.com/api/v1/";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;


const isAccessTokenExpired = (accessToken: string): boolean => {
    try {
        const decodedToken: { exp: number } = jwtDecode(accessToken);
        const expirationTime = decodedToken.exp * 1000;
        const currentTime = new Date().getTime();
        return currentTime > expirationTime;
    } catch (error) {
        // console.error('Error decoding access token:', error);
        return true;
    }
};

export const refreshTokenIfNeeded = async (): Promise<boolean> => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken || isAccessTokenExpired(accessToken)) {
        try {
            const response = await axios.post(`${BASE_URL}auth/refresh_token`, {
                refresh_token: localStorage.getItem('refreshToken')
            });
            const newAccessToken = response.data.access_token;
            localStorage.setItem('accessToken', newAccessToken);
            return true;
        } catch (error) {
            return false;
        }
    }
    return true;
};

export const login = async (username: string, password: string): Promise<boolean> => {
    try {
        const response = await axios.post(`${BASE_URL}auth/user/login`, {
            userNameOrEmailOrPhone: username,
            password: password
        });
        const { access_token, refresh_token } = response.data;
        localStorage.setItem('accessToken', access_token);
        localStorage.setItem('refreshToken', refresh_token);
        return true;
    } catch (error) {
        // console.error('Login failed', error);
        return false;
    }
};

export const getUserInfo = async (): Promise<User | null> => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken || isAccessTokenExpired(accessToken)) {
            throw new Error('Access token is missing or expired');
        }
        const response = await axios.get(`${BASE_URL}auth/user/info`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data as User;
    } catch (error) {
        // console.error('Failed to get user info:', error);
        return null;
    }
};
export const changePassword = async (oldPassword: string, newPassword: string): Promise<boolean> => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken || isAccessTokenExpired(accessToken)) {
            throw new Error('Access token is missing or expired');
        }
        await axios.post('/auth/change-password', {
            oldPassword,
            newPassword
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return true;
    } catch (error) {
        // console.error('Failed to change password:', error);
        return false;
    }
}

export const registerStaff = async (staffDetails: { username: string, fullName:string, email: string, password:string, phone: string, gender: string }): Promise<boolean> => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            throw new Error('Access token is missing');
        }

        await axios.post(`${BASE_URL}auth/register/staff`, staffDetails, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        return true;
    } catch (error) {
        // console.error('Failed to register staff:', error);
        return false;
    }
};
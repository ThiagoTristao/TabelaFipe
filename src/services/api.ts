
import axios from 'axios'
import apiURL from '@/constants/api';

export async function getBrands() {
    return await axios.get(`${apiURL}/brands`)
}

export async function getModels(brandCode:string) {
    return await axios.get(`${apiURL}/brands/${brandCode}/models`)
}

export async function getYears(brandCode:string, modelCode: string) {
    return await axios.get(`${apiURL}/brands/${brandCode}/models/${modelCode}/years`)
}

export async function getFipeInfo(brandCode:string, modelCode: string, yearCode:string) {
    return await axios.get(`${apiURL}/brands/${brandCode}/models/${modelCode}/years/${yearCode}`)
}
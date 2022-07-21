import axios, { AxiosError} from 'axios';
import { parseCookies } from 'nookies'

export function ApiClien(ctx = undefined){
    let cookies = parseCookies(ctx);

    const api = axios.create({
        baseURL: 'http://localhost:3333',
        headers:{
            Authorization: `Bearer ${cookies['@pizzaria.token']}`
        }
    })

    api.interceptors.response.use(response =>{
        return response;
    },(error: AxiosError)=>{
        if(error.response.status === 401){
            //qualquer erro 401 (não autorizado) ira deslogar o usuário
            if(typeof window !== undefined){
            //Chamar a função deslogar usuário
            }else{
                return Promise.reject
            }
        }
    });
}
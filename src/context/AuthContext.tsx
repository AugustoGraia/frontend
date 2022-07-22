
import { createContext, ReactNode, useState } from 'react';
import { destroyCookie, setCookie, parseCookies } from 'nookies';
import Router from 'next/router';
import { api } from '../services/apiClaent';

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    logarUsuario:(credentials: logarUsuarioProps) => Promise<void>;
    deslogarUser:() => void;
}

type UserProps = {
    id: string;
    name: string;
    email: string;
}

type logarUsuarioProps ={
    email: string;
    password : string;
}

type AuthProviderProps ={
    children: ReactNode;
}

export function deslogarUser(){
    try{
        destroyCookie(undefined, '@pizzaria.token')    
        Router.push('/')
    }catch{
        console.log("Erro deslogar")
    }

}

export const AuthContext = createContext({} as AuthContextData)
//Função para validar usuários autenticados
export function AuthProvider({ children }: AuthProviderProps){

    const [user, setUser] = useState<UserProps>()
    const isAuthenticated = !!user;
    // Função para logar usuario
  async function logarUsuario({email, password}: logarUsuarioProps){

        try{
            const response = await api.post('/session',{
                email,
                password
            })
            console.log(response.data);
            const {id, name, token} = response.data;
            //Setando o cookie do user
            setCookie(undefined, '@pizzaria.token', token,{
                maxAge: 60 * 60 * 24 * 30, //Expirar em 1 mes 
                path: "/" //Caminhos de acesso com cookie
            })
            setUser({
                id,
                name,
                email
            })

            //Passar para proximas requisições o token
            api.defaults.headers['Authorization'] = `Bearer ${token}`

            //Redirecionar o usuario para a deshboard
            Router.push("/dashboard")
            
        }catch(err){
            console.log("ERRO AO ACESSAR ", err)
        }
    }

    return(
        <AuthContext.Provider value={{ user, isAuthenticated, logarUsuario, deslogarUser }}>
            {children}
        </AuthContext.Provider>
    )
}
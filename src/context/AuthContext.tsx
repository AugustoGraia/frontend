
import { createContext, ReactNode, useState, useEffect } from 'react';
import { destroyCookie, setCookie, parseCookies } from 'nookies';
import Router from 'next/router';
import { api } from '../services/apiClaent';
import { toast } from 'react-toastify';

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    logarUsuario:(credentials: logarUsuarioProps) => Promise<void>;
    deslogarUser:() => void;
    cadastroUsuario:(credentials: cadastroProps) => Promise<void>;
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

type cadastroProps = {
    name: string;
    email: string;
    password: string;
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

useEffect(() => {
    //Pegando da dos do cookie
    const { '@pizzaria.token': token} = parseCookies();

    if(token){
        api.get('/me').then(response => {
            const { id, name, email } = response.data;

            setUser({
                id,
                name, 
                email
            })

        })
        // se deu erro ou não achou o cookie do user, deslogar.
        .catch(()=>{
            deslogarUser();
        })
    }
     
}, [])




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

            toast.success("Logado com sucesso!");

            Router.push("/dashboard")
            
        }catch(err){
            toast.error("Erro ao acessar!")
            console.log("ERRO AO ACESSAR ", err)
        }
    }
    // Função para cadastrar usuario
    async function cadastroUsuario({name, email, password}: cadastroProps){
        
       try{
            const response = await api.post('/users',{
                name,
                email,
                password
            })
            toast.success("Conta criada com sucesso")
            Router.push("/")
       }catch(err){
        toast.error("Error ao cadastrar")
        console.log("Erro ao cadastrar ", err)
       }

    }

    return(
        <AuthContext.Provider value={{ user, isAuthenticated, logarUsuario, deslogarUser, cadastroUsuario}}>
            {children}
        </AuthContext.Provider>
    )
}
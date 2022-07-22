
import { createContext, ReactNode, useState } from 'react';
import { destroyCookie } from 'nookies';
import Router from 'next/router';

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    signIn:(credentials: SignInProps) => Promise<void>;
    deslogarUser:() => void;
}

type UserProps = {
    id: string;
    name: string;
    email: string;
}

type SignInProps ={
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
    
  async function signIn({email, password}: SignInProps){
        console.log(email)
        console.log(password)
    }

    return(
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, deslogarUser }}>
            {children}
        </AuthContext.Provider>
    )
}
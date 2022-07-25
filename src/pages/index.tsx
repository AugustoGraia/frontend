import { useContext, FormEvent, useState } from 'react';
import Head from "next/head"
import Image from "next/image";
import styles from '../../styles/home.module.scss';
import {Input} from "../components/interface/input";
import { Button } from "../components/interface/button";
import Link from 'next/link';
import { toast } from 'react-toastify';

import pizza from '../../public/pizza.png';

import { canSSRGuest } from '../utils/canSSRGuest'; 

import { AuthContext } from '../context/AuthContext';

export default function Home(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [loading, setLoading] = useState(false)

  const { logarUsuario } = useContext(AuthContext)

  async function handleLogin(event: FormEvent){
    event.preventDefault();

    if(email === '' || password === ''){
      toast.warning("Preencha todos os dados")
      return;
    }
    
    setLoading(true)
    let data = {
      email,
      password
    }

   await logarUsuario(data)

    setLoading(false)
  }
  return(
    <>
      <Head>
        <title>GetPizzaria - Login</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image className={styles.img} src={pizza}/>   
        <div className={styles.login}> 
          <form onSubmit={handleLogin}>
            <Input 
              placeholder="Digite seu email"
              type="text"
              value={email}
              onChange={ (e)=> setEmail(e.target.value)}
              />       
            <Input 
              placeholder="Sua senha"
              type="password"
              value={password}
              onChange={ (e)=> setPassword(e.target.value)}
              /> 
            <Button 
              type="submit"
              loading={loading}
            >
            Acessar
           </Button>
          </form>
          <Link href="/cadastro">
            <a className={styles.text}>Cadastre-se</a>
          </Link>
        </div>
      </div>
    </>
  )
}
  // func para usuarios ñ logados 
export const getServerSideProps = canSSRGuest(async (context)=>{

    return{
      props: {}
    }
})
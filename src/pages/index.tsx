import { useContext, FormEvent, useState } from 'react';
import Head from "next/head"
import Image from "next/image";
import styles from '../../styles/home.module.scss';
import {Input} from "../components/interface/input";
import { Button } from "../components/interface/button";
import Link from 'next/link';

import pizza from '../../public/pizza.png';

import { AuthContext } from '../context/AuthContext';

export default function Home(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [loading, setLoading] = useState(false)

  const { signIn } = useContext(AuthContext)

  async function handleLogin(event: FormEvent){
    event.preventDefault();

    let data = {
      email,
      password
    }

   await signIn(data)
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
              loading={false}
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
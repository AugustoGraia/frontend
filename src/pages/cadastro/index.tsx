import { useState, FormEvent, useContext } from 'react';
import Head from "next/head"
import Image from "next/image";
import styles from '../../../styles/home.module.scss';
import {Input} from "../../components/interface/input";
import { Button } from "../../components/interface/button";
import Link from 'next/link';
import { AuthContext } from '../../context/AuthContext';
import pizza from '../../../public/pizza.png';

export default function Cadastro(){
  const { cadastroUsuario } = useContext(AuthContext)
  const [ name, setName] = useState('');
  const [ email, setEmail] = useState('');
  const [ password, setPassword] = useState('');
  const [ loading, setLoading] = useState(false);

  async function cadastrarUsers(event: FormEvent){
    event.preventDefault();

    if(name === '' || email === '' || password === ''){
      alert("PREENCHA TODOS OS CAMPOS")
    }

      setLoading(true)
      
    let data = {
      name,
      email,
      password,
    }

      await cadastroUsuario(data)

      setLoading(false)
  }
  return(
    <>
      <Head>
        <title>Cadastro</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image className={styles.img} src={pizza}/>
        <div className={styles.login}> 
            <h1>Criando sua conta</h1>
          <form onSubmit={cadastrarUsers}>
            <Input
                placeholder="Digite seu nome"
                type="text"
                value={name}
                onChange={(e)=> setName(e.target.value)}
                />       
            <Input 
                placeholder="Digite seu email"
                type="text"
                value={email}
                onChange={ (e)=> setEmail(e.target.value)}
                />
            <Input 
                placeholder="Digite sua senha"
                type="password"
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
                />
            <Button 
                type="submit"
                loading={loading}
            >
                Cadastrar
           </Button>
          </form>
          <Link href="/">
            <a className={styles.text}>Já possui uma conta? Faça login</a>
          </Link>
        </div>
      </div>
    </>
  )
}
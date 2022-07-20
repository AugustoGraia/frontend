import Head from "next/head"
import Image from "next/image";
import styles from '../../../styles/home.module.scss';
import {Input} from "../../components/interface/input";
import { Button } from "../../components/interface/button";
import Link from 'next/link';

import pizza from '../../../public/pizza.png';

export default function Cadastro(){
  return(
    <>
      <Head>
        <title>Cadastro</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image className={styles.img} src={pizza}/>
        <div className={styles.login}> 
            <h1>Criando sua conta</h1>
          <form>
            <Input
                placeholder="Digite seu nome"
                type="text"
                />       
            <Input 
                placeholder="Digite seu email"
                type="text"
                />
            <Input 
                placeholder="Digite sua senha"
                type="password"
                />
            <Button 
                type="submit"
                loading={false}
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
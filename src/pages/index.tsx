import Head from "next/head"
import Image from "next/image";
import styles from '../../styles/home.module.scss';
import {Input} from "../components/interface/input";
import { Button } from "../components/interface/button";
import Link from 'next/link';

import pizza from '../../public/pizza.png';

export default function Home(){
  return(
    <>
      <Head>
        <title>GetPizzaria - Login</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image className={styles.img} src={pizza}/>
        
        <div className={styles.login}> 
          <form>
            <Input 
              placeholder="Digite seu email"
              type="text"
              />       
            <Input 
              placeholder="Sua senha"
              type="password"
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
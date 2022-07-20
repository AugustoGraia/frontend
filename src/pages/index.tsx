import Head from "next/head"
import Image from "next/image";
import style from '../../styles/home.module.scss';
import {Input} from "../components/interface/input";

import pizza from '../../public/pizza.png';

export default function Home(){
  return(
    <>
      <Head>
        <title>GetPizzaria - Login</title>
      </Head>
      <div className={style.containerCenter}>
        <Image className={style.img} src={pizza}/>
        
        <div className={style.login}> 
          <form>
            <Input placeholder="TESTE"/>
          </form>
        </div>
      </div>
    </>
  )
}
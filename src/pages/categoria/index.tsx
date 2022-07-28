import Head from 'next/head';
import {Header} from '../../components/Header/index';

import styles from './styles.module.scss';


export default function Categoria(){
    return(
        <>
            <Head>
                <title>Nova categoria - GetPizzaria</title>
            </Head>
            <div>
                <Header/>

                <main className={styles.container}>
                    <h1>Cadastrar categoria</h1>

                    <form className={styles.form}>
                        <input 
                        className={styles.input}
                        type="text"
                        placeholder="Digite o nome da categoria"
    
                        />
                        <button className={styles.button}
                        type="submit">
                            Cadastrar
                        </button>
                    </form>
                </main>
            </div>
        </>
    )
}
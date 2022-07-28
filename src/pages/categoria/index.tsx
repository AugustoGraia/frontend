import Head from 'next/head';
import {Header} from '../../components/Header/index';
import { useState, FormEvent } from 'react';
import styles from './styles.module.scss';
import { ApiClien } from '../../services/api'; 
import { toast } from 'react-toastify';
import { canSSRAuth } from '../../utils/canSSRAuth';

export default function Categoria(){

    const [name, setName] = useState('')

    async function fazerRegistro(event: FormEvent){
        event.preventDefault();

        if(name === ''){
            toast.warning("Nome invalido")
        }

        const api = ApiClien();
        await api.post('/category',{
            name: name
        })
            toast.success("Categoria cadastrada")
            setName('')
    }

    return(
        <>
            <Head>
                <title>Nova categoria - GetPizzaria</title>
            </Head>
            <div>
                <Header/>

                <main className={styles.container}>
                    <h1>Cadastrar categoria</h1>

                    <form className={styles.form} onSubmit={fazerRegistro}>
                        <input 
                        className={styles.input}
                        type="text"
                        placeholder="Digite o nome da categoria"
                        value={name}
                        onChange={ (e) => setName(e.target.value)}
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

export const getServerSideProps = canSSRAuth(async (ctx) => {
    
    return {
        props: {}
    }
})


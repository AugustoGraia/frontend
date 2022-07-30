import { useState } from 'react';
import { canSSRAuth } from '../../utils/canSSRAuth';
import Head from 'next/head'
import {Header} from '../../components/Header/index'
import styles from './styles.module.scss';
import { FiRefreshCcw } from 'react-icons/fi';

import { ApiClien } from '../../services/api';


type OrderProps = {
    id: string,
    table: number | string,
    status: boolean,
    draft: boolean,
    name: string | null
}

interface HomeProps {
    orden : OrderProps[];
}


export default function Dashboard({ orden }: HomeProps){

    const [ ordenList, setOrdenList ] = useState(orden || []);

    function abrirModal( id:string ){
        alert(`id ${id}`)
    }


    return(
       <>
         <Head>
            <title>Painel - GetPizzaria</title>
         </Head>
         <div>
            <Header />
            <main className={styles.container}>
                <div className={styles.containerHeader}>
                    <h1>Últimos pedidos</h1>
                    <button>
                        <FiRefreshCcw color="#3fffa3" size={25}/>
                    </button>
                </div>  

                <article className={styles.listOrders}>

                    {ordenList.map( item => (
                        <section key={item.id} className={styles.orderItem}>
                            <button onClick ={() => { abrirModal(item.id) }}>
                                <div className={styles.tag}></div>
                                <span>Mesa {item.table}</span>
                            </button>
                        </section>
                    ))}
                </article>
            </main>
         </div>
       </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    
    const api = ApiClien(ctx);

    const response = await api.get('/orders');

    console.log(response.data);


    return {
        props: {
            orden: response.data
        }
    }
})
import { useState } from 'react';
import { canSSRAuth } from '../../utils/canSSRAuth';
import Head from 'next/head'
import {Header} from '../../components/Header/index'
import styles from './styles.module.scss';
import { FiRefreshCcw } from 'react-icons/fi';

import { ModalOrder } from '../../components/ModalOrder/index'; 

import Modal from 'react-modal';

import { ApiClien } from '../../services/api';


type OrderProps = {
    id: string,
    table: number,
    status: boolean,
    draft: boolean,
    name: string | null
}

interface HomeProps {
    orden : OrderProps[];
}
 
export type OrderItemProps = {
    id: string,
    amount: string | number,
    order_id: string,
    product:{
        id: string,
        name: string,
        description: string,
        price: string,
        banner: string,
    }
    order:{
        id: string,
        table: number,
        status: boolean,
        name: string | null
    }
}


export default function Dashboard({ orden }: HomeProps){

    const [ ordenList, setOrdenList ] = useState(orden || []);
    
    const [ modelItem, setModalItem ] = useState<OrderItemProps[]>();
    const [ modalVisible, setModalVisible ] = useState(false);


    function fechaModal(){
        setModalVisible(false)
    }

   async function abrirModal( id:string ){
        
        const api = ApiClien();
        
        const response = await api.get('/order/datail',{
            params:{
                orden_id: id,
            }
        })

            setModalItem(response.data)
            setModalVisible(true)
    }

    Modal.setAppElement('#__next');


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

            {modalVisible && (
                <ModalOrder
                aberto={modalVisible}
                fecharModal={fechaModal}
                orden={modelItem}
                />
            )}
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
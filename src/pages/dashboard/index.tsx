import { canSSRAuth } from '../../utils/canSSRAuth';
import Head from 'next/head'
import {Header} from '../../components/Header/index'

export default function Dashboard(){
    return(
       <>
         <Head>
            <title>Painel - GetPizzaria</title>
         </Head>
         <div>
            <Header />
            
         </div>
       </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    
    return {
        props: {}
    }
})
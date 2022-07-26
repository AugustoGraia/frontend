import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import {parseCookies} from 'nookies';

//func para paginas que só pode ser acessadas por deslogados
export function canSSRGuest<P>(fn:GetServerSideProps<P>){
    return async (contex: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {

        const cookies = parseCookies(contex);

        // Se tentar acessar a pargina já com o login salvo, redirecionamos

// A lógica é se o usuário tentar acessar a página de login já com o token 
// ele e redirecionado para dashboard

        if(cookies['@pizzaria.token']){
            return{
                redirect:{
                    destination: '/dashboard',
                    permanent: false
                }
            }
        }

        return await fn(contex);
    }
}
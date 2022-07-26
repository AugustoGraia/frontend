import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { parseCookies, destroyCookie } from 'nookies';
import { AuthTokenError } from '../services/errors/AuthTokenErrors';

// func para paginas que só users logados podem ter acesso
export function canSSRAuth<P>(fn: GetServerSideProps<P>){
    return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {

        const cookies = parseCookies(ctx);

        const token = cookies['@pizzaria.token'];

// A lógica é se o usuário estiver na aplicação sem token ele não esta
// logado, se ele não etiver logado redirecionar para o login da página 

        if(!token){
            return{
                redirect: {
                    destination: '/',
                    permanent: false,
                }
            }
        }
        try{
            return await fn(ctx);
        }catch(err){
            if(err instanceof AuthTokenError){
                destroyCookie(ctx, '@pizzaria.token');
            }
            return {
                redirect:{
                    destination: '/',
                    permanent: false,
                }
            }
        }
    }
}
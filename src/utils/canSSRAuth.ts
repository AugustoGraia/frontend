import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { parseCookies, destroyCookie } from 'nookies';
import { AuthTokenError } from '../services/errors/AuthTokenErrors';

// func para paginas que só users logados podem ter acesso
export function canSSRAuth<P>(fn: GetServerSideProps<P>){
    return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {

        const cookies = parseCookies(ctx);

        const token = cookies['@pizzaria.token'];

        if(!token){
            return{
                redirect: {
                    destination: '/',
                    permanent: false,
                }
            }
        }
//carlosaugusto@teste.com
//123123
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
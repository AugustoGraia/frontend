import { ChangeEvent, useState } from 'react';
import Head from 'next/head';
import { Header } from '../../components/Header/index';
import styles from './styles.module.scss';
import { canSSRAuth } from '../../utils/canSSRAuth';

import { ApiClien } from '../../services/api';

import { FiUpload } from 'react-icons/fi';

type ItemProps = {
    id: string;
    name: string;
}

interface CategoriaProps{
    listaCategoria: ItemProps[];
}

export default function Produto({listaCategoria}:CategoriaProps) {

    console.log(listaCategoria)

    const [ avatarUrl, setAvatarUrl ] = useState('');
    const [ images, setImages ] = useState(null);

    const [categoria, setCategoria] = useState(listaCategoria || []);
    const [selectCategoria, setSelectCategoria] = useState(0);

    //Validacao para imagem
    function handleFile(e: ChangeEvent<HTMLInputElement>){

        if(!e.target.files){
          return;
        }
    
        const image = e.target.files[0];
    
        if(!image){
          return;
        }
    
        if(image.type === 'image/jpeg' || image.type === 'image/png'){
    
            setImages(image);
            setAvatarUrl(URL.createObjectURL(e.target.files[0]))
        }
      }
      //Seleciona categoria
      function handleSelect(event){
       //console.log(categoria[event.target.value])

       setSelectCategoria(event.target.value)

      }

    return(
        <>
        <Head>
            <title>Produto - GetPizzaria</title>
        </Head>
            <div>
                <Header/>

                <main className={styles.container}>
                    <h1>Novo produto</h1>

                    <form className={styles.form}>

                        <label className={styles.label}>
                            <span>
                                <FiUpload size={25} color="#fff"/>
                            </span>

                            <input type="file" accept="image/png, image/jpeg" onChange={handleFile}/>

                            {avatarUrl && (
                               <img
                                 className={styles.preview}
                                 src={avatarUrl} 
                                 alt="Foto do produto" 
                                 width={250}
                                 height={250}
                                />
                            )}

                        </label>

                        <select value={selectCategoria} onChange={handleSelect} >
                           {categoria.map ( (item, index) => {
                            return(
                                <option key={item.id} value={index}>
                                    {item.name}
                                </option>
                            )
                           })}
                        </select>    
                            <input
                            className={styles.input}
                            placeholder="Digite o nome do seu produto"
                            type="text"
                            />

                            <input
                            className={styles.input}
                            placeholder="Preço do produto"
                            type="text"
                            />

                            <textarea
                            placeholder="Descreva seu produto"
                            className={styles.input}
                            />
                            
                            <button className={styles.button} type="submit">
                                Cadastrar
                            </button>

                    </form>
                </main>
            </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth( async (cxt) => {

    const api = ApiClien(cxt);

    const response = await api('/list/category');

    //console.log(response.data)

    return{
        props:{
            listaCategoria: response.data
        }
    }
})












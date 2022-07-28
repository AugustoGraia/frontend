import styles from './styles.module.scss';
import Link from 'next/link';
import {useContext} from 'react';
import { AuthContext } from '../../context/AuthContext';
import { FiLogOut } from 'react-icons/fi';

export function Header(){

    const {deslogarUser} = useContext(AuthContext)
    return(
        <header>
            <div className={styles.headerContainer}>
                <div className={styles.headerContent}>
                    <Link href="/dashboard">
                       <img src="/logoHeader.png"></img>
                    </Link>

                    <nav className={styles.navs}>
                        <Link href="/categoria">
                            <a>Categoria</a>
                        </Link>

                        <Link href="/produto">
                            <a>Cardapio</a>
                        </Link>

                        <button onClick={deslogarUser}>
                            <FiLogOut color="#FFF" size={24}/>
                        </button>
                    </nav>
                </div>
            </div>
        </header>
    )
}
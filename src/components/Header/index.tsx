import styles from './styles.module.scss';
import Link from 'next/link';

import { FiLogOut } from 'react-icons/fi';

export function Header(){
    return(
        <header>
            <div className={styles.headerContainer}>
                <div className={styles.headerContent}>
                    <Link href="/dashboard">
                       <img src="/logoHeader.png" width={140} height={140}></img>
                    </Link>

                    <nav className={styles.navs}>
                        <Link href="/categoria">
                            <a>Categoria</a>
                        </Link>

                        <Link href="/produto">
                            <a>Cardapio</a>
                        </Link>

                        <button>
                            <FiLogOut color="#FFF" size={24}/>
                        </button>
                    </nav>
                </div>
            </div>
        </header>
    )
}
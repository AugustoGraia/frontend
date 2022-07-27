import styles from './styles.module.scss';
import Link from 'next/link';

export function Header(){
    return(
        <header>
            <div className={styles.headerContainer}>
                <div className={styles.headerContent}>
                    <Link href="/dashboard">
                        
                    </Link>
                </div>
            </div>
        </header>
    )
}
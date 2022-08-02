import Modal from 'react-modal';
import styles from './style.module.scss';

import { FiX } from 'react-icons/fi';

import { OrderItemProps } from '../../pages/dashboard';

interface ModalOrderProps{
    aberto: boolean;
    fecharModal: () => void;
    orden: OrderItemProps[];

}

export function ModalOrder({ aberto, fecharModal, orden }: ModalOrderProps){

    const customStyle ={
        content:{
            top: '50%',
            bottom: 'auto',
            left: '50%',
            right: 'auto',
            padding: '30px',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#1d1f2e',
        }
    };
    console.log("================")
    console.log(orden[0].order.table)

    return(
    <Modal
    isOpen={aberto}
    onRequestClose={fecharModal}
    style={customStyle}
    >

        <button
        type="button"
        onClick={fecharModal}
        className="react-modal-close"
        style={{ background: 'transparent', border: 0 }}
        >
        <FiX size={45} color="#f34748"/>
        </button>

            <div className={styles.container}>
                
                <h2>Detalhes do pedido</h2>
                <span className={styles.table}>
                    Mesa : <strong>{orden[0].order.table}</strong>
                </span>

                
            </div>

    </Modal>
    )
}






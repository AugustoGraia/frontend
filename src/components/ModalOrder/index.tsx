import Modal from 'react-modal';
import styles from 'styles.module.scss';

import { FiX } from 'react-icons/fi';

import { OrderItemProps } from '../../pages/dashboard/index';

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

    </Modal>
    )
}






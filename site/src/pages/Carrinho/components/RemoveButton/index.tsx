import * as Dialog from '@radix-ui/react-dialog';
import { TrashIcon } from '@radix-ui/react-icons';
import styles from './RemoveButtom.module.scss';

interface Props {
    product: string,
    onConfirm: () => void;
    optionClassName?: string;
    iconClassName?: string;
}

const RemoveButtom: React.FC<Props> = ({ product, onConfirm, optionClassName, iconClassName }) => {


    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <button className={optionClassName} onClick={(e) => {e.stopPropagation();}}>
                    <TrashIcon className={iconClassName} /> <p>Remover</p> 
                </button>
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Overlay className={styles.Overlay} />
                <Dialog.Content className={styles.Dialog}>
                <Dialog.Title>Confirmar remoção</Dialog.Title>
                <Dialog.Description>Tem certeza que deseja remover <strong>{product}</strong>?<br/><span className={styles.Alert}>Esta ação é irreversível</span></Dialog.Description>

                <div className={styles.Actions}>
                    <Dialog.Close asChild>
                        <button className={styles.Cancel}>Cancelar</button>
                    </Dialog.Close>
                    <Dialog.Close asChild>
                        <button className={styles.Confirm} onClick={onConfirm}>Confirmar</button>
                    </Dialog.Close>
                </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};

export default RemoveButtom;

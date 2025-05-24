import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ReactComponent as Cart } from 'assets/cart.svg';
import styles from './AddToCartButton.module.scss'; // ou adapta pro seu estilo

import { addToCart } from "services/cartService";
import { Product } from 'types/Product';

import { useUser } from 'contexts/UserContext';

interface Props {
    product: Product;
}

const AddToCartButton:React.FC<Props> = ({ product }) => {
    const { user, setUser } = useUser()
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleAddToCart = async () => {
        try {
            if (product && user) {
                await addToCart(user, setUser, product);
                toast.success(`${product.name} adicionado ao carrinho!`);
                setOpen(true);
            }
        } catch (error){
            if(error === 1) {
                toast.warn('Você precisa estar logado para adicionar ao carrinho!');
                setOpen(false);
            } else {
                toast.error('Erro ao adicionar ao carrinho!');
            } 
        }
    };

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
                <button onClick={handleAddToCart} className={`${styles.Buy} ${user ? '' : styles.Disabled}`}>
                    <Cart className={styles.Icon} />
                    ADICIONAR AO CARRINHO
                </button>
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Overlay className={styles.Overlay} />
                <Dialog.Content className={styles.DialogContent}>
                    <Dialog.Title className={styles.DialogTitle}>
                        Produto adicionado!
                    </Dialog.Title>
                    <p className={styles.DialogDescription}>
                        O que deseja fazer agora?
                    </p>

                    <div className={styles.DialogActions}>
                        <button
                            className={styles.GoToCart}
                            onClick={() => navigate('/carrinho')}
                        >
                            Ir para o carrinho
                        </button>
                        <Dialog.Close asChild>
                            <button className={styles.ContinueShopping}>
                                CONTINUAR COMPRANDO
                            </button>
                        </Dialog.Close>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};

export default AddToCartButton;

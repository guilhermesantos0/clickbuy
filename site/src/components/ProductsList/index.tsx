import { useRef, useState, useEffect } from 'react';

import style from './ProductsList.module.scss';

import Product from '../Product';
import { Product as ProductModel } from '@modules/Product';

import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';

interface Props {
    title: string,
    favouriteOption?: boolean
}

const ProductsList: React.FC<Props> = ({ title, favouriteOption }) => {

    const [products, setProducts] = useState<ProductModel[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/products');
                const productData = await response.json();

                setProducts(productData);
            } catch (error) {
                console.log('Erro ao buscar produtos', error)
            }
        }

        fetchData();
    }, [])

    const productsRef = useRef<HTMLDivElement>(null);

    const [isAtEnd, setIsAtEnd] = useState(false);
    const [isAtStart, setIsAtStart] = useState(true);

    const scrollRight = () => {
        if (productsRef.current) {
            productsRef.current.scrollBy({
                left: 300,
                behavior: 'smooth'
            });
        }
    };

    const scrollLeft = () => {
        if (productsRef.current) {
            productsRef.current.scrollBy({
                left: -300,
                behavior: 'smooth'
            });
        }
    };

    const checkScrollPosition = () => {
        const container = productsRef.current;
        if (container) {
            const scrolled = Math.ceil(container.scrollLeft);
            const maxScroll = container.scrollWidth - container.clientWidth;
        
            setIsAtEnd(scrolled >= maxScroll - 1); 
            setIsAtStart(scrolled <= 1);
        }
    };

    useEffect(() => {
        const container = productsRef.current;
        if(!container) return

        container.addEventListener('scroll', checkScrollPosition);
        checkScrollPosition();

        return () => container.removeEventListener('scroll', checkScrollPosition);
    }, []);
    
    useEffect(() => {
        checkScrollPosition();
    }, [products]);

    return (
        <div className={style.Container}>
            <h2 className={style.Title}>{ title }</h2>
            <div className={style.List} ref={productsRef}>
                {products.map((product, idx) => (
                    <Product product={{...product}} favouriteOption={favouriteOption} key={idx} />
                ))}
                
            </div>

            {
                !isAtStart && (
                    <button className={`${style.ScrollButton} ${style.ScrollLeft}`} onClick={scrollLeft}><ChevronLeftIcon className={style.Icon} /></button>
                )
            }

            {
                !isAtEnd && (
                    <button className={`${style.ScrollButton} ${style.ScrollRight}`} onClick={scrollRight}><ChevronRightIcon className={style.Icon} /></button>
                )
            }
        </div>
    )
}

export default ProductsList;
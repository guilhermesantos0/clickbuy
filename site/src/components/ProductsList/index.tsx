import { useRef, useState, useEffect } from 'react';

import style from './ProductsList.module.scss';

import Product from './Product';

interface Props {
    title: string
}

const list = [
    { 
        name: 'Geladeira', 
        image: 'https://img.olx.com.br/images/39/399570516451915.webp', 
        price: 500, 
        location: "São Paulo, SP" 
    },
    {
        name: 'Corsa Hatch 2012',
        image: 'https://img.olx.com.br/images/52/529505241549257.webp',
        price: 28900,
        location: "São Paulo, SP"
    },
    {
        name: 'Tênis Nike Air Max 90',
        image: 'https://img.olx.com.br/images/54/546580515113727.webp',
        price: 170,
        location: 'Poá, SP'
    },
    {
        name: 'Transbike EqMax + Rack de teto',
        image: 'https://img.olx.com.br/images/42/428551378518656.webp',
        price: 400,
        location: 'Marinique, SP'
    },
    {
        name: 'Celular iPhone 15 Pro Max 256gb',
        image: 'https://img.olx.com.br/images/45/450564507497954.webp',
        price: 6100,
        location: 'Belém, PA'
    },
    {
        name: 'Panela de Pressão Alusol 2,5 Litros - Nova!',
        image: 'https://img.olx.com.br/images/19/190457201189583.webp',
        price: 110,
        location: 'São Caetano do Sul, SP'
    },
    {
        name: 'Panela de Pressão Alusol 2,5 Litros - Nova!',
        image: 'https://img.olx.com.br/images/19/190457201189583.webp',
        price: 110,
        location: 'São Caetano do Sul, SP'
    }
]

const ProductsList: React.FC<Props> = ({ title }) => {

    const productsRef = useRef<HTMLDivElement>(null);

    const [isAtEnd, setIsAtEnd] = useState(false);
    const [isAtStart, setIsAtStart] = useState(true);

    const scrollRight = () => {

        console.log(productsRef.current)

        if (productsRef.current) {
        productsRef.current.scrollBy({
            left: 300,
            behavior: 'smooth'
        });
        }
    };

    const scrollLeft = () => {

        console.log(productsRef.current)

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
          const scrolled = container.scrollLeft;
          const maxScroll = container.scrollWidth - container.clientWidth;
    
          setIsAtEnd(scrolled >= maxScroll - 1); 
          setIsAtStart(scrolled <= 1);
        }
    };

    useEffect(() => {
        checkScrollPosition();
        const container = productsRef.current;
        container?.addEventListener('scroll', checkScrollPosition);
        return () => container?.removeEventListener('scroll', checkScrollPosition);
    }, []);

    return (
        <div className={style.Container}>
            <h2 className={style.Title}>{ title }</h2>
            <div className={style.List} ref={productsRef}>
                {list.map((item, index) => (
                    <Product product={{...item}} />
                ))}
                
            </div>

            {
                !isAtStart && (
                    <button className={`${style.ScrollButton} ${style.ScrollLeft}`} onClick={scrollLeft}>←</button>
                )
            }

            {
                !isAtEnd && (
                    <button className={`${style.ScrollButton} ${style.ScrollRight}`} onClick={scrollRight}>→</button>
                )
            }
        </div>
    )
}

export default ProductsList;
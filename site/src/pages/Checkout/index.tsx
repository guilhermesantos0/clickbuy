import { useLocation, Navigate, useNavigate } from "react-router-dom";
import { Product } from "@modules/Product";
import { useEffect, useState } from "react";

import style from './CheckoutPage.module.scss';

import Header from "components/Header";
import Footer from "components/Footer";

import { useUser } from "contexts/UserContext";

import { ReactComponent as CardIcon } from '../../assets/card.svg';
import { ReactComponent as PixIcon } from '../../assets/pix.svg';
import api from "services/api";

import { toast } from "react-toastify";

interface LocationState {
    products?: Product[];
}

declare global {
    interface Window {
        MercadoPago: any;
    }
}

type MercadoPagoInstance = {
    createCardToken: (form: any) => Promise<any>;
    getIdentificationTypes: () => Promise<any>;
    getPaymentMethod: (a: any) => Promise<any>;
};


const CheckoutPage = () => {
    const location = useLocation();
    const state = location.state as LocationState;
    const products = state?.products;

    const { user } = useUser();

    const navigate = useNavigate();

    const [paymentMethod, setPaymentMethod] = useState<1 | 2>(2);

    const [qrCode, setQrCode] = useState<string | null>(null);
    const [qrCodeCopy, setQrCodeCopy] = useState<string | null>(null);
    const [loadingPix, setLoadingPix] = useState(false);

    const [mercadoPago, setMercadoPago] = useState<MercadoPagoInstance | null>(null)

    const [useAccountAddress, setUseAccountAddress] = useState(true);
    const [address, setAddress] = useState({
        road: '',
        number: '',
        city: '',
        state: '',
        zip: '',
        complement: '',
        neighborhood: ''
    });

    const [cardForm, setCardForm] = useState({
        number: '5031433215406351',
        name: 'APRO',
        expireDate: '11/30',
        cvv: '123',
        cpf: '12345678909'
    });

    useEffect(() => {
        const mp = new window.MercadoPago(process.env.REACT_APP_MERCADO_PAGO_PUBLIC_KEY, {
            locale: 'pt-BR'
        });
        setMercadoPago(mp);
    },[])

    if (!products || products.length === 0) {
        toast.error('Você não tem nada selecionado!')
        navigate('/carrinho')
    }

    if(!products) return (<></>)

    const total = products.reduce((sum, p) => {
        const numeric = parseFloat(p.price.replace(/[R$\.,]/g, '').replace(/(\d{2})$/, '.$1'));
        return sum + numeric;
    }, 0);

    const totalFormatted = total.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
    const handleGeneratePix = async () => {
        if(!qrCodeCopy) {
            setLoadingPix(true);
            try {
                const response = await api.post("/payment/pix", {
                    amount: Number(total.toFixed(2)), 
                    checkoutInfo: { description: `Compra ${products.map((prod) => prod.name).join(', ')}`, email: user?.email, name: user?.personalData.name, cpf: user?.personalData.cpf }
                });
    
                setQrCode(response.data.qrCodeBase64);
                setQrCodeCopy(response.data.qrCodeCode);
            } catch (err) {
                console.error("Erro ao gerar QR Code PIX", err);
                alert("Erro ao gerar QR Code.");
            } finally {
                setLoadingPix(false);
            }
        } else {
            navigator.clipboard.writeText(qrCodeCopy)
            .then(() => {
                toast.success('QR Code copiado com sucesso!');
            })
            .catch((err) => {
                toast.error('Erro ao copiar QR Code')
                console.error('Erro ao copiar QR Code', err)
            })
        }

    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if(!mercadoPago) return 'Deu ruim'

        const [expMonth, expYear] = cardForm.expireDate.split('/');

        const payload = {
            cardNumber: cardForm.number.replace(' ', ''),
            cardholderName: cardForm.name,
            cardExpirationMonth: expMonth,
            cardExpirationYear: `20${expYear}`,
            securityCode: cardForm.cvv,
            identificationType: "CPF",
            identificationNumber: cardForm.cpf
        }

        try {
            const response = await mercadoPago.createCardToken(payload);
            const bin = cardForm.number.replace(/\s/g, '').slice(0, 6);
            const token = response.id;
            
            const apiPayload = {
                amount: Number(total.toFixed(2)),
                checkoutInfo: {
                    token: token,
                    description: "Descrição Teste",
                    installments: 1,
                    email: user?.email,
                    cpf: cardForm.cpf,
                    bin: bin
                }
            }

            const res = await api.post('/payment/card', apiPayload);
            await api.post('/payment/save',
                {
                    id: res.data.id,
                    userId: user?._id,
                    products: products.map((product) => product._id )
                }
            )
            navigate('/comprar/sucesso', { state: { paymentId: res.data.id, products: products } });


        } catch (err) {
            console.error(err)
        }
    };

    return (
        <div className={style.Container}>
            <Header user={user} hideOptions />
            <div className={style.PageContent}>
                <div className={style.Summary}>
                    <h2 className={style.Title}>Resumo da compra</h2>
                    <div className={style.ProductsContainer}>
                        {products.map((product, idx) => (
                            <>
                                <div key={product._id} className={style.Product}>
                                    <h4 title={product.name} className={style.ProductName}>{product.name}</h4>
                                    <p>{product.price}</p>
                                </div>
                                { idx !== products.length - 1 && (
                                    <span className={style.Separator}></span>
                                )}
                            </>
                        ))}
                    </div>
                    <h3 className={style.Total}>Total: {totalFormatted}</h3>
                </div>

                <div className={style.PaymentSection}>
                    <div className={style.Tabs} style={{ "--active-tab-index": paymentMethod - 1.5 } as React.CSSProperties}>
                        <div
                            className={`${style.Tab} ${paymentMethod === 1 ? style.ActiveTab : ''}`}
                            onClick={() => setPaymentMethod(1)}
                        >
                            <CardIcon className={style.Icon} /> Cartão de Crédito
                        </div>
                        <div
                            className={`${style.Tab} ${paymentMethod === 2 ? style.ActiveTab : ''}`}
                            onClick={() => setPaymentMethod(2)}
                        >
                            <PixIcon className={style.Icon} /> PIX
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className={style.PaymentForm}>
                        {paymentMethod === 1 ? (
                            <>
                                <div className={style.CardPayment}>
                                    <input className={`${style.Input} ${style.CardNumber}`} placeholder="Número do Cartão" value={cardForm.number} onChange={e => setCardForm({ ...cardForm, number: e.target.value })} />
                                    <input className={`${style.Input} ${style.CardName}`} placeholder="Nome no Cartão" value={cardForm.name} onChange={e => setCardForm({ ...cardForm, name: e.target.value })} />
                                    <input className={`${style.Input} ${style.CardExpire}`} placeholder="Validade" value={cardForm.expireDate} onChange={e => setCardForm({ ...cardForm, expireDate: e.target.value })} />
                                    <input className={`${style.Input} ${style.CardCVV}`} placeholder="CVV" value={cardForm.cvv} onChange={e => setCardForm({ ...cardForm, cvv: e.target.value })} />
                                    <input className={`${style.Input} ${style.CardCPF}`} placeholder="CPF" value={cardForm.cpf} onChange={e => setCardForm({ ...cardForm, cpf: e.target.value })} />
                                    <label className={style.Checkbox}>
                                        <input 
                                        type="checkbox" 
                                        checked={useAccountAddress} 
                                        onChange={() => setUseAccountAddress(!useAccountAddress)} />
                                        Mesmo endereço da conta
                                    </label>
                                    <div className={`${style.AddressWrapper} ${useAccountAddress ? style.hidden : style.visible}`}>
                                        <div className={style.AddressGrid}>
                                            <input className={`${style.Input} ${style.Road}`} placeholder="Rua" value={address.road} onChange={e => setAddress({ ...address, road: e.target.value })} />
                                            <input className={`${style.Input} ${style.AddressNumber}`} placeholder="Número" value={address.number} onChange={e => setAddress({ ...address, number: e.target.value })} />
                                            <input className={`${style.Input} ${style.Complement}`} placeholder="Complemento" value={address.complement} onChange={e => setAddress({ ...address, complement: e.target.value })} />
                                            <input className={`${style.Input} ${style.Neighborhood}`} placeholder="Bairro" value={address.neighborhood} onChange={e => setAddress({ ...address, neighborhood: e.target.value })} />
                                            <input className={`${style.Input} ${style.City}`} placeholder="Cidade" value={address.city} onChange={e => setAddress({ ...address, city: e.target.value })} />
                                            <input className={`${style.Input} ${style.State}`} placeholder="Estado" value={address.state} onChange={e => setAddress({ ...address, state: e.target.value })} />
                                            <input className={`${style.Input} ${style.CEP}`} placeholder="CEP" value={address.zip} onChange={e => setAddress({ ...address, zip: e.target.value })} />
                                        </div>
                                    </div>
                                </div>
                                <div className={style.ButtonContainer}>
                                    <button className={style.SubmitButton} type="submit">Realizar Pagamento</button>
                                </div>
                            </>
                        ) : (
                            <div className={style.PixInfo}>
                                {qrCode ? (
                                    <img className={style.QRCode} src={`data:image/png;base64,${qrCode}`} alt='' />
                                ) : (
                                    // <img className={style.QRCode} src="https://codigosdebarrasbrasil.com.br/wp-content/uploads/2019/09/codigo_qr-300x300.png" alt="" />
                                    <></>
                                )}

                                <button
                                    className={style.PixButton}
                                    onClick={handleGeneratePix}
                                    disabled={loadingPix}
                                >
                                    {loadingPix ? "Gerando..." : ( qrCodeCopy ? "Copiar" : "Gerar QR Code PIX" )}
                                </button>
                            </div>
                        )}
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default CheckoutPage;

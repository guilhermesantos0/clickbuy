import { useParams } from "react-router-dom"
import { useUser } from "contexts/UserContext";

import style from './ComprarProduto.module.scss';

import Header from "components/Header";
import Footer from "components/Footer";

const ComprarProduto = () => {
    const { category, id } = useParams<{ category: string, id: string}>();
    const { user } = useUser();

    return (
        <div>
            <Header user={user} />
            <div></div>
            <Footer />
        </div>
    )
    
}

export default ComprarProduto;
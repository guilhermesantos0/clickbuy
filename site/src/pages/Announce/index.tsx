const Announce = () => {
    return (
        <div>
            <h1>Anunciar Produto</h1>

            <div>
                <div><label htmlFor="category">Categoria</label><input type="select" /></div>
                <div><label htmlFor="brand">Marca</label><input type="text" /></div>
                <div><label htmlFor="price">Preço</label><input type="text" /></div>
                <div><label htmlFor="city">Cidade</label><input type="text" /></div>
            </div>

            <div>
                <h1>Adicionar Fotos</h1>
                <div>
                    <img src="" alt="" />
                    <img src="" alt="" />
                    <img src="" alt="" />
                    <img src="" alt="" />
                    <img src="" alt="" />
                </div>
            </div>

            <button>Anunciar</button>
        </div>
    )
}

export default Announce
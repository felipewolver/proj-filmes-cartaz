
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import "./favoritos.css";


function Favoritos() {
   
    const [filmes, setFilmes] = useState([]);
  
    useEffect(() => {

        const minhaLista = localStorage.getItem("@primeflix");
        setFilmes(JSON.parse(minhaLista) || []);

    }, [])
    
    
    function excluirFilme(id) {

        let filtroFilmes = filmes.filter((item) => {
            return (item.id !== id ) // siginica que ao clicar no botao excluir vai retornar listando todos os filmes da lista diferente do id selecionado, ou seja, menos o id selecionado
        })

        setFilmes(filtroFilmes);
        localStorage.setItem("@primeflix", JSON.stringify(filtroFilmes));
        toast("Filme excluído com sucesso");
    }

    return (
        // a condição filmes.length === siginica que se o array eh 0 entao faça(&&)
        // A função anõnima no onClick() vai passar o id selecionado para depois executar a funcão excluirFilme()
        <div className="meus-filmes">
            <h1> Meus Filmes </h1> 
                                      
            {filmes.length === 0 && 
            <span> Você não possui nenhum filme salvo :( :( :( </span> }
            <ul>
                {filmes.map((item) => {
                    return (
                        <li key={item.id}><span> {item.title} </span>
                            <div>
                                <Link to={`/filme/${item.id}`}> Ver detalhes </Link> 
                                <button onClick={() => excluirFilme(item.id) }> Excluir </button>
                            </div>
                        </li>
                    )
                })}
              
            </ul>
        </div>
    );
}

export default Favoritos

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import "./filme-info.css";
import api from "../../services/api";

function Filme() {
    
    // o id eh o mesmo usado na arquivo routes.js para buscar o filme
    const { id } = useParams();
    const navigate = useNavigate();
    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadFilme() {

            await api.get(`/movie/${id}`, {
                params: {
                    api_key: "d1db5b29b9df4c0c9b47c88939712163",
                    language: "pt-BR",
                }
            })
            .then((response) => {
                //console.log(response.data);  // Usado para testar requisiçoes
                setFilme(response.data);
                setLoading(false);
            })
            .catch(() => {
              // console.log("Filme não encontrado!"); Usado para testar requisiçoes quando não encontra o Id do filme
              navigate("/", {replace: true} ) // o navigate replace vai redirecionar para pagina principal usuario que acessar um filme que não exite o "/" eh a pagina Home 
              return; // O return serve para parar a execução. 
            })
        }
        
        // Vai ser executado a função para listar o filme selecionado pelo id 
        loadFilme();
        
        /* Nesse return eh mostrado como o componente é desmontado ao sair da pagina filme com useEffect()
        return () => {
            console.log("COMPONENTE FOI DESMONTADO...")
        } */
    }, [navigate, id]) // eh passado o id aqui por ele estah fora do useEffect como tbm o navigate
    
    function salvarFilme() {

        const minhaLista = localStorage.getItem("@primeflix"); // @primeflix eh uma chave para o localStorage

        let filmesSalvos = JSON.parse(minhaLista) || []; // Json.parse vai converter de volta para um array ou(||) senão vai iniciar um array [] vazil
       
        const hasFilme = filmesSalvos.some((filmeSalvo) => filmeSalvo.id === filme.id) // hasFilme se tem filme salvo. o some() função javascript pra verificar se tem um filme salvo igual ao que deseja salvar na pag. para não haver duplicata
        
        // Vai verificar se o filme eh igual ao que tem salvo no localStorage 
        if (hasFilme) {
            //alert("Esse filme já está na lista!");
            toast.warn("Esse filme já está na sua lista!");
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos)); // json.stringify vai converter o array em jason
        //alert("Filme salvo com sucesso.");
        toast.success("Filme salvo com sucesso.");
    }

    if(loading) {
        
        return (
            <div className="filme-info">
                <h1> Carregando detalhes... </h1>
            </div>
        )
    }

    return (
        <div className="filme-info">
            <h1> {filme.title} </h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}` } alt={filme.title}></img>
        
            <h3> Sinopse </h3>
            <span> {filme.overview} </span>
            
            <strong> Avaliação: {filme.vote_average} / 10 </strong>

            <div className="area-buttons">
                <button onClick={salvarFilme} > Salvar </button>
                <button>
                    <a target="blank" rel="external" href={`https://www.youtube.com/results?search_query=${filme.title} Trailer`}> Trailer </a>
                </button>
            </div>

        </div>
    );
}

export default Filme;
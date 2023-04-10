
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import api from '../../services/api'; // foi importado a variável de consfiguração api que eh uma const
import './home.css';

// url da api: /movie/now_playing?api_key=d1db5b29b9df4c0c9b47c88939712163&language=pt-br

function Home() {
    
    const [filmes, setFilmes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadFilmes() {
            
            const response = await api.get("movie/now_playing", { // Não precisa colocar de inicio o "/" no get. O await e para esperar a requisição pois pode demorar na hora de solicitar as informaçoes dos filmes
                params: {
                    api_key: "d1db5b29b9df4c0c9b47c88939712163",
                    language: "pt-BR",
                    page: 1,
                }
            }) 
                 
            //console.log(response.data.results.slice(0, 10)); // No navegador abrir a aba console do inspecionar. O results vai exibir os dados dos filmes em cartazes e o slice vai exibir da posição 0 ateh 10 filmes
            setFilmes(response.data.results.slice(0, 10));
            setLoading(false);
        }
        
        // Vai ser executado a função para listar os filmes
        loadFilmes();
    }, [])
    
    // Significa que se o loading fo true, vai executar este if
    if(loading) {
        return (
            <div className="loading">
                <h2> Carregando filmes... </h2>
            </div>
        );
    }

    return (
        <div className="container">
            <div className="lista-filmes">
                {filmes.map((filme) => {

                    return ( // Eh necessário colocar o atributo key e pegar o id em article para listar os filmes
                        <article key={filme.id}> 
                            <strong> {filme.title} </strong>
                            <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}` } alt={filme.title}></img>
                            <Link to={`/filme/${filme.id}` }> Acessar </Link>
                        </article>
                    )
                })}
            </div>
        
        </div>
    );
}

export default Home;
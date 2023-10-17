import React, { useState, useEffect } from 'react'
import { Botao, ContainerInputs, ContainerMusicas, InputMusica, Musica } from './styled'
import axios from 'axios'

export default function Musicas(props) {
    const [musicas, setMusicas] = useState([])
    const [ artista, setArtista ] = useState("")
    const [ nomeMusica, setNomeMusica ] = useState("")
    const [ url, setUrl] = useState("")

    const headers = {headers: {Authorization: "giovanni-souza-krexu"}}

    const body = {
      name: nomeMusica,
      artist: artista,
      url: url
    }

    const getAllMusicas = () => {
        axios.get(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.playlist.id}/tracks`, {headers: { Authorization: "giovanni-souza-krexu"}})
        .then((response) => {
          setMusicas(response.data.result.tracks)
      })
      .catch((error) =>{
        alert(error.response)
      })}


      useEffect(() => {
        getAllMusicas()
      }, [])
    
      //Controle dos Inputs

    
      const adicionarMusica = () => {
        axios.post(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.playlist.id}/tracks`, body, headers)
        .then(() => {
            alert("Dados Enviados!!")
            setArtista("")
            setNomeMusica("")
            setUrl("")
            getAllMusicas()
        })
        .catch((error) => {
            alert(error.response)
        })
      } 

      //Passamos um parametro para guardar o local da música na função abaixo
      const removerMusica = (param1) => {
        axios.delete(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.playlist.id}/tracks/${param1}`, headers)
        .then(()=>{
          alert("Deletado com sucesso");
          getAllMusicas();
        })
        .catch((error)=>{
          alert(error.response)
        })
      }



    return (
        <ContainerMusicas>
            <h2>{props.playlist.name}</h2>
            {musicas.map((musica) => {
                return (
                    <Musica key={musica.id}>
                        <h3>{musica.name} - {musica.artist}</h3>
                        <audio src={musica.url} controls />
                        {/* Na função do onClick abaixo fizemos a chamada da função remover e passamos seu parametro, no caso música.id */}
                        <button onClick={()=> {removerMusica(musica.id)}}>X</button>
                    </Musica>)
            })}
            <ContainerInputs>
                <InputMusica placeholder="artista" value={artista} onChange={(e) => {setArtista (e.target.value)}}/>
                <InputMusica placeholder="musica" value={nomeMusica} onChange={(e) => {setNomeMusica (e.target.value)}}/>
                <InputMusica placeholder="url" value={url} onChange={(e) => {setUrl (e.target.value)}}/>
                <Botao onClick={adicionarMusica}>Adicionar musica</Botao>
            </ContainerInputs>
        </ContainerMusicas>
    )
}


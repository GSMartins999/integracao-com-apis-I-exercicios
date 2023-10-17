import React, {  useState, useEffect } from "react";
import Musicas from "../Musicas/Musicas";
import axios from "axios";


function Playlists() {
    const [playlists, setPlaylists] = useState([])

    const headers = {headers: {Authorization: "giovanni-souza-krexu"}}

    const getAllPlaylists = () => {
      axios.get("https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists", headers)
      .then((resposta) => {
        setPlaylists(resposta.data.result.list)
      })
      .catch((error) => {
        alert(error.response)
      })
    }

    useEffect(() => {
        getAllPlaylists()
      }, [])
    


    return (
        <div>
            {playlists.map((playlist) => {
                return <Musicas key={playlist.id} playlist={playlist}/>
            })}

        </div>
    );
}

export default Playlists;

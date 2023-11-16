import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import MusicCover from './MusicCover'

export default function Home(){

    const [favoriteMusicsList, setFavoriteMusicsList] = useState([] as Array<object>)

    const [recentMusicsList, setRecentMusicsList] = useState([] as Array<object>)

    const navigate = useNavigate();

    // A la création du composant Home, cela récupère les enregistrements "Music" ayant pour champ "favorites = true" de l'API Strapi sous la forme d'un tableau objets.
    useEffect(() => {
        const getFavoriteMusics = async () => {
            const response = await fetch("http://localhost:1337/api/musics?filters[Favorite][$eq]=true&populate=*&pagination[limit]=10")

            const data = await response.json() // pour pouvoir exploiter les données récupérées via l'API.

            console.log("data :", data)
            console.log("data.data :", data.data)
            console.log("data.data[0] :", data.data[0])
            console.log("data.data[0].attributes :", data.data[0].attributes)
            console.log("data.data[0].attributes.Title :", data.data[0].attributes.Title)

            setFavoriteMusicsList(data.data) // Le deuxième "data" est aussi un tableau d'objets.
        }
        getFavoriteMusics()
    }, [])

    // A la création du composant Home, cela récupère les enregistrements "Music" les plus récents sous la forme d'un tableau objets.
    useEffect(() => {
        const getRecentMusics = async () => {
            const response = await fetch("http://localhost:1337/api/musics?sort=createdAt:desc&pagination[limit]=10")

            const data = await response.json() // pour pouvoir exploiter les données récupérées via l'API.

            console.log("data :", data)
            console.log("data.data :", data.data)
            console.log("data.data[0] :", data.data[0])
            console.log("data.data[0].attributes :", data.data[0].attributes)
            console.log("data.data[0].attributes.Title :", data.data[0].attributes.Title)

            setRecentMusicsList(data.data) // Le deuxième "data" est aussi un tableau d'objets.
        }
        getRecentMusics()
    }, [])

    return (
        <>
            <div className="central_zone">
                <div className="home_bar">
                    <h1>My personal DJ</h1>
                    <button onClick={() => navigate("/ajouter")}>+</button>
                </div>
                <section className="music_sections">
                    <h2>Mes musiques préférées</h2>
                    <div className="music_list">
                        {favoriteMusicsList.map((element:any, index) => (
                            <a key={index} href={element.attributes.Link} target="_blank">
                                <div className="music_cover"
                                    style={{backgroundColor : element.attributes.BackgroundColor}}
                                >
                                    <p>"{element.attributes.Title}"</p>
                                    <p>Par : {element.attributes.singer.data.attributes.FirstName} {element.attributes.singer.data.attributes.LastName}</p>
                                    <p>Sorti le : {element.attributes.ReleaseDate}</p>
                                    <div className="cover_icons_line">
                                        <Link to ="/modification">
                                            <svg className="cover_icon" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M2 26h28v2H2zM25.4 9c.8-.8.8-2 0-2.8l-3.6-3.6c-.8-.8-2-.8-2.8 0l-15 15V24h6.4l15-15zm-5-5L24 7.6l-3 3L17.4 7l3-3zM6 22v-3.6l10-10l3.6 3.6l-10 10H6z"/></svg>
                                        </Link>
                                        <Link to ="/">
                                            <svg className="cover_icon" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M12 12h2v12h-2zm6 0h2v12h-2z"/><path fill="currentColor" d="M4 6v2h2v20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8h2V6zm4 22V8h16v20zm4-26h8v2h-8z"/></svg>
                                        </Link>

                                        {element.attributes.Favorite == true ? (
                                            <svg className="cover_icon" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="m16 2l-4.55 9.22l-10.17 1.47l7.36 7.18L6.9 30l9.1-4.78L25.1 30l-1.74-10.13l7.36-7.17l-10.17-1.48Z"/></svg>
                                        ) : (
                                            <svg className="cover_icon" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="m16 6.52l2.76 5.58l.46 1l1 .15l6.16.89l-4.38 4.3l-.75.73l.18 1l1.05 6.13l-5.51-2.89L16 23l-.93.49l-5.51 2.85l1-6.13l.18-1l-.74-.77l-4.42-4.35l6.16-.89l1-.15l.46-1L16 6.52M16 2l-4.55 9.22l-10.17 1.47l7.36 7.18L6.9 30l9.1-4.78L25.1 30l-1.74-10.13l7.36-7.17l-10.17-1.48Z"/></svg>
                                        )}
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>   
                </section>
                <section className="music_sections">
                    <h2>Derniers ajouts</h2>
                    <div className="music_list">
                        {recentMusicsList.map((element:any, index) => (
                            <a key={index} href={element.attributes.Link} target="_blank">
                                <div className="music_cover"
                                    style={{backgroundColor : element.attributes.BackgroundColor}}
                                >
                                    <p>"{element.attributes.Title}"</p>
                                    <p>Par : {element.attributes.singer.data.attributes.FirstName} {element.attributes.singer.data.attributes.LastName}</p>
                                    <p>Sorti le : {element.attributes.ReleaseDate}</p>
                                    <div className="cover_icons_line">
                                        <Link to ="/modification">
                                            <svg className="cover_icon" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M2 26h28v2H2zM25.4 9c.8-.8.8-2 0-2.8l-3.6-3.6c-.8-.8-2-.8-2.8 0l-15 15V24h6.4l15-15zm-5-5L24 7.6l-3 3L17.4 7l3-3zM6 22v-3.6l10-10l3.6 3.6l-10 10H6z"/></svg>
                                        </Link>
                                        <Link to ="/">
                                            <svg className="cover_icon" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M12 12h2v12h-2zm6 0h2v12h-2z"/><path fill="currentColor" d="M4 6v2h2v20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8h2V6zm4 22V8h16v20zm4-26h8v2h-8z"/></svg>
                                        </Link>

                                        {element.attributes.Favorite == true ? (
                                            <svg className="cover_icon" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="m16 2l-4.55 9.22l-10.17 1.47l7.36 7.18L6.9 30l9.1-4.78L25.1 30l-1.74-10.13l7.36-7.17l-10.17-1.48Z"/></svg>
                                        ) : (
                                            <svg className="cover_icon" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="m16 6.52l2.76 5.58l.46 1l1 .15l6.16.89l-4.38 4.3l-.75.73l.18 1l1.05 6.13l-5.51-2.89L16 23l-.93.49l-5.51 2.85l1-6.13l.18-1l-.74-.77l-4.42-4.35l6.16-.89l1-.15l.46-1L16 6.52M16 2l-4.55 9.22l-10.17 1.47l7.36 7.18L6.9 30l9.1-4.78L25.1 30l-1.74-10.13l7.36-7.17l-10.17-1.48Z"/></svg>
                                        )}
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>   
                </section>
            </div>
        </>
    )
}


// <Link to ="/about">About</Link>


// <p>{element.attributes.singer.Firstname}</p>
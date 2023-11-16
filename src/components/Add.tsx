// à l'init de la page (useEffect), récup. les chanteurs et les "afficher" dans le select


import { ChangeEvent, useCallback, useEffect, useState } from "react";

export default function Add(){
    const [singersList, setSingersList] = useState([] as Array<object>)

    const [title, setTitle] = useState("" as string)
    const [link, setLink] = useState("" as string)
    const [releaseDate, setReleaseDate] = useState("" as string)
    const [singer, setSinger] = useState(0)
    const [backgroundColor, setBackgroundColor] = useState("" as string)
    const [favorite, setFavorite] = useState(false)

    useEffect(() => {
        const getSingers = async () => {
            const response = await fetch("http://localhost:1337/api/singers")

            const data = await response.json() // pour pouvoir exploiter les données récupérées via l'API.

            console.log("data :", data)
            console.log("data.data :", data.data)
            console.log("data.data[0] :", data.data[0])
            console.log("data.data[0].attributes :", data.data[0].attributes)
            console.log("data.data[0].attributes.Title :", data.data[0].attributes.Title)

            setSinger(data.data[0].id)
            setSingersList(data.data) // Le deuxième "data" est aussi un tableau d'objets.
        }
        getSingers()
    }, [])


    const handleChangeTitle = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }, [title])

    const handleChangeLink = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setLink(e.target.value)
    }, [link])

    const handleChangeReleaseDate = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setReleaseDate(e.target.value)
    }, [releaseDate])

    const handleChangeSingerId = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
        setSinger(parseInt(e.target.value))
    }, [])

    const handleChangeBackgroundColor = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setBackgroundColor(e.target.value)
    }, [backgroundColor])

    const handleCheckFavorite = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setFavorite(e.target.checked)
    }, [favorite])

    const handleClickAdd = useCallback(() => {

        if(backgroundColor == "") {
            setBackgroundColor("#121212")
        } // si rien n'a été renseigné dans le champ non requis.

        console.log("Title : " + title)
        console.log("Link : " + link)
        console.log("ReleaseDate : " + releaseDate)
        console.log("singer : " + singer)
        console.log("BackgroundColor : " + backgroundColor)
        console.log("Favorite : " + favorite)
    }, [title, link, releaseDate, singer, backgroundColor, favorite])

    return (
        <>
            <h1>Ajouter une musique</h1>
            <div className="add_form">
                <div>
                    <label>Titre* : </label>
                    <input type="text" onChange={handleChangeTitle} value={title} placeholder="Ex. : Les vagues de la mer" required></input>
                </div>
                <div>
                    <label>Lien* : </label>
                    <input type="text" onChange={handleChangeLink} value={link} placeholder="Ex. : https://www.youtube.com/watch?v=e0FLX8gYcj0" required></input>
                </div>
                <div>
                    <label>Date de sortie : </label>
                    <input type="date" onChange={handleChangeReleaseDate} value={releaseDate} placeholder="Ex. : 1970-05-09"></input>
                </div>
                <div>
                    <label>Chanteur* : </label>
                    <select name="singers" onChange={handleChangeSingerId} required>
                        {singersList.map((element:any, index) => (
                            <option key={index} value={element.id}>
                                {element.attributes.FirstName} {element.attributes.LastName}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Couleur de fond : </label>
                    <input type="text" onChange={handleChangeBackgroundColor} value={backgroundColor} placeholder="Ex. : #134522"></input>
                </div>
                <div>
                    <label>Favori* : </label>

                    <input type="checkbox" onChange={handleCheckFavorite} checked={favorite} required /> 
                </div>
                <button onClick={handleClickAdd}>Ajouter</button>
            </div>
        </>
    )
}
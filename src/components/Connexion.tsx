import { useCallback, useState } from "react";
//import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";

export default function Connexion(){
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleChangelogin = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setIdentifier(e.target.value)
    }, [identifier]) // la fonction handleChangeLogin ne s'execute que lorsque la valeur "login" change.

    const handleChangePassword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }, [password]) // la fonction handleChangePassword ne s'execute que lorsque la valeur "password" change.

        // Vérification que l'identifiant (adresse mail) et le mdp rentrés par l'utilisateur correspond à un enregistrement dans la table User de l'API Strapi.
        const handleClickConnexion = useCallback(async ()=> {
            const response = await fetch("http://localhost:1337/api/auth/local", {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({
                    identifier: identifier,
                    password: password
                })
            })
            const data = await response.json()
        
            console.log("reponse : ",data, data.jwt);
            if(data.jwt) {
                navigate("/home");
            }
        },[identifier, password, navigate])

    return (
        <>
            <h1>Connexion</h1>
            <div className="connexion_form">
                <div>
                    <label>Identifiant : </label>
                    <input type="text" onChange={handleChangelogin} value={identifier} placeholder="Ex. : adresse email"></input>
                </div>
                <div>
                    <label>Mot de passe : </label>
                    <input type="password" onChange={handleChangePassword} value={password} placeholder="Ex. : 1B9v5A7!"></input>
                </div>
                <button onClick={handleClickConnexion}>Se connecter</button>
            </div>
        </>
    )
}
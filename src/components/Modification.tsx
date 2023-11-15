import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Modification(){

    /*
    const [input1, setInput1] = useState("")


    const navigate = useNavigate();

    */

    const handleClick = useCallback(() => {


        //navigate("/home")

    
      }, [/*input1, input2, input3*/]) // la fonction handleClick s'execute quand on clique sur le bouton "Ajouter".




    return (
        <>
            <h1>Modifier : </h1>


            <button onClick={handleClick}>Modifier</button>
        </>
    )
}
import { IonIcon } from "@ionic/react";
import { closeCircle } from "ionicons/icons";
import React from "react";

type DeleteWordsProps={
    onDeleteWords:(n:number,i:number)=>void,
    n:number,
    i:number,
}
const DeleteWords:React.FC<DeleteWordsProps> = ({onDeleteWords,n,i})=>{
    
    return(
        <IonIcon
        onClick={() => {
                onDeleteWords(n,i);
        }}
         style={{color:'red'}} 
         icon={closeCircle}
         ></IonIcon>
    )
}
export default DeleteWords;
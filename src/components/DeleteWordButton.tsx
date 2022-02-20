import { IonIcon } from "@ionic/react";
import { closeCircle } from "ionicons/icons";
import React from "react";

type DeleteWordsProps={
    onDeleteWords:()=>void,
}
const DeleteWordButton:React.FC<DeleteWordsProps> = ({onDeleteWords})=>{
    
    return <IonIcon
        onClick={() => {
            onDeleteWords();
        }}
         style={{color:'red'}} 
         icon={closeCircle}
         />
}
export default DeleteWordButton;
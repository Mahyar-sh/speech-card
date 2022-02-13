import { IonIcon } from "@ionic/react";
import { closeCircle } from "ionicons/icons";
import React from "react";

type DeleteItemProps={
    onDeleteItem:(n:number)=>void,
    i:number
}
const DeleteItem:React.FC<DeleteItemProps> = ({onDeleteItem,i})=>{
    
    return(
        <IonIcon
        onClick={() => {
                onDeleteItem(i);
        }}
         style={{color:'red'}} 
         icon={closeCircle}
         ></IonIcon>
    )
}
export default DeleteItem;
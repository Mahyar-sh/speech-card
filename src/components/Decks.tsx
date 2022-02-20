import React , {Fragment, useState} from "react";
import { Route } from "react-router-dom";
import {DeckModel} from '../models/deck.model';
import {CardModel} from '../models/card.model';
import { IonButton, IonCard, IonIcon, IonInput, IonItem, IonList, IonPage, IonRouterOutlet } from "@ionic/react";
import { home, returnUpBack } from "ionicons/icons";
import '../pages/Decks.page.css'
import DeleteItem from "./DeleteItem";
import DeleteWordButton from "./DeleteWordButton";


type DecksProps ={
data:DeckModel[],
onAddWord: (newWord:string,meanning:string,index:number)=>void,
onDeleteWords: (n:number,i:number)=> void,
};


const Decks:React.FC<DecksProps> = ({data, onAddWord , onDeleteWords}) =>{

    // add a new word
    const [wordInput,setWordInput]= useState('');
    const [meanningInput, setMeanningInput]= useState('');
    const onWordInputChange= (e:any)=>{
        setWordInput(e.target.value);
    }
    const onMeanningInputChange= (e:any)=>{
        setMeanningInput(e.target.value);
    }
    const checkWord = (index:number)=>{
        if(wordInput =='' ||  meanningInput ==''){
            alert('please inter a word');
            setWordInput('');
            setMeanningInput('');
        }
        else {
            onAddWord(wordInput,meanningInput,index); 
            setMeanningInput('');
            setWordInput(''); 
        }
            
    }

    return(
        <IonPage>
            <IonRouterOutlet>

            </IonRouterOutlet>
        </IonPage>
    );
    
};

export default Decks;
import React , {Fragment, useState} from "react";
import { Route } from "react-router-dom";
import {Deck} from '../models/deck';
import {Card} from '../models/card';
import { IonButton, IonCard, IonIcon, IonInput, IonItem, IonList } from "@ionic/react";
import { home, returnUpBack } from "ionicons/icons";
import '../pages/Home.css'
import DeleteItem from "./DeleteItem";
import DeleteWords from "./DeleteWords";


type DecksProps ={
data:Deck[],
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
        <Fragment >
            <IonButton routerLink="/home" 
            // onClick={e=> e.preventDefault()}
             >
            <IonIcon icon={returnUpBack} ></IonIcon>
            </IonButton>

            {data.map((item:Deck,index)=>{
                const deckNumber= index;
                return(
                <Route key={index} exact path={`/home/${item.name}`} >
                    <IonList>
                        <IonCard>
                            {item.name}
                        </IonCard>
                        {item.words.map((word:Card, index)=>{
                            return(
                                <IonItem key={index}>
                                    <IonCard className='wordCard row'>
                                        {word.word}
                                        {word.meanning}
                                    </IonCard>
                                    <DeleteWords onDeleteWords={onDeleteWords} i={index} n={deckNumber} />
                                </IonItem>
                            )
                        })}
                        <IonCard>

                        <IonInput onIonChange={(e:any)=>{onWordInputChange(e)}} value={wordInput} placeholder="add new word" />
                        </IonCard>
                        <IonCard>

                        <IonInput onIonChange={(e:any)=>onMeanningInputChange(e)} value={meanningInput} placeholder="add meanning" />
                        </IonCard>
                        <IonButton expand='full' 
                        shape='round' 
                        onClick={(e)=>checkWord(index)}

                         >add word</IonButton>
                    </IonList>
                </Route>
                );
            })}
        </Fragment>
    );
    
};

export default Decks;
import React, { useState } from 'react';

import { IonButton, IonCard, IonContent, IonHeader, IonInput, IonItem, IonPage, IonTitle, IonToolbar } from '@ionic/react';

import './Home.css';

import { Deck } from '../models/deck';

type HomeProps = {
  data:Deck[],
  addNewDeck: (info:any)=> void
};

const Home: React.FC<HomeProps> = ({data , addNewDeck}) => {
  const [inputData,setInputData] = useState('');
  
 const inputChange=(e:any)=>{
    setInputData(e.target.value);
 };
  const decks = (info: Deck[] ):any => {
    return(
        info.map((item:any | undefined, index:number ):any | undefined =>{
          return(
            
            <IonCard key={index}
              // onClick={(e)=> {e.preventDefault()}}
              routerLink={`/home/${item.name}`} >
              {item.name}
            </IonCard>
          );
        } 
      )
    );
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar >
          <IonTitle>Decks</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar >
            <IonTitle size="large">Decks</IonTitle>
          </IonToolbar>
        </IonHeader>
        {decks(data)}
        <IonItem>
          <IonInput value={inputData} 
          onIonChange={(e)=>inputChange(e)} placeholder='Add New Deck' ></IonInput>
        </IonItem>
        <IonButton expand='full' 
        shape='round'
        onClick={(e)=>{inputData && addNewDeck(inputData);setInputData('')}}
         >Add</IonButton>
      </IonContent>
    </IonPage>
  );
};
export default Home;

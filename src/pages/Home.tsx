import React, { useState } from 'react';

import { IonButton, IonCard, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonPage, IonRouterLink, IonTab, IonTabButton, IonTitle, IonToolbar } from '@ionic/react';
import {closeCircle} from 'ionicons/icons';

import './Home.css';

import { Deck } from '../models/deck';

import DeleteItem from '../components/DeleteItem';
import { Link } from 'react-router-dom';

type HomeProps = {
  data:Deck[],
  addNewDeck: (info:any)=> void,
  onDeleteItem:(i:number)=>void,
};

const Home: React.FC<HomeProps> = ({data , addNewDeck, onDeleteItem}) => {
  const [inputData,setInputData] = useState('');
  
 const inputChange=(e:any)=>{
    setInputData(e.target.value);
 };

const onHandleDeleteItem= (i:number)=>{
  onDeleteItem(i);
  setInputData('');
}
  const decks = (info: Deck[] ):any => {
    return(
        info.map((item:any | undefined, index:number ):any | undefined =>{
          return(
            
            <IonCard className='row' key={index}
              // onClick={(e)=> {e.preventDefault()}}
               >
                 <div className='itemName'>
                <Link color='dark' to={`/home/${item.name}`}>{item.name}</Link>

                 </div>
                 <div className='deleteItem'>
                <IonItem><DeleteItem 
                i={index}
                onDeleteItem={(i:number)=> onHandleDeleteItem(i)}  /></IonItem>

                 </div>
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

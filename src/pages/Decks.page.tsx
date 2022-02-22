import React, { useState } from 'react';

import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonFab, IonFabButton, IonFabList, IonHeader, IonIcon, IonInput, IonItem, IonModal, IonPage, IonRouterLink, IonTab, IonTabButton, IonTitle, IonToolbar } from '@ionic/react';
import {closeCircle,add} from 'ionicons/icons';

import './Decks.page.css';

import { DeckModel } from '../models/deck.model';

import DeleteItem from '../components/DeleteItem';
import { Link } from 'react-router-dom';

type DecksPageProps = {
  data:DeckModel[],
  addNewDeck: (info:any)=> void,
  onDeleteItem:(i:number)=>void,
};

const DecksPage: React.FC<DecksPageProps> = ({data , addNewDeck, onDeleteItem}) => {

  const [inputData,setInputData] = useState('');
  const [openModal,setOpenModal] = useState<boolean>(false);
 const inputChange=(e:any)=>{
    setInputData(e.target.value);
 };

const onHandleDeleteItem= (i:number)=>{
  onDeleteItem(i);
  setInputData('');
}
const onOpenModalSheet= ()=>{
  setOpenModal(true);
};
  const decks = (info: DeckModel[] ):any => {
    return(
        info.map((item:any | undefined, index:number ):any | undefined =>{
          return(            
            <IonCard className='row' key={index}>
              <div className='itemName'>
                <Link color='dark' to={`/decks/${item.name}`}>{item.name}</Link>
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
        

         {/* <IonFab  vertical='bottom' horizontal='end' slot='fixed'>
          <IonFabButton>
            <IonIcon icon={add}></IonIcon>
          </IonFabButton>
          <IonFabList side='top' 
          style={{left:'-450%',Width:'200%'}}
          >
            <IonButton expand='full' shape='round'
            style={{width:'100%'}}
            >add</IonButton>
            <IonItem >
              <IonInput  placeholder='enter new deck'></IonInput>
            </IonItem>
            
          </IonFabList>
         </IonFab> */}

      <IonModal
        isOpen={openModal}
        breakpoints={[0, 0.8, 1]}
        initialBreakpoint={0.8}
        onDidDismiss={()=>{setOpenModal(false)}}
      >
        <IonContent>
          <IonCardHeader>
            <IonTitle 
                    // style={{padding:'40px', marginBottom:'30px'}}
                    >Add New Deck</IonTitle>

          </IonCardHeader>
          <IonCardContent>
            <IonItem>
            <IonInput value={inputData} 
              onIonChange={(e)=>inputChange(e)} placeholder='Add New DeckPage' ></IonInput>
            </IonItem>
            <IonButton expand='full' 
            shape='round'
            onClick={(e)=>{inputData && addNewDeck(inputData);setInputData(''); setOpenModal(false)}}
            >Add</IonButton>
          </IonCardContent>
        </IonContent>
      </IonModal>

      <IonFab  vertical='bottom' horizontal='end' slot='fixed'>
      <IonFabButton onClick={()=>{setOpenModal(true)}} >
            <IonIcon icon={add}></IonIcon>
      </IonFabButton>
      </IonFab>

      </IonContent>
    </IonPage>
  );
};
export default DecksPage;

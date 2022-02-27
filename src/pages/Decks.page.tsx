import React, { useEffect, useRef, useState } from 'react';

import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonFab, IonFabButton, IonFabList, IonHeader, IonIcon, IonInput, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonModal, IonPage, IonRouterLink, IonTab, IonTabButton, IonTitle, IonToolbar } from '@ionic/react';
import {closeCircle,add, trash, remove} from 'ionicons/icons';

import './Decks.page.css';

import { DeckModel } from '../models/deck.model';

import DeleteItem from '../components/DeleteItem';
import { Link } from 'react-router-dom';

type DecksPageProps = {
  data:DeckModel[],
  addNewDeck: (info:any)=> void,
  onDeleteItem:(i:number)=>void,
  editDeckName:(num:number,newName:string)=>void,
};

const DecksPage: React.FC<DecksPageProps> = ({data , addNewDeck, onDeleteItem, editDeckName}) => {

  const [inputData,setInputData] = useState('');
  const [showModal,setshowModal] = useState<boolean>(false);
  const [showEditModal,setShowEditModal]= useState<boolean>(false);
  const [editModalInputData,setEditModalInputData]= useState<string>('');
  const [editModalIndexNumber,setEditModalIndexNumber]= useState<number>(0);
  const [searchDeck,setSearchDeck] = useState<string>('');
  const [newData,SetNewData] = useState<DeckModel[]>(data);
  const listDecksRef = useRef<HTMLIonListElement>(null);

  // check 
  useEffect(()=>{
    SetNewData(data);
  },[data])
  // search for a deck
  useEffect(()=>{
    if(searchDeck === ''){
      SetNewData(data);
    }
    else{
      const allDecks= [...data];
      const filterDecks = allDecks.filter(item =>{
        const helpSearchDeck:string = searchDeck.toLowerCase();
        const theIndex= item.name.toLowerCase().indexOf(helpSearchDeck);
       if( theIndex !== -1){
        return item;
       }
      });
      SetNewData(filterDecks);

    }
  },[searchDeck]);

  const searchInDecksList = (e:any)=>{
    setSearchDeck(e.detail.value);    
  };

 const inputChange=(e:any)=>{
    setInputData(e.detail.value);
 };

const onHandleDeleteItem= (i:number)=>{
  onDeleteItem(i);
  setInputData('');
}

  const EditModal = ()=>{
    return(
      <IonModal isOpen={showEditModal}
                // initialBreakpoint={0.8}
                // onDidDismiss={()=>setshowModal(false)}
                >
        <IonContent>
        <IonToolbar>
          <IonTitle>
          Edit Deck Name
          </IonTitle>
        </IonToolbar>
         <IonItem style={{margin:'40px 0'}}>
         <IonInput value={editModalInputData} 
                onIonChange={(e)=> {setEditModalInputData(e.detail.value!)}} placeholder='Edit Deck Name' >
                </IonInput>
         </IonItem>
          
              <IonButton expand='full' 
              shape='round'
              onClick={(e)=>{
                if(editModalInputData!==''){
                  setShowEditModal(false);
                  editDeckName(editModalIndexNumber,editModalInputData);
                  setEditModalInputData('');
                }
              }
              }
              >Edit Deck Name</IonButton>
              <IonButton expand='full'
                          shape='round'
                          color='danger'
                          onClick={()=>{setShowEditModal(false);
                          setEditModalInputData('')}}>
                          Cancel
              </IonButton>
        </IonContent>
      </IonModal>
    )
  };
  const decks = (info: DeckModel[] ):any => {

    return(
        <IonList ref={listDecksRef} >
          {info.map((item:any | undefined, index:number ):any | undefined =>{
          return(            
            <IonItemSliding 
                className='row'
                key={index}
                 >
                <Link style={{width:'100%'}} to={`/decks/${item.name}`}>
                  <IonItem>

                  {item.name}
                  </IonItem>
                  </Link>
              <IonItemOptions  side='end'>
                <IonItemOption onClick={()=>{setEditModalIndexNumber(index);setShowEditModal(true);
                  listDecksRef.current?.closeSlidingItems(); }}>
                  <IonIcon>
                    <i className="bi bi-pencil-square"></i>
                  </IonIcon>
                </IonItemOption>

                <IonItemOption color='danger'  onClick={()=>{onHandleDeleteItem(index)}}>
                  <IonIcon icon={trash}></IonIcon>
                </IonItemOption>
              </IonItemOptions>
              
            </IonItemSliding>
            
          );
        } 
      )}
        </IonList>
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
        <IonItem>
        <IonLabel position='floating'>Search for a deck</IonLabel>
          <IonInput placeholder='Search Deck'
                    style={{margin:'10px 5px'}}
                    value={searchDeck}
                    onIonChange={(e)=>{searchInDecksList(e)}} />
        </IonItem>
        {decks(newData)}

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

    
          <IonContent>
              <IonModal isOpen={showModal}
                        // initialBreakpoint={0.8}
                        // onDidDismiss={()=>setshowModal(false)}
                        >
                <IonContent>
                  <IonToolbar>
                    <IonTitle>
                    ADD A NEW DECK
                    </IonTitle>
                  </IonToolbar>
                  <IonItem style={{margin:'40px 0'}}>
                    <IonInput value={inputData} 
                      onIonChange={(e)=>inputChange(e)} placeholder='Enter a new Deck' >
                  </IonInput>
                </IonItem>
                <IonButton expand='full' 
                    shape='round'
                    onClick={(e)=>{
                      if(inputData!==''){
                        setshowModal(false);
                        addNewDeck(inputData);
                        setInputData('');
                      }
                    }
                    }
                    >Add
                </IonButton>
                <IonButton expand='full'
                                shape='round'
                                color='danger'
                                onClick={()=>{setshowModal(false);
                                setInputData('')}}>
                                Cancel
                </IonButton>
              </IonContent>
            </IonModal>
         </IonContent> 
          <IonContent>
              {EditModal()}
          </IonContent>                     
            <IonFab style={{padding:'40px'}}  vertical='bottom' horizontal='end' slot='fixed'>
            <IonFabButton onClick={()=>{setshowModal(true)}} >
                  <IonIcon icon={add}></IonIcon>
            </IonFabButton>
            </IonFab>
            

      </IonContent>
    </IonPage>
  );
};
export default DecksPage;

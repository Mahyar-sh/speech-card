import { Redirect, Route } from 'react-router-dom';
import {
  IonApp, IonButton, IonCard,
  IonIcon, IonInput, IonItem,
  IonLabel, IonList, IonPage,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { car, card, ellipse, home, push, square, } from 'ionicons/icons';


/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

// import data
import { firstWords } from './data/firstdata';
// import models & types of data
import { DeckModel } from './models/deck.model';

import DecksPage from './pages/Decks.page';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';
import React, { useState } from 'react';
import DeckPage from './pages/Deck.page';
import deck from "./pages/Deck.page";

setupIonicReact();
const App: React.FC = () => {
  const [data,setData]= useState<DeckModel[]>(firstWords);

  const editWordAndMeaning = (word:string,meaning:string,deckIndex:number,wordIndex:number)=> {
    const oldData = [...data];
    const newWord = {word,meaning};
    oldData[deckIndex].words.splice(wordIndex,1,newWord);
    setData(oldData);
  };

  const editDeckName = (index:number,newName:string)=>{
    const oldData = [...data];
    oldData[index].name= newName;
    setData(oldData);
  };

  const addNewDeck = (info:any):void =>{
    
    const newDeck:DeckModel= {name:info,words:[]};
    const oldData= [...data];
    oldData.push(newDeck);  
    setData(oldData);
  };
  const onDeleteDeck=(deckIndex:number)=>{
    if(window.confirm('Do you want to delete deck?')){
      const oldData:DeckModel[]=[...data];
      oldData.splice(deckIndex,1);
      setData(oldData);
    }
  }

  const addNewWord= (word:string,meaning:string, deckIndex:number): void =>{
    const oldData = [...data];
    const currentDeck:DeckModel = oldData[deckIndex];
    currentDeck.words.push({word:word,meaning:meaning});
    oldData.splice(deckIndex,1, currentDeck);
    setData(oldData);
  };


  const onDeleteWords= (cardIndex: number, deckIndex:number)=> {
    const oldData:DeckModel[] = [...data];
    oldData[deckIndex].words.splice(cardIndex,1);
    setData(oldData);
  }

  return(

  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/decks" exact={true}>
            <DecksPage data={data}
                      addNewDeck={addNewDeck}
                      onDeleteItem={(i:number)=> onDeleteDeck(i)}
                      editDeckName={(num,name)=>editDeckName(num,name)}
              /> 
          </Route>
            {data.map((item:DeckModel, index)=> {
              const deckIndex= index;
              return(
                  <Route key={index} path={`/decks/${item.name}`} >
                    <DeckPage onAddWord={(word, meaning)=>{
                      addNewWord(word, meaning, deckIndex)
                    }} deck={item} onDeleteWord={(cardIndex)=> {
                      onDeleteWords(cardIndex, deckIndex)
                    }}
                      editWordAndMeaning={(word,meaning,wordIndex)=>editWordAndMeaning(word,meaning,deckIndex,wordIndex)} />
                  </Route>
              );
            })}
          
          <Route exact path="/tab2">
            <Tab2 />
          </Route>
          <Route exact path="/tab3">
            <Tab3 />
          </Route>
          <Route exact path="/">
            <Redirect to="/decks" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="decks" href="/decks">
            <IonIcon icon={home} />
            <IonLabel>Decks</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab2" href="/tab2">
            <IonIcon icon={ellipse} />
            <IonLabel>Tab 2</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab3" href="/tab3">
            <IonIcon icon={square} />
            <IonLabel>Tab 3</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
  );
};

export default App;

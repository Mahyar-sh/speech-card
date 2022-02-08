import React, { useState } from 'react';
import { Redirect, Route } from 'react-router-dom';

import { IonButton, IonContent, IonHeader, IonLabel, IonPage, IonRouterOutlet, IonTabBar, IonTabButton, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import Tab1Decks from '../components/tabs-components/Tab1Decks';
import './Tab1.css';

import {firstWords} from '../data/firstdata';
import { Deck } from '../models/deck';
import { IonReactRouter } from '@ionic/react-router';


const Tab1: React.FC = () => {
  const [data,setData]= useState<Deck[]>(firstWords);

  const deckBuildRoute = (info: any | undefined):any => {
    info.map((data:any | undefined, index:number ):any | undefined =>{
      console.log(data);
      return(
        <Route exact path={`deck${index}`}>
          <Tab1Decks data={data}/>
        </Route>      );
    });
  };
  const deckBuildButton = (info:any| undefined):any |undefined =>{
    info.map((data:any | undefined,index:number)=>{
      return(
          <IonTabButton tab={`deck${index}`} href={`deck${index}`} >
            <IonLabel>{info.name}</IonLabel>
          </IonTabButton>
      )
    })
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar >
          <IonTitle>home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar style={{borderBottom:' rgb(0,0,0,0.2) 2px solid'}}>
            <IonTitle size="large">home</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonReactRouter>
          <IonRouterOutlet>
            {deckBuildRoute(data)}
          </IonRouterOutlet>
          <IonTabBar slot='top'>
            {deckBuildButton(data)}  
            </IonTabBar>            
        </IonReactRouter>        
      </IonContent>
    </IonPage>
  );
};

export default Tab1;

import React, { useState } from 'react';
import { Redirect, Route } from 'react-router-dom';

import { IonButton, IonCard, IonContent, IonHeader, IonItem, IonLabel, IonPage, IonRouterOutlet, IonTabBar, IonTabButton, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import Tab1Decks from '../components/tabs-components/Tab1Decks';
import './Home.css';

import {firstWords} from '../data/firstdata';
import { Deck } from '../models/deck';
import { IonReactRouter } from '@ionic/react-router';


const Home: React.FC = () => {
  const [data,setData]= useState<Deck[]>(firstWords);

  const decks = (info: any | undefined):any => {
    return(

      info.map((item:any | undefined, index:number ):any | undefined =>{
        console.log(item.name);
        return(
          <IonCard key={index} href={`/home/${item.name}`}>
          {item.name}
        </IonCard>
      );
    })

    );
  };
  // console.log();
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
      </IonContent>
    </IonPage>
  );
};
export default Home;

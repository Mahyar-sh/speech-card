import React, { useState } from 'react';
import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import Tab1Decks from '../components/tabs-components/Tab1Decks';
import './Tab1.css';

import {firstWords} from '../data/firstdata';
import { Deck } from '../models/deck';

const Tab1: React.FC = () => {
  const [data,setData]= useState<Deck[]>(firstWords);

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
        {/* <ExploreContainer name="Tab 1 page" /> */}
        <Tab1Decks data={data} />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;

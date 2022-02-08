import React, {Fragment,useEffect, useState} from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonIcon, IonLabel, IonButton } from '@ionic/react';
import { pin, wifi, wine, warning, walk } from 'ionicons/icons';
import HomeDeck from './HomeDeck';
import { Deck } from '../../models/deck';
import { IonReactRouter } from '@ionic/react-router';


type Tab1DecksProps={
    data: Deck[]
}

const Tab1Decks: React.FC<Tab1DecksProps> = ({data}):any|undefined => {
    return(
        data.map((item:any|undefined,index:number)=>{
           item.words.map((word:any)=>{
               return(
                <IonCard>
                    {word.word}<br/>
                    {word.meanning}
                </IonCard>
               )
           }) 
        })
    );
};
 export default Tab1Decks;
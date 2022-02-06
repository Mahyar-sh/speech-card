import React, {Fragment,useEffect, useState} from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonIcon, IonLabel, IonButton } from '@ionic/react';
import { pin, wifi, wine, warning, walk } from 'ionicons/icons';
import HomeDeck from './HomeDeck';
import { Deck } from '../../models/deck';


// first words
const firstWords:Deck[] = [
    {
        name:'deck 1',
        words:[{word:'word 1',meanning:'word 1 meanning'},{word:'word 2', meanning: 'word 2 meanning'},{word: 'word 3',meanning: 'word 3 meanning'}]
    },
    {
        name:'deck 2',
        words:[{word:'word 1',meanning:'word 1 meanning'},{word:'word 2', meanning: 'word 2 meanning'},{word: 'word 3',meanning: 'word 3 meanning'}]
    },
    {
        name:'deck 3',
        words:[{word:'word 1',meanning:'word 1 meanning'},{word:'word 2', meanning: 'word 2 meanning'},{word: 'word 3',meanning: 'word 3 meanning'}]
    }
  ]; 

type Tab1DecksProps={
    data: Deck[]
}

const Tab1Decks: React.FC<Tab1DecksProps> = ({data}) => {
    return(
        <Fragment>
            {data.map((item,index)=>{
                return(
                    <HomeDeck key={index} data={item} index={index} />
                )
            })}
        </Fragment>
    );
};
 export default Tab1Decks;
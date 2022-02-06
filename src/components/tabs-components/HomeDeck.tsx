import React,{Fragment} from 'react';
import PropTypes from 'prop-types';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonIcon, IonLabel, IonButton } from '@ionic/react';
import { pin, wifi, wine, warning, walk } from 'ionicons/icons';
import { Card } from '../../models/card';

type HomeDeckProps={
        data:{name:string,words:Card[]},
        index?:number
}
const HomeDeck: React.FC<HomeDeckProps> = ({data,index}) => {
    
 return(
     <Fragment>
         <IonCard >{data.name}</IonCard>
        </Fragment>
    );
};
 export default HomeDeck;
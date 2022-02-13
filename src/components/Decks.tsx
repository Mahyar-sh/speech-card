import React , {Fragment} from "react";
import { Route } from "react-router-dom";
import {Deck} from '../models/deck';
import {Card} from '../models/card';
import { IonButton, IonCard, IonIcon, IonItem, IonList } from "@ionic/react";
import { home, returnUpBack } from "ionicons/icons";

type DecksProps ={
data:Deck[]
};
const Decks:React.FC<DecksProps> = ({data}):any|undefined =>{

    return(
        <Fragment >
            <IonButton href={`/home`}>
            <IonIcon icon={returnUpBack} ></IonIcon>
            </IonButton>

            {data.map((item:Deck,index)=>{
                console.log(item.name);
                return(
                <Route key={index} exact path={`/home/${item.name}`} >
                    <IonList>
                        <IonCard>
                            {item.name}
                        </IonCard>
                        {item.words.map((word:Card, index)=>{
                            return(
                                <IonItem key={index}>
                                    <IonCard>
                                        {word.word}
                                        <br/>
                                        {word.meanning}
                                    </IonCard>
                                </IonItem>
                            )
                        })}
                    </IonList>
                </Route>
                );
            })}
        </Fragment>
    );
};

export default Decks;
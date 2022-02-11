import React , {Fragment} from "react";
import { Route } from "react-router-dom";
import {Deck} from '../models/deck';
import {Card} from '../models/card';
import { IonCard, IonItem, IonList } from "@ionic/react";

type DecksProps ={
firstWords:Deck[]
}
const Decks:React.FC<DecksProps> = ({firstWords}):any|undefined =>{
    return(
        <Fragment >
            {firstWords.map((item:Deck,index)=>{
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
                            );
                        })}
                    </IonList>
                </Route>
                );
            })}
        </Fragment>
    );
};

export default Decks;
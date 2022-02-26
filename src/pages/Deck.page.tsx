import React, { Fragment, useState } from "react";
import {
    InputChangeEventDetail,
    InputCustomEvent,
    IonButton,
    IonCard,
    IonInput,
    IonItem,
    IonList,
    IonPage
} from "@ionic/react";
import { CardModel } from "../models/card.model";
import DeleteWordButton from "../components/DeleteWordButton";
import { DeckModel } from "../models/deck.model";

type DeckProps = {
    deck: DeckModel,
    onDeleteWord: (cardIndex: number) => void,
    onAddWord: (word: string, meaning: string) => void,
}
const DeckPage: React.FC<DeckProps> = ({deck, onDeleteWord, onAddWord})=>{
    const [wordInput, setWordInput] = useState<string>('');
    const [meaningInput, setMeaningInput] = useState<string>('');
    return <IonPage>
        <IonList>
            <IonCard>
                {deck.name}
            </IonCard>
            {deck.words.map((word:CardModel, index)=>{
                return(
                    <IonItem key={index}>
                        <IonCard className='wordCard row'>
                            {word.word} <br/>
                            {word.meaning}
                        </IonCard>
                        <DeleteWordButton onDeleteWords={()=>{
                            onDeleteWord(index)
                        }} />
                    </IonItem>
                )
            })}

        </IonList>
        <IonList>
            <IonItem>
                <IonInput placeholder={'enter word'} value={wordInput} onIonChange={(e: CustomEvent<InputChangeEventDetail>) => setWordInput(e.detail.value!)} />
            </IonItem>
            <IonItem>
                <IonInput placeholder={'enter meaning'} value={meaningInput} onIonChange={(e: CustomEvent<InputChangeEventDetail>) => setMeaningInput(e.detail.value!)} />
            </IonItem>
        </IonList>
        <IonButton disabled={!wordInput || !meaningInput} expand={'full'} shape={'round'}  onClick={()=>{
            onAddWord(wordInput, meaningInput)
        }
        }>Add</IonButton>
    </IonPage>
}

export default DeckPage;
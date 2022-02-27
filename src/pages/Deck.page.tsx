import React, { Fragment, useRef, useState } from "react";
import {
    InputChangeEventDetail,
    InputCustomEvent,
    IonButton,
    IonCard,
    IonContent,
    IonFab,
    IonFabButton,
    IonHeader,
    IonIcon,
    IonInput,
    IonItem,
    IonItemOption,
    IonItemOptions,
    IonItemSliding,
    IonList,
    IonModal,
    IonPage,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import { CardModel } from "../models/card.model";
import DeleteWordButton from "../components/DeleteWordButton";
import { DeckModel } from "../models/deck.model";
import { add, flash, trash } from "ionicons/icons";

type DeckProps = {
    deck: DeckModel,
    onDeleteWord: (cardIndex: number) => void,
    onAddWord: (word: string, meaning: string) => void,
    editWordAndMeaning: (word:string,meaning:string,wordIndex:number)=> void,

}
const DeckPage: React.FC<DeckProps> = ({deck, onDeleteWord, onAddWord, editWordAndMeaning})=>{
    const [wordInput, setWordInput] = useState<string>('');
    const [meaningInput, setMeaningInput] = useState<string>('');
    const [editModalInputs,setEditModalInputs]= useState<{word:string,meaning:string,wordIndex:number}>({word:'',meaning:'',wordIndex:0});
    const [showAddModal,setShowAddModal]= useState<boolean>(false);
    const [showEditModal,setShowEditModal] = useState<boolean>(false);
    const refWordsList = useRef<HTMLIonListElement>(null);


    const editModal = ()=>{
        return(
            <IonModal isOpen={showEditModal}>
                <IonContent>
                    <IonToolbar>
                        <IonTitle>
                            Edit Deck Name
                        </IonTitle>
                    </IonToolbar>
                    <IonItem style={{margin:'40px 0'}}>
                        <IonInput value={editModalInputs.word} 
                            onIonChange={(e)=> {setEditModalInputs({...editModalInputs, word:e.detail.value!})}} placeholder='Edit word' >
                        </IonInput>
                    </IonItem>
                    <IonItem>
                        <IonInput value={editModalInputs.meaning} 
                            onIonChange={(e)=> {setEditModalInputs({...editModalInputs, meaning:e.detail.value!})}} placeholder='Edit meaning' >
                        </IonInput>
                    </IonItem>
                    <IonButton disabled={!editModalInputs.word || !editModalInputs.meaning} expand='full' 
                        shape='round'
                        onClick={(e)=>{
                            setShowEditModal(false);
                            editWordAndMeaning(editModalInputs.word,editModalInputs.meaning,editModalInputs.wordIndex);
                            setEditModalInputs({word:'',meaning:'',wordIndex:0});
                        }
                        }
                        >Edit word and meaning
                    </IonButton>
                    <IonButton expand='full'
                                shape='round'
                                color='danger'
                                onClick={()=>{setShowEditModal(false);
                                    setEditModalInputs({word:'',meaning:'',wordIndex:0})}}
                                    >Cancel
                    </IonButton>
                </IonContent>
            </IonModal>
        )
    };
    const addModal = ()=>{
        return(
            <IonModal isOpen={showAddModal}>
                <IonContent>
                    <IonHeader>
                        <IonToolbar>
                            <IonTitle>Add new word to your list</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonList>
                        <IonItem>
                            <IonInput placeholder={'enter word'} value={wordInput} onIonChange={(e: CustomEvent<InputChangeEventDetail>) => setWordInput(e.detail.value!)} />
                        </IonItem>
                        <IonItem>
                            <IonInput placeholder={'enter meaning'} value={meaningInput} onIonChange={(e: CustomEvent<InputChangeEventDetail>) => setMeaningInput(e.detail.value!)} />
                        </IonItem>
                    </IonList>
                    <IonButton disabled={!wordInput || !meaningInput} expand={'full'} shape={'round'}  onClick={()=>{
                        onAddWord(wordInput, meaningInput);setShowAddModal(false);
                        setWordInput('');
                        setMeaningInput('');}}>Add
                    </IonButton>
                    <IonButton color="danger" expand="full" shape="round" onClick={()=>{
                        setShowAddModal(false);
                        setWordInput('');
                        setMeaningInput('');
                    }}>Cancel
                    </IonButton>
                </IonContent>
            </IonModal>
        );
    }
    const wordsList = ()=>{
        return(
            <IonList ref={refWordsList} style={{padding:'10px 10px'}}>
                {deck.words.map((word:CardModel, index)=>{
                return(
                    <IonItemSliding style={{marginBottom:'10px'}} key={index}>
                        <IonItem  style={{width:'100%',margin:'0'}} className='wordCard row'>
                            {word.word} : <br/>
                            {word.meaning}
                        </IonItem>
                        
                        <IonItemOptions side="end">
                            <IonItemOption onClick={()=>{setShowEditModal(true);
                            setEditModalInputs({...editModalInputs,wordIndex:index});
                            refWordsList.current?.closeSlidingItems();
                            }}>
                                <IonIcon>
                                    <i className="bi bi-pencil-square"></i>
                                </IonIcon>
                            </IonItemOption>
                            <IonItemOption  color="danger" onClick={()=>onDeleteWord(index)}>
                                <IonIcon  icon={trash}></IonIcon>
                            </IonItemOption>
                        </IonItemOptions>
                        
                    </IonItemSliding>
                )
            })}
            </IonList>
        )
    }

    return <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>
                            {deck.name} words list
                        </IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent fullscreen>
                    {wordsList()}
                    {addModal()}
                    {editModal()}
                </IonContent>
                <IonFab style={{padding:'40px'}}  vertical='bottom' horizontal='end' slot='fixed'>
                  <IonFabButton onClick={()=>{setShowAddModal(true)}} >
                    <IonIcon icon={add}></IonIcon>
                  </IonFabButton>
                </IonFab>
            </IonPage>
}

export default DeckPage;
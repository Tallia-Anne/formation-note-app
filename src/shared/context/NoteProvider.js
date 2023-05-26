// NoteProvider.js son role permet de gérer les données spécifiques
//  au note . 
// Le but de faire un tableau de données
import React, { useState, useEffect, createContext, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


const NoteContext = createContext();

const NoteProvider = ({ children }) => {
    // stoker dans la varible (notes)
    // initialisation un tableau vide (useState([]))
    const [notes, setNotes] = useState([]);
    
    const findNotes = async () => {
        // recuperer la clé dans le resultat
        const result = await AsyncStorage.getItem('@notes');
        // Verification le result n'est pas null
        if (result !== null) {
            // on va modifier l'état de note 
            setNotes(JSON.parse(result));
        }
    }
    
    // au chargment
    useEffect(() => {
        findNotes();
    }, []);
    
    return (
        <NoteContext.Provider
            value={{
                notes, setNotes, findNotes }}>
            {children}
        </NoteContext.Provider>
)
    
    
}
// exporter le context qu'on a créer pour l'utiliser pour nos composants
export const useNotes = () => useContext(NoteContext);


export default NoteProvider;
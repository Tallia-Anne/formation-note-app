import React, { useState, useEffect } from 'react';
// import getUsername permet d'afficher le nom d'utilisateur
import { getUsername } from './src/shared/functions/AsyncFunctions';
import { NavigationContainer } from '@react-navigation/native';
import { NavigationTabs } from './src/navigation';
import { NoteProvider } from './src/shared/context';

export default function App() {
  
  const [userName, setUserName] = useState({});
  // Cette fonction permet de récupérer l'utilisateur
  const findUser = async () => {
    // recuperer la clé @user
    const result = await getUsername('@username');
    // le resultat ne doit pas d'etre undefined et non null
    if (result !== undefined && result !== null) {
      //alors on va lecture qui permet d'afficher
      setUserName(JSON.parse(result));
      // le cas  result est undefined  et null
    } else {
      // cela va renvoyer undefined
      setUserName(undefined);
    }
  }
  // dés le chargement on va lancer la fonction 
  useEffect(() => {
    findUser
  }, [])
  // modifier le username
  const modifyGlobalUsername = (newName) => {
    // on va lui passer une nouvelle valeur dans le state
    setUserName({name: newName})
  }
  
  
  return (
    
    
    <NavigationContainer>
      <NoteProvider>
        <NavigationTabs
          // passer l'état de l'username et (?) on verifier de l'etat s'il bien passer de username 
          userName={userName?.name}
          modifyGlobalUsername={modifyGlobalUsername}
        />
        
      </NoteProvider>
    </NavigationContainer>
)
  
  
}

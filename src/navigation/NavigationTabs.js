import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Foundation as FoundationIcons } from 'react-native-vector-icons';
import { StyleSheet } from 'react-native';
import colors from '../shared/theme/colors';
// importations des functions
import { getUsername } from '../shared/functions/AsyncFunctions';
// Importation des écrans
import HomeScreen from '../screens/HomeScreen';
import NoteListScreen from '../screens/NoteListScreen';


const Tab = createBottomTabNavigator();


const NavigationTabs = ({ userName, modifyGlobalUsername }) => {

    const [navUserName, setNavUserName] = useState(null);

    const verifyUsername = async (username) => {
        // Verifie si l'username n'est pas null et pas usernmae
        
        if (username !== null && username !== undefined) {
            const result = await getUsername()
                
                // s'il existe la clé username
                .then((existingUsername) => {
                    //    alors il va retourner la valeur et aussi verifie la proprire le name existe
                    return JSON.parse(existingUsername)?.name;
                });
            // Verification;: si le resultat ne pas etre null et pas undefined et type string
            if (result !== null && result !== undefined && typeof result == "string") {
                // alors la methode setNavUsername va mettre a jour le resultat
                setNavUserName(result);
            }
        }

    }

    // dés le chargement 
    useEffect(() => {
        // On va verifie si  l'userneme n'est pas undefined et l'username n'est pas null
        if (userName !== undefined && userName !== null) {
            // alors La methode setNavUsername va donc incrementer l état username avec la propriete ()name
            setNavUserName(userName.name);
        }
        verifyUsername(userName);
    }, []);




    return (
        <Tab.Navigator
            initialRouteName='Home'
            backBehavior='history'
        >
            <Tab.Screen
                name='Home'
                style={styles.tabScreen}
                options={{
                    tabBarLabel: 'Acceuil',
                    tabBarActiveTintColor: '#917FB3',
                    tabBarInactiveTintColor: '#E5BEEC',
                    tabBarIcon: ({ color, size }) => (
                        <FoundationIcons name='home' color={color} size={size} />
                    ),
                    title: 'Accueil',
                }}
            >
                {(props) => <HomeScreen
                    // {...props} permet de stoker sous forme d'un tableau
                    {...props}
                    userName={userName}
                    setNavUserName={setNavUserName}
                    modifyGlobalUsername={modifyGlobalUsername}
                />}
            </Tab.Screen>

            <Tab.Screen
                name="NoteList"
                style={styles.tabScreen}
                // listeners permet 
                listeners={
                    {
                        // e va recuperer les elements quand on va declencher le tabPress
                        tabPress: (e) => {
                            // verifier l'username qui existe et sa valeur
                            verifyUsername(userName);
                            // navUserName est null et navUserName est undefined
                            if (navUserName === null || navUserName === undefined) {
                                e.preventDefault();
                                // alors on va afficher une alert de mettre son prenom  donc il va bloquer l'accede à la second page
                                alert('Vous devez entrer votre prénom pour accéder à cette fonctionnalité.')
                            }
                        }
                    }
                }
                options={{
                    tabBarLabel: 'Liste de notes',
                    tabBarActiveTintColor: '#917FB3',
                    tabBarInactiveTintColor: '#E5BEEC',
                    tabBarIcon: ({ color, size }) => (
                        <FoundationIcons
                            name='clipboard-notes'
                            color={color}
                            size={size} /> 
                    ),
                    // s'il rempli les conditions alors il va passer sur userName 
                    // s'il ne rempli pas les conditions alors il va passer sur "Invité"
                    title: `Liste de note de ${userName  || "Invité"}`,
                }}
            >
                {
                    (props) => {
                        return <NoteListScreen {...props} userName={userName} />
                    }
                }

            </Tab.Screen>



        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({

    tabScreen: {
        color: colors.LIGHT,
    },
})

export default NavigationTabs;

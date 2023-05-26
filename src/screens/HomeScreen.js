import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, Text, Dimensions } from 'react-native';
import colors from '../shared/theme/colors';
import { getWidth, getHeight } from '../shared/constants/ScreenSize'
import { setUsername, getUsername } from '../shared/functions/AsyncFunctions';

import { RoundIconBtn, ReplacementView } from '../components';

const screenWidth = getWidth();
const screenHeight = getHeight();
const debug = false;



const HomeScreen = ({ userName, modifyGlobalUsername, setNavUserName, navigation }) => {

    const [name, setName] = useState('');

    // cette fonction initUsername permet de lancer la fonction getUsername 
    const initUsername = async () => {
        getUsername()
            .then((newUser) => {
                // new est non null
                if (newUser !== null) {
                    // mettre a jour la nouvelle la valeur de newUser
                    setName(JSON.parse(newUser).name);
                }
            });
    }

    // dés le chargement de l'écran 
    useEffect(() => {
        // si name est une chaine vide
        if (name === "") {
            // on va initialiser la clé @username
            initUsername();
        }
        // si username n'est pas une chaine vide et name n'est pas username
        if (userName !== "" && name !== userName) {
            // alors on va modifier l'etat name pour mettre le username
            setName(userName);
        }
    }, []);


    const handleTextChange = (text) => {
        // trim permet de supprimer les espaces
        setName(text.trim());
    }

    const handleSubmit = async () => {
        const user = { name: name };
        await setUsername(JSON.stringify(user));
        setNavUserName(name);
        modifyGlobalUsername(name);
        navigation.navigate('NoteList')
    }




    return (
        <View style={styles.container}>
            <Text style={styles.inputTitle}>Entrez le prénom qui sera associé aux notes</Text>
            <TextInput
                style={styles.textInput}
                placeholder='Exemple: Jean'
                value={name}
                onChangeText={handleTextChange}
            />
            {debug ? <Text style={styles.userText}> [ {name} ]</Text> : null}
            {/* si name a supprimer les epaces  */}
            {name?.trim()?.length > 0 ?
                // vrai: alors on va afficher l'icon
                <RoundIconBtn
                    iconName="arrow-right"
                    iconType="foundation"
                    color={colors.WHITE}
                    size={24}
                    onPress={handleSubmit}
                    style={{
                        borderRadius: 12,
                        padding: 16,
                    }}
                /> :
                // si cest faux alors on fait diminue l'espace
                // on va envoyer les valeurs dans raplacementWiew
                <ReplacementView width='100%' padding={40} />
            }

        </View>
    );
}

const styles = StyleSheet.create({

    container: {

        flex: 1,
        backgroundColor: colors.ULTRALIGHT,
        alignItems: "center",
        justifyContent: "center",

    },

    inputTitle: {
        alignSelf: "flex-start",
        textAlign: "center",
        paddingLeft: 24,
        marginTop: 3,
        marginBottom: 3,
        opacity: 0.5,

    },

    textInput: {
        width: (screenWidth - 50),
        height: 48,
        borderWidth: 1,
        borderColor: colors.DARK,
        borderRadius: 6,
        paddingLeft: 12,
        fontSize: 24,
        marginTop: 12,
        marginBottom: 12,
        color: colors.PRIMARY,

    },

    userText: {
        textAlign: "center",
        color: colors.DARK,
        fontSize: 24,

    },

});

export default HomeScreen;

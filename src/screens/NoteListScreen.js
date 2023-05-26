import React, { useState, useCallback, useEffect } from 'react';
import { RefreshControl, View, StyleSheet, Text, Alert, FlatList } from 'react-native';
import colors from '../shared/theme/colors';
import { RoundIconBtn, NoteInputModal, NotFound } from '../components';
import AsyncStorage from '@react-native-async-storage/async-storage';
AsyncStorage;
import { useNotes } from '../shared/context/NoteProvider';
import { reverseIntDatas } from '../shared/functions/SortFunctions'



const NoteListScreen = ({ userName, navigation }) => {
    
    const [name, setName] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    // va recuperer dans le NoteProvider
    const { notes, setNotes, findNotes } = useNotes();
    const [resultNotFound, setResultNotFound] = useState(false);
    // Rafraichessemnt
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            findNotes();
            setRefreshing(false);
        }, 325);
    }, []);

    // Dés le chargement, on recuperer la clé notes et recuperer les informations de la cle 
    useEffect(() => {
        if (userName !== "" && name !== "" && userName !== name) {
            setName(userName);
        }
        findNotes();
    }, [])

    // On va recuperer les notes et trier par l'id ou par le time par ordre croissant 
    const reverseNotes = reverseIntDatas(notes);

    // activer la modal qui selon son etat
    const toggleModal = () => {
        setModalVisible(!modalVisible)
    }

    // ajouter une note c'est a dire qu'on gerer la submission d'une nouvelle note
    const handleOnSubmit = async (title, description) => {
        // verifier si on a une valeur username. Si il est n'est pas undefined et n'est pas null 
        author = (userName !== undefined && userName !== null) ? userName : null
        // Pourquoi faire cette variable actualTime car
        // on avait mis id et created_ad = Date.now()
        // il aura eu un décalage un nouveu du time
        // alors le temps sera fixe pour les deux properties qui aura le mme tps
        // Plus: Cela facil pour le trier plus facilement 
        const actualTime = Date.now()

        // initialiser la note qui aura la propriété:
        const note = {
            // Les properties
            id: actualTime,
            title: title,
            description: description,
            author: author,
            created_at: actualTime,
        };
        // dans updatedNotes qui va stocker sous forme d'un tableau notes
        // ajouter la nouvelle valeur du tableau notes
        const updatedNotes = [...notes, note];
        // Quand il sera a jour
        setNotes(updatedNotes)
        // on va attendre de mettre une nouvelle donnee de notes dans le localStroge dans la cle @notes
        await AsyncStorage.setItem('@notes', JSON.stringify(updatedNotes));

    }

    return (
        <View style={styles.container} >
            
            {
                !resultNotFound ?
                    (<NotFound navigation={navigation} />) 
                    : (<FlatList
                        data={reverseIntDatas}
                        // afficher sur deux columns
                        numColumns={2}
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        // le style
                        columnWrapperStyle={{
                            justifyContent: 'center',
                            marginBottom: 15,
                        }}
                        // créer un id unique
                        keyExtractor={item => item.id.toString()}
                        renderItem={
                            ({ item }) =>
                                <Note
                                // recuperer l'item
                                item={item}
                                onPress={() => 
                                    navigation.navigate('NoteScreen')}
                            />
                        }
                    />)
            }
            
            
            
            
            
            {/* Condition: si elle est vrai la note n'a pas taille alors on va venir retourne une view qui aura une propriete de style */}
            {!notes.length ?
                <View style={[StyleSheet.absoluteFillObject, styles.emptyHeaderContainer]}  >

            <Text style={styles.emptyHeader}>
                Add notes
            </Text>
                </View>
                // Condition est fause alors il va renvoyer null
                : null}
            
            <View style={styles.addBtnContainer} >
                <RoundIconBtn
                    iconName='clipboard-pencil'
                    iconType='foundation'
                    style={styles.addBtn}
                    color={colors.WHITE}
                    onPress={toggleModal}
                />
            </View>
            

            <NoteInputModal
                isEdit={false}
                visible={modalVisible}
                toggleModal={toggleModal}
                modalResquestClose={() => {
                    Alert.alert("Quitter", "Souhaitez-vous quitter l'ajout de note ?", [
                        { text: "Non" },
                        {
                            text: "Oui",
                            onPress: () => toggleModal()
                        }
                    ]);
                }}
                onSubmit={handleOnSubmit}
            />
            
            
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.ULTRALIGHT,
        justifyContent: "flex-start",
        paddingVertical: 6,
        paddingHorizontal: 12,
        zIndex: 1,
    }
    , emptyHeaderContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        zIndex: -1,
        
    },
    // Titre de la page Add note
    emptyHeader: {
        fontSize: 30,
        textTransform: "uppercase",
        fontWeight: "700", 
        opacity: 0.2,
    },
    addBtnContainer: {
        width: null,
        height: null,
        position: 'absolute',
        right: 15,
        bottom: 15,
        zIndex: 3,
    },
    addBtn: {
        padding: 12,
        borderRadius: 12,
    },

})




   

export default NoteListScreen;

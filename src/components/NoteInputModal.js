//Ce fichier son role est une modal qui aura deux actions:
// Edition et l'ajoute d'une note

import React, { useState, useEffect } from 'react';
import { View, TouchableWithoutFeedback, StyleSheet, Alert, TextInput, ScrollView } from "react-native";
import Modal from "react-native-modal"
import RoundIconBtn from './RoundIconBtn';
import colors from '../shared/theme/colors';
import { getHeight } from '../shared/constants/ScreenSize';


// visible: visibilité
// toggle: activer la modale
// modalResquestClose: cas de fermerture
// note: note
// onSubmit: envoie
// isEdit: savoir le modal si le modal doit être edition ou ajout

const NoteInputModal = ({ visible, toggleModal,
    modalResquestClose, onSubmit, note, isEdit }) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    // dés le chargement
    useEffect(() => {
        // si on veut modifier la note est vrai
        if (isEdit) {
            // la note est existante donc on va modifier l'etat title et description
            setTitle(note.title);
            setDescription(note.description);

        }
        // isEdit le met dans [ ] pour le repeter le plusieur fois
    }, [isEdit]);


    // cette methode de gerer les intéractions des entrée des textes 
    const handleOnchangeText = (text, valueFor) => {
        // verifier : si valueFor est pareil  que title
        if (valueFor === "title") {
            // setTitle va mettre a jour l'etat title pour donner le text dans l"etat title
            setTitle(text)

        }
        // verifier : si valueFor est pareil  que description
        if (valueFor === 'description') {
            // setDescription va mettre a jour l'etat desc pour  donner le text dans l'etat description
            setDescription(text)
        }
    }

    // Cette methode va permet de fermer la modale
    const closeModal = () => {
        Alert.alert("Quitter", "Voulez-vous quitter l'ajout de note ?",
            [
                // Bouton non
                { text: 'Non' },
                // Bouton oui
                {
                    text: 'Oui',
                    onPress: () => {
                        // si isEdit est fausse
                        if (!isEdit) {
                            // alors on va modifier l'etat du titre et decription (les vider)
                            setTitle('');
                            setDescription('');
                        }
                        // activer la nouvelle modale
                        toggleModal();
                    }

                }
            ]
        );
    }

    // Cette methode va permet d'ajoute une nouvelle note
    const handleAddNewNote = () => {
        // on verifier le titre n'est pas vide et la description n'est pas vide
        if (title !== "" && description !== "") {
            // alors isEdit est vrai 
            if (isEdit) {
                // alors il sera fournit par le parent
                onSubmit(title, description, Data.now());
            }
            // 
            else {
                onSubmit(title, description);
                // vider l'etat setTitle
                setTitle('');
                //  vider l'etat setDescription  
                setDescription('');
            }
            // pourvoir l'a masquer
            toggleModal();
        } else {
            // le cas: le titre est vide
            if (title === "") {
                // alors il aura une alert
                Alert.alert('Titre manquant', 'Vous devez donner un titre à la note',

                    [
                        { text: 'OK' }
                    ]
                )
            }
            // le cas: le titre n'est pas vide et le description n'est pas vid
            if (title !== "" && description === "") {
                //alors il aura une alert 
                Alert.alert("Description manquante",
                    "Vous devez ajouter du contenu à la note avant de l'ajouter",
                    [
                        { text: 'OK' }
                    ])

            }
        }

    }

    return (
        <Modal
            visible={visible}
            // type : slide, fade
            animationType='slide'
            // centrer
            style={{ margin: 0, }}
            // la duree d'apparition
            backgroundTransitionOutTiming={0}
            onRequestClose={modalResquestClose}
        >
            {/* Possibilité: modifier ou ajouter */}
            <View style={styles.container} >

                <TextInput
                    value={title}
                    placeholder='Titre'
                    // style input: l'apparence de input
                    // style title : de la valeur de input (title)
                    style={[styles.input, styles.title]}
                    onChangeText={(text) => handleOnchangeText(text, "title")}
                />

                <ScrollView style={styles.scrollView}>
                    <TextInput
                        value={description}
                        // ne prendre pas de valeur
                        // soit sur plusieur ligne
                        // valeur boolean
                        multiline
                        placeholder='Contenu de la note'
                        style={[styles.input, styles.description]}
                        onChangeText={(text) => handleOnchangeText(text, "description")}
                    />
                </ScrollView>


            </View>

            {/* Le check des boutons (fermer/ajoute)  */}
            <View style={styles.checkBtnContainer}>
                {/* fermer */}
                <RoundIconBtn
                    iconName='x'
                    iconType='foundation'
                    size={24}
                    color={colors.WHITE}
                    style={styles.closeModalBtn}
                    onPress={closeModal}
                />
                {/* ajouter */}
                <RoundIconBtn
                    iconName='plus'
                    iconType='foundation'
                    size={24}
                    color={colors.WHITE}
                    style={styles.checkBtn}
                    onPress={handleAddNewNote}
                />

            </View>


            {/* de créer une interation de l'utilisateur sans effectuer de retour */}
            <TouchableWithoutFeedback
                style={[styles.modalBackgroundContainer,
                // absoluteFillObject permet de creer un superposition en position absolue et position 0
                    StyleSheet.absoluteFillObject]}
            >
                <View style={[styles.modalBackground, StyleSheet.absoluteFillObject] }>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        gap: 0,
        paddingVertical: 12,
        zIndex: 1,
        backgroundColor: colors.WHITE
    },
    scrollView: {
        marginBottom:84,
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: colors.PRIMARY,
        fontSize: 24,
        color: colors.DARK,
    },
    title: {
        width: '100%',
        height: (getHeight() / 10),
        fontWeight: '700',
        textAlign: 'left',
        paddingHorizontal: 12,
    },
    description: {
        // la (hauteur de l'ecran - (hauteur de l'ecran / 10)  - 300 )
        minHeight: (getHeight() - (getHeight() / 10) - 300),
        textAlign: 'left',
        borderBottomWidth: 0,
        padding: 12,
    },
    checkBtnContainer: {
        width: '100%',
        maxHeight: 84,
        overflow: 'hidden',
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 12,
        position: 'absolute',
        bottom: 15,
        right: 0,
        zIndex: 2,
    },
    
 
  
    closeModalBtn: {
        padding: 12,
        backgroundColor: colors.ERROR 

    },
    checkBtn: {
        padding: 12,
    },



})

export default NoteInputModal;

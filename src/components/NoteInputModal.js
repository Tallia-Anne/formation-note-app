import React, { useState, useEffect } from "react";
import { View, TouchableWithoutFeedback, StyleSheet, Alert, TextInput, ScrollView } from "react-native";
import Modal from "react-native-modal";
import RoundIconBtn from "./RoundIconBtn";
import colors from "../shared/theme/colors";
import { getHeight } from "../shared/constants/ScreenSize";

const NoteInputModal = ({ visible, toggleModal, modalRequestClose, onSubmit, note, isEdit }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        if (isEdit) {
            setTitle(note.title);
            setDescription(note.description);
        }
    }, [isEdit]);

    const handleOnChangeText = (text, valueFor) => {
        if (valueFor === "title") {
            setTitle(text);
        }
        if (valueFor === "description") {
            setDescription(text);
        }
    }

    const closeModal = () => {
        Alert.alert("Quitter", "Voulez-vous quitter l'ajout de notes ?", [
            { text: "Non" },
            {
                text: "Oui",
                onPress: () => {
                    if (!isEdit) {
                        setTitle("");
                        setDescription("");
                    }
                    toggleModal();
                }
            }
        ]);
    }

    const handleAddNewNote = () => {
        if (title !== "" && description !== "") {
            if (isEdit) {
                onSubmit(title, description, Date.now());
            }
            else {
                onSubmit(title, description);
                setTitle("");
                setDescription("");
            }
            toggleModal();
        } else {
            if (title === "") {
                Alert.alert("Titre manquant", "Vous devez indiquer un titre à la note", [
                    { text: "Ok" },
                ]);
            }
            if (title !== "" && description === "") {
                Alert.alert("Description manquante", "Vous devez ajouter du contenu à la note avant de l'ajouter", [
                    { text: "Ok" },
                ]);
            }
        }
    }

    return (
        <Modal
            visible={visible}
            animationType="slide"
            style={{ margin: 0, }}
            backgroundTransitionOutTiming={0}
            onRequestClose={modalRequestClose}
        >

            <View style={styles.container}>
                
                <ScrollView style={styles.scrollView}>
                    <TextInput
                        value={title}
                        placeholder="Titre"
                        style={[styles.input, styles.title]}
                        onChangeText={(text) => handleOnChangeText(text, "title")}
                    />
                    
                    <TextInput
                        value={description}
                        multiline
                        placeholder="Contenu de la note"
                        style={[styles.input, styles.description]}
                        onChangeText={(text) => handleOnChangeText(text, "description")}
                    />
                </ScrollView>
            </View>

            <View style={styles.checkBtnContainer}>
                <RoundIconBtn
                    iconName="x"
                    iconType="foundation"
                    size={24}
                    color={colors.WHITE}
                    style={styles.closeModalBtn}
                    onPress={closeModal}
                />
                <RoundIconBtn
                    iconName="plus"
                    iconType="foundation"
                    size={24}
                    color={colors.WHITE}
                    style={styles.checkBtn}
                    onPress={handleAddNewNote}
                />
            </View>

            <TouchableWithoutFeedback
                style={[styles.modalBackgroundContainer,
                StyleSheet.absoluteFillObject]}
            >
                <View style={[styles.modalBackground, StyleSheet.absoluteFillObject]}>
                </View>
            </TouchableWithoutFeedback>

        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 0,
        paddingVertical: 12,
        zIndex: 1,
        backgroundColor: colors.WHITE,
    },
    scrollView: {
        marginBottom: 84,
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: colors.PRIMARY,
        fontSize: 24,
        color: colors.DARK,
    },
    title: {
        width: "100%",
        fontWeight: "700",
        textAlign: "left",
        paddingHorizontal: 112,
    },
    description: {
        minHeight: (getHeight() - (getHeight() / 10) - 300),
        textAlign: "left",
        borderBottomWidth: 0,
        padding: 12,
    },
    checkBtnContainer: {
        width: "100%",
        maxHeight: 84,
        overflow: "hidden",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 12,
        position: "absolute",
        bottom: 15,
        right: 0,
        zIndex: 2,
    },
    checkBtn: {
        padding: 12,
    },
    closeModalBtn: {
        padding: 12,
        backgroundColor: colors.ERROR,
    },
    modalBackgroundContainer: {

    },
})

export default NoteInputModal;
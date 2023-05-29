import React, { useState, useEffect, useCallback } from 'react';
import { RefreshControl, View, StyleSheet, Text, Alert, FlatList } from 'react-native';
import colors from '../shared/theme/colors';
import { RoundIconBtn, NoteInputModal, NotFound, Note, SearchBar } from '../components';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNotes } from "../shared/context/NoteProvider";
import { reverseIntDatas } from "../shared/functions/SortFunctions";

const NoteListScreen = ({ userName, navigation }) => {

    const [name, setName] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const { notes, setNotes, findNotes } = useNotes();
    const [resultNotFound, setResultNotFound] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            findNotes();
            setRefreshing(false);
        }, 325);
    }, []);

    useEffect(() => {
        if (userName !== "" && name !== "" && userName !== name) {
            setName(userName);
        }
        findNotes();
    }, []);

    const reverseNotes = reverseIntDatas(notes);

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    }

    const handleOnSubmit = async (title, description) => {
        let author = (userName !== undefined && userName !== null) ? userName : null;

        const actualTime = Date.now();

        const note = {
            id: actualTime,
            title: title,
            description: description,
            author: author,
            created_at: actualTime,
        };
        const updatedNotes = [...notes, note];
        setNotes(updatedNotes);

        await AsyncStorage.setItem("@notes", JSON.stringify(updatedNotes));
    }

    const handleOnSearchInput = async (text) => {
        setSearchQuery(text);
        if (!text.trim()) {
            setSearchQuery("");
            setResultNotFound(false);
            return await findNotes();
        }

        const filteredNotes = notes.filter(
            note => {
                if (note.title.toLowerCase().includes(text.toLowerCase())) {
                    return note;
                }
            });

        if (filteredNotes.length > 0) {
            setNotes([...filteredNotes]);
        } else {
            setResultNotFound(true);
        }
    }

    const handleOnClearSearchInput = async () => {
        setSearchQuery("");
        setResultNotFound(false);
        return await findNotes();
    }



    return (
        <View style={styles.container}>

            {notes.length ?
                <SearchBar
                    value={searchQuery}
                    onChangeText={handleOnSearchInput}
                    onClear={handleOnClearSearchInput}
                    containerStyle={{
                        marginVertical: 15,
                    }}
                />
                : null}

            {resultNotFound ?
                (<NotFound navigation={navigation} />)
                : (<FlatList
                    data={reverseNotes}
                    numColumns={2}
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    columnWrapperStyle={{
                        justifyContent: "space-between",
                        marginBottom: 15,
                    }}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => <Note
                        item={item}
                        onPress={() => navigation.navigate("NoteScreen", {
                            note: item,
                            noteId: item.id,
                            noteTitle: item.title,
                            noteDescription: item.description,
                            noteAuthor: item.author,
                        })}
                    />}
                />)
            }

            {!notes.length ?
                <View
                    style={[StyleSheet.absoluteFillObject, styles.emptyHeaderContainer]}
                >
                    <Text style={styles.emptyHeader}>
                        Add notes
                    </Text>
                </View>
                : null}
            <View style={styles.addBtnContainer}>
                <RoundIconBtn
                    iconName="clipboard-pencil"
                    iconType="foundation"
                    style={styles.addBtn}
                    color={colors.WHITE}
                    onPress={toggleModal}
                />
            </View>
            <NoteInputModal
                isEdit={false}
                visible={modalVisible}
                toggleModal={toggleModal}
                modalRequestClose={() => {
                    Alert.alert("Quitter", "Souhaitez-vous quitter l'ajout de notes ?", [
                        { text: "Non" },
                        {
                            text: "Oui",
                            onPress: () => toggleModal()
                        }
                    ]);
                }}
                onSubmit={handleOnSubmit}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.ULTRALIGHT,
        justifyContent: "flex-start",
        paddingVertical: 6,
        paddingHorizontal: 12,
        zIndex: 1,
    },
    emptyHeaderContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        zIndex: -1,
    },
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
import React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import colors from '../shared/theme/colors';

const NoteDetails = ({ note }) => {

    const getCreationDate = new Date(note.id);

    const createdAt = `Ajoutée le : ${getCreationDate.getDay() < 10

        ? "0" + getCreationDate.getDay()

        : getCreationDate.getDay()

        }/${getCreationDate.getMonth() < 10 ?
        "0" + getCreationDate.getMonth()
            : getCreationDate.getMonth()
        }/${getCreationDate.getFullYear()}`;

    const getUpdatedDate = new Date(note?.time || note.id);

    const updatedAt = `Modifiéele:${getUpdatedDate.getDay() < 10

        ? "0" + getUpdatedDate.getDay()
        : getUpdatedDate.getDay()
        }/${getUpdatedDate.getMonth() < 10
            ? "0" + getUpdatedDate.getMonth()
            : getUpdatedDate.getMonth()
        }/${getUpdatedDate.getFullYear()}`;

    return (
        <View style={styles.container}>
            
            <View style={styles.infosContainer}>
                
                <Text style={styles.author} >
                    {note.author}
                </Text>
                
                <Text style={styles.createdAt} >
                    {note.isUpdated ? updatedAt : createdAt}
                </Text>
                
                
            </View>
            
            <View style={styles.titleContainer} >
                
                <Text style={styles.title} >
                    {note.title}
                </Text>
            </View>

            <ScrollView style={styles.descriptionContainer} >
                <Text>
                    {note.description}
                </Text>
            </ScrollView>
            
            

        </View>
    );
}

const styles = StyleSheet.create({
    container: {

        width: "100%",

        flex: 1,

        justifyContent: "flex-start",

        backgroundColor: colors.WHITE,

        zIndex: -1,

    },

    infosContainer: {

        flexDirection: "row",

        justifyContent: "space-between",

        flexWrap: "wrap",

        paddingHorizontal: 6,

        paddingVertical: 12,

        backgroundColor: colors.WHITE,

    },

    author: { fontSize: 12, fontWeight: "500" },

    createdAt: { fontSize: 12, fontWeight: "500" },

    titleContainer: {

        width: "100%",

        flexDirection: "row",

        flexWrap: "wrap",

        paddingHorizontal: 12,

        paddingVertical: 6,

    },

    title: { fontSize: 36, color: colors.DARK },

    descriptionContainer: {

        width: "100%",

        paddingHorizontal: 12,

        paddingVertical: 6,

        marginBottom: 84,

    },

    description: { fontSize: 21, color: colors.BLACK },


})

export default NoteDetails;

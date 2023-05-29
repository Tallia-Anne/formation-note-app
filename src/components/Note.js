//Ce fichier sera comme une card note
//, c'est-à-dire les tous les petites notes

import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../shared/theme/colors';
import { getWidth } from '../shared/constants/ScreenSize';


const Note = ({ item, onPress }) => {
    // Déstructuration pour stocker les données de la propriété item 
    const { title, description, author } = item;
    
    return (
        <TouchableOpacity
            style={styles.container}
            // herité de son parent
            onPress={onPress}
        >
            <Text
                // de spécifier le nombre de ligne
                numberOfLines={2}
                style={styles.title}
            >{title}</Text>
            
            <Text
                numberOfLines={2}
                style={styles.description}
            >
                {description}
            </Text>
            
            {/* on verifie si l'auteur existe bien */}
            {author !== null ? 
                // alors on va afficher l'auteur
                <Text
                    numberOfLines={2}
                    style={styles.author}
                >
                    DE : {author}
                </Text>
                // si l'auteur n'existe pas alors ça null
                : null
            }
            
            
            
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    // Regle de 3
    container: {
        width: (getWidth() / 2) - 50,
        alignSelf: "center",
        paddingVertical: 6, 
        paddingHorizontal: 12,
        backgroundColor: colors.SECONDARY,
        margin: 12,
        borderRadius: 6,
    },
    title:
    {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 12,
        color: colors.BLACK,
    },
    description: {
        minHeight: 48,
        fontSize: 18,
        color: colors.BLACK,
    }, author: {
        minHeight: 20,
        fontSize: 12,
        color: colors.BLACK,
        opacity: 0.5,
    }

    
    

})

export default Note;

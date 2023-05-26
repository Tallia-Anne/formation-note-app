// Ce fichier permet de quand on va chercher une note 
// alors il va afficher NotFound qu'il ne trouve pas la note

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RoundIconBtn from './RoundIconBtn';
import colors from '../shared/theme/colors';

const NotFound = () => {
    return (
        
        <View
            style={[StyleSheet.absoluteFillObject, styles.container]} >
            <View style={styles.iconContainer}>
            <RoundIconBtn
                
                iconName='x'
                iconType='foundation'
                size={58}
                color={colors.BLACK}
                style={styles.icon}
                
            />
            </View>
            <Text style={{ marginTop: 20, fontSize: 24, alignSelf: "center", }} >
                Aucun résultat
            </Text>
            
        </View>
    );
}

const styles = StyleSheet.create({
    
    
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center", 
        opacity: 0.5,
        zIndex: -1,
        paddingTop: 84,
    }, 
    iconContainer: {
        borderRadius: 256,
        alignSelf: "center",
    },
    icon: {
        padding: 6,
        backgroundColor:"transparent",
        shadowColor: "transparent",
        alignSelf: "center",
    }
    
})

export default NotFound;

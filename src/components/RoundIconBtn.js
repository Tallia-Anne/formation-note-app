// Ce composant permet d'afficher une icone
//On va définir le type icon, la taille, la couleur , le style
//Icon sera comme un bouton (OnPress)
import React from 'react';
import { StyleSheet } from 'react-native';
import { Icon } from '@rneui/base';
import colors from '../shared/theme/colors'

const RoundIconBtn = ({iconName, iconType, size, color, style, onPress}) => {
    return (
        <Icon
            // le type de librairie
            type={iconType || 'antdesign'}
            // 
            name={iconName}
            // taille
            size={size || 24}
            // la couleur qui se trouve dans le theme
            color={color || colors.LIGHT}
            style={[styles.icon, { ...style }]}
            onPress={onPress}
        />
            
      
    );
}

const styles = StyleSheet.create({
    
    icon: {
        backgroundColor: colors.PRIMARY,
        padding: 24,
        borderRadius: 50,
        alignSelf: "center",
        // qui joue sur l'ombre porté
        elevation: 2,
        shadowRadius: 50,
        shadowColor: colors.DARK,
        margin: 12,
        // il aura la même largeur et la même hauteur
        // Definition: aspectRadio :  utilisé dans le calcul des tailles automatiques et certaines autres fonctions de mise en page
        aspectRatio: 1 / 1,
        zIndex: 3,
    }
    
})

export default RoundIconBtn;

// Ce composant permet de reserver un espace minimal sur l'ecran: 

import React from 'react';
import {View, StyleSheet} from 'react-native';

const ReplacementView = ({ width, height, padding }) => {
    return (
        <View style={[styles.ReplacementView, {
            width: width,
            height: height,
            padding: padding || 48,
        }]}>
            
        </View>
    );
}

const styles = StyleSheet.create({
    ReplacementView: {
        backgroundColor: "transparent",
        alignSelf:"center",
    }
})

export default ReplacementView;

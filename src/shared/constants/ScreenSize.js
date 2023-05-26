// Ce fichier va permet de connaitre la taille de l'écran utiliser

import { Dimensions } from "react-native-web";

export function getWidth() {
    // recuperer la largeur de l'écran
    const windowWidth = Dimensions.get('window').width;
    // afficher la largeur de l'écran
    return windowWidth;
}

export function getHeight() {
    // recuperer la hauteur de l'écran
    const windowHeight = Dimensions.get('window').height;
    // afficher la hauteur de l'écran
    return windowHeight;
}

// C'est bien de le mettre dans un cache
import AsyncStorage from '@react-native-async-storage/async-storage';

// initialisation de la valeur de la clé profile
export async function initProfileName(name = null) {
    try {
        const jsonValue = await AsyncStorage.getItem("@profile");
        // Verification: la clé profile est null
        if (jsonValue === null) {
            // @profile permet de reperer le plus visiblement grace à @
            await AsyncStorage.setItem("@profile",
                // inscrement de la valeur de la clé profile
                JSON.stringify(name !== null ? name :
                    "Connected user"));
        }
        // Attraper l'erreur
    } catch (err) {
        console.log(err);
    }
}

// Récupération de la valeur de la clé profile
export async function getProfileName() {
    try {
        const value = await AsyncStorage.getItem("@profile");
        // Verification: la clé profile est non null
        if (value !== null) {
            // acceder à son parametre
            return JSON.parse(value);
        } else {
            return "Invité";
        }
    } catch (err) {
        console.log("getProfileName : " + err);
    }
}


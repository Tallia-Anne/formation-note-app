import AsyncStorage from '@react-native-async-storage/async-storage';

// initialisation de la valeur de la clé profile
export async function initProfileName(name = null) {
    try {
        const jsonValue = await AsyncStorage.getItem("@profile");
        // Verification: la clé profile est null
        if (jsonValue === null) {
            // @profile permet de repérer le plus visiblement grâce à @
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

// cette fonction permet d'initialiser la valeur de la clé username
export async function initUsername(name = null) {
    try {
        const jsonValue = await AsyncStorage.getItem('@username');
        // Verification: la clé username est null
        if (jsonValue === null) {
            await AsyncStorage.setItem('@username', JSON.stringify(name !== null ? name :
                "NewUser"))
        }        
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


// Cette fonction getUsername recuperer un utilisateur
export async function getUsername() {    
    try {
        const value = await AsyncStorage.getItem('@username');
        // la valeur est non null
        if (value !== null) {
            // retourner la valeur qui va le lire
            return JSON.parse(value);
            // si c'est pas le cas alors on retourne null
        } else {
            return null;
        }
        
    } catch (err) {
        console.log('getUsername :'+ err);
    }
    
}



// Cette fonction setUsername va permet de modifier la valeur de la clé username
export async function setUsername(username = null) {
    
    try {
        // Verification: la clé username est non null
        if (username !== null) {
            // Avant de passer la valeur. On va la convertir en stringify  
            await AsyncStorage.setItem('@username', JSON.stringify(username));
        }
        
    } catch (err) {
       
        console.log('Setusername :' + err);
       
    }
    
}

// Cette fonction mergeUsername va permet de faire la fusion de la valeur de la clé username et la nouvelle valeur
export async function mergeUsername(newValue = null) {

    try {
        // Verification:  la nouvelle valeur n'est pas null
        if (newValue !== null) {
            const jsonValue = await AsyncStorage.getItem('@username');
            // Mais s'il est null alors on va initialiser la clé username grâce 
            // la fonction initUsername()
            if (jsonValue  === null) {
                initUsername();
            }
            // on va attendre la merge qui va ciblé la clé @username
            // c'est a dire qui va permet de fusionner des données sur la même clé @username
            await AsyncStorage.mergeItem('@username', JSON.stringify(jsonValue));
        }
        
    } catch (err) {
        console.log("mergeUsername :"+err)
    }
} 


// Cette fonction va permet de faire verfication si la clé username existe
export async function logUsername() {
    try {
        // on va recuperer le retour du localstorage @username
        const jsonValue = await AsyncStorage.getItem('@username');
        // si elle est n'est pas nulle alors on va afficher la console.log la valeur de jsonValue
        if (jsonValue!== null) {
            console.log(`Username :' ${jsonValue}`)
            // 2eme cas: S'il est null alors afficher le message que l'utilissateur est null
        } else {
            console.log('Username is null');
        }
    } catch (err) {
        console.log("logUsername : " + err);
    }
} 

// Suppression de la valeur de la clé username
export async function deleteUsername() {
    try {
    await AsyncStorage.removeItem('@username');
       
    } catch (err) {
        console.log(err);
    }
}



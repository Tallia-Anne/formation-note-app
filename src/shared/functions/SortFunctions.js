// Permet de faire le filtre qui montre la note dernière créer par la date

export function reverseIntDatas(data) {
    return data.sort((a, b) => {
        // stoker les variables: aInt et bInt
        // Deplus, a et b aura déjà un id mais a la mise a jour il aura une date
        const aInt = parseInt(a.time || a.id);
        const bInt = parseInt(b.time || b.id);
        // les conditions
        if (aInt < bInt) return 1;
        if (aInt === bInt) return 0;
        if (aInt > bInt) return -1;
        
    })
}
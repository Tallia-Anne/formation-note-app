import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { getWidth, getHeight } from '../shared/constants/ScreenSize';
import colors from '../shared/theme/colors';
import RoundIconBtn from './RoundIconBtn';


const SearchBar = ({ containerStyle, value, onChangeText, onClear }) => {
    return (
        <View style={[styles.container, { ...containerStyle }]}>

            <TextInput
                value={value}
                onChangeText={onChangeText}
                style={styles.searchBar}
                placeholder='Entrer votre recherche'
            />

            <View style={styles.iconContainer} >

                {
                    // herité par son parent
                    value ?
                        <RoundIconBtn
                            iconName="x"
                            iconType='foundation'
                            size={18}
                            color={colors.WHITE}
                            style={styles.icon}
                            onPress={onClear}
                        />
                        : null
                }

            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: (getHeight() / 8),
        minHeight: 50,
        maxHeight: 50,
        padding: 5,
        marginBottom: 24,
    },
    searchBar: {
        width: (getWidth() - 40),
        borderWidth: 0.5,
        borderColor: colors.PRIMARY,
        height: 40, borderRadius: 40,
        paddingHorizontal: 12,
        fontSize: 20,
        color: colors.PRIMARY,
    }, iconContainer: {
        position: "absolute",
        right: 6,
        zIndex: 2,
    }, icon: {
        padding: 6,
    }
})

export default SearchBar;

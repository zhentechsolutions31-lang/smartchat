import { KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import Typo from '@/components/Typo'
import { colors, radius, spacingX, spacingY } from '@/constants/theme'
import BackButton from '@/components/BackButton'

const register = () => {
  return (
    <KeyboardAvoidingView
    style={{flex:1}}
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
    <ScreenWrapper showPattern={true} >


        <View style={styles.container}>

            <View style={styles.header}>
               <BackButton></BackButton>
            </View>

        </View>
      <Typo color={colors.white}>register</Typo>
    </ScreenWrapper>

    </KeyboardAvoidingView>
  )
}

export default register

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: "space-between"
    },

    header: { 
    paddingHorizontal: spacingX._20,
    paddingBottom : spacingY._25,
    paddingTop: spacingY._15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"

    
    },
    content:{
        flex:1,
        backgroundColor: colors.white,
        borderTopLeftRadius: radius._50,
        borderTopRightRadius: radius._50,
        borderCurve: 'continuous',
        paddingHorizontal: spacingX._20,
        paddingTop: spacingY._20   
    },
    form: {
        gap: spacingY._15,
        marginTop: spacingY._20
    },
    footer:{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 5
    }

})
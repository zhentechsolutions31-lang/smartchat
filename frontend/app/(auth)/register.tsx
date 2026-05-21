import BackButton from '@/components/BackButton'
import Button from '@/components/Button'
import Input from '@/components/Input'
import ScreenWrapper from '@/components/ScreenWrapper'
import Typo from '@/components/Typo'
import { colors, radius, spacingX, spacingY } from '@/constants/theme'
import { verticalScale } from '@/utils/styling'
import { useRouter } from 'expo-router'
import * as Icons from "phosphor-react-native"
import React, { useActionState, useRef, useState } from 'react'
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import  {useAuth}   from '@/context/authContext'
const Register = () => {
    const nameRef = useRef("");
    const emailRef = useRef("");
    const passwordRef = useRef("");
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter();


    const {signUp} = useAuth()


    const handleSubmit = async () => {
        if (!emailRef.current || !passwordRef.current || !nameRef.current) {
            Alert.alert("Sign Up", "Please fill all the fields")
            return;
        }
      try {
        setIsLoading(true)
        await signUp(emailRef.current, passwordRef.current, nameRef.current,"")
        Alert.alert("Sign Up", "Account created successfully")
        router.push("/(auth)/login")
      } catch (error) {
        Alert.alert("Sign Up", "Failed to create account")
      }finally {
            setIsLoading(false)
        }
        
      

    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScreenWrapper showPattern={true} >


                <View style={styles.container}>

                    <View style={styles.header}>
                        <BackButton iconSize={28} />
                        <Typo size={17} color={colors.white}>Need some help ?</Typo>
                    </View>


                    <View style={styles.content}>
                        <ScrollView
                            contentContainerStyle={styles.form}
                            showsVerticalScrollIndicator={false}
                        >
                            <View style={{ gap: spacingY._10, marginBottom: spacingY._15 }}>
                                <Typo size={28} fontWeight={"600"}>Getting Started</Typo>
                                <Typo fontWeight={"600"}>Create an account to continue</Typo>

                            </View>
                            <Input
                                placeholder='Enter Your Name'
                                onChangeText={(value: string) => nameRef.current = value}
                                icon={<Icons.User color={colors.neutral600} size={verticalScale(26)} />}

                            />
                            <Input
                                placeholder='Enter Your Email'
                                onChangeText={(value: string) => emailRef.current = value}
                                icon={<Icons.At color={colors.neutral600} size={verticalScale(26)} />}

                            />
                            <Input
                                placeholder='Enter Your Password'
                                secureTextEntry
                                onChangeText={(value: string) => passwordRef.current = value}
                                icon={<Icons.Lock color={colors.neutral600} size={verticalScale(26)} />}

                            />

                            <View style={{ marginTop: spacingY._25, gap: spacingY._15 }}>
                                <Button loading={isLoading} onPress={handleSubmit}>
                                    <Typo color={colors.white} fontWeight={"700"}>Sign Up</Typo>
                                </Button>

                                <View style={styles.footer}>
                                    <Typo>Already have an account?</Typo>
                                    <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
                                        <Typo fontWeight={"600"} color={colors.primaryDark}>Login</Typo>
                                    </TouchableOpacity>
                                </View>
                            </View>

                        </ScrollView>
                    </View>

                </View>

            </ScreenWrapper>

        </KeyboardAvoidingView>
    )
}

export default Register

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: "space-between"
    },

    header: {
        paddingHorizontal: spacingX._20,
        paddingBottom: spacingY._25,
        paddingTop: spacingY._15,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"


    },
    content: {
        flex: 1,
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
    footer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 5
    }

})
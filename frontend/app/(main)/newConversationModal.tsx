import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { verticalScale } from '@/utils/styling'
import { colors } from '@/constants/theme'
import { AvatarProps } from '@/types'
import { useLocalSearchParams } from 'expo-router'
import ScreenWrapper from '@/components/ScreenWrapper'
import Typo from '@/components/Typo'
const newConversationModal = () => {
    const { isGroup } = useLocalSearchParams();


    console.log(isGroup, "chck")

    return (
        <ScreenWrapper>
            <TouchableOpacity>
                <View>
                    <Typo>this is ansknkjnkn</Typo>
                </View>
            </TouchableOpacity>
        </ScreenWrapper>
    )
}

export default newConversationModal

const styles = StyleSheet.create({




    conversationContainer: {

        paddingHorizontal: verticalScale(16),
        paddingVertical: verticalScale(16),
        flexDirection: "row",
        gap: verticalScale(16),
        alignItems: "center",
        borderBottomColor: colors.neutral800,
        borderBottomWidth: 1,

    },
    row: {
        flexDirection: "row",
        gap: verticalScale(16),
        alignItems: "center",

    },
    divider: {
        height: 1,
        width: "95%",
        alignSelf: "center",
        backgroundColor: colors.neutral800
    },
    iconStyle: {
        borderWidth: 1,
    }
})
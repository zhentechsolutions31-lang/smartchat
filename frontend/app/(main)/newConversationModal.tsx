import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { verticalScale } from '@/utils/styling'
import { colors } from '@/constants/theme'
import { AvatarProps } from '@/types'
const newConversationModal = () => {
    return (
        <View>
            <TouchableOpacity>
                <View>
                    <Text>this is ansknkjnkn</Text>
                </View>
            </TouchableOpacity>
        </View>
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
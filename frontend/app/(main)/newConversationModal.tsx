import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { verticalScale } from '@/utils/styling'
import { colors, radius, spacingX, spacingY } from '@/constants/theme'
import { AvatarProps } from '@/types'
import { useLocalSearchParams, useRouter } from 'expo-router'
import ScreenWrapper from '@/components/ScreenWrapper'
import Typo from '@/components/Typo'
import BackButton from '@/components/BackButton'
import Header from '@/components/Header'
import Avatar from '@/components/Avatar'
const newConversationModal = () => {
    const { isGroup } = useLocalSearchParams();
    const isGroupMode = isGroup == "1";
    const router = useRouter()





    return (
        <ScreenWrapper isModal={true}>
            <View style={styles.container}>
                <Header
                    title={isGroupMode ? "New Group" : "Select User"}
                    leftIcon={<BackButton color={colors.black} />}
                />
                {
                    isGroupMode && (
                        <View style={styles.groupInfoContainer}>
                            <View style={styles.avatarContainer}>
                                <TouchableOpacity onPress={() => console.log("DSDsd")}>
                                    <Avatar uri={null} size={100} isGroup={true} />
                                </TouchableOpacity>

                            </View>
                        </View>
                    )
                }




            </View>
        </ScreenWrapper>
    )
}

export default newConversationModal

const styles = StyleSheet.create({


    container: {
        marginHorizontal: spacingX._15,
        flex: 1
    },
    groupInfoContainer: {
        alignItems: "center",
        marginTop: spacingY._10
    },

    createGroupButton: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        padding: spacingX._15,
        backgroundColor: colors.white,
        borderTopWidth: 1,
        borderTopColor: colors.neutral200
    },
    checked: {
        backgroundColor: colors.primary
    },
    checkBox: {
        width: 20,
        height: 20,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: colors.primary
    },
    selectionIndicator: {
        marginLeft: 0,
        marginRight: spacingX._10
    },
    contactList: {
        gap: spacingY._12,
        marginTop: spacingY._10,
        paddingTop: spacingY._10,
        paddingBottom: spacingY._20
    },
    selectedContact: {
        backgroundColor: colors.neutral100,
        borderRadius: radius._15
    },
    contactRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacingX._10,
        paddingVertical: spacingX._5
    },
    groupNameContainer: {
        width: "100%"
    },
    avatarContainer: {
        marginBottom: spacingY._10
    }





})
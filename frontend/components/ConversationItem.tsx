import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors, spacingX, spacingY } from '@/constants/theme'
import Avatar from './Avatar'
import Typo from './Typo'
import { AvatarProps, Message } from "@/types";

const ConversationItem = ({ item, lastMessage }: { item: AvatarProps, lastMessage: Message }) => {





    return (
        <View>
            <TouchableOpacity>
                <View>
                    <Avatar uri={null} size={47} isGroup={item.type === "group"} />
                </View>

                <View style={{ flex: 1 }}>
                    <View style={styles.row}>
                        <Typo size={17} fontWeight={"600"}>
                            {item?.name || "Unknown"}
                        </Typo>

                        {item?.lastmessage && (
                            <Typo size={14}>
                                {item?.lastmessage.createdAt}
                            </Typo>
                        )}


                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default ConversationItem

const styles = StyleSheet.create({


    ConversationItem: {
        gap: spacingX._10,
        marginVertical: spacingY._12,
        flexDirection: "row",
        alignItems: "center",
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacingX._10,

    },
    divider: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: colors.neutral700,
        marginVertical: spacingY._12
    }
})
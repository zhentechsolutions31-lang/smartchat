import { colors, radius, spacingX } from "../constants/theme";
import { getAvatarPath } from "../services/imageServices";
import { AvatarProps } from "@/types";
import { verticalScale } from "@/utils/styling";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, View } from "react-native";

const Avatar = ({
    uri,
    size = 40,
    style,
    isGroup = false,
}: AvatarProps) => {
    return (
        <View
            style={[
                styles.avatar,
                {
                    height: verticalScale(size),
                    width: verticalScale(size),
                },
                style,
            ]}
        >
            <Image
                style={{ flex: 1 }}
                source={getAvatarPath(uri, isGroup)}
                contentFit="cover"
                transition={100}
            />
        </View>
    );
};

export default Avatar;

const styles = StyleSheet.create({
    avatar: {
        overflow: "hidden",
        backgroundColor: colors.neutral800,


        // perfect circle
        borderRadius: 999,

        // optional beautiful border
        borderWidth: 2,
        borderColor: colors.primary,

        // shadow
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
});
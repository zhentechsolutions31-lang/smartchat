import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, ViewStyle } from "react-native";

type HeaderProps = {
    title: string;
    leftIcon?: React.ReactNode;
    onLeftPress?: () => void;
    style?: ViewStyle;
};

const Header: React.FC<HeaderProps> = ({
    title,
    leftIcon,
    onLeftPress,
    style,
}) => {
    return (
        <View style={[styles.container, style]}>
            {/* Left Icon */}
            <TouchableOpacity onPress={onLeftPress} style={styles.left}>
                {leftIcon}
            </TouchableOpacity>

            {/* Title */}
            <Text style={styles.title} numberOfLines={1}>
                {title}
            </Text>

            {/* Right spacer */}
            <View style={styles.right} />
        </View>
    );
};

export default Header;

const styles = StyleSheet.create({
    container: {
        height: 55,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 12,
        backgroundColor: "#fff",
    },
    left: {
        width: 40,
        justifyContent: "center",
        alignItems: "flex-start",
    },
    title: {
        flex: 1,
        textAlign: "center",
        fontSize: 18,
        fontWeight: "600",
        color: "#000",
    },
    right: {
        width: 40,
    },
});
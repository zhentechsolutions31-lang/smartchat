import { colors } from "@/constants/theme";

export const getAvatarPath = (file: any, isGroup = false) => {
    if (file && typeof file === "string") return { uri: file };
    if (file && typeof file === "object" && file.uri) return { uri: file.uri };
    if (file && typeof file === "object" && file.url) return { uri: file.url };
    if (isGroup) return require("../assets/images/defaultGroupAvatar.png");

    return require("../assets/images/defaultAvatar.png");
};
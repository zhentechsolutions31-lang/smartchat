import { StyleSheet, View, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router'
import { useAuth } from '@/context/authContext'
import ScreenWrapper from '@/components/ScreenWrapper'
import Typo from '@/components/Typo'
import Input from '@/components/Input'
import Button from '@/components/Button'
import { colors, radius, spacingX, spacingY } from '@/constants/theme'
import { verticalScale, scale } from '@/utils/styling'
import * as Icons from 'phosphor-react-native'
import * as ImagePicker from 'expo-image-picker'
import { getAvatarPath } from '@/services/imageServices'
import { updateUserProfile } from '@/socket/socketEvents'

const ProfileModal = () => {
    const { user: currentUser, token, updateToken, signOut } = useAuth()
    const router = useRouter()

    const [name, setName] = useState(currentUser?.name || '')
    const [selectedImage, setSelectedImage] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (status !== 'granted') {
            Alert.alert('Permission Denied', 'We need access to your photos to update your avatar.')
            return
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.5,
            base64: true,
        })

        if (!result.canceled && result.assets && result.assets.length > 0) {
            const asset = result.assets[0]
            if (asset.base64) {
                setSelectedImage(`data:image/jpeg;base64,${asset.base64}`)
            } else {
                setSelectedImage(asset.uri)
            }
        }
    }

    const handleUpdate = async () => {
        if (!name.trim()) {
            Alert.alert('Update Profile', 'Name cannot be empty')
            return
        }

        setLoading(true)
        try {
            const response = await updateUserProfile(name.trim(), selectedImage, token || '')
            if (response.success) {
                await updateToken(response.token)
                Alert.alert('Success', 'Profile updated successfully!')
                router.back()
            } else {
                Alert.alert('Error', response.msg || 'Failed to update profile')
            }
        } catch (error: any) {
            Alert.alert('Error', error.message || 'Failed to update profile')
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = () => {
        Alert.alert(
            "Sign Out",
            "Are you sure you want to sign out?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Sign Out",
                    onPress: async () => {
                        await signOut()
                    },
                    style: "destructive"
                }
            ]
        )
    }

    const avatarSource = selectedImage ? { uri: selectedImage } : getAvatarPath(currentUser?.avatar)

    return (
        <ScreenWrapper isModal={true}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => router.back()}
                    >
                        <Icons.CaretLeft size={verticalScale(22)} color={colors.neutral900} weight="bold" />
                    </TouchableOpacity>
                    <Typo color={colors.neutral900} size={20} fontWeight="800" style={styles.headerTitle}>
                        Update Profile
                    </Typo>
                    <View style={{ width: verticalScale(40) }} />
                </View>

                <View style={styles.profileSection}>
                    <View style={styles.avatarContainer}>
                        <Image
                            source={avatarSource}
                            style={styles.avatar}
                        />
                        <TouchableOpacity
                            style={styles.editAvatarBtn}
                            activeOpacity={0.8}
                            onPress={pickImage}
                        >
                            <Icons.PencilSimple size={verticalScale(18)} color={colors.neutral800} weight="bold" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.formContainer}>
                    <View style={styles.inputGroup}>
                        <Typo color={colors.neutral800} size={15} fontWeight="600" style={styles.fieldLabel}>
                            Email
                        </Typo>
                        <Input
                            value={currentUser?.email || ''}
                            editable={false}
                            containerStyle={styles.disabledInput}
                            inputStyle={styles.disabledInputText}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Typo color={colors.neutral800} size={15} fontWeight="600" style={styles.fieldLabel}>
                            Name
                        </Typo>
                        <Input
                            value={name}
                            onChangeText={setName}
                            placeholder="Enter your name"
                            containerStyle={styles.editableInput}
                            inputStyle={styles.editableInputText}
                        />
                    </View>
                </View>

                <View style={styles.footer}>
                    <TouchableOpacity
                        style={styles.logoutButton}
                        onPress={handleLogout}
                        activeOpacity={0.8}
                    >
                        <Icons.SignOut size={verticalScale(24)} color={colors.white} weight="bold" />
                    </TouchableOpacity>

                    <Button
                        style={styles.updateButton}
                        onPress={handleUpdate}
                        loading={loading}
                    >
                        <Typo color={colors.neutral900} size={18} fontWeight="700">
                            Update
                        </Typo>
                    </Button>
                </View>
            </View>
        </ScreenWrapper>
    )
}

export default ProfileModal

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: spacingX._20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: spacingY._15,
    },
    closeButton: {
        padding: spacingY._10,
        backgroundColor: colors.neutral100,
        borderRadius: radius._15,
    },
    headerTitle: {
        flex: 1,
        textAlign: 'center',
    },
    profileSection: {
        alignItems: 'center',
        marginTop: spacingY._30,
        marginBottom: spacingY._30,
    },
    avatarContainer: {
        position: 'relative',
    },
    avatar: {
        width: verticalScale(140),
        height: verticalScale(140),
        borderRadius: radius.full,
        backgroundColor: colors.neutral200,
    },
    editAvatarBtn: {
        position: 'absolute',
        bottom: 0,
        right: scale(8),
        backgroundColor: colors.white,
        padding: spacingY._10,
        borderRadius: radius.full,
        elevation: 3,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        borderWidth: 1,
        borderColor: colors.neutral200,
    },
    formContainer: {
        gap: spacingY._20,
        marginTop: spacingY._10,
    },
    inputGroup: {
        gap: spacingY._8,
    },
    fieldLabel: {
        paddingLeft: spacingX._5,
    },
    disabledInput: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        borderColor: 'transparent',
    },
    disabledInputText: {
        color: colors.neutral500,
    },
    editableInput: {
        backgroundColor: colors.neutral100,
        borderColor: colors.neutral200,
    },
    editableInputText: {
        color: colors.neutral900,
    },
    footer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: spacingX._15,
        marginBottom: spacingY._30,
    },
    logoutButton: {
        width: verticalScale(56),
        height: verticalScale(56),
        borderRadius: radius._20,
        backgroundColor: colors.rose,
        justifyContent: 'center',
        alignItems: 'center',
    },
    updateButton: {
        flex: 1,
        backgroundColor: colors.primary,
        borderRadius: radius.full,
    }
})
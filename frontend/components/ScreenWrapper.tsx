import { Platform, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {ScreenWrapperProps} from '@/types'
import { ImageBackground } from 'expo-image';
import { colors } from '@/constants/theme';




const {height} =  require('react-native').Dimensions.get('window');





const ScreenWrapper = ({
    style,
    children,
    showPattern = false,
    isModal = false,
    bgOpacity = 1
}:ScreenWrapperProps) => {

    let paddingTop =Platform.OS === "ios" || Platform.OS === "android" ?  height * 0.06 : 40; 
    let paddingBottom = 0;
  
    if(isModal){
        paddingTop = Platform.OS === "ios" || Platform.OS === "android" ?  height * 0.02 : 40;
        let paddingBottom = height * 0.02;
    }


  return (
<ImageBackground 
    source={require("@/assets/images/bgPattern.png")}    
    style={[{flex:1,backgroundColor: isModal ? colors.white : colors.neutral900}]}
    imageStyle={{opacity: showPattern ? bgOpacity : 0}}
>
  <View style={[{flex:1, paddingTop, paddingBottom}, style]}>
  {children}
    </View>
  
</ImageBackground>
  )
}

export default ScreenWrapper

const styles = StyleSheet.create({})
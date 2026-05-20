import { colors } from '@/constants/theme';
import { BackButtonProps } from '@/types';
import { verticalScale } from '@/utils/styling';
import { router } from 'expo-router';
import { CaretLeft } from 'phosphor-react-native';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';



// phosphori icosn 

const BackButton = ({ style, iconSize, color = colors.white }: BackButtonProps) => {
  return (
    <TouchableOpacity onPress={() => router.back()} style={[styles.button, style]}>
      <CaretLeft size={verticalScale(iconSize)} color={color} weight='bold' />
    </TouchableOpacity>
  )
}

export default BackButton

const styles = StyleSheet.create({

  button: {



  },

})
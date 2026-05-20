import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors } from '@/constants/theme'
import { BackButtonProps } from '@/types'


// phosphori icosn 

const BackButton = ({style,iconSize,color = colors.white}:BackButtonProps) => {
  return (
    <TouchableOpacity onPress={()=>router.back()} style ={[styles.button,style]}>
      <Text>BackButton</Text>
    </TouchableOpacity>
  )
}

export default BackButton

const styles = StyleSheet.create({})
import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import Typo from '@/components/Typo'
import { colors } from '@/constants/theme'
import Button from '@/components/Button'
import { useAuth } from '@/context/authContext'
import { testSocket } from '@/socket/socketEvents'
const Home = () => {
  const { user, signOut } = useAuth();


  // just for tetsting socket connection and events
  // useEffect(() => {
  //  testSocket(testSocketCallBackhandler);
  //  testSocket(null);

  //   return () =>{
  //     testSocket(testSocketCallBackhandler,true)
  //   }

  // }, []);

  // just for testing socket connection and events
  // const testSocketCallBackhandler = (data:any) => {
  //   console.log("Received data from testsocket event:", data);
  // }

  const handleLogout = async () => {
    await signOut();

  }

  return (
    <ScreenWrapper showPattern={true} bgOpacity={0.4}>
      <View style={styles.container}> 
        <View style={styles.header}>

          <View>
            <Typo>Hello {user?.name}</Typo>
          </View>
        </View>

      </View>

    </ScreenWrapper>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1

  },
  header:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    
  }
})
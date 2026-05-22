import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import Typo from '@/components/Typo'
import { colors, radius, spacingX, spacingY } from '@/constants/theme'
import Button from '@/components/Button'
import { useAuth } from '@/context/authContext'
import { testSocket } from '@/socket/socketEvents'
import { verticalScale } from '@/utils/styling'
import * as Icons from "phosphor-react-native"
import { useRouter } from 'expo-router'
import ConversationItem from '@/components/ConversationItem'
import Loading from '@/components/Loading'
const Home = () => {
  const { user: currentUser, signOut } = useAuth();
  const router = useRouter();
  const [selectedTab, setSeletedTab] = useState(0)
  const [loading, setLoading] = useState(false)


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


  const conversations = [
    {
      name: "Alice",
      type: "direct",
      lastMessage: {
        senderName: "Alice",
        content: "Hey! Are we still on for tonight?",
        createdAt: "2025-06-22T18:45:00Z",
      },
    },
    {
      name: "Project Team",
      type: "group",
      lastMessage: {
        senderName: "Sarah",
        content: "Meeting rescheduled to 3pm tomorrow.",
        createdAt: "2025-06-21T14:10:00Z",
      },
    },
    {
      name: "John",
      type: "direct",
      lastMessage: {
        senderName: "John",
        content: "Can you send me the design files?",
        createdAt: "2025-06-20T09:30:00Z",
      },
    },
    {
      name: "Developers Hub",
      type: "group",
      lastMessage: {
        senderName: "Mike",
        content: "React 19 is officially released!",
        createdAt: "2025-06-19T16:20:00Z",
      },
    },
    {
      name: "Emma",
      type: "direct",
      lastMessage: {
        senderName: "Emma",
        content: "I just pushed the latest updates to GitHub.",
        createdAt: "2025-06-18T11:50:00Z",
      },
    },
    {
      name: "Family Group",
      type: "group",
      lastMessage: {
        senderName: "Mom",
        content: "Dinner is ready everyone 🍽️",
        createdAt: "2025-06-17T19:15:00Z",
      },
    },
    {
      name: "David",
      type: "direct",
      lastMessage: {
        senderName: "David",
        content: "Let's catch up this weekend.",
        createdAt: "2025-06-16T08:40:00Z",
      },
    },
    {
      name: "Startup Ideas",
      type: "group",
      lastMessage: {
        senderName: "Ali",
        content: "We should build an AI travel planner app.",
        createdAt: "2025-06-15T13:05:00Z",
      },
    },
  ];

  let directConversations = conversations.filter((item: any) => item.type === "direct")
    .sort((a: any, b: any) => {
      const aDate = a?.lastMessage?.createdAt || a.createdAt;
      const bDate = b?.lastMessage?.createdAt || b.createdAt;


      return new Date(bDate).getTime() - new Date(aDate).getTime();

    });


  let groupConversations = conversations.filter((item: any) => item.type === "group")
    .sort((a: any, b: any) => {
      const aDate = a?.lastMessage?.createdAt || a.createdAt;
      const bDate = b?.lastMessage?.createdAt || b.createdAt;


      return new Date(bDate).getTime() - new Date(aDate).getTime();

    });

  // let directConversations = [];
  // let groupConversations = [];

  return (
    <ScreenWrapper showPattern={true} bgOpacity={0.4}>
      <View style={styles.container}>
        <View style={styles.header}>

          <View style={{ flex: 1 }}>
            <Typo color={colors.neutral200} size={19} textProps={{ numberOfLines: 1 }}>Welcome back, <Typo color={colors.white} size={22} fontWeight={"800"} textProps={{ numberOfLines: 1 }}> {currentUser?.name} </Typo>{" "} </Typo>
          </View>
          <TouchableOpacity style={styles.settingIcon}
            onPress={() => router.push("/profileModal")}>
            <Icons.GearSix weight="regular" color={colors.neutral300} weight="fill" size={verticalScale(22)} />
          </TouchableOpacity>

        </View>

        <View style={styles.content}>
          <ScrollView showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: spacingX._20,
              paddingTop: spacingY._20,
              paddingBottom: spacingY._20,
            }} >

            <View style={styles.navBar}>
              <View style={styles.tabs}>
                <TouchableOpacity onPress={() => { setSeletedTab(0) }} style={[styles.tabStyle, selectedTab == 0 && styles.activeTabStyle]}>
                  <Typo>Direct Message</Typo>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setSeletedTab(1) }} style={[styles.tabStyle, selectedTab == 1 && styles.activeTabStyle]}>
                  <Typo>Group</Typo>
                </TouchableOpacity>
              </View>
            </View>


            <View style={styles.conversationList}>
              {selectedTab == 0 && directConversations.map((item: any, index) => {
                return (
                  <ConversationItem
                    item={item}
                    key={index}
                    router={router}
                    showDriver={directConversations.length != index + 1}
                  />
                )
              })}

              {selectedTab == 1 && groupConversations.map((item: any, index) => {
                return (
                  <ConversationItem
                    item={item}
                    key={index}
                    router={router}
                    showDriver={groupConversations.length != index + 1}
                  />
                )
              })}

            </View>
            {
              !loading && selectedTab == 0 && directConversations.length == 0 && (
                <Typo style={{ textAlign: "center" }} color={colors.neutral400}>
                  you don't have any Direct Messages
                </Typo>
              )}

            {
              !loading && selectedTab == 1 && groupConversations.length == 0 && (
                <Typo style={{ textAlign: "center" }} color={colors.neutral400}>
                  you don't have any Group Messages
                </Typo>
              )}

            {
              loading && <Loading />
            }



          </ScrollView>
        </View>

      </View>
      {/* yaha sa param bhajr he isgroup ak take hum new conveeasiont on the bvehave on  isGrup to manage karnege */}

      <Button
        style={styles.floatingButton}
        onPress={() => router.push({
          pathname: "/(main)/newConversationModal",
          params: { isGroup: selectedTab }
        })}
      >

        <Icons.Plus weight="regular" color={colors.black} size={verticalScale(24)} />

      </Button>

    </ScreenWrapper >
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1

  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacingX._20,
    gap: spacingY._15,
    paddingTop: spacingY._15,
    paddingBottom: spacingY._20,


  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  content: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: radius._50,
    borderTopRightRadius: radius._50,
    borderCurve: "continuous",
    overflow: "hidden",
    paddingHorizontal: spacingX._20
  },
  navBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacingY._10,
    paddingHorizontal: spacingX._10
  },
  tabs: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacingX._20,
    gap: spacingY._15,

  },
  tabStyle: {
    paddingVertical: spacingY._10,
    paddingHorizontal: spacingX._20,
    borderRadius: radius.full,
    backgroundColor: colors.neutral100,
  },
  activeTabStyle: {
    backgroundColor: colors.primaryLight,
  },
  conversationList: {
    paddingVertical: spacingY._20
  },
  settingIcon: {
    padding: spacingY._10,
    backgroundColor: colors.neutral800,
    borderRadius: spacingY._50,
  },
  floatingButton: {
    height: verticalScale(50),
    width: verticalScale(50),
    borderRadius: 50,
    backgroundColor: colors.primaryLight,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: verticalScale(30),
    right: verticalScale(30)
  }
})
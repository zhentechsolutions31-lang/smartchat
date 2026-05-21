import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';

import Avatar from '@/components/Avatar';
import Typo from '@/components/Typo';
import { verticalScale } from '@/utils/styling';
import { colors, spacingX, spacingY, radius } from '@/constants/theme';

interface ConversationItemProps {
  item: any;
  router: any
  showDriver?: boolean;
}

const ConversationItem: React.FC<ConversationItemProps> = ({ item, router, showDriver = true }) => {
  const handlePress = () => {
    // Navigate to chat screen, passing conversation details
    router.push({
      pathname: '/(main)/chat',
      params: {
        conversationId: item.name,
        isGroup: item.type === 'group',
      },
    });
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <Avatar
        uri={null}
        size={48}
        isGroup={item.type === 'group'}
      // You can replace null with an actual avatar URI if available
      />
      <View style={styles.textContainer}>
        <Typo numberOfLines={1} weight="600" size={16} color={colors.neutral900}>
          {item.name}
        </Typo>
        <Typo numberOfLines={1} size={14} color={colors.neutral600}>
          {item.lastMessage?.content ?? ''}
        </Typo>
      </View>
      {showDriver && <View style={styles.divider} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: verticalScale(10),
    paddingHorizontal: spacingX._15,
  },
  textContainer: {
    flex: 1,
    marginLeft: spacingX._10,
  },
  divider: {
    height: 1,
    backgroundColor: colors.neutral200,
    marginLeft: spacingX._15,
    marginRight: spacingX._15,
  },
});

export default ConversationItem;

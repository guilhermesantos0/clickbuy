import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import ip from '@/ip';

const Ajuda = () => {
  const url = `http://clickbuy-pii.s3-website-sa-east-1.amazonaws.com/institucional/termos-de-uso`;

  return (
    <View style={styles.container}>
      <WebView source={{ uri: url }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Ajuda;

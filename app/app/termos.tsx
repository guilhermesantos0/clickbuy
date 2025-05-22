import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import ip from '@/ip';

const Ajuda = () => {
  const url = `http://${ip}:3000/institucional/termos-de-uso`;

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

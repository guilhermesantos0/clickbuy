import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import ip from '@/ip';

const SobreNosWeb = () => {
  const url = `http://clickbuy-pii.s3-website-sa-east-1.amazonaws.com/institucional/sobrenos`;

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

export default SobreNosWeb;

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import InstagramPage from './Pages/InstagramPage'
import PhillipsHuePage from './Pages/PhillipsHuePage'

export default function App() {
  return (
    <View style={styles.container}>
      <InstagramPage/>

      <PhillipsHuePage/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0c29',

  },
});

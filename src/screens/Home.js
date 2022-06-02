import React from 'react'
import { View, Button, SafeAreaView, FlatList } from 'react-native'

const DATA = [
  {
    route: 'Home',
    title: 'Home',
  },
  {
    route: 'Carousel',
    title: 'Carousel',
  },
];

export const Home = (props) => {
  const renderButton = ({ item }) => (
    <View style={{margin: 10,  width: 150}}>
      <Button title={item.title} onPress={() => props.navigation.navigate(item.route)} /> 
    </View>
  );

  return (
    <SafeAreaView>
      <View style={{ marginTop: 20 }}>
        <FlatList 
          data={DATA}
          renderItem={renderButton}
          keyExtractor={item => item.route}
        />
      </View>    
    </SafeAreaView>
  )
}

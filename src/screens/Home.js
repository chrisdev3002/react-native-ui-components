import React from 'react'
import { View, TouchableOpacity, SafeAreaView, FlatList, Text } from 'react-native'

const DATA = [
  {
    route: 'Home',
    title: 'Home',
  },
  {
    route: 'Carousel',
    title: 'Carousel',
  },
  {
    route: 'FadeInSlide',
    title: 'Slide Anim',
  },
];

export const Home = (props) => {
  const RenderButton = ({ item }) => (
    <View style={{margin: 10,  width: 150, padding: 20, borderRadius: 20, backgroundColor: 'lightsteelblue'}}>      
      <TouchableOpacity onPress={() => props.navigation.navigate(item.route)}>
        <Text style={{textAlign: 'center'}}>{item.title}</Text>  
      </TouchableOpacity> 
    </View>
  );

  return (
    <SafeAreaView>
      <View style={{ marginTop: 20 }}>
        <FlatList 
          data={DATA}
          renderItem={RenderButton}
          keyExtractor={item => item.route}
        />
      </View>    
    </SafeAreaView>
  )
}

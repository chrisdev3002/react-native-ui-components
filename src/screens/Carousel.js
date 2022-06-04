import React, { useRef } from 'react'
import { View, Animated, Image, Dimensions, SafeAreaView, StyleSheet } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { LinearGradient } from "expo-linear-gradient"

const images = [
  "https://images.unsplash.com/photo-1559494007-9f5847c49d94?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
  "https://images.unsplash.com/photo-1506477331477-33d5d8b3dc85?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2425&q=80",
  "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=652&q=80",
  "https://images.unsplash.com/photo-1525183995014-bd94c0750cd5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  "https://images.unsplash.com/photo-1488462237308-ecaa28b729d7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=714&q=80",
  "https://images.unsplash.com/photo-1503756234508-e32369269deb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80",
  "https://images.unsplash.com/photo-1504681869696-d977211a5f4c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=652&q=80",
];

const { height, width } = Dimensions.get('window')

const CONTAINER_WIDTH = width * 0.7
const SIDE_SPACE = (width - CONTAINER_WIDTH) / 2
const GAP_SPACE = 10
const BACKDROP_HEIGHT = height * 0.5

function BackDrop({ scrollX }){
  return (
    <View
    style={[
        {
          position: "absolute",
          height: BACKDROP_HEIGHT,
          top: 0,
          width: width,
        },
        StyleSheet.absoluteFillObject,
      ]}
    >
      {images.map((imagen, index) => {

        const inputRange = [
          (index - 1) * CONTAINER_WIDTH,
          index * CONTAINER_WIDTH,
          (index + 1) * CONTAINER_WIDTH,
        ];

        const outputRange = [0, 1, 0]

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange
        })


        return (
          <Animated.Image 
            key={index}
            source={{ uri: imagen }}
            style={[
              { width: width, height: BACKDROP_HEIGHT, opacity },
              StyleSheet.absoluteFillObject,
            ]}
          />
        )  
      })}

      <LinearGradient
        colors={["transparent", "white"]}
        style={{
          width,
          height: BACKDROP_HEIGHT,
          position: 'absolute',
          bottom: 0,
        }}
      />

    </View>
  )
}

export const Carousel = () => {
  const scrollX = useRef(new Animated.Value(0)).current

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />
      <BackDrop scrollX={scrollX} />      
      <Animated.FlatList
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingTop: 200, paddingHorizontal: SIDE_SPACE }}
        decelerationRate={0}
        snapToInterval={CONTAINER_WIDTH}   // when it get x position, then set new a position
        scrollEventThrottle={16}          // refresh each 16 ms

        data={images}     
        keyExtractor={item => item}
        renderItem={({ item, index }) => {

          // 
          const inputRange = [
            (index - 1) * CONTAINER_WIDTH,
            index * CONTAINER_WIDTH,
            (index + 1) * CONTAINER_WIDTH,
          ];

          const outputRange = [0, -50, 0]

          const translateY = scrollX.interpolate({
            inputRange,
            outputRange
          })


          return (
            <View style={{ width: CONTAINER_WIDTH }}>
               <Animated.View style={{
                marginHorizontal: GAP_SPACE,
                padding: GAP_SPACE,
                borderRadius: 34,
                backgroundColor: '#fff',
                alignItems: 'center',
                transform: [ {translateY} ]
              }}>
                <Image
                  source={{ uri: item }}
                  style={styles.posterImage}
                />
              </Animated.View>            
            </View>
          )
        }}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  posterImage: {
    width: '100%',
    height: CONTAINER_WIDTH * 1.2,
    resizeMode: 'cover',
    borderRadius: 24,
    margin: 0,
    marginBottom: 10
  }
})

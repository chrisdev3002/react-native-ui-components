import React, { useRef, useEffect } from 'react'
import { View, Text } from 'react-native'
import { Animated } from "react-native"

const FadeInSlide = ({
  duration = 2000,
  startPosition = 0,
  endPosition = 0,
  startTime = 0,
  children
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(startPosition)).current

  useEffect(() => {

    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: duration,
        useNativeDriver: true,
        delay: startTime
      }
    ).start()
    Animated.timing(
      slideAnim,
      {
        toValue: endPosition,
        duration: duration,
        useNativeDriver: true,
        delay: startTime
      }
    ).start()

  }, [endPosition])

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }],
        zIndex: -999
      }}
    >
      {children}
    </Animated.View>
  )
}

export const FadeInSlideContainer = () => {
  return (
    <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
      <FadeInSlide startTime={1000} startPosition={100} endPosition={0}>
        <Text style={{fontSize: 20, color: 'purple'}}>Hello world, I'm an animated Text</Text>
      </FadeInSlide>
    </View>
  )
}

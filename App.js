import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Home, Carousel, FadeInSlideContainer } from './src/screens'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="Carousel" component={Carousel} />
        <Stack.Screen name="FadeInSlide" component={FadeInSlideContainer} />
  
      </Stack.Navigator>
    </NavigationContainer>
  );
}

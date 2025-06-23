// src/navigation/TabNavigator.tsx
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Vida from '../screens/Vida';
import Ranking from '../screens/Ranking';
import Conquista from '../screens/Conquista';
import Perfil from '../screens/Perfil';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={Home} options={{ tabBarIcon: ({color, size}) => <Ionicons name="home" size={size} color={color}/> }} />
      <Tab.Screen name="Vida" component={Vida} options={{ tabBarIcon: ({color, size}) => <Ionicons name="heart" size={size} color={color}/> }} />
      <Tab.Screen name="Ranking" component={Ranking} options={{ tabBarIcon: ({color, size}) => <Ionicons name="trophy" size={size} color={color}/> }} />
      <Tab.Screen name="Conquista" component={Conquista} options={{ tabBarIcon: ({color, size}) => <Ionicons name="star" size={size} color={color}/> }} />
      <Tab.Screen name="Perfil" component={Perfil} options={{ tabBarIcon: ({color, size}) => <Ionicons name="person" size={size} color={color}/> }} />
    </Tab.Navigator>
  );
}

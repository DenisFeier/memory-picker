import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../../screens/HomeScreen';
import CameraScreen from '../../screens/CameraScreen';
import ProfileScreen from '../../screens/ProfileScreen';
import FindPeopleScreen from '../../screens/FindPeopleScreen';
import { TabBarParams } from './params';

const Tab = createBottomTabNavigator<TabBarParams>();

export default function TabBar() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,
        tabBarShowLabel: false,
        tabBarActiveTintColor: 'gray',
        tabBarInactiveTintColor: 'black',
        tabBarStyle: { backgroundColor: '#F2994A' },
        headerStyle: { backgroundColor: '#F2994A' },
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 22,
          color: 'black',
        },
        tabBarIcon: ({ color, size }) => {
          let iconName: string;
          switch (route.name) {
            case 'Home':
              iconName = 'home-outline';
              break;
            case 'Camera':
              iconName = 'camera-outline';
              break;
            case 'Profile':
              iconName = 'person-outline';
              break;
            case 'Find People':
              iconName = 'people-outline';
              break;
            default:
              iconName = 'ellipse';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Camera" component={CameraScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Find People" component={FindPeopleScreen} />
    </Tab.Navigator>
  );
}
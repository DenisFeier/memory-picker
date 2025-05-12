import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Switch,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { TabBarParams } from '../router/TabBar/params';
import { JWT_TOKEN } from '../util/Constants';
import { axiosInstance } from '../util/requests';
import { AuthContext } from '../context/AuthContext';

interface UserResponse {
  id: number;
  email: string;
  username: string;
  profile_picture: string;
  is_public: boolean;
}

const ProfileScreen = () => {
  const [user, setUser] = useState<UserResponse | null>(null);
  const { setAuth } = useContext(AuthContext);
    
  useEffect(() => {
    const fetchUser = async () => {

      try {
        const response = await axiosInstance.get<UserResponse>('/user/me'); 
        setUser(response.data);
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem(JWT_TOKEN);
    setAuth(false);
  };

  if (!user) return null;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.usernameHeader}>{user.username}</Text>
      </View>

      <View style={styles.profileBox}>
        <Image
          source={{ uri: user.profile_picture }}
          style={styles.avatar}
        />
        <Text style={styles.email}>{user.email}</Text>

        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Public Account</Text>
          <Switch
            value={user.is_public}
  
            disabled
            thumbColor={user.is_public ? '#f4a261' : '#ccc'}
            trackColor={{ false: '#ccc', true: '#ffe0b2' }}
          />
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF3E0',
  },
  header: {
    padding: 16,
    backgroundColor: '#f4a261',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  usernameHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  profileBox: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 40,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  email: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
  },
  switchLabel: {
    marginRight: 10,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: 'red',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  logoutText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default ProfileScreen;


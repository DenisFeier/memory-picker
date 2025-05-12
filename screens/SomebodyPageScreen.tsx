import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { JWT_TOKEN } from '../util/Constants';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { StackNavigationProp } from '@react-navigation/stack';
import { TabBarParams } from '../router/TabBar/params';
import { FindPeopleParamList } from '../router/FindPeopleStack/FindPeopleParams';

type NavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabBarParams, 'Find People'>,
  StackNavigationProp<FindPeopleParamList>
>;

interface User {
  username: string;
  profile_picture: string;
}

interface Post {
  id: number;
  picture: string;
  locationLat: number;
  locationLong: number;
}

const SomebodyPageScreen = () => {
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    const fetchData = async () => {
      const token = await AsyncStorage.getItem(JWT_TOKEN);

      if (!token) return;

      try {
        const userResponse = await axios.get<User>('http://localhost:3000/api/user/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(userResponse.data);

        const postsResponse = await axios.get<{ posts: Post[] }>(
          'http://localhost:3000/api/post/1?page=1&limit=3&order=desc',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPosts(postsResponse.data.posts);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, []);

  const handleLocationPress = (post: Post) => {
    navigation.navigate('Find People', {
      screen: 'SomebodyImageLocation',
      params: {
        latitude: post.locationLat,
        longitude: post.locationLong,
      },
    });
  };

  const renderPost = ({ item }: { item: Post }) => (
    <TouchableOpacity onPress={() => handleLocationPress(item)} style={styles.imageWrapper}>
      <Image source={{ uri: item.picture }} style={styles.image} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{user?.username}</Text>
      </View>

      <View style={styles.profileContainer}>
        <Image source={{ uri: user?.profile_picture }} style={styles.avatar} />
        <Text style={styles.username}>{user?.username}</Text>
      </View>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderPost}
        numColumns={2}
        contentContainerStyle={styles.postList}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFEFD5',
  },
  header: {
    backgroundColor: '#f4a261',
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  profileContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  postList: {
    paddingHorizontal: 20,
    gap: 15,
  },
  imageWrapper: {
    flex: 1,
    margin: 5,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 10,
  },
});

export default SomebodyPageScreen;

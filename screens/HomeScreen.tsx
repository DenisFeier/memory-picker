import { useEffect, useState } from 'react';
import { View, FlatList, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';


import ScreenWrapper from '../components/ScreenWrapper';
import { axiosInstance } from '../util/requests';
import { HomeStackParams } from '../router/HomeStack/params';

export default function HomeScreen() {
  const [posts, setPosts] = useState([]);
  const [numColumns] = useState(2);
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParams>>();

  useEffect(() => {
    const fetchPosts = async () => {
      axiosInstance.get('/post/12?page=1&limit=3&order=desc')
      .then(response => {
        console.log(response.data)
        setPosts(response.data.posts);
      })
      .catch(error => {
        console.error(JSON.stringify(error));
      });
    }
    fetchPosts()
  }, [setPosts]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.imageContainer}
      onPress={() => navigation.navigate('PostDetails', { postId: item.id })}
    >
      <Image source={{ uri: item.picture }} style={styles.image} />
    </TouchableOpacity>
  );

  return (
    <ScreenWrapper>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        key={numColumns}
        contentContainerStyle={styles.list}
      />
      <StatusBar style="auto" />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 10,
    alignItems: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    margin: 10,
  },
  image: {
    width: Dimensions.get('window').width / 2 - 30,
    height: 200,
    resizeMode: 'cover',
  },
});

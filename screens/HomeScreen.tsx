import { useEffect, useState } from 'react';
import { View, FlatList, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import ScreenWrapper from '../components/ScreenWrapper';

export default function HomeScreen() {
  const [posts, setPosts] = useState([]);
  const [numColumns] = useState(2);

  useEffect(() => {
    axios.get('http://192.168.63.104:3000/api/post/12?page=1&limit=3&order=desc', {
      headers: {
        Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIsInVzZXJuYW1lIjoib3JpY2VlIiwiZW1haWwiOiJvcmljZWVAbWFpbGluYXRvci5jb20iLCJpYXQiOjE3NDYxNjg4NTQsImV4cCI6MTc0NjIxMjA1NH0.3xf5wUTjQ2vh-14zwiJZsxpfeA9xIuEWwXyCjxoLuUU',
      },                
    })
    .then(response => {
      setPosts(response.data);
    })
    .catch(error => {
      console.error('Error fetching posts:', error);
    });
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.imageContainer} onPress={() => console.log('To the post', item.id)}>
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
    </TouchableOpacity>
  );

  return (
    <ScreenWrapper>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id()}
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

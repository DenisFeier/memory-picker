import { useEffect, useState } from 'react';
import { View, FlatList, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import ScreenWrapper from '../components/ScreenWrapper';

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJQTE0iLCJlbWFpbCI6InRlc3QxQG1haWxpbmF0b3IuY29tIiwiaWF0IjoxNzQ2MTc2NTc2LCJleHAiOjE3NDYyMTk3NzZ9.zgvpZ9HoCDzT0iOk30K71Iud0Jz4z53F3pTbrAuYOWw"

export default function HomeScreen() {
  const [posts, setPosts] = useState([]);
  const [numColumns] = useState(2);

  useEffect(() => {
    const fetchPosts = async () => {
      axios.get('http://127.0.0.1:3000/api/post/12?page=1&limit=3&order=desc', {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        }                
      })
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
    console.log(item.picture),
    <TouchableOpacity style={styles.imageContainer} onPress={() => console.log('To the post', item.id)}>
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

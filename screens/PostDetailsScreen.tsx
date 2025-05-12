import { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Text, Button, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';

import ScreenWrapper from '../components/ScreenWrapper';
import { axiosInstance } from '../util/requests';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import { DecodedToken } from '../types/DecodedToken';
import { JWT_TOKEN } from '../util/Constants';
import { HomeStackParams } from '../router/HomeStack/params';

type PostDetailsRouteProp = RouteProp<HomeStackParams, 'PostDetails'>;
type NavigationProp = NativeStackNavigationProp<HomeStackParams>;

export default function PostDetailsScreen() {
  const route = useRoute<PostDetailsRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { postId } = route.params;

  const [post, setPost] = useState<null | {
    picture: string;
    title: string;
  }>(null);

  useEffect(() => {
  const fetchPost = async () => {
    try {
      const token = await AsyncStorage.getItem(JWT_TOKEN);
      if (!token) {
        return;
      }
      const decoded = jwtDecode<DecodedToken>(token);
      const userId = decoded.id;
      const response = await axiosInstance.get(`/post/${userId}?page=1&limit=20&order=desc`);
      setPost(response.data.posts);

    } catch (error) {
      console.error('Error fetching post list:', error);
    }
  };

  fetchPost();
}, [postId]);

  if (!post) {
    return (
      <ScreenWrapper>
        <View style={styles.container}>
          <Text>Loading post...</Text>
        </View>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Image source={{ uri: post.picture }} style={styles.image} />
        <Text style={styles.title}>{post.title}</Text>

        <View style={styles.buttonContainer}>
          <Button
            title="Location"
            onPress={() => navigation.navigate('Location', { postId })}
            color="#ece0dc"
          />
        </View>

        <View style={styles.buttonsRow}>
          <View style={styles.buttonContainer}>
            <Button
              title="Edit"
              onPress={() => navigation.navigate('EditPost', { postId })}
              color="#f2994a"
            />
          </View>

          <View style={styles.buttonContainer}>
            <Button
              title="Delete"
              color="#fc0101"
              onPress={() => Alert.alert('Delete not implemented yet')}
            />
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
});

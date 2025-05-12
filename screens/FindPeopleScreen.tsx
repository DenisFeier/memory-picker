import { useState } from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import ScreenWrapper from '../components/ScreenWrapper';
import { axiosInstance } from '../util/requests';
import { FindPeopleParamList } from '../router/FindPeopleStack/FindPeopleParams';

type PublicUser = {
  id: number;
  username: string;
  profile_picture?: string;
};

type NavigationProp = StackNavigationProp<FindPeopleParamList, 'FindPeopleScreen'>;

export default function FindPeopleScreen() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<PublicUser[]>([]);

  const navigation = useNavigation<NavigationProp>();

  const performSearch = async (text: string) => {
    try {
      const response = await axiosInstance.get(`/user/public-users?page=1&limit=20&search=${text}`);
      setResults(response.data.users);
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  const handleUserPress = (userId: number) => {
    navigation.navigate('SomebodyPage', { userId });
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <View style={styles.searchBar}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search For Person"
            placeholderTextColor="gray"
            value={query}
            onChangeText={setQuery}
          />
          <TouchableOpacity style={styles.searchButton} onPress={() => performSearch(query)}>
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={results}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleUserPress(item.id)} style={styles.cardWrapper}>
              <View style={styles.card}>
                <View style={styles.profileInfo}>
                  <Image
                    source={
                      item.profile_picture
                        ? { uri: item.profile_picture }
                        : require('../assets/profile.png')
                    }
                    style={styles.profileImage}
                  />
                  <Text style={styles.username}>{item.username}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  searchBar: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#dcceb7',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  searchButton: {
    marginLeft: 8,
    backgroundColor: '#F2994A',
    paddingHorizontal: 16,
    justifyContent: 'center',
    borderRadius: 8,
  },
  searchButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  cardWrapper: {
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: '#e8e2d9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
  },
  card: {
    borderRadius: 12,
    padding: 16,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
    backgroundColor: '#ccc',
  },
  username: {
    fontSize: 16,
    fontWeight: '600',
  },
});

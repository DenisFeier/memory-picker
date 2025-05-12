import { useEffect, useState } from 'react';
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
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const navigation = useNavigation<NavigationProp>();

  const fetchUsers = async (pageNumber: number, searchQuery: string) => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/user/public-users?page=${pageNumber}&limit=10&search=${searchQuery}`
      );

      const newUsers = response.data.users;

      if (newUsers.length > 0) {
        setResults((prevResults) => [...prevResults, ...newUsers]);
        setPage(pageNumber);
      } else {
        setHasMore(false); // No more data to fetch
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Reset results and fetch the first page when the query changes
    setResults([]);
    setPage(1);
    setHasMore(true);
    fetchUsers(1, query);
  }, [query]);

  const loadMore = () => {
    console.log('Loading more users...');
    if (!loading && hasMore) {
      fetchUsers(page + 1, query);
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
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={loading ? <Text style={{ textAlign: 'center' }}>Loading...</Text> : null}
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

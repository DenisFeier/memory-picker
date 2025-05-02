import { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet, TouchableOpacity  } from 'react-native';
import axios from 'axios';
import ScreenWrapper from '../components/ScreenWrapper';

const API_URL = 'http://192.168.63.104:3000/api/user/public-users';
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIsInVzZXJuYW1lIjoib3JpY2VlIiwiZW1haWwiOiJvcmljZWVAbWFpbGluYXRvci5jb20iLCJpYXQiOjE3NDYxNjg4NTQsImV4cCI6MTc0NjIxMjA1NH0.3xf5wUTjQ2vh-14zwiJZsxpfeA9xIuEWwXyCjxoLuUU';

export default function FindPeopleScreen() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const performSearch = async (text: string) => {
    setQuery(text);

    try {
      const response = await axios.get(`${API_URL}?page=1&limit=3&search=${text}`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      setResults(response.data);
    } catch (error) {
      console.error('Search error:', error);
    }
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
          <TouchableOpacity style={styles.searchButton} onPress={performSearch}>
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={results}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.resultItem}>
              <Text>{item.name}</Text>
            </View>
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
  resultItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
});
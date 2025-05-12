import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { FindPeopleParamList } from '../router/FindPeopleStack/FindPeopleParams';

type LocationScreenRouteProp = RouteProp<FindPeopleParamList, 'SomebodyImageLocation'>;

const SomebodyImageLocationScreen = () => {
  const navigation = useNavigation<StackNavigationProp<FindPeopleParamList, 'SomebodyImageLocation'>>();
  const route = useRoute<LocationScreenRouteProp>();

  if (!route.params) {
    return (
      <View style={styles.container}>
        <Text>Coordonatele nu sunt disponibile.</Text>
      </View>
    );
  }

  const { latitude, longitude } = route.params;

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker coordinate={{ latitude, longitude }} title="Post location" />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default SomebodyImageLocationScreen;

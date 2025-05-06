import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

interface PropCustonTextInput {
  placeholder?: string; 
  secureTextEntry?: boolean;
  value: string;
  onChangeText: (v: string) => void;
}

const CustomTextInput: React.FC<PropCustonTextInput> = ({ placeholder, secureTextEntry, value, onChangeText }) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      placeholderTextColor="#555"
      value={value}
      onChangeText={onChangeText}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 45,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 15,
    backgroundColor: 'white',
    fontSize: 16,
  },
});

export default CustomTextInput;

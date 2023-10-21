import React, { useEffect } from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity} from 'react-native';
import { StyleSheet } from 'react-native';

const windowWidth = Dimensions.get('window').width;

export default function Profile({ navigation }) {
    useEffect(() => {
        navigation.setOptions({
          headerShown: false, // Esta opção oculta o cabeçalho da tela
        });
      }, []);

  return (
    <View style={styles.container}>
      <Text>teste</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',        
    },
    
});

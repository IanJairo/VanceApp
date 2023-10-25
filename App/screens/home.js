import React, { useEffect, useState } from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity, ScrollView, AsyncStorage} from 'react-native';
import { StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';
import RenderHTML from 'react-native-render-html';


import profileIcon from '../assets/neyDayFlamengo.png'
import underline from '../assets/underline.png'

const windowWidth = Dimensions.get('window').width;


export default function HomeScreen({ navigation }) {
    useEffect(() => {
            navigation.setOptions({
                headerShown: false, // Esta opção oculta o cabeçalho da tela
            });
        }, []);

      const [selectedButtonIndex, setSelectedButtonIndex] = useState(0);
      const [isSelected, setSelection] = useState(false);
      
      const handleButtonPress = (index) => {
          setSelectedButtonIndex(index);
        };
      
      const renderButton = (value, index) => {
          const isSelected = selectedButtonIndex === index;
          return (
            <TouchableOpacity
              key={index}
              style={{
                backgroundColor: isSelected ? '#00c0ce' : 'white',
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
                width: windowWidth*0.282,
                height: 120,
                margin: 10,
                shadowColor: '#000',
                shadowOffset: {
                width: 0,
                height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}
              onPress={() => handleButtonPress(index)}
            >
              <Text style={{ color: isSelected ? 'white' : '#5D5C5C',fontSize: isSelected? 40 : 30, fontWeight: 'bold'}}>{value}</Text>
            </TouchableOpacity>
          );
        };

    const renderTextButton = (value, index) => {
        const isSelected = selectedButtonIndex === index;
        return (
            <TouchableOpacity
            key={index}
            style={{
                width: windowWidth*0.3,
                height: 30,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 15,
            }}
            onPress={() => handleButtonPress(index)}
            >
                <Text style={{ color: isSelected ? 'black' : '#5D5C5C', fontSize: 14, fontWeight: isSelected ? 'bold' : null,}}>{value}</Text>
                <Image source={isSelected  ? underline : null} style={{ justifyContent: 'center', alignItems: 'center',}}/>
            </TouchableOpacity>
        );
        };

  return (
    <View style={styles.container}>
        <View style={styles.profileView}>
            <Image style={styles.image} source={profileIcon}/>
            <View style={styles.nameView}>
                <Text style={styles.nameText}>Neymar Jr</Text>
                <Text style={styles.profileText}>Perfil</Text>
            </View>
        </View>
        <View style={styles.statisticView}>
            {[5,2,2].map((value, index) => renderButton(value, index))}
        </View>
        <View style={{ width: windowWidth, height: '5%', flexDirection: 'row', }}>
            {["Notas","Favoritas","Compartilhadas"].map((value, index) => renderTextButton(value, index))}
        </View>
        <View style={styles.notesViews}>
            {/* <RenderHTML
                contentWidth={windowWidth*0.9}
                source={htmlContent}
            /> */}
        </View>
        <FAB
            icon="plus"
            style={styles.fab}
            onPress={() => console.log('Pressed')}
            backgroundColor='red'
        />
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
    profileView: {
        width: windowWidth*0.8,
        flexDirection: 'row',
        height: '10%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#f5f5f5',
        borderRadius: 25,
        shadowColor: '#000',
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    nameView: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        paddingLeft: 10,
    },
    nameText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    profileText: {
        fontSize: 15,
        color: '#9e9e9e',
    },
    statisticView: {
        flexDirection: 'row',
        width: windowWidth,
        height: '18%',
    },
    fab: {
        position: 'absolute',
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: 'red',
      },
      image: {
        width: 50,
        height: 50,
        borderRadius: 50,
        marginLeft: 10,
      }
});

import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image, Dimensions, TouchableOpacity, FlatList, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FAB } from 'react-native-paper';
import RenderHTML from 'react-native-render-html';

import underline from '../assets/underline.png'
import notesApi from '../providers/notes'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function HomeScreen({ navigation }) {
    
    const [userDetails, setUserDetails] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [notes, setNotes] = useState([]);
    const [favoriteNotes, setFavoriteNotes] = useState([]);
    const [sharedNotes, setSharedNotes] = useState([]); 
    const [selectedButtonIndex, setSelectedButtonIndex] = useState(0);

    const getNotes = async (idUser) => {
        const obj = {
            "user": {
                "id": idUser
            },
        };
        const notas = await notesApi.getNotes(obj);
        const favorite = await notesApi.getFavoriteNotes();
        const response = await AsyncStorage.getItem('user');

        if(response){
            const userDetails = JSON.parse(response);
            setUserDetails(userDetails);
            setNotes(notas)
            setFavoriteNotes(favorite)
            console.log(userDetails)
        }
    }

    const refreshData = async () => {
        const response = await AsyncStorage.getItem('user');
        if (response !== null) {
          const userDetails = JSON.parse(response)
          setUserDetails(userDetails);
          getNotes(userDetails.id);
        }
      }
      
      useEffect(() => {
        navigation.setOptions({
          headerShown: false, // Esta opção oculta o cabeçalho da tela
        });
        async function fetchData() {
            const response = await AsyncStorage.getItem('user');
            if (response !== null) {
                const userDetails = JSON.parse(response)
                setUserDetails(userDetails);
                getNotes(userDetails.id);
                setIsLoading(false);
                // console.log(notes)
                // console.log(favoriteNotes)
                console.log(userDetails.total_notes)
            }
        }
        fetchData();
    }, []);

    const handleButtonPress = (index) => {
        setSelectedButtonIndex(index);
        getNotes(userDetails.id);      
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

    const renderProfileIcon = () => {
        return (
            <View style={{ backgroundColor: '#00c0ce',
            borderRadius: 50,
            marginLeft: 10,
            width: 40,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center', }}> 
                <Text style={{
                    color: 'white',
                    fontSize: 24,
                    fontWeight: 'bold',
                }}>{userDetails.name[0]}</Text>
            </View>
        );
    };

  if (isLoading) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={require('../assets/logo.png')} style={{ width: 200, height: 200 }} />
            <ActivityIndicator size="large" color="#00c0ce" />
        </View>
    );
  }

  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity style={styles.profileView} onPress={() => navigation.navigate('ConfigTab')}>
                {renderProfileIcon()}
                <View style={styles.nameView}>
                    <Text style={styles.nameText}>{userDetails.name}</Text>
                    <Text style={styles.profileText}>Perfil</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={{ height: '60%', width: windowWidth*0.2,backgroundColor: '#00c0ce', borderRadius:15, alignItems: 'center', justifyContent: 'center' }} onPress={() => refreshData()}>
                <Text style={{color: 'white', textAlign: 'center', fontWeight: 'bold' }}>Atualizar Notas</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.statisticView}>
            {[userDetails.total_notes, userDetails.favorite_notes, userDetails.shared_notes].map((value, index) => renderButton(value, index))}
        </View>
        <View style={{ width: windowWidth, height: '5%', flexDirection: 'row', }}>
            {["Notas","Favoritas","Compartilhadas"].map((value, index) => renderTextButton(value, index))}
        </View>
        <View style={styles.notesViews}>
            <FlatList
                data={selectedButtonIndex === 0 ? notes : selectedButtonIndex === 1 ? favoriteNotes : selectedButtonIndex === 2 ? sharedNotes : []}
                renderItem={({ item }) => (
                    <TouchableOpacity style={{
                            padding: 20,  
                            marginVertical: 5, 
                            borderRadius: 15,
                            backgroundColor: '#f5f5f5',
                            borderColor: 'gray',
                            borderWidth: 0.5,
                            maxHeight: 150,
                            shadowColor: '#000',
                            shadowOffset: {
                            width: 0,
                            height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            elevation: 5,

                         }} 
                         onPress={() => navigation.navigate('EditNote', {userDetails, item})}>
                        <Text style={{fontWeight: 'bold', fontSize: 18, color: '#2F2E50'}}>{item.title}</Text>
                        <RenderHTML
                            contentWidth={windowWidth*0.9}
                            source={{ html: item.content }}
                        />
                        <Text style={{fontSize: 13, color: '#9e9e9e'}}>{item.date}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={item => item.title}
                style={{ maxHeight: '100%', width: windowWidth*0.9}}
            />
        </View>
        <FAB
            icon="plus"
            style={styles.fab}
            onPress={() => navigation.navigate('CreateNote', {userDetails})}
            backgroundColor='#00c0ce'
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
    header: {
        width: windowWidth,
        marginTop: 20,
        height: '15%',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 10,
    },
    profileView: {
        width: windowWidth*0.7,
        height: '60%',
        flexDirection: 'row',
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
    notesViews: {
        width: windowWidth*0.9,
        height: '60%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    fab: {
        position: 'absolute',
        borderRadius: 15,
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 16,
        right: 0,
        bottom: 0,
      },
    image: {
        width: 50,
        height: 50,
        borderRadius: 50,
        marginLeft: 10,
    }
});

import React, { useEffect, useState } from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity, ScrollView, AsyncStorage, FlatList} from 'react-native';
import { StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';
import RenderHTML from 'react-native-render-html';

import profileIcon from '../assets/neyDayFlamengo.png'
import underline from '../assets/underline.png'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function HomeScreen({ navigation }) {
    useEffect(() => {
            navigation.setOptions({
                headerShown: false, // Esta opção oculta o cabeçalho da tela
            });
        }, []);

    const [selectedButtonIndex, setSelectedButtonIndex] = useState(0);
    const [isSelected, setSelection] = useState(false);
    const [notes, setNotes] = useState([
    {title: 'TITULO', date: '26/10/2023', content: '<p>hello world</p>'},
    {title: 'TITULO1', date: '26/10/2023', content: '<p>ola mundo</p>'},
    {title: 'TITULO2', date: '26/10/2023', content: '<p>ohio gusai matsy</p>'},
    {title: 'TITULO3', date: '26/10/2023', content: '<p>hello world2</p>'},
    {title: 'TITULO4', date: '26/10/2023', content: '<p>ola mundo2</p>'},
    {title: 'TITULO5', date: '26/10/2023', content: '<p>ohio gusai matsy2</p>'},
    {title: 'TITULO6', date: '26/10/2023', content: '<p>hello world3</p>'},
    {title: 'TITULO7', date: '26/10/2023', content: '<p>ola mundo3</p>'},
    {title: 'TITULO8', date: '26/10/2023', content: '<p>ohio gusai matsy3</p>'},
    {title: 'TITULO9', date: '26/10/2023', content: '<p>hello world4</p>'},
    {title: 'TITULO10', date: '26/10/2023', content: '<p>ola mundo4</p>'},
    {title: 'TITULO11', date: '26/10/2023', content: '<p>ohio gusai matsy4</p>'},
    ]); // [ {title: 'TITULO', date: 'data', content: 'conteudo'}, ...
    
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
        <TouchableOpacity style={styles.profileView} onPress={() => navigation.navigate('ConfigTab')}>
            <Image style={styles.image} source={profileIcon}/>
            <View style={styles.nameView}>
                <Text style={styles.nameText}>Neymar Jr</Text>
                <Text style={styles.profileText}>Perfil</Text>
            </View>
        </TouchableOpacity>
        <View style={styles.statisticView}>
            {[5,2,2].map((value, index) => renderButton(value, index))}
        </View>
        <View style={{ width: windowWidth, height: '5%', flexDirection: 'row', }}>
            {["Notas","Favoritas","Compartilhadas"].map((value, index) => renderTextButton(value, index))}
        </View>
        <View style={styles.notesViews}>
            <FlatList
                data={notes}
                renderItem={({ item }) => (
                    <TouchableOpacity style={{
                            padding: 20,  
                            marginVertical: 5, 
                            borderRadius: 15,
                            backgroundColor: '#f5f5f5',
                            borderColor: '#DBF7F9',
                            borderWidth: 1,
                         }} 
                         onPress={( null )}>
                        <Text style={{fontWeight: 'bold', fontSize: 18}}>{item.title}</Text>
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
            onPress={() => navigation.navigate('EditNote')}
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
    notesViews: {
        width: windowWidth*0.9,
        height: '50%',
        alignItems: 'center',
        justifyContent: 'center',
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

import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";

import lightModeIcon from '../assets/lightModeIcon.png';
import darkModeIcon from '../assets/nightModeIcon.png';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Config({ navigation }) {

  const [selectedButtonIndex, setSelectedButtonIndex] = useState(null);
  const [isSelected, setSelection] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

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
        margin: 5,
        width: 40,
        height: 40,
        top: 10,
        left: 50,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#00c0ce',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onPress={() => handleButtonPress(index)}
    >
      <Text style={{ color: isSelected ? 'white' : '#5D5C5C',fontSize: isSelected? 18 : 14, fontWeight: 'bold' }}>{value}</Text>
    </TouchableOpacity>
  );
};

  return (
    <View style={styles.container}>
      <View style={styles.titleView}>
        <Text style={styles.h1}>Aparência</Text>
      </View>

      <View style={styles.themeView}>
        <Text style={styles.h2}>Tema</Text>
        <View style={styles.rowView}>
          <View style={styles.columnView}>
            <TouchableOpacity onPress={() => navigation.navigate('MyTest')}>
              <Image
                style={styles.image}
                source={lightModeIcon}
              />
            </TouchableOpacity>
            <Text>Modo Claro</Text>
          </View>
          <View style={styles.columnView}>
            <TouchableOpacity onPress={() => navigation.navigate('MyTest')}>
              <Image
                style={styles.image}
                source={darkModeIcon}
              />
            </TouchableOpacity>
            <Text>Modo Escuro</Text>
          </View>
        </View>
        <BouncyCheckbox
          size={25}
          fillColor="#00c0ce"
          unfillColor="#fff"
          text="Usar as preferências do sistema"
          iconStyle={{ borderColor: "#00c0ce" }}
          innerIconStyle={{ borderWidth: 2, borderRadius: 5 }}
          textStyle={{ fontWeight: 'bold', color: '#5D5C5C', textDecorationLine: 'none' }}
        />
      </View>

      <View style={styles.configsView}>
        <Text style={styles.h2}>Fonte</Text>
        <View style={styles.section}>
          <Text style={styles.h3}>Tamanho de Fonte</Text>
          <View style={{ flexDirection: 'row' }}>
            {[8, 12, 16, 20, 24].map((value, index) => renderButton(value, index))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.h3}>Estilo de Fonte</Text>
          {/* local do picker */}

        </View>

        <View style={styles.section}>
          <BouncyCheckbox
            size={25}
            fillColor="#00c0ce"
            unfillColor="#fff"
            text=" Bold Font"
            iconStyle={{ borderColor: "#00c0ce" }}
            innerIconStyle={{ borderWidth: 2, borderRadius: 5 }}
            textStyle={{ color: '#00c0ce', textDecorationLine: 'none' }}
            onPress={() => setSelection(!isSelected)}
            isChecked={isSelected}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  titleView: {
    width: windowWidth,
    height: windowHeight * 0.1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  h1: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#5D5C5C',
  },
  themeView: {
    width: windowWidth,
    height: windowHeight * 0.4,
    alignItems: 'center',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: 20,
  },
  h2: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#5D5C5C',
  },
  rowView: {
    width: windowWidth,
    height: windowHeight * 0.25,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  columnView: {
    width: windowWidth * 0.35,
    height: '30%',
    borderRadius: 10,
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 150,
  },
  configsView: {
    width: windowWidth,
    height: windowHeight * 0.35,
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: 20,
  },
  h3: {
    fontSize: 16,
    color: '#00c0ce',
  },
  section: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
});
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, TextInput, Image, Modal } from 'react-native';
import RenderHTML from 'react-native-render-html';
import { actions, RichToolbar ,RichEditor} from 'react-native-pell-rich-editor';
import moment from 'moment';

import backArrow from '../assets/backArrow.png';
import shareIcon from '../assets/shareIcon.png';
import deletIcon from '../assets/deleteIcon.png';
import selectedStar from '../assets/selectedStar.png';
import unselectedStar from '../assets/unselectedStar.png';

const windowWidth = Dimensions.get('window').width*0.9;
const windowHeight = Dimensions.get('window').height;

export default function EditNote({ navigation }) {
    const richText = useRef();

    const [favorite, setFavorite] = useState(false);
    const [date, setDate] = useState('');
    const [title, setTitle] = useState('');
    const [modalVisible, setModalVisible] = useState(false);


    const [descHTML, setDescHTML] = useState('');
    const [showDescError, setShowDescError] = useState(false);

    useEffect(() => {
        navigation.setOptions({
          headerShown: false, // Esta opção oculta o cabeçalho da tela
      });
        const currentDate = new Date();
        const formattedDate = moment(currentDate).format('DD/MM/YYYY');
        setDate(formattedDate);
      }, []);

    const changeFavoriteHandle = () => {
        setFavorite(!favorite);
    }

    const handleDeleteNote = () => {
      setModalVisible(true);
    };

    const handleDeleteConfirm = () => {
      // Delete note logic here
      setModalVisible(false);
    };
  
    const handleDeleteCancel = () => {
      setModalVisible(false);
    };

    const richTextHandle = (descriptionText) => {
        if (!descriptionText || title === '' ) {
          setShowDescError(true);
          setDescHTML('');  
        } else {
            setShowDescError(false);
            setDescHTML(descriptionText);
        }
    };

    const submitContentHandle = () => {
        const replaceHTML = descHTML.replace(/<(.|\n)*?>/g, '').trim();
        const replaceWhiteSpace = replaceHTML.replace(/&nbsp;/g, "").trim();

        if (replaceWhiteSpace.length <= 0) {
            setShowDescError(true);
        } else {
            // jogar pra api
            console.log(title,descHTML, date, favorite);
        }
    };

    return (
      <SafeAreaView edges={["bottom", "left", "right"]} style={{ flex: 1 }}>
      <View style={{
        opacity: modalVisible ? 0.5 : 1,
        flex: 1,
        height: "100%",
        backgroundColor: "white",
        padding: 20,
        alignItems: "center",
      }}>
        <View style={styles.headerStyle}>
            <View style={{ flexDirection: 'row', marginTop: 20}}>
                <View style={{ width: '68%' }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')}><Image source={backArrow}/></TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => changeFavoriteHandle()}><Image style={styles.image} source={favorite ? selectedStar : unselectedStar}/></TouchableOpacity>
                <TouchableOpacity><Image style={styles.image} source={shareIcon}/></TouchableOpacity>
                <TouchableOpacity onPress={() => handleDeleteNote()}><Image style={styles.image} source={deletIcon}/></TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TextInput
                    value={title}
                    onChangeText={setTitle}
                    placeholder="Título"
                    style={{ fontSize: 20, fontWeight: "600", color: "lightgray", width: '70%' } }
                />
                <Text>{date}</Text>
            </View>
        </View>

        <View style={styles.richTextContainer}>
          <RichEditor
            ref={richText}
            onChange={richTextHandle}
            placeholder="Anote aqui suas ideias :"
            androidHardwareAccelerationDisabled={true}
            style={styles.richTextEditorStyle}
            initialHeight={500}
          />
          <RichToolbar
            editor={richText}
            selectedIconTint="#873c1e"
            iconTint="#312921"
            actions={[
              actions.setBold,
              actions.setItalic,
              actions.insertBulletsList,
              actions.insertOrderedList,
              actions.insertLink,
              actions.setStrikethrough,
              actions.setUnderline,
            ]}
            style={styles.richTextToolbarStyle}
          />
        </View>
        {showDescError && (
          <Text style={styles.errorTextStyle}>
            Your content and your Title shouldn't be empty 🤔
          </Text>
        )}

        <TouchableOpacity
          style={styles.saveButtonStyle}
          onPress={submitContentHandle}>
          <Text style={styles.textButtonStyle}>Save</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Tem certeza?</Text>
            <Text style={styles.modalText}>Ao confirmar, a assão não poderá ser desfeita, apenas refeita</Text>
            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity style={styles.modalButtonNo} onPress={() => handleDeleteCancel()}>
                <Text style={styles.modalButtonTextNo}>Não, continuar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButtonYes} onPress={() => handleDeleteConfirm()}>
                <Text style={styles.modalButtonTextYes}>Sim, cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerStyle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#312921",
    marginBottom: 15,
    width: windowWidth,
    height: '15%',
    justifyContent: 'space-between',
  },

  richTextContainer: {
    flex: 1,
    flexDirection: "column-reverse",
    width: windowWidth,
    marginBottom: 10,
    height: '50%',
  },

  richTextEditorStyle: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderWidth: 1,
    borderColor: "#00c0ce",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    fontSize: 20,
  },

  richTextToolbarStyle: {
    backgroundColor: "#00c0ce",
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#f5f5f5",
  },

  errorTextStyle: {
    color: "#FF0000",
    marginBottom: 10,
  },

  saveButtonStyle: {
    backgroundColor: "#00c0ce",
    borderRadius: 10,
    padding: 10,
    width: "25%",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    fontSize: 20,
  },

  textButtonStyle: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
  },

  image : {
    width: 25,
    height: 25,
    marginRight: 15,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '9e9e9e',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: windowWidth*0.7,
  },
  modalButtonYes: {
    backgroundColor: 'red',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    borderWidth: 1,
  },
  modalButtonNo: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    borderWidth: 1,
  },
  modalButtonTextYes: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  modalButtonTextNo: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});

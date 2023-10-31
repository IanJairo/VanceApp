import React, { useEffect, useRef, useState} from 'react';
import { Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, TextInput, Image, Modal, FlatList, Alert } from 'react-native';
import { actions, RichToolbar, RichEditor } from 'react-native-pell-rich-editor';
import moment from 'moment';
import { route } from '@react-navigation/native'

import testIcon from '../assets/profileIcon.png';
import backArrow from '../assets/backArrow.png';
import shareIcon from '../assets/shareIcon.png';
import deletIcon from '../assets/deleteIcon.png';
import selectedStar from '../assets/selectedStar.png';
import unselectedStar from '../assets/unselectedStar.png';
import notesApi from '../providers/notes';

const windowWidth = Dimensions.get('window').width * 0.9;

export default function EditNote({ navigation, route }) {

  const { userDetails, item } = route.params;
  const richText = useRef('');
  const [favorite, setFavorite] = useState(item.isFavorite);
  const [date, setDate] = useState('');
  const [title, setTitle] = useState(item.title);
  const [modalEmail, setModalEmail] = useState('');
  const [deletModalVisible, setDeletModalVisible] = useState(false);
  const [sharedModalVisible, setSharedModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [modalOn, setModalOn] = useState(false);
  const [isSelected, setSelected] = useState(false);

  const [descHTML, setDescHTML] = useState('');
  const [showDescError, setShowDescError] = useState(false);
  const [sharedUsers, setSharedUsers] = useState([
    { name: 'Péricles', email: 'pericles@vance.com', foto: testIcon, permissao: 'true' },
    { name: 'Ian', email: 'ian@vance.com', foto: testIcon, permissao: 'true' },
    { name: 'Joao', email: 'joao@vance.com', foto: testIcon, permissao: 'false' },
  ]);

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
    setDeletModalVisible(true);
    handleOpenModal();
  };

  const handleDeleteConfirm = () => {
    // Delete note logic here

    const response = notesApi.deleteNote(item.id);

    if (response) {
      console.log('Nota deletada com sucesso!');
      setDeletModalVisible(false);
      navigation.navigate('Home');
    } else {
      console.log('Erro ao deletar nota!');
      Alert.alert('Erro', 'Erro ao deletar nota!');
    }

  };

  const handleDeleteCancel = () => {
    setDeletModalVisible(false);
    handleOpenModal();
  };

  const handleShareNote = () => {
    setSharedModalVisible(!sharedModalVisible);
    handleOpenModal();
  };

  const callAddModal = () => {
    setSharedModalVisible(false);
    setAddModalVisible(true);
  }

  const callSharedModal = () => {
    setAddModalVisible(false);
    setSharedModalVisible(true);
  }

  const handleOpenModal = () => {
    if (modalOn) {
      setModalOn(false);
    } else {
      setModalOn(true);
    }
  };

  const addSharedUser = () => {
    const newUser = { name: 'Péricles', email: modalEmail, foto: testIcon, permissao: 'true' };
    setSharedUsers([...sharedUsers, newUser]);
    setAddModalVisible(false);
    setSharedModalVisible(true);
    handleOpenModal();
  };


  const richTextHandle = (descriptionText) => {
    if (!descriptionText || title === '') {
      setShowDescError(true);
      setDescHTML('');
    } else {
      setShowDescError(false);
      setDescHTML(descriptionText);
    }
  };

  const submitContentHandle = async () => {
    const replaceHTML = descHTML.replace(/<(.|\n)*?>/g, '').trim();
    const replaceWhiteSpace = replaceHTML.replace(/&nbsp;/g, "").trim();

    if (replaceWhiteSpace.length <= 0) {
      setShowDescError(true);
    } else {
      // jogar pra api
      console.log(title, descHTML, date, favorite);
      const obj = {
        'user': {
          'id': userDetails.data.user.id,
        },
        "title": title,
        "content": descHTML,
        "date": date,
        'isFavorite': favorite,
      }
      await notes.editNotes(obj, item.id);
      navigation.navigate('Home');
    }
  };

  return (
    <SafeAreaView edges={["bottom", "left", "right"]} style={{ flex: 1 }}>
      <View style={{
        flex: 1,
        height: "100%",
        backgroundColor: "white",
        padding: 20,
        alignItems: "center",
        opacity: modalOn ? 0.1 : 1,
      }}>
        <View style={styles.headerStyle}>
          <View style={{ flexDirection: 'row', marginTop: 20 }}>
            <View style={{ width: '68%' }}>
              <TouchableOpacity onPress={() => navigation.navigate('Home')}><Image source={backArrow} /></TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => changeFavoriteHandle()}><Image style={styles.image} source={favorite ? selectedStar : unselectedStar} /></TouchableOpacity>
            <TouchableOpacity onPress={() => handleShareNote()}><Image style={styles.image} source={shareIcon} /></TouchableOpacity>
            <TouchableOpacity onPress={() => handleDeleteNote()}><Image style={styles.image} source={deletIcon} /></TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TextInput
              value={title}
              onChangeText={setTitle}

              style={{ fontSize: 20, fontWeight: "600", color: "lightgray", width: '70%' }}
            />
            <Text>{date}</Text>
          </View>
        </View>

        <View style={styles.richTextContainer}>
          <RichEditor
            ref={richText}
            onChange={richTextHandle}
            initialContentHTML={item.content}
            placeholder='Digite aqui o conteúdo da sua nota'
            androidHardwareAccelerationDisabled={true}
            style={styles.richTextEditorStyle}
            initialHeight={300}
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
        

      {/* Modal para apagar notas */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={deletModalVisible}
        onRequestClose={() => {
          setDeletModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={[styles.modalText, { fontWeight: 'bold' }]}>Tem certeza?</Text>
            <Text style={styles.modalText}>A exclusão afetará todas as pessoas que têm acesso.</Text>
            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity style={styles.modalButtonNo} onPress={() => handleDeleteCancel()}>
                <Text style={styles.modalButtonTextNo}>Não, cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButtonYes} onPress={() => handleDeleteConfirm()}>
                <Text style={styles.modalButtonTextYes}>Sim, excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={sharedModalVisible}
        onRequestClose={() => {
          setSharedModalVisible(false);
          handleOpenModal();
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.shareHeader}>
              <TouchableOpacity style={{}} onPress={() => handleShareNote()}><Image source={backArrow} style={styles.image} /></TouchableOpacity>
              <TouchableOpacity style={{}} onPress={() => callAddModal()}><Text style={styles.linkText}>Adicionar</Text></TouchableOpacity>
            </View>
            <Text style={styles.h1}>Pessoas com acesso</Text>
            <View style={styles.shareBody}>
              <FlatList
                data={sharedUsers}
                renderItem={({ item }) => (
                  <View style={{ flexDirection: 'row', marginBottom: 15, alignItems: 'center', justifyContent: 'center' }}>
                    <Image source={item.foto} style={styles.image} />
                    <View style={{ flexDirection: 'column', marginRight: 10, width: windowWidth * 0.4 }}>
                      <Text style={styles.h2}>{item.name}</Text>
                      <Text style={styles.h3}>{item.email}</Text>
                    </View>
                    <View>
                      <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => { if (item.permissao === 'true') { item.permissao = 'false' } else { item.permissao = 'true' } }} style={{ height: 15, width: 15, marginLeft: 10, marginRight: 5, borderRadius: 5, backgroundColor: item.permissao === 'true' ? '#00c0ce' : '#7a7a7a' }}></TouchableOpacity>
                        <Text style={styles.linkText1}>Editor</Text>
                      </View>
                    </View>
                  </View>
                )}
                keyExtractor={item => item.email}
                style={{ hidth: windowWidth * 0.9, maxHeight: '90%', }}
              />
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={addModalVisible}
        onRequestClose={() => {
          setAddModalVisible(false);
          handleOpenModal();
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.shareHeader}>
              <TouchableOpacity style={{}} onPress={() => callSharedModal()}><Image source={backArrow} style={styles.image} /></TouchableOpacity>
              <TouchableOpacity style={{}} onPress={() => addSharedUser()}><Text style={styles.linkText}>Done</Text></TouchableOpacity>
            </View>
            <Text style={styles.h1}>Adicionar Pessoas</Text>
            <Text style={styles.h3}>Digite o email da pessoa que deseja adicionar</Text>
            <TextInput
              placeholder="Email"
              style={{ fontSize: 20, fontWeight: "600", color: "lightgray", width: '100%', borderWidth: 1, borderColor: '#7a7a7a', borderRadius: 10, padding: 10, margin: 20 }}
              onChangeText={setModalEmail}
              value={modalEmail}
            />
            <FlatList
              data={sharedUsers}
              renderItem={({ item }) => {
                if (item.email === modalEmail) {
                  return (
                    <View style={{ flexDirection: 'row', marginBottom: 15, alignItems: 'center', justifyContent: 'center' }}>
                      <Image source={item.foto} style={styles.image} />
                      <View style={{ flexDirection: 'column', marginRight: 10, width: windowWidth * 0.4 }}>
                        <Text style={styles.h2}>{item.name}</Text>
                        <Text style={styles.h3}>{item.email}</Text>
                      </View>
                      <View>
                        <View style={{ flexDirection: 'row' }}>
                          <TouchableOpacity
                            onPress={() => { if (item.permissao === 'true') { item.permissao = 'false' } else { item.permissao = 'true' } }}
                            style={{ height: 15, width: 15, marginLeft: 10, marginRight: 5, borderRadius: 5, backgroundColor: item.permissao === 'true' ? '#00c0ce' : '#7a7a7a' }}></TouchableOpacity>
                          <Text style={styles.linkText1}>Editor</Text>
                        </View>
                      </View>
                    </View>
                  );
                } else {
                  return null;
                }
              }}
              keyExtractor={item => item.email}
              style={{ hidth: windowWidth * 0.9, maxHeight: '90%', }}
            />
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
    // width: windowWidth,
    height: '15%',
    justifyContent: 'space-between',
  },
  richTextContainer: {
    flex: 1,
    flexDirection: "column-reverse",
    // width: "100%",
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
  image: {
    width: 25,
    height: 25,
    marginRight: 15,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#B1B1B1',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: windowWidth * 0.7,
  },
  modalButtonYes: {
    backgroundColor: '#E84D5B',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 10,
  },
  modalButtonNo: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: '#B1B1B1',
  },
  modalButtonTextYes: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  modalButtonTextNo: {
    color: '#E84D5B',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  shareModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: windowWidth * 0.8,
    height: '10%',
  },
  shareBody: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: windowWidth * 0.8,
    height: '90%',
  },
  h1: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#7a7a7a',
    marginBottom: 20,
  },
  h2: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  h3: {
    fontSize: 14,
    color: '#7a7a7a',
  },
  linkText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00c0ce',
    marginBottom: 20,
  },
});

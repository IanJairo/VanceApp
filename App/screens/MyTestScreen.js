import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, TextInput, Image } from 'react-native';
import RenderHTML from 'react-native-render-html';
import { actions, RichToolbar ,RichEditor} from 'react-native-pell-rich-editor';
import moment from 'moment';

import backArrow from '../assets/backArrow.png';
import shareIcon from '../assets/shareIcon.png';
import deletIcon from '../assets/deleteIcon.png';

const windowWidth = Dimensions.get('window').width*0.9;
const windowHeight = Dimensions.get('window').height;

export default function MyTest({ navigation }) {
    const richText = useRef();

    const [date, setDate] = useState('');
    const [title, setTitle] = useState('');

    const [descHTML, setDescHTML] = useState('');
    const [showDescError, setShowDescError] = useState(false);

    useEffect(() => {
        const currentDate = new Date();
        const formattedDate = moment(currentDate).format('DD/MM/YYYY');
        setDate(formattedDate);
      }, []);

    const richTextHandle = (descriptionText) => {
        if (descriptionText) {
            setShowDescError(false);
            setDescHTML(descriptionText);
        } else {
            setShowDescError(true);
            setDescHTML('');
        }
    };

    const submitContentHandle = () => {
        const replaceHTML = descHTML.replace(/<(.|\n)*?>/g, '').trim();
        const replaceWhiteSpace = replaceHTML.replace(/&nbsp;/g, "").trim();

        if (replaceWhiteSpace.length <= 0) {
            setShowDescError(true);
        } else {
            // jogar pra api
        }
    };

    return (
        <SafeAreaView edges={["bottom", "left", "right"]} style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ width: '80%' }}>
                    <TouchableOpacity><Image source={backArrow}/></TouchableOpacity>
                </View>
                <TouchableOpacity><Image source={shareIcon}/></TouchableOpacity>
                <TouchableOpacity><Image source={deletIcon}/></TouchableOpacity>
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
            initialHeight={250}
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
            Your content shouldn't be empty 🤔
          </Text>
        )}

        <TouchableOpacity
          style={styles.saveButtonStyle}
          onPress={submitContentHandle}>
          <Text style={styles.textButtonStyle}>Save</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    backgroundColor: "white",
    padding: 20,
    alignItems: "center",
  },

  headerStyle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#312921",
    marginBottom: 10,
  },

  htmlBoxStyle: {
    height: 200,
    width: 330,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
  },

  richTextContainer: {
    display: "flex",
    flexDirection: "column-reverse",
    width: "100%",
    marginBottom: 10,
  },

  richTextEditorStyle: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderWidth: 1,
    borderColor: "#ccaf9b",
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
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccaf9b",
  },
  errorTextStyle: {
    color: "#FF0000",
    marginBottom: 10,
  },

  saveButtonStyle: {
    backgroundColor: "#c6c3b3",
    borderWidth: 1,
    borderColor: "#c6c3b3",
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
    color: "#312921",
  },
});

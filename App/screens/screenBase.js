import React, { useEffect } from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity} from 'react-native';
import { StyleSheet } from 'react-native';

const windowWidth = Dimensions.get('window').width;

export default function MyTestScreen({ navigation }) {
    useEffect(() => {
        navigation.setOptions({
          headerShown: false, // Esta opção oculta o cabeçalho da tela
        });
      }, []);

  return (
    <View style={styles.container}>
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


// const htmlContent = {
//     html: `
//     <h1>Gatos são incríveis</h1>
//     <p>Os gatos são animais fascinantes e misteriosos. Eles são conhecidos por sua independência, elegância e habilidades de caça.</p>
//     <h2>Por que os gatos são tão populares?</h2>
//     <ul>
//         <li>Os gatos são fáceis de cuidar e não precisam de muito espaço.</li>
//         <li>Eles são animais de estimação muito limpos e se limpam sozinhos.</li>
//         <li>Gatos são ótimos companheiros e podem ser muito amorosos.</li>
//         <li>Eles são animais muito inteligentes e podem aprender truques e comandos.</li>
//     </ul>
//     <h2>Curiosidades sobre gatos</h2>
//     <p>Algumas curiosidades interessantes sobre gatos:</p>
//     <ol>
//         <li>Os gatos têm cerca de 100 sons vocais diferentes, enquanto os cães têm apenas cerca de 10.</li>
//         <li>Gatos dormem em média 16 horas por dia.</li>
//         <li>Os gatos têm garras retráteis que os ajudam a escalar e a se defender.</li>
//     </ol>
//     <p>Se você ainda não tem um gato, considere adotar um. Eles são animais de estimação maravilhosos e podem trazer muita alegria e companhia para sua vida.</p>
//     `,
// };

// export default function MyTest({ navigation }) {
//     useEffect(() => {
//         navigation.setOptions({
//           headerShown: false, // Esta opção oculta o cabeçalho da tela
//         });
//       }, []);

//   return (
//     <RenderHTML
//         contentWidth={windowWidth*0.9}
//         source={htmlContent}
//     />
//   );
// }

// const styles = StyleSheet.create({
//     container : {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//         backgroundColor: '#fff',        
//     },
// });

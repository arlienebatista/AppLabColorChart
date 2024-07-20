import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Alert, Dimensions, TouchableOpacity, Modal } from 'react-native';
import Svg, { Circle, Line, Text as SvgText, Defs, LinearGradient, Stop, Rect, Image as SvgImage } from 'react-native-svg';
import ViewShot, { captureRef } from 'react-native-view-shot';
import Icon from 'react-native-vector-icons/Ionicons'; // Importe os ícones
import { useNavigation } from '@react-navigation/native'; // Importe a navegação

// Importa a imagem local
import backgroundImage from '../assets/background.png';

// Get the screen dimensions
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const CIELABGraph = ({ route }) => {
  const { aValue, bValue } = route.params;
  const [lValue, setLValue] = useState(parseFloat(route.params.lValue));
  const svgRef = useRef(null);
  const navigation = useNavigation(); // Use a navegação
  const [modalVisible, setModalVisible] = useState(false); // Estado para controlar a visibilidade do modal

  const circleRadius = Math.min(screenWidth, screenHeight) * 0.4; // Ajusta o raio baseado no tamanho da tela
  const centerX = circleRadius + 15;
  const centerY = circleRadius + 15;

  const convertToSvgCoordinates = (a, b) => {
    return {
      x: centerX + (a * circleRadius) / 100,
      y: centerY - (b * circleRadius) / 100,
    };
  };

  const point = convertToSvgCoordinates(parseFloat(aValue), parseFloat(bValue));

  // Condição para mudar a cor das legendas e pontos
  const pointColor = lValue < 30 ? 'black' : 'black';
  const textColor = lValue < 30 ? 'black' : 'black';

  const saveImage = async () => {
    try {
      const uri = await captureRef(svgRef, {
        format: 'png',
        quality: 1.0,
      });
      Alert.alert('Imagem salva!', `A imagem foi salva como ${uri}`);
    } catch (error) {
      Alert.alert('Atenção!', 'Não foi possível salvar a imagem.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.graphContainer}>
          <ViewShot ref={svgRef} options={{ format: 'png', quality: 1.0 }}>
            <Svg height={centerY * 2} width={centerX * 2} viewBox={`0 0 ${centerX * 2} ${centerY * 2}`}>
              <SvgImage
                x="0"
                y="0"
                width={centerX * 2}
                height={centerY * 2}
                href={backgroundImage}
                preserveAspectRatio="xMidYMid slice"
              />
              <Line
                x1={centerX}
                y1="0"
                x2={centerX}
                y2={centerY * 2}
                stroke="black"
                strokeWidth="1"
              />
              <Line
                x1="0"
                y1={centerY}
                x2={centerX * 2}
                y2={centerY}
                stroke="black"
                strokeWidth="1"
              />
              <SvgText
                x={centerX + circleRadius + 5}
                y={centerY + 15}
                fontSize="15"
                fill={textColor}
                textAnchor="middle"
                zIndex={1}
              >
                a*
              </SvgText>
              <SvgText
                x={centerX - 8}
                y={centerY - circleRadius + 0}
                fontSize="15"
                fill={textColor}
                textAnchor="middle"
                zIndex={1}
              >
                b*
              </SvgText>
              <Circle
                cx={point.x}
                cy={point.y}
                r="5"
                stroke={pointColor}
                strokeWidth="2"
                fill="none"
              />
              <SvgText
                x={point.x + 10}
                y={point.y}
                fontSize="16"
                fill={textColor}
              >
                ({aValue}, {bValue})
              </SvgText>
            </Svg>
          </ViewShot>
        </View>
        <View style={styles.gradientContainer}>
          <Svg height="25" width={screenWidth - 20}>
            <Defs>
              <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
                <Stop offset="0" stopColor="#FFFFFF" stopOpacity="1" />
                <Stop offset="100" stopColor="#000000" stopOpacity="1" />
              </LinearGradient>
            </Defs>
            <Rect
              x="0"
              y="0"
              width={screenWidth - 20}
              height="25"
              fill="url(#grad)"
            />
            <Line
              x1={(screenWidth - 20) * lValue / 100}
              y1="0"
              x2={(screenWidth - 20) * lValue / 100}
              y2="25"
              stroke="red"
              strokeWidth="3"
            />
          </Svg>
          <Text style={styles.sliderLabel}>L*: {lValue}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={saveImage}>
            <Text style={styles.buttonText}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('Home')}>
          <Icon name="home" size={30} color="#007bff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer} onPress={() => setModalVisible(true)}>
          <Icon name="alert-circle" size={30} color="#007bff" />
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>NOTA: Este é um aplicativo para Android em fase de teste, bugs podem ocorrer.</Text>
            <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 80, // distância do gráfico para a parte de cima
  },
  graphContainer: {
    flex: 1,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
  },
  gradientContainer: {
    alignItems: 'center',
    width: '100%',
    marginBottom: 100, // distância do gradiente para o gráfico
  },
  sliderLabel: {
    fontSize: 15,
    marginTop: 5,
  },
  buttonContainer: {
    marginBottom: 50,
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#007bff', // Azul padrão
    borderRadius: 25, // Arredondar os cantos
    padding: 15, // Espaço interno
    width: '50%', // Largura do botão
    alignItems: 'center', // Alinha o texto ao centro
  },
  buttonText: {
    color: '#FFFFFF', // Cor do texto do botão
    fontSize: 16,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#f8f9fa',
    borderTopWidth: 1,
    borderTopColor: '#dee2e6',
  },
  iconContainer: {
    alignItems: 'center',
  },
  iconLabel: {
    fontSize: 12,
    color: '#007bff',
    marginTop: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#007bff',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    width: '100%',
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default CIELABGraph;

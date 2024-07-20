import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, Alert, BackHandler, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const LabColorChart = ({ navigation }) => {
  const [lValue, setLValue] = useState('');
  const [aValue, setAValue] = useState('');
  const [bValue, setBValue] = useState('');

  const handleGraph = () => {
    if (lValue === '' || aValue === '' || bValue === '') {
      Alert.alert('Atenção!', 'Os valores de L*, a* e b* não podem ficar vazios.');
      return;
    }
    navigation.navigate('CIELABGraph', { lValue, aValue, bValue });
  };

  const handleLimpar = () => {
    setLValue('');
    setAValue('');
    setBValue('');
  };

  const handleSair = () => {
    Alert.alert(
      'Sair',
      'Tem certeza de que deseja sair do aplicativo?',
      [
        {
          text: 'Cancelar',
          onPress: () => console.log('Cancelado'),
          style: 'cancel',
        },
        {
          text: 'Sair',
          onPress: () => BackHandler.exitApp(),
        },
      ],
      { cancelable: false }
    );
  };

  const handleNumericInput = (text, setter) => {
    const numericText = text.replace(/[^0-9.-]/g, '');
    if (numericText.indexOf('-') > 0) {
      setter(numericText.replace('-', ''));
    } else {
      setter(numericText);
    }
  };

  const handleInfo = () => {
    Alert.alert(
      'Informações:',
      'Este aplicativo permite que você insira valores de L*, a* e b* para de monstrar os pontos no espaço CIELab. Utilize os campos para inserir os valores e clique em "Mostrar" para visualizar o gráfico.',
      [{ text: 'OK' }],
      { cancelable: true }
    );
  };

  const handleRegistro = () => {
    Alert.alert(
      'Registro:',
      'O LAB Color Chart Software está registrado no INPI sob o número: BR512024000538-2',
      [{ text: 'OK' }],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Text style={styles.title}>Informe os valores de Lab:</Text>
      <TextInput
        style={styles.input}
        placeholder="L*:"
        value={lValue}
        onChangeText={(text) => handleNumericInput(text, setLValue)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="a*:"
        value={aValue}
        onChangeText={(text) => handleNumericInput(text, setAValue)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="b*:"
        value={bValue}
        onChangeText={(text) => handleNumericInput(text, setBValue)}
        keyboardType="numeric"
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleGraph}>
          <Text style={styles.buttonText}>Mostrar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleLimpar}>
          <Text style={styles.buttonText}>Limpar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSair}>
          <Text style={styles.buttonText}>Sair</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Icon name="home" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleInfo}>
          <Icon name="info-circle" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleRegistro}>
          <Icon name="registered" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C2F33',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 50,
  
  },
  title: {
    color: 'white',
    fontSize: 20,
    marginBottom: 10,
  },
  input: {
    width: '80%',
    backgroundColor: 'white',
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '85%',
    marginTop: 20,
  },
  button: {
    flex: 1,
    marginHorizontal: 6,
    borderRadius: 25, // Canto mais arredondado
    backgroundColor: '#007bff', // Cor padrão do botão do React Native
    padding: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '120%',
    padding: 10,
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#23272A',
  },
});

export default LabColorChart;

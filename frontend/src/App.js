import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image } from 'react-native';

// Componente principal
export default function App() {
  const [screen, setScreen] = useState('home'); // Controle de tela
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [necessidade, setNecessidade] = useState('');
  const [cadastro, setCadastro] = useState(null);

  // Função de cadastro (mock para integração com Cardano)
  const handleCadastro = () => {
    if (nome && cpf && necessidade) {
      setCadastro({ nome, cpf, necessidade, creditos: 0, selo: 'FitaVermelha' });
      setScreen('perfil');
    } else {
      alert('Preencha todos os campos!');
    }
  };

  // Tela inicial
  if (screen === 'home') {
    return (
      <View style={styles.container}>
        <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.logo} />
        <Text style={styles.title}>Melhorando a Vida</Text>
        <Text style={styles.subtitle}>Mude sua vida, mude o Brasil!</Text>
        <Button title="Cadastrar" onPress={() => setScreen('cadastro')} color="#006400" />
      </View>
    );
  }

  // Tela de cadastro
  if (screen === 'cadastro') {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Cadastro</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={nome}
          onChangeText={setNome}
        />
        <TextInput
          style={styles.input}
          placeholder="CPF"
          value={cpf}
          onChangeText={setCpf}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Necessidade (ex.: Consulta médica)"
          value={necessidade}
          onChangeText={setNecessidade}
        />
        <Button title="Enviar" onPress={handleCadastro} color="#006400" />
        <Button title="Voltar" onPress={() => setScreen('home')} color="#FF0000" />
      </View>
    );
  }

  // Tela de perfil
  if (screen === 'perfil' && cadastro) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Bem-vindo, {cadastro.nome}!</Text>
        <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.selo} />
        <Text style={styles.subtitle}>Selo: {cadastro.selo}</Text>
        <Text>Créditos: {cadastro.creditos}</Text>
        <Text>Necessidade: {cadastro.necessidade}</Text>
        <Button title="Voltar" onPress={() => setScreen('home')} color="#FF0000" />
      </View>
    );
  }
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFF00', // Amarelo (bandeira do Brasil)
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  selo: {
    width: 100,
    height: 100,
    marginVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#006400', // Verde (bandeira do Brasil)
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#FF0000', // Vermelho (selo Fita Vermelha)
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: '#006400',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
  },
});

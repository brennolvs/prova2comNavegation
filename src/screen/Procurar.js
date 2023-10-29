import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import axios from 'axios';

const API_URL = 'http://192.168.0.103:3001/produtos';

const BuscaProdutosPorNome = () => {
  const [produtos, setProdutos] = useState([]);
  const [nomeProduto, setNomeProduto] = useState('');

  const buscarProdutosPorNome = async () => {
    try {
      const response = await axios.get(API_URL);
      const produtosFiltrados = response.data.filter(
        (produto) =>
          produto.nome.toLowerCase().includes(nomeProduto.toLowerCase())
      );
      setProdutos(produtosFiltrados);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };

  useEffect(() => {
    buscarProdutosPorNome();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Buscar Produtos por Nome</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o nome do produto"
        value={nomeProduto}
        onChangeText={(text) => setNomeProduto(text)}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={buscarProdutosPorNome}
      >
        <Text style={styles.buttonText}>Buscar</Text>
      </TouchableOpacity>
      <Text style={styles.titulo2}>Produtos Encontrados:</Text>
      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image
              style={styles.itemImage}
              source={{ uri: item.image }}
            />
            <Text style={styles.itemText}>{item.nome}</Text>
            <Text style={styles.itemDescription}>Descrição: {item.descricao}</Text>
            <Text style={styles.itemPrice}>Preço: {item.preco.toFixed(2)}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#800080',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#00BFFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  item: {
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#FFA500',
    borderRadius: 5,
  },
  titulo2: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    marginTop: 30,
    color: '#800080'
  },
  itemImage: {
    width: 300,
    height: 280,
    borderRadius: 5,
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemDescription: {
    fontSize: 14,
  },
  itemPrice: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  }
});

export default BuscaProdutosPorNome;

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

const URL_API = 'http://192.168.0.103:3001/produtos';

const CategoriaProdutos = () => {
  const [produtos, setProdutos] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);

  useEffect(() => {
    buscarProdutos();
  }, [categoriaSelecionada]);

  const buscarProdutos = async () => {
    try {
      const resposta = await axios.get(URL_API);
      const produtosFiltrados = resposta.data.filter(
        (produto) =>
          categoriaSelecionada === null ||
          produto.categoria_id === categoriaSelecionada
      );
      setProdutos(produtosFiltrados);
    } catch (erro) {
      console.error('Erro ao buscar produtos:', erro);
    }
  };

  return (
    <View style={estilos.container}>
      <Text style={estilos.titulo}>Selecione uma categoria:</Text>
      <View style={estilos.botoesContainer}>
        <TouchableOpacity
          style={estilos.botao}
          onPress={() => setCategoriaSelecionada(2)}
        >
          <Text style={estilos.botaoTexto}>Refrigerantes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={estilos.botao}
          onPress={() => setCategoriaSelecionada(1)}
        >
          <Text style={estilos.botaoTexto}>Hamburgueres</Text>
        </TouchableOpacity>
      </View>
      <Text style={estilos.titulo2}>Produtos:</Text>
      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={estilos.item}>
            <Text style={estilos.textoDetalhesProduto}>{item.nome}</Text>
            <Text>Descrição: {item.descricao}</Text>
            <Text style={estilos.textoDetalhesProduto}>Preço: R$ {item.preco.toFixed(2)}</Text>
          </View>
        )}
      />
    </View>
  );
};

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  botoesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#800080',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#800080',
  },
  item: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#FFA500',
    borderRadius: 5,
  },
  botao: {
    backgroundColor: '#00BFFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 29,
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
  titulo2: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 40,
    color: '#800080',
  },
  textoDetalhesProduto: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CategoriaProdutos;

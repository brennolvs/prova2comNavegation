import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

const URL_API = 'http://192.168.0.103:3001/produtos';

const SeletorDeProduto = () => {
  const [produtos, setProdutos] = useState([]);
  const [idProdutoSelecionado, setIdProdutoSelecionado] = useState(null);

  useEffect(() => {
    buscarProdutos();
  }, []);

  const buscarProdutos = async () => {
    try {
      const resposta = await axios.get(URL_API);
      const dados = resposta.data;
      if (dados) {
        setProdutos(dados);
      } else {
        console.error('Formato de dados inválido');
      }
    } catch (erro) {
      console.error('Erro ao buscar dados:', erro);
    }
  };

  const produtoSelecionado = produtos.find((produto) => produto.id === idProdutoSelecionado);

  return (
    <View style={estilos.container}>
      <Text style={estilos.titulo}>Selecione um Produto</Text>

      <Picker
        selectedValue={idProdutoSelecionado}
        onValueChange={(valor) => setIdProdutoSelecionado(valor)}
        style={estilos.seletor}
      >
        <Picker.Item label="Selecione um produto" value={null} />
        {produtos.map((produto) => (
          <Picker.Item key={produto.id} label={produto.nome} value={produto.id} />
        ))}
      </Picker>

      {produtoSelecionado && (
        <View style={estilos.containerDetalhesProduto}>
          <Image
            style={estilos.imagemProduto}
            source={{ uri: produtoSelecionado.image }}
          />
          <Text style={estilos.textoDetalhesProduto}>Nome: {produtoSelecionado.nome}</Text>
          <Text style={estilos.textoDetalhesProduto2}>{produtoSelecionado.descricao}</Text>
          <Text style={estilos.preco}>Preço: R$ {produtoSelecionado.preco.toFixed(2)}</Text>
        </View>
      )}
    </View>
  );
};

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#800080',
    textAlign: 'center',
  },
  seletor: {
    height: 50,
    width: '100%',
    marginBottom: 16,
  },
  containerDetalhesProduto: {
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#FFA500',
    borderRadius: 5,
  },
  imagemProduto: {
    width: 300,
    height: 280,
    borderRadius: 5,
  },
  textoDetalhesProduto: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  textoDetalhesProduto2: {
    textAlign: 'center',
    fontSize: 14,
  },
  preco: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  }
});

export default SeletorDeProduto;
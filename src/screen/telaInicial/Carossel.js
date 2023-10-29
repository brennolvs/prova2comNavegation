import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, Dimensions } from 'react-native';
import Carousel, { PaginationLight } from 'react-native-x-carousel';
import Axios from 'axios';

const { width, height } = Dimensions.get('window');

const Carossel = () => {
  const [dadosProdutos, setDadosProdutos] = useState([]);

  useEffect(() => {
    Axios.get('http://192.168.0.103:3001/produtos')
      .then(resposta => {
        setDadosProdutos(resposta.data);
      })
      .catch(erro => {
        console.error('Erro ao buscar dados da API:', erro);
      });
  }, []);

  const dadosFormatados = dadosProdutos.map(item => ({
    imagemCapaUri: item.image,
    corLabelCanto: '#00BFFF',
    textoLabelCanto: item.nome,
  }));

  const renderItem = data => (
    <View key={data.imagemCapaUri} style={styles.containerCartao}>
      <Image style={styles.cartao} source={{ uri: data.imagemCapaUri }} />
      <View
        style={[
          styles.labelCanto,
          { backgroundColor: data.corLabelCanto },
        ]}
      >
        <Text style={styles.textoLabelCanto}>{data.textoLabelCanto}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.containerCarrossel}>
        <Carousel
          pagination={PaginationLight}
          renderItem={renderItem}
          data={dadosFormatados}
          loop
          autoplay
          direction="vertical"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  containerCarrossel: {
    alignItems: 'center',
    backgroundColor: 'white',
  },
  containerCartao: {
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  cartao: {
    width: width,
    height: height * 0.4,
    borderRadius: 8,
    resizeMode: 'contain',
  },
  labelCanto: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderTopLeftRadius: 8,
  },
  textoLabelCanto: {
    fontSize: 12,
    color: '#FFF',
    fontWeight: '600',
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 2,
    paddingBottom: 2,
  },
});

export default Carossel;

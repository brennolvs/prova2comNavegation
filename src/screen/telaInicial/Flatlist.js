import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import axios from 'axios';

const FlatlistProdutos = () => {
    const [produtos, setProdutos] = useState([]);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        buscarProdutos();
    }, []);

    const buscarProdutos = async () => {
        try {
            const resposta = await axios.get('http://192.168.0.103:3001/produtos');
            setProdutos(resposta.data);
            setCarregando(false);
        } catch (erro) {
            console.error('Erro ao buscar produtos:', erro);
        }
    };

    const handlePressProduto = (descricao, nome) => {
        Alert.alert(nome, descricao);
    };

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                style={styles.itemProduto}
                onPress={() => handlePressProduto(item.descricao, item.nome)}>
                <View>
                    <Text style={styles.nomeProduto}>{item.nome}</Text>
                    <Text>Preço: R$ {item.preco.toFixed(2)}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Produtos</Text>
            {carregando ? (
                <Text>Carregando...</Text>
            ) : (
                <FlatList
                    data={produtos}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                />
            )}
        </View>
    );
};

export default FlatlistProdutos;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 16,
    },
    itemProduto: {
        backgroundColor: '#FFA500',
        marginBottom: 20,
        padding: 16,
        borderRadius: 10,
        elevation: 3
    },
    nomeProduto: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
    },
    descricao: {
        fontSize: 14,
        color: 'black',
        marginTop: 8,
    },
    titulo: {
        fontSize: 22,
        lineHeight: 20,
        marginHorizontal: 2,
        marginBottom: 15,
        fontWeight: "bold",
        color: '#800080',
    }
});
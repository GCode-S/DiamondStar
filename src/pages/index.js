import React, { Component, useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ToastAndroid
} from "react-native";

import Constants from 'expo-constants';
import { Ionicons, FontAwesome, MaterialCommunityIcons, Fontisto, AntDesign } from '@expo/vector-icons'; 

import Products from '../data';

export default function Home (){

    const [product, setProducts] = useState(Products);
    const [modalVisible, setModalVisible] = useState(false);
    const [itemModal, setItemModal] = useState(false);

    function handleLike(item){

        var cor; 

        const { id, image, title, value, discount, description, like } = item;

        if(like == '#000'){
            cor = '#ff0000';
        }
        else{
            cor = '#000';
        }

        const newObjct = {
            id,
            image,
            title,
            value,
            discount,
            description,
            like: cor
        }
        const maping = product.map(produt => produt.id == item.id ? newObjct : produt);
        setProducts(maping);
    }

    return (
       <View style={styles.conteiner}>

            <View style={styles.header}>

               <FontAwesome name="diamond"
                            size={20}
                            color="#bf8040" />

               <Text style={styles.headerTitle}>
                   Diamond Star
               </Text>

               <Ionicons style={styles.iconSearch}
                         name="ios-search"
                         size={24}
                         color="#000" />
            </View>

            {itemModal && 
                                    <Modal
                                        animationType='slide'
                                        transparent={true}
                                        visible={modalVisible}
                                        onRequestClose={() => {
                                            Alert.alert("Modal has been closed.");
                                        }}>

                                        <View style={styles.centeredView}>
                                            <View style={styles.modalView} >

                                                <TouchableOpacity style={styles.modalClose} onPress={() => {setModalVisible(!modalVisible);}} >
                                                    <AntDesign name="close" size={20} color="black" />
                                                </TouchableOpacity>

                                                <Image source={itemModal.image} style={{width:263, height: 259}} />

                                                <Text style={{margin:7}}>
                                                    {itemModal.title}
                                                </Text>

                                                <View style={styles.descriptionView}>

                                                    <View style={styles.rowView}>
                                                        <Text style={styles.textBold}>Modelo:</Text>
                                                        <Text>{itemModal.description.modelo}</Text>
                                                    </View>

                                                    <View style={styles.rowView}>
                                                        <Text style={styles.textBold}>Cor:</Text>
                                                        <Text>{itemModal.description.cor}</Text>
                                                    </View>

                                                    <View style={styles.rowView}>
                                                        <Text style={styles.textBold}>Banho:</Text>
                                                        <Text>{itemModal.description.banho}</Text>
                                                    </View>

                                                </View>

                                                <View style={{alignItems:'center'}}>

                                                    <Text style={{fontSize:16, fontWeight:'bold', color:'#100DA8'}}>{itemModal.discount}</Text>

                                                    <TouchableOpacity style={styles.purchase} onPress={() =>{{setModalVisible(!modalVisible); ToastAndroid.show("Development...", ToastAndroid.SHORT);}}}>
                                                        <Text style={{color:'#fff', fontWeight:'bold'}}>Comprar</Text>
                                                        <Fontisto name="opencart" size={24} color="white" />
                                                    </TouchableOpacity>
                                                </View>
                                            </View>

                                        </View>
                                    </Modal>
                               
                            }
           
                    <FlatList
                        data={product}
                        keyExtractor={product => String(product.id)}
                        renderItem={({item: product}) =>(

                            <View style={styles.centerFrames}>
                                                
                                <View style={styles.frames}>

                                    <TouchableOpacity  onPress={() => {setItemModal(product);setModalVisible(true);}} style={styles.framesImage}>

                                        <Image style={styles.image} source={product.image} />

                                    </TouchableOpacity>

                                    <Text style={styles.framesTitle}>
                                        {product.title}
                                    </Text>

                                    <View style={styles.framesFooter}>
                                        <View>
                                            <Text style={styles.value}>
                                                {product.value}
                                            </Text>
                                            
                                            <Text style={styles.discount}>
                                                {product.discount}
                                            </Text>

                                        </View>

                                        <View>

                                            <Text style={styles.frete}>
                                                Frete grátis
                                            </Text>

                                            <MaterialCommunityIcons name="truck-fast"
                                                                    size={24} 
                                                                    color="#2FCB3E" />

                                        </View>
                                        
                                    </View>

                                    <TouchableOpacity onPress={() =>handleLike(product)} style={{alignItems:'center',marginTop:-30}}>

                                            <Fontisto name="heart-alt"
                                                      size={28}
                                                      color={product.like} />

                                    </TouchableOpacity>
                         
                                </View>
             
                            </View>

                        )}
                
                    />
                       
       </View>
      );

}

const styles = StyleSheet.create({
    conteiner:{
        flex:1,
        paddingTop: Constants.statusBarHeight,
        backgroundColor:'#f1f1f1'
    },

    header:{
        width: '100%',
        height: 40,
        backgroundColor:'#fff',
        borderBottomWidth:1,
        borderBottomColor: '#ddd',
        alignItems:"center",
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:20
    },

    headerTitle:{
        fontSize: 18,
        color:'#000',
        fontWeight: 'bold',
    },

    centerFrames:{
        alignItems:'center',
        width:'100%',
        marginTop:10
    },

    frames:{
        backgroundColor:'#FFF',
        width: '84%',
        height:276,
        marginTop: 20,
        borderRadius:12,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        
        elevation: 11,
    },

    framesImage:{
        alignItems:'center',
    },
     
    image:{
        width:146,
        height:152
    },

    framesTitle:{
        margin:10
    },

    framesFooter:{
        flexDirection:'row',
        marginTop:10,
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal:20
    },

    value:{
        textDecorationLine:'line-through'
    },

    discount:{
        fontSize:18,
        color:'#100DA8',
        fontWeight:'bold'
    },

    frete:{
        color:'#2FCB3E'
    },

    centeredView:{
        flex:1,
        marginTop:50,
        alignItems:'center'
    },

    modalView:{
        backgroundColor:'#fff',
        borderRadius:20,
        width:'77%',
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },

    modalClose:{
        alignSelf:'flex-end',
        marginRight:10,
        marginTop:4
    },

    purchase:{
        flexDirection: 'row',
        width: '80%',
        backgroundColor:'#355FF8',
        height: 40,
        justifyContent:'space-around',
        paddingHorizontal:30,
        alignItems:'center',
        borderRadius: 8,
        margin:10
    },

    descriptionView:{
        marginTop: 8,
        marginBottom:8
    },
 
    rowView:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal: 20,
        margin: 5
    },

    textBold:{
        fontWeight: 'bold',
        
    },

  });








 
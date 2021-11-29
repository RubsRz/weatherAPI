import React, {useState} from "react";
import { StyleSheet, Text, View, Alert, Button, TextInput, Image } from "react-native";
import axios from 'axios';

const peticion = () => {
  const [location,setLocation] = useState('');
  const [temp,setTemp] = useState(-5000000000);
  const params = {
    access_key: '57b1e99f85fe08f87b577c1922f8d68e',
    query: location
  };

  axios.get('http://api.weatherstack.com/current', {params})
  .then(response => {
    const apiResponse = response.data;
    setTemp(apiResponse.current.temperature);
  }).catch(error => {
    console.log(error);
  });

return(
  <View style={styles.content}>
      <Text>Ciudad, País: </Text>
            <TextInput
                style={styles.input}
                placeholder='Ej: Zacatecas, México'
                onChangeText={(val) => setLocation(val)}
            />
        <View style={{ flexDirection: 'row', marginTop: 60}}>
          <Button
              title= "TEMPERATURA"
              color= "red"
              onPress={() => { Alert.alert(`${location} tiene una temperatura de ${temp}°C`)} }
            />
        </View>

      <View style={styles.content}>
      {
        temp === -5000000000 ?
      <Text style={styles.prev}> Escribe una ciudad o país para conocer su temperatura</Text> 
      :  temp <=0 ?
      <><Text style={styles.textImg}>{temp}℃</Text><Image style={styles.imagen} source={require('./img/muyFrio.png')} /></> 
      : temp>0 && temp<=10 ? 
      <><Text style={styles.textImg}>{temp}℃</Text><Image style={styles.imagen} source={require('./img/frio.png')}/></>
      : temp >10 && temp<=20 ?
      <><Text style={styles.textImg}>{temp}℃</Text><Image style={styles.imagen} source={require('./img/templado.png')}/></>
      : temp >20 && temp<=25 ?
      <><Text style={styles.textImg}>{temp}℃</Text><Image style={styles.imagen} source={require('./img/calido.png')}/></>
      : //De ley es mayor a 25
      <><Text style={styles.textImg}>{temp}℃</Text><Image style={styles.imagen} source={require('./img/muyCalido.png')}/></>
      
      }
      </View>

      
      <View style={styles.footer}>
        <Text style={styles.footerTxt}>Aplicación desarrollada por:</Text>
        <Text style={styles.footerTxt}>Muñiz Gutiérrez Israel de Jesús</Text>
        <Text style={styles.footerTxt}>Rodríguez Pérez Rubén Alejandro</Text>
      </View>

  </View>
);

}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: "#DDD",
    padding:10,
    margin:10,
    alignItems: 'center',
    fontSize: 24
    // justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#007',
    padding: 8,
    margin: 10,
    width: 300,
  },
  imagen: {
    margin: 40,
    width: 300,
    height: 300
  },
  textImg: {
    color: '#03045e',
    fontSize: 30,
    fontWeight: 'bold'
  },
  prev: {
    fontSize: 25,
    textAlign: "center",
    color: '#d62828'
  },
  footer: {
    alignItems: "center",
    width: 1000,
    position: 'relative',
    bottom: 0,
    backgroundColor: '#555b6e',
  },
  footerTxt: {
    fontSize: 18,
    color: '#faf9f9'
  }
})

export default peticion;
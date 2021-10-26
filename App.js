import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Picker, CheckBox, Image } from 'react-native';

export default function App() {
  const [identificacion, setIdentificacion] = useState('');
  const [nombre, setNombre] = useState('');
  const [destino, setDestino] = useState("");
  const [nroPersonas, setNroPersonas] = useState("");
  const [nroDias, setNroDias] = useState('');
  const [barco, setBarco] = useState(false);
  const [discoteca, setDiscoteca] = useState(false);
  const [totalPago, setTotalPagar] = useState("");
  const [error, setError] = useState();

  let personasViaje = parseInt(nroPersonas);
  let diasViaje = parseInt(nroDias);
  let costoAdicional = 0;
  let total;
  let descuento = false;

  const viaje = () => {
    if (identificacion == '') {
      setError('Digite Identifiacion')
    } else if (nombre == '') {
      setError('Digite un Nombre')
    } else if (destino == '') {
      setError('Debe seleccionar un destino')
    } else if (nroPersonas == '') {
      setError('el numero de personas debe de ser mayor a 0')
    } else if (nroDias == '') {
      setError('el numero de Dias debe de ser mayor a 0')
    } else {

      if (barco) {
        costoAdicional += 100000;
      }

      if (discoteca) {
        costoAdicional += 120000;
      }

      if (personasViaje >= 10) {
        descuento = true;
      }

      switch (destino) {
        case 'ca':
          total = ((300000 * personasViaje) * diasViaje) + (costoAdicional * personasViaje);
          setTotalPagar((descuento) ? total - (total * 0.10) : total);
          setError('')
          costoAdicional = 0;
          break;

        case 'sm':
          total = ((250000 * personasViaje) * diasViaje) + (costoAdicional * personasViaje);
          setTotalPagar((descuento) ? total - (total * 0.10) : total);
          setError('')
          costoAdicional = 0;
          break;

        case 'sa':
          total = ((200000 * personasViaje) * diasViaje) + (costoAdicional * personasViaje);
          setTotalPagar((descuento) ? total - (total * 0.10) : total);
          setError('')
          costoAdicional = 0;
          break;
      }
    }
  };

  const limpiar = () => {
    setIdentificacion("");
    setBarco("");
    setDestino("");
    setDiscoteca('');
    setError('');
    setTotalPagar('');
    setNombre('');
    setNroDias('');
    setNroPersonas('')
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Agencia de Turismo</Text>
      </View>
      <View style={styles.form}>

        <Image
          source={require('./images/descarga.jpg')}
          style={{ width: 150, height: 100, borderRadius: 10, borderColor: 'red', borderWidth: 2, resizeMode: 'stretch', marginRight: 5 }}
        />

        <View style={styles.conts}>
          <Text>Identificación: </Text>
          <TextInput style={styles.inputs} onChangeText={setIdentificacion} value={identificacion}></TextInput>
        </View>

        <View style={styles.conts}>
          <Text>Nombre: </Text>
          <TextInput style={styles.inputs} onChangeText={setNombre} value={nombre}></TextInput>
        </View>

        <View style={styles.conts}>
          <Text>Destino</Text>
          <Picker
            selectedValue={destino}
            style={{ height: 30, width: 150 }}
            onValueChange={(itemValue, itemIndex) => setDestino(itemValue)}
          >
            <Picker.Item label="Selecciona viaje" value="" />
            <Picker.Item label="Cartagena" value="ca" />
            <Picker.Item label="Santa Marta" value="sm" />
            <Picker.Item label="San Andres" value="sa" />
          </Picker>
        </View>

        <View style={styles.conts}>
          <Text>personas: </Text>
          <TextInput style={styles.inputs} onChangeText={setNroPersonas} value={nroPersonas}></TextInput>
        </View>

        <View style={styles.conts}>
          <Text>dias: </Text>
          <TextInput style={styles.inputs} onChangeText={setNroDias} value={nroDias}></TextInput>
        </View>

        <View style={styles.conts}>
          <Text>Adicionales: </Text>
          <View>
            <Text>Barco </Text>
            <CheckBox
              value={barco}
              onValueChange={setBarco}
            />

            <Text>Discoteca </Text>
            <CheckBox
              value={discoteca}
              onValueChange={setDiscoteca}
            />
          </View>
        </View>

        <View style={styles.conts}>
          <Text>Tota a pagar: </Text>
          <TextInput style={styles.inputs} value={totalPago}></TextInput>
        </View>

      </View>
      <Text style={{ color: 'red' }}>{error}</Text>
      <View style={styles.footer}>
        <Button style={styles.button} title="Calcular" onPress={viaje}></Button>
        <Button style={styles.button} title="Limpiar" onPress={limpiar}>Limpiar</Button>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

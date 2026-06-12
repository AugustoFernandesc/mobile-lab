import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Pressable, Image, ImageBackground } from 'react-native';
import { Footer } from './Footer';


export default function App() {
  return (
    
      
      <ImageBackground
      source={require('./assets/imageFundo.jpeg')}
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}
      >
    
      <Image
      source={require('./assets/logoMgFitClean.png')}
      style={{
        width: 150,
        height: 150,
      }}
      />

      <TextInput placeholder='Email' cursorColor='blue' style={{
        width: '50%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        backgroundColor: '#ccc'
      }}/>

      <TextInput placeholder='Senha' cursorColor='blue' style={{
        width: '50%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        marginTop: 12,
        backgroundColor: '#ccc',
      }}/>

      <Pressable 
      style={{
        backgroundColor: '#faf9f9',
        padding: 12,
        borderRadius: 8,
        width: '50%',
        alignItems: 'center',
        marginTop: 16,
      }}
      >        
      <Text style={{color: 'black', fontWeight: 'bold'}}>
          Entrar  
      </Text>  
        
      </Pressable>

      <Footer/>
      
    </ImageBackground>  
    
  );
}

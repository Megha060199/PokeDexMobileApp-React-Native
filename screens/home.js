import React,{useEffect,useState} from 'react';
import {
    View,
    Text,
   FlatList,Image, 
   TouchableOpacity,
   StyleSheet
  } from 'react-native';
  import axios from "axios";
  import { useNavigation } from '@react-navigation/native';
  import { width } from './helper'
const HomeScreen = ()=>{
    const [pokemonData,setPokemonData] = useState([])
    const navigation = useNavigation()
    useEffect(()=>{
        axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=180`)
      .then(function (response) {
        const { data } = response;  
        const { results } = data;
        let newPokemonData = {};
         newPokemonData =  results.map((pokemon, index) => {
            return {
                name:pokemon.name,
                sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
              index + 1
            }.png`
            }
        });
        // alert(JSON.stringify(newPokemonData))
        setPokemonData(newPokemonData);
      });;
    },[])
  
    const renderPokemonList = (item,ind)=>{
        let Image_Http_URL ={ uri:item.sprite };
        return (
            <View style = {styles.listViewStyle}>
                <TouchableOpacity onPress = {()=>navigation.navigate('singlepokemon',{
                    pokemonId:ind+1
                })}
                style = {{flexDirection:'row'}}>
                    <View style = {styles.listImageStyle}>
                      <Image
                      resizeMode = 'contain'
            source={Image_Http_URL} style = {styles.pokemonImage} />
            </View>
            <View  style = {styles.pokemonName}>
<Text style = {styles.pokemonTextStyle}>{item.name}</Text>
</View>
</TouchableOpacity>

</View>
        )

    }
return (
    <View style = {{flex:1}}>
        <View style={{height:50,width:width,backgroundColor:'#1b2f69',borderBottomLeftRadius:10, borderBottomRightRadius:10}}>
<Text style = {{color:'white',marginTop:15,marginLeft:25,fontSize:18}}>PokeDex</Text>
            </View>
            <Text style = {{textAlign:'center',fontSize:16,fontWeight:'600',marginVertical:13}}>Pokemon's</Text>
       <FlatList data = {pokemonData}
       style={{flex:1}}
       keyExtractor={(item)=>item.name}
       renderItem={({item,index})=>renderPokemonList(item,index)}/>
    </View>
)
}

const styles = StyleSheet.create({
   listViewStyle :{
       borderColor:'#0d1838',
       borderWidth:1.5,
       borderRadius:5,
       marginHorizontal:20,
       marginVertical:10
    },
   listImageStyle :{ flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    position: 'relative'},
    pokemonImage:
        { 
            justifyContent:'center',
            height:50, position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,  
    },
    pokemonName:{ flex: 1,
        paddingVertical:20,
justifyContent: 'center',
alignItems: 'center',
backgroundColor:'#1b2f69',
position: 'relative'},
pokemonTextStyle:
    { color:'white', fontSize:14,textAlign:'center'}

    

    });
export default HomeScreen
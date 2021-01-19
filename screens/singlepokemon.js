import React,{useEffect,useState} from 'react';
import {
    View,
    Text,
   Dimensions,
   FlatList,Image, 
   TouchableOpacity,
   ScrollView,
   ToastAndroid
  } from 'react-native';
  import { useNavigation,useRoute } from '@react-navigation/native';
  import axios from "axios";
  import {get,isEmpty} from 'lodash'
  import { setPokemonToSave } from '../store/actions/actions'
  import { useDispatch } from 'react-redux';
  import { connect } from 'react-redux';
  import { width } from './helper'
import savedPokemons from './saved-pokemons';
const SinglePokemon  = props=>{
    const route = useRoute();
    const dispatch = useDispatch();
   
    const {  pokemonId} = route.params;
const [singlePokemonData,setSinglePokemonData] = useState({})
const [isPokemonSaved,setIsPokemonSaved] =useState(false)
    // alert(JSON.stringify(pokemonId))
    const abilities = get(singlePokemonData,'abilities','')
    const forms = get(singlePokemonData,'forms','')
    const sprites = get(singlePokemonData,'sprites','')
    const base_experience = get(singlePokemonData,'base_experience','')
  const moves = get(singlePokemonData,'moves','')
 console.log(JSON.stringify(moves),'moves')
    useEffect(() => {
        axios
          .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
          .then(function (response) {
            const { data } = response;
        //    console.log(data,'pokemon-data')
           setSinglePokemonData(data)
            // setPokemon(data);
          })
          .catch(function (error) {
            setSinglePokemonData({})
            // setPokemon(false);
          });
      }, [pokemonId]);

      useEffect(()=>{
if(forms)
{
const isPresent = props.savedPokemons.findIndex(item=>item.forms[0].name ===forms[0].name)
if(isPresent===-1)
{
    setIsPokemonSaved(false)
}
else
setIsPokemonSaved(true)

}
      },[forms,props.savedPokemons])
     
      let Image_Http_URL ={ uri:sprites.back_shiny };
const savePokemon = ()=>{

    props.savedPokemons.push(singlePokemonData)
    dispatch(setPokemonToSave(props.savedPokemons))
    ToastAndroid.show(`${forms[0].name} pokemon is now added to your saved list of pokemons`, ToastAndroid.SHORT);
}
    return (
        <>
        {isEmpty(singlePokemonData)? <Text style={{flex:1,textAlign:'center',fontSize:18,textAlignVertical:'center'}}>Loading...</Text>:
     <View style = {{flex:1,overflow:'scroll'}}>
            <View style={{height:50,width:width,backgroundColor:'#1b2f69',borderBottomLeftRadius:10, borderBottomRightRadius:10}}>
            {forms ? <Text style = {{color:'white',marginTop:15,marginLeft:25,fontSize:18}}>{forms[0].name}</Text>:null}
            </View>
            {/* <View style = {{flexDirection:'row',marginLeft:50}}> */}
                {forms ? <Text style = {{fontSize:16,textAlign:'center',marginTop:5}}></Text>:null}
            <Image
            source={Image_Http_URL} style = {{height: 200, resizeMode : 'contain', }} />
{/* </View> */}
<Text style = {{marginLeft:12}}>Base Experience: {base_experience}</Text>
<View style = {{flexDirection:'row'}}> 

<Text style = {{marginLeft:12}}>Abilities:</Text>
{
    
   abilities ? abilities.map(item=>{
        return (

            <Text style = {{marginLeft:2}}>
                {item.ability.name} ,
                
            </Text>
        )
    }):null
}

</View>
{!isPokemonSaved && <TouchableOpacity style = {{marginLeft:10,backgroundColor:'#1b2f69', alignSelf:'center',paddingHorizontal:35,paddingVertical:5,marginVertical:10, alignItems:'center',borderRadius:5}} onPress={()=>savePokemon() }><Text style = {{color:'white'}}>Save this Pokemon</Text></TouchableOpacity>}
<Text style = {{textAlign:'center',fontSize:15,fontWeight:'bold',marginVertical:5}}>Pokemon Moves</Text>
<ScrollView style = {{flex:1}}> 

{
    
   moves ? moves.map(item=>{
        return (
<>
            <Text style = {{marginLeft:10,fontWeight:'bold'}}>
               {"\n"} Move Name:{item.move.name} ,
                
            </Text>
            {item.version_group_details.map(item=>{
                return (
<View style = {{marginLeft:10,flexWrap:'wrap',overflow:'scroll'}}>
                        <Text> Level : {item.level_learned_at}</Text>
                        <Text> Move Learn Method : {item.move_learn_method.name}</Text> 
                        <Text> Version Group : {item.version_group.name}</Text> 
                    </View>
                )
            })}
        </>
        )
    }):null
}

</ScrollView>



        </View>
        }
      </>
    )

}

const mapStateToProps = state => {
    const {
        pokemonReducer : {savedPokemons } = {},
       
    } = state;
    return {
        savedPokemons
    };
};
export default connect(mapStateToProps,null)(SinglePokemon)
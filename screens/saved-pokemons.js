import React,{useEffect,useState} from 'react';
import {
    View,
    Text,
   Dimensions,
   FlatList,Image, 
   TouchableOpacity
   
  } from 'react-native';
  import axios from "axios";
  import { useNavigation } from '@react-navigation/native';
  import { connect } from 'react-redux';
  import { width } from './helper'
  import {get} from 'lodash'
  import { setPokemonToSave } from '../store/actions/actions'
  import { useDispatch } from 'react-redux';
  const SavedPokemons = props => {
      console.log(props.savedPokemons,'saved-data')
      const dispatch = useDispatch()
       const renderSavedPokemonList = (item,ind)=>{
        const forms = get(item,'forms','')
        const abilities = get(item,'abilities','')
    const sprites = get(item,'sprites','')
    const base_experience = get(item,'base_experience','')

  const removePokemon = ()=>{
    const indexOfPoke = props.savedPokemons.findIndex(item=>item.forms[0].name === forms[0].name)
    props.savedPokemons.splice(indexOfPoke,1)
dispatch(setPokemonToSave(props.savedPokemons))
  }
  let Image_Http_URL ={ uri:sprites.back_shiny };
        return (
            <View style = {{marginVertical:5}}>
                 <Image
            source={Image_Http_URL} style = {{height: 200, resizeMode : 'contain', }} />
            <Text style = {{marginLeft:12}}>{forms[0].name}</Text>
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
{<TouchableOpacity style = {{marginLeft:10,backgroundColor:'#1b2f69', alignSelf:'center',paddingHorizontal:35,paddingVertical:5,marginVertical:10, alignItems:'center',borderRadius:5}}onPress={()=>removePokemon()} ><Text style = {{color:'white'}}>Remove {forms[0].name} from saved list</Text></TouchableOpacity>}
     </View>   )

       }
    // alert(JSON.stringify(props.savedPokemons))
      return (
        <View style = {{flex:1}}>
        <View style={{height:50,width:width,backgroundColor:'#1b2f69',borderBottomLeftRadius:10, borderBottomRightRadius:10}}>
<Text style = {{color:'white',marginTop:15,marginLeft:25,fontSize:18}}>Save Pokemon's</Text>
            </View>
 
       {props.savedPokemons.length>0 ? <FlatList data = {props.savedPokemons}
       style={{flex:1}}
       renderItem={({item,index})=>renderSavedPokemonList(item,index)}/>:<Text style = {{flex:1,textAlign:'center',textAlignVertical:'center',fontSize:15}}>No saved pokemon's yet</Text>}
    </View>
          
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
  export default connect(mapStateToProps ,null)(SavedPokemons)
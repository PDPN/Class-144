import React,{Component} from 'react';
import {View, StyleSheet, Text, Flatlist, FlatList} from 'react-native';
import {Card} from "react-native-elements";
import axios from "axios";
import RFValue from "react-native-responsive-fontsize";

export default class PopulerMoviesScreen extends Component{
    constructor(){
        super();
        this.state = {
            data:[]
        };
        
    }

    componentDidMount(){
        this.getData();
    }

   timeConvert(num){
    var hours = Math.floor(num/60);
    var minutes = num % 60;
    return `${hours} hrs ${minutes} mins`;
   }

    getData = () => {
        const url = "https://localhost:5000/populer-movies";
        axios
        .get(url)
        .then(async response => {
            this.setState({data:response.data.data});
        })
        .catch(error => {
            console.log(error.message);
        });
    };
    keyExtractor = (item, index) => index.toString;

    renderItems = ({
        item,index
    }) =>{
           return(
            <Card
            key = {`Card-{index}`}
            Image = {{uri:item.poster_link}}
            ImageProps = {{resizeMode:"cover"}}
            FuturedTitleStyle = {styles.title}
            FuturedSubTitleStyle = {`${
                item.realese_data.split(" -")[0]
            }`}
            ></Card>
           );
    };
    render(){
        const {data} = this.state;
        return(
            <View style = {styles.container}>
                <FlatList
                data = {data}
                keyExtractor = {this.keyExtractor}
                renderItem = {this.renderItem}
                ></FlatList>
            </View>
        );
    }
}
const Styles = StyleSheet.create({
    container:{
        flex:1,
        backGroundColor:'#ffffff',
    },
    Title:{
        color:'#ffffff',
        alignSelf:"center",
        justifyContent:'center',
        RFValue:(12)
    },
    SubTitle:{
        fontWeight:bold,
        alignSelf:"center",
        paddingLeft:RFValue(15)
    }
})
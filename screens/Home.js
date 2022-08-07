import React,{Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import { Header, AirbnbRating, Icon} from "react-native-elements";
import axios from "axios";

export default class HomeScreen extends Component{
    constructor(){
        super();
        this.state = {
            movieDetails : {}
        };
    }

    componentDidMount(){
        this.getMovie();
    }

    timeConvert(num){
        var hours = Math.floor(num/60);
        var minutes = num % 60;
        return  `{hours}{minutes}`;
    }
      getMovie = ()=>{
        const url = "https://localhost:5000/get-movie";
        axios
        .get(url)
        .then(response =>{
            let details = response.data.data;
            details["duration"] = this.timeConvert(details.duration);
            this.setState({movieDetails:details});
        })
        .catch(error => {
            console.log(error.message);
        });
      };

      likedMovie = ()=>{
        const url = "https://localhost:5000/liked-movie";
        axios
        .post(url)
        .then(response =>{
            this.getMovie();
        })
        .catch(error => {
            console.log(error.message);
        });
      };
      unlikedMovie = ()=>{
        const url = "https://localhost:5000/unliked-movie";
        axios
        .post(url)
        .then(response =>{
            this.getMovie();
        })
        .catch(error => {
            console.log(error.message);
        });
      };
      
      notWatched = ()=>{
        const url = "https://localhost:5000/not-watched";
        axios
        .post(url)
        .then(response =>{
            this.getMovie();
        })
        .catch(error => {
            console.log(error.message);
        });
      };

      render(){
        const {movieDetails} = this.state;
        if(movieDetails.poster_link){
            const {
                poster_link,
                title,
                release_date,
                duration,
                overView,
                rating
            } = movieDetails;

            return(
                <View Style = {styles.container}>
                    <View Style = {styles.headerContainer}>
                        <Header
                        centerComponent = {{
                            text:"movie Recommanded",
                            style:styles.headerTitle
                        }}
                        rightComponent = {{icon:"search",color:"#fff"}}
                        backgroundColor = {"#d500f9"}
                        ></Header>
                    </View>
                </View>
            )
        }
      }
}
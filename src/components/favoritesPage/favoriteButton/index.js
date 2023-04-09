// import preact
import { h, render, Component } from 'preact';
//import stylesheets for ipad & button
import style from './style';
//import style_iphone from '../button/style_iphone';
// import jquery for API calls
//import $ from 'jquery';


export default class FavoritesButton extends Component {
	constructor(props){
		super(props);
		
	}

	

	
   // this function stores data in Local Storage
	storeFav=()=>{
        
        Location = this.props.Location;
        var Lat = this.props.Lat;
        var Long = this.props.Long;
       
        var newLocation = {Location:Location,Lat:Lat,Long:Long};
        var readValue = JSON.parse(localStorage.getItem('FavouriteLocations'));
        
        var updatedLocations = [...readValue,newLocation];
        if (readValue == null){
            localStorage.setItem('FavouriteLocations', JSON.stringify(newLocation));
            console.log("Storing Fav in if" )
        }
        else{
            localStorage.setItem('FavouriteLocations', JSON.stringify(updatedLocations));
            console.log("Storing Fav in else" )

        }
        
       this.props.hideButton();
	}
    	
	
	render() {

return (
 <div>
	<img class={style.favIcon} src='../assets/icons/star.png' onclick={this.storeFav}></img>
    </div>);
	}}
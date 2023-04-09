// import preact
import { h, render, Component } from 'preact';
//import stylesheets for ipad & button
import style from '../iphone/style';
//import style_iphone from '../button/style_iphone';
// import jquery for API calls
//import $ from 'jquery';



export default class FavoritesPage extends Component {
	constructor(props){
		super(props);
		
	}
	
	componentWillUpdate()
	{
		this.readFav();
		this.displayFav();
		
	} 
	

	// this function removes Location from Local Storage
	removeLoc=(Loc)=>{
		var readValue = JSON.parse(localStorage.getItem('FavouriteLocations'));
		for(let i = 0; i<readValue.length; i++){
			if (Loc == readValue[i]['Location']){
				console.log(readValue);
				
				console.log("Removed",readValue.splice(i,1));
				console.log(readValue);
			}
		}
		
		localStorage.setItem('FavouriteLocations', JSON.stringify(readValue))
		this.setState({
			FavLocations: readValue
		});
		this.componentWillUpdate();
	}
	// this function reads data from Local Storage
	readFav=()=>{
		var readValue = JSON.parse(localStorage.getItem('FavouriteLocations'));
		this.setState({
			FavLocations : readValue
		});
		console.log(readValue);
	}
	// this function sets state of data in elements to be shown
	displayFav = ()=>{
		var locations = this.state.FavLocations
		var textToPrint = []
		if (locations != undefined){
		for(let i = 0; i<locations.length; i++){
			var Lat = locations[i]['Lat'];
			var Long = locations[i]['Long'];
			var Location = locations[i]['Location'];
			var row = <li class={style.favouriteItemsli}><a class={style.favouriteItems} onClick={() => this.props.showFavouriteLocation(Lat,Long,Location)}>{
				`${Location}`
				}</a>
				<a onClick={() => this.removeLoc(Location)}>&nbsp;
				{<img id={style.removeicon} src="/assets/icons/remove_icon.png"/>}</a></li>
			textToPrint.push(row);
		}
		this.setState({
			displayFavs: textToPrint
		});
		console.log(this.state.displayFavs);
	}}
	render() {

return (
<div>
	<h3>Favourites</h3>
	
	<ul class={style.favouriteItemsli}>
		{this.state.displayFavs}
	</ul>
	
	</div>);
	}}
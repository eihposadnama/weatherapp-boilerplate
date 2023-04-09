// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';

// import jquery for API calls
import $ from 'jquery';

import SearchPage from '../searchPage';
import FavoritesButton from '../favoritesPage/favoriteButton';
import FavoritesPage from '../favoritesPage';

export default class Iphone extends Component {
//var Iphone = React.createClass({

	// a constructor with initial set states
	constructor(props){
		super(props);
		
		this.setState({ 
			weatherApiID: "8befece148e83c89da621e27c928e374",
			snowApiID: "b211c315b96a4ab880712658231203",
			showNavBar: false,
			showSnowData : false,
			showWeatherData : false,
			showSearchPage : true,
			showFavoritesPage: false,
			Hour: -1, // this to display current hour data
		
		});
	}

	// a call to fetch weather data 
	fetchWeatherData = () => {
		
		var weatherurl = `https://api.openweathermap.org/data/2.5/weather?lat=${this.state.Lat}&lon=${this.state.Long}&appid=${this.state.weatherApiID}&units=metric`;
		$.ajax({
			url: weatherurl,
			dataType: "jsonp",
			success : this.parseWeatherResponse,
			error : function(req, err){ console.log('API call weather failed ' + err); }
		})
	}
	// a call to fetch snow data 
	fetchSnowData = () => {
		var url = `http://api.worldweatheronline.com/premium/v1/ski.ashx?key=${this.state.snowApiID}&q=${this.state.Location}&format=json`;
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseSnowResponse,
			error : function(req, err){ console.log('API call snow failed ' + err); }
		})
		
	}
	// a call to fetch hourly weather data 
	fetchHourlyForecastWeatherData = () => {
		
		var weatherurl = `https://api.openweathermap.org/data/2.5/forecast?lat=${this.state.Lat}&lon=${this.state.Long}&cnt=9&appid=${this.state.weatherApiID}&units=metric`;
		
		$.ajax({
			url: weatherurl,
			dataType: "jsonp",
			success : this.parseHourlyWeatherResponse,
			error : function(req, err){ console.log('API call weather failed ' + err); }
		})
	}

	// a call to fetch daily weather data 
	fetchDailyForecastWeatherData = () => {
		
		var weatherurl = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${this.state.Lat}&lon=${this.state.Long}&cnt=7&appid=${this.state.weatherApiID}&units=metric`;
		
		$.ajax({
			url: weatherurl,
			dataType: "jsonp",
			success : this.parseDailyWeatherResponse,
			error : function(req, err){ console.log('API call weather failed ' + err); }
		})
	}
	
	componentDidMount(){
		
		if(this.state.Lat != undefined){
			this.fetchWeatherData();
			this.fetchSnowData();
			this.fetchHourlyForecastWeatherData();
			this.fetchDailyForecastWeatherData();
		}
		
	}	
	// check if loction is already favourited or not
	checkLocationFavOrNot = (Loc)=>{
		var readValue = JSON.parse(localStorage.getItem('FavouriteLocations'));
		this.setState({
			LocationIsFav: false
		})
		if (readValue != null){
		
		
		for(let i = 0; i<readValue.length; i++){
			if(readValue[i]['Location'] == Loc){
				this.setState({
					LocationIsFav: true
				});
				console.log("Loc is Fav",this.state.LocationIsFav)
			}
		}
	}
		console.log("Loc is Fav",this.state.LocationIsFav)
	}
	
	

		
	// the main render method for the iphone component
	render() {
		
		
		// display all weather data
		return (
		<div class={style.outerContainer} >
			<div class={this.state.showNavBar ? "" : style.hidden}>
				<div class={style.iconName}>
					
					<h2 class={style.location}>{this.state.Location}</h2>
				</div>
				<nav class={style.navBar}>
					<ul>
						<a class={style.Nav_Links} onClick={this.showWeatherData}><li style={{ width: '50%' }}>Forecast</li></a>
						<a class={style.Nav_Links} onClick={this.showSnowData}><li style={{ width: '50%' }}>Snow Report</li></a>
					</ul>
				</nav>
			
			</div>
				
			<div class={ this.state.showWeatherData ? style.container : style.hidden }>
				
				<div class={style.mainInfo}>
					<img id={style.sunImage} src={this.state.iconSrc} />
					<div class={this.state.LocationIsFav ? style.hidden : ""}>
						<FavoritesButton 
						Location={this.state.Location}
						Lat={this.state.Lat}
						Long={this.state.Long} 
						hideButton={this.hideFavButton}
						/>
					</div>
				</div>
				
				<div class={style.weatherInfo}>
					<p id={style.temperature}>{ `${this.state.temp}°C` }</p>
					<p id={style.dailyTemperature}><b>{ `H:`}</b>{`${this.state.temp_max}°C`} <b>{`L:`}</b>{`${this.state.temp_min}°C`}</p>
					<p id={style.weatherType}>{ this.state.conditions}</p>
				</div>

				<div class={style.currentConditions}>
					<h3>Current Conditions</h3>
				</div>

				<div class={style.fourIcons}>
					<ul>
						<li style={{ width: '60%' }} >
							<div class={style.Row1_Column1}>
								<img id={style.fourImage1} src="/assets/icons/wind.png" />
								<div class={style.Row1_Column1P2}>
									<p id={style.wind} href="#">{`${this.state.windDirection} ${this.state.windSpeed}m/s`}</p>
								</div>
							</div>
							<div class={style.Row2_Column1}>
								<img class={style.Nav_Links} id={style.fourImage2} src="/assets/icons/sunrise.png" />
								<p class={style.Nav_Links} id={style.section4} href="#">{`${this.state.sunriseTime} am`}</p>
								
								<img class={style.Nav_Links} id={style.fourImage2} src="/assets/icons/sunset.png" />
								<p class={style.Nav_Links} id={style.section4} href="#">{`${this.state.sunsetTime} pm`}</p>
							</div>
						</li>
						<li style={{ width: '40%' }} >
							<div class={style.Row1_Column2}>
								<img class={style.Nav_Links} id={style.fourImage3} src="/assets/icons/water.png" />
								<p class={style.Nav_Links} id={style.section4} href="#">{`${this.state.humidity}%`}</p>
								</div>
							<div class={style.Row2_Column2}>
								
								<img class={style.Nav_Links} id={style.fourImage4} src="/assets/icons/04d.png" />
								<p class={style.Nav_Links} id={style.section4} href="#">{`${this.state.cloudsPercentage}%`}</p>
							</div>
								
							
						</li>
					</ul>
				</div>

				<div class={style.Description}>
					<p>{`Feels Like: ${this.state.feelslike}°C`}</p>
				</div>
				<div class={style.scrollmenu}>
					{
					this.state.hourlyWeatherData
					}
					
					</div>
					<div class={style.scrollmenu}>
					{
					this.state.dailyWeatherData
					}
					
					</div>
					
			</div>
			<div class={this.state.showSnowData ? style.container : style.hidden}>
				<div>
					{
					this.state.prtinHourlyDataReport
					}
				</div>
				
                <div class={style.scrollmenu}>
					{
					this.state.hourlyData
					}
					
					</div>
            
			</div>
				<div class={this.state.showSearchPage ? style.container : style.hidden}>
					
					
						<SearchPage 
						getLatLong={this.getLatLong}
						showWeatherData={this.showWeatherData}
						/>
				
				</div>
				<div class={this.state.showFavoritesPage ? style.container : style.hidden}>
					<FavoritesPage 
					showFavouriteLocation={this.getLatLong}
					displayFavs={this.state.showFavoritesPage}
					/>
				</div>

			<nav class={style.footer}>
                <ul>
                    <li style={{ width: '50%' }} class={style.Nav_LinksBottom} onClick={this.showFavoritesPage}>
                        <a id={style.bottom1}>
                            <img id={style.Star} src="/assets/icons/Star.png"/>
                        </a>
                    </li>
                    <li style={{ width: '50%' }} class={style.Nav_LinksBottom} onClick={this.showSearchPage}>
                        <a id={style.bottom2}>
                            <img id={style.Search} src="/assets/icons/search.png"/>
                        </a>
                    </li>

                </ul>
            </nav>
		</div>
			
		);
	}
	// this function gets Latitudes, Longitudes and Location from Child Components
	getLatLong = (Lat,Long,Location) =>{
		this.setState({
			Lat: Lat,
			Long: Long,
			Location: Location
		});
		this.showWeatherData();
		console.log("in get lat long")

	}
	// this function get hides fav/button
	hideFavButton = ()=>{
		this.setState({
			LocationIsFav: true
		});
		console.log("Removing Fav Button");
	}
	// this function enables to view snow data
	showSnowData = ()=>{
	
		this.setState({
			showSnowData : true,
			showWeatherData : false,
			showSearchPage: false,
			showFavoritesPage: false,
			showNavBar: true,
			Hour: -1,
		});

		if (this.state.Hour < 0){
			this.fetchSnowData();
		}
		this.displayHourlyData();
	}
	//  this function enables to view weather data
	showWeatherData = ()=>{
		this.fetchWeatherData();
			this.fetchSnowData();
			this.fetchHourlyForecastWeatherData();
			this.fetchDailyForecastWeatherData();
			this.checkLocationFavOrNot(this.state.Location);
		this.setState({
			showSearchPage: false,
			showSnowData : false,
			showWeatherData : true,
			showFavoritesPage: false,
			showNavBar: true
		});
		
	}
	// this function enables to view Search Page
	showSearchPage = ()=>{
		this.setState({
			showSearchPage : true,
			showSnowData : false,
			showWeatherData : false,
			showFavoritesPage: false,
			showNavBar: false
		})
	}
	// this function enable to view Favourite Locations Page
	showFavoritesPage = ()=>{
		this.setState({
			showSearchPage : false,
			showSnowData : false,
			showWeatherData : false,
			showFavoritesPage: true,
			showNavBar: false
		});
	}
	// this function parses response from Weather API
	parseWeatherResponse = (parsed_json) => {
		console.log(parsed_json);

		var visibility = parsed_json['visibility'];

		var temp_c = parsed_json['main']['temp'];
		temp_c = (Math.round(temp_c * 10) /10).toFixed(1);

		var temp_max = parsed_json['main']['temp_max'];
		temp_max = (Math.round(temp_max * 10) /10).toFixed(1);

		var temp_min = parsed_json['main']['temp_min'];
		temp_min = (Math.round(temp_min * 10) /10).toFixed(1);

		var humidity = parsed_json['main']['humidity'];
		var feelsLike = parsed_json['main']['feels_like'];
		feelsLike = (Math.round(feelsLike * 10) /10).toFixed(1);
		console.log(feelsLike);
		var icon = parsed_json['weather']['0']['icon'];
		var conditions = parsed_json['weather']['0']['description'];
		var windSpeed = parsed_json['wind']['speed'];
		var windGusts = parsed_json['wind']['gust'];
		var cloudsPercentage = parsed_json['clouds']['all'];
		var sunrise = parsed_json['sys']['sunrise'];
		var sunset = parsed_json['sys']['sunset'];

		var sunriseTime = this.convertTime(sunrise);
		var sunsetTime = this.convertTime(sunset);

		var windDegree = parsed_json['wind']['deg'];
		this.calculateWindDirection(windDegree);
		var iconSrc = `/assets/icons/${icon}.png`;
		
		this.setState({
			iconSrc : iconSrc,
			conditions: conditions,
			temp_max: temp_max,
			temp_min: temp_min,
			windSpeed : windSpeed,
			windGusts: windGusts,
			humidity: humidity,
			feelslike: feelsLike,
			sunriseTime: sunriseTime,
			sunsetTime: sunsetTime,
			cloudsPercentage: cloudsPercentage,
			temp : temp_c,
			visibility: visibility
			
		});      
	}
	// this function parses response from Snow API
	parseSnowResponse = (parsed_json) => {
		console.log(parsed_json);
		
		
		var hourlyData = [];
		for (let i = 0; i<8; i++){
			
			var HourWeatherCode = parsed_json['data']['weather']['0']['hourly'][`${i}`]['bottom']['0']['weatherCode'];
			
			var IconCode = this.getIcon(HourWeatherCode);
			
			const hours = new Date().getHours()
			const isDayTime = hours > 6 && hours < 20;

			if(isDayTime === true){
				IconCode = IconCode['dayIcon'];
			} else {
			 IconCode = IconCode['nightIcon'];

			}
			
			
			console.log("Icon Code",IconCode )
			var HourIconUrl = `../assets/icons/${IconCode}.png`;
			console.log(HourIconUrl)
			var HourTime = parsed_json['data']['weather']['0']['hourly'][`${i}`]['time'] ;
			var HourTime1 = new Date(HourTime).toISOString().substring(0,2);
			var HourTime2 = new Date(HourTime).toISOString().substring(3,4);
			HourTime = HourTime1.concat(":",HourTime2,"0");
			if (i == 0){
				HourTime = "00:00";
			}
			var row = <a>{HourTime}<img id={style.tempImage} src={HourIconUrl} onClick={() => this.parseHourlySnowResponse(parsed_json,i)}/></a>;
			
			hourlyData.push(row);
		}
		if (this.state.Hour < 0){
			this.parseHourlySnowResponse(parsed_json,this.state.Hour)
		}
		

		
		this.setState({
			location: location,
			hourlyData: hourlyData
		});  
		
		
	}
	// this function parses hourly response from Weather API
	parseHourlyWeatherResponse = (parsed_json) =>{
		console.log(parsed_json);
		var hourlyWeatherData = [];
		for(let i = 0; i <9; i++){
			var icon = parsed_json['list'][i]['weather']['0']['icon'];
			var time = parsed_json['list'][i]['dt_txt'];
			time = time.substring(11,16);
			
			var iconSrc = `/assets/icons/${icon}.png`; 
			var temp =  parsed_json['list'][i]['main']['temp'];
			temp = (Math.round(temp * 10) /10).toFixed(1);
			var row = <a>{time}<img id={style.tempImage} src={iconSrc} />{`${temp}°C`}</a>;
			hourlyWeatherData.push(row);
		}
		this.setState({
			hourlyWeatherData: hourlyWeatherData
		});
		console.log("Hourly Weather Data", this.state.hourlyWeatherData)
	}
	// this function parses daily response from Weather API
	parseDailyWeatherResponse = (parsed_json) =>{
		console.log(parsed_json);
		var dailyWeatherData = [];
		for(let i=0; i<7;i++){
			var icon = parsed_json['list'][i]['weather']['0']['icon'];
			var day = parsed_json['list'][i]['dt'];
			day = new Date(day *1000).getDay();
			day = this.calculateDay(day)
			
			var iconSrc = `/assets/icons/${icon}.png`; 
			var temp =  parsed_json['list'][i]['temp']['day'];
			temp = (Math.round(temp * 10) /10).toFixed(1);
			var row = <a>{day}<img id={style.tempImage} src={iconSrc} />{`${temp}°C`}</a>;
			dailyWeatherData.push(row);
		}
		this.setState({
			dailyWeatherData: dailyWeatherData
		});
		console.log("Daily Weather Data", this.state.dailyWeatherData)
		
	}
	// this function parses hourly snow response
	parseHourlySnowResponse = (parsed_json,Hour) =>{
		// for data which is for current time 
		if (Hour < 0){
			console.log(Hour, "Less than 0");
			var chancesOfSnow = parsed_json['data']['weather']['0']['chanceofsnow'];
			var totalSnowfall_cm = parsed_json['data']['weather']['0']['totalSnowfall_cm'];
			
			var tempMaxBottom = parsed_json['data']['weather']['0']['bottom']['0']['maxtempC'];
			var tempMinBottom = parsed_json['data']['weather']['0']['bottom']['0']['mintempC'];
			
			var tempMaxMid = parsed_json['data']['weather']['0']['mid']['0']['maxtempC'];
			var tempMinMid = parsed_json['data']['weather']['0']['mid']['0']['mintempC'];

			var tempMaxTop = parsed_json['data']['weather']['0']['top']['0']['maxtempC'];
			var tempMinTop = parsed_json['data']['weather']['0']['top']['0']['mintempC'];
			var timesNow = new Date().toLocaleTimeString().substring(0,5);
			console.log(timesNow);
			this.setState({
				HourlyTime : timesNow,
				Hour: Hour,
				chancesOfSnow: chancesOfSnow,
				totalSnowfall_cm: totalSnowfall_cm,

				tempMaxBottom: tempMaxBottom,
				tempMinBottom: tempMinBottom,

				tempMaxMid: tempMaxMid,
				tempMinMid: tempMinMid,

				tempMaxTop: tempMaxTop,
				tempMinTop: tempMinTop,
			});
		
		
		}
		// for data which is hourly in future
		else{
		console.log(Hour, "Greater than 0");
		var tempBottom = parsed_json['data']['weather']['0']['hourly'][Hour]['bottom']['0']['tempC'];
		var HourWeatherCode = parsed_json['data']['weather']['0']['hourly'][Hour]['bottom']['0']['weatherCode'];
		var IconCode = this.getIcon(HourWeatherCode);
			
		const hours = new Date().getHours()
		const isDayTime = hours > 6 && hours < 20;

		if(isDayTime === true){
			IconCode = IconCode['dayIcon'];
		} else {
			IconCode = IconCode['nightIcon'];

		}
		
		
		console.log("Icon Code",IconCode )
		var HourIconUrl = `../assets/icons/${IconCode}.png`;
		console.log(HourIconUrl)
		var weatherDescBottom = parsed_json['data']['weather']['0']['hourly'][Hour]['bottom']['0']['weatherDesc']['0']['value'];
		var windDirBottom = parsed_json['data']['weather']['0']['hourly'][Hour]['bottom']['0']['winddir16Point'];

		var tempMid = parsed_json['data']['weather']['0']['hourly'][Hour]['mid']['0']['tempC'];
        var HourIconUrlMid = parsed_json['data']['weather']['0']['hourly'][Hour]['mid']['0']['weatherIconUrl']['0']['value'];
        var weatherDescMid = parsed_json['data']['weather']['0']['hourly'][Hour]['mid']['0']['weatherDesc']['0']['value'];
        var windDirMid = parsed_json['data']['weather']['0']['hourly'][Hour]['mid']['0']['winddir16Point'];

        var tempTop = parsed_json['data']['weather']['0']['hourly'][Hour]['top']['0']['tempC'];
        var HourIconUrlTop = parsed_json['data']['weather']['0']['hourly'][Hour]['top']['0']['weatherIconUrl']['0']['value'];
        var weatherDescTop = parsed_json['data']['weather']['0']['hourly'][Hour]['top']['0']['weatherDesc']['0']['value'];
        var windDirTop = parsed_json['data']['weather']['0']['hourly'][Hour]['top']['0']['winddir16Point'];
        
		var HourTime = parsed_json['data']['weather']['0']['hourly'][Hour]['time'] ;
		var HourTime1 = new Date(HourTime).toISOString().substring(0,2);
		var HourTime2 = new Date(HourTime).toISOString().substring(3,4);
		HourTime = HourTime1.concat(":",HourTime2,"0");
			if (Hour == 0){
				HourTime = "00:00";
			}
        var snowcloudCover = parsed_json['data']['weather']['0']['hourly'][Hour]['cloudcover'];
        var freezelevel = parsed_json['data']['weather']['0']['hourly'][Hour]['freezeLevel'];
        var humidity = parsed_json['data']['weather']['0']['hourly'][Hour]['humidity'];
        var precipInches = parsed_json['data']['weather']['0']['hourly'][Hour]['precipInches'];
        var snowfallCm = parsed_json['data']['weather']['0']['hourly'][Hour]['snowfall_cm'];
        var visibility = parsed_json['data']['weather']['0']['hourly'][Hour]['visibility'];

		this.setState({
		Hour: Hour,

		HourlyTime: HourTime,
		tempBottom: tempBottom,
		HourIconUrlBottom: HourIconUrl,
		weatherDescBottom: weatherDescBottom,
		windDirBottom: windDirBottom,
		
		tempMid: tempMid,
        HourIconUrlMid: HourIconUrl,
        weatherDescMid: weatherDescMid,
        windDirMid: windDirMid,

		tempTop: tempTop,
        HourIconUrlTop: HourIconUrl,
        weatherDescTop: weatherDescTop,
        windDirTop: windDirTop,
		
		snowcloudCover: snowcloudCover, 
		freezelevel: freezelevel,
		humidity: humidity,
		precipInches: precipInches,
		snowfallCm : snowfallCm,
		visibility: visibility
		})
	}
	this.displayHourlyData();
	}
	// this function calculates Wind direction from Degrees
	calculateWindDirection = (deg) =>{
		console.log(deg);
		var val= parseInt((deg/22.5)+.5,10);
		var arr=["N","NNE","NE","ENE","E","ESE", "SE", "SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"];
		var windDirection = arr[val%16];
		console.log(windDirection)
		this.setState({
			windDirection: windDirection
		});
		
	}

	// this function converts UNIX Times to 24 Hr time
	convertTime = (unixTime)=>{
		var dateObj = new Date(unixTime * 1000);
        var utcString = dateObj.toUTCString();
      
        var time = utcString.slice(-11, -7);
        return time;
	}
	// this function returns current time 
	currentTime = ()=>{
		var time = new Date();
		var hours = time.getHours();
		var minutes = time.getMinutes();
		time =  hours.concat(":",minutes);
		this.setState({
			currentTime : time
		});
		console.log(this.state.currentTime)
	}

	// this function returns day based upon code
	calculateDay = (code)=>{
		if (code == 0){
			return 'Sun';
		}
		else if(code == 1){
			return 'Mon';
		}
		else if(code == 2){
			return 'Tue';
		}
		else if(code == 3){
			return 'Wed';
		}
		else if(code == 4){
			return 'Thur';
		}
		else if(code == 5){
			return 'Fri';
		}
		else if(code == 6){
			return 'Sat';
		}
		
	}
	// this function displays Hourly Snow data
	displayHourlyData = ()=>{
		var arrToPrint = []
		if(this.state.Hour == -1){
			
				arrToPrint.push(<div id='CurrentData'>
				<h3>
					{`Time ${ this.state.HourlyTime}`}
				</h3>
				{/*<img src={`${this.state.iconSrc}`}></img>*/}
				<img id={style.snowflake} src="/assets/icons/snowflake.png"></img>
				<div class={style.SnowData}>
					<div>
						<h4>{`Snowfall(cm): ${this.state.totalSnowfall_cm} `}</h4>
						<h4>{`Chances of Snow: ${this.state.chancesOfSnow}% `}</h4>
						<h4>
							Temperatures at:
						</h4>
						<h5>
							Bottom of Mountain
						</h5>
						<p>
							{`Max Temp: ${this.state.tempMaxBottom}°C `}
							{`Min Temp: ${this.state.tempMinBottom}°C `}
						</p>
					</div>
					
					<div>
						<h5>
							Middle of Mountain
						</h5>
						<p>
							{`Max Temp: ${this.state.tempMaxMid}°C `}
							{`Min Temp: ${this.state.tempMinMid}°C `}
						</p>
					</div>
					
					<div>
						<h5>
							Top of Mountain
						</h5>
					<p>
						{`Max Temp: ${this.state.tempMaxTop}°C `}
						{`Min Temp: ${this.state.tempMinTop}°C `}
					</p>
					</div>
					{/*}
					<p>
						{`Wind Direction: ${this.state.windDirection} `}
						{`Cloud Cover: ${this.state.cloudsPercentage}% `}
						{`Humidity: ${this.state.humidity}% `}
						{`Visibility: ${this.state.visibility} `}
						
					</p>
		*/}
				</div>	

				</div>
			
			);
		}
		else{
			arrToPrint.push(
			<div>
					
					<h3>{`Time: ${this.state.HourlyTime}`}</h3>
						<div>
							<h4>{`Snowfall(cm): ${this.state.snowfallCm} `}</h4>
							<h4>{`Chances of Snow: ${this.state.chancesOfSnow}% `}</h4>
							<h4>
								Conditions at:
							</h4>
							<h5>
								Bottom of Mountain
							</h5>
							<p>
								
								{`Temp Bottom: ${this.state.tempBottom}°C `} <br></br>
								{`Description: ${this.state.weatherDescBottom} `} <br></br>
								{`Wind Direction: ${this.state.windDirBottom} `}

							</p>
						</div>
						<div>
							<h5>
								Middle of Mountain
							</h5>
							<p>

								{`Temp Mid: ${this.state.tempMid}°C `}<br></br>
								{`Description: ${this.state.weatherDescMid} `}<br></br>
								{`Wind Direction: ${this.state.windDirMid} `}
							</p>

						</div>

						<div>
						<h5>
							Top of Mountain
						</h5>
							<p>
								{`Temp Top: ${this.state.tempTop}°C `}<br></br>
								{`Description: ${this.state.weatherDescTop} `}<br></br>
								{`Wind Direction: ${this.state.windDirTop} `}
							</p>
						</div>
						<div>
						<h5>
						
							{`Cloud Cover: ${this.state.snowcloudCover}% `}<br></br>
							{`Precipitation(inches): ${this.state.precipInches} `}<br></br>
							{`Humidity: ${this.state.humidity}% `}<br></br>
							{`Visibility: ${this.state.visibility} `}
						</h5>
					</div>
					</div>
			);
		}
		
		this.setState({
			prtinHourlyDataReport: arrToPrint
		});
		console.log("Hourly data Report",this.state.prtinHourlyDataReport);
	}
	// returns icon code based upon weather Code
	 getIcon = (weatherCode)=> {
		
		  if (weatherCode == 395)
			return { dayIcon: '13d', nightIcon: '13n' };
		  if (weatherCode == 392)
			return { dayIcon: '13d', nightIcon: '13n' };
		  if (weatherCode == 389)
			return { dayIcon: '11d', nightIcon: '11n' };
		  if (weatherCode == 386)
			return { dayIcon: '11d', nightIcon: '11n' };
		  if (weatherCode == 377)
			return { dayIcon: '13d', nightIcon: '13n' };
		  if (weatherCode == 374)
			return { dayIcon: '13d', nightIcon: '13n' };
		  if (weatherCode == 371)
			return { dayIcon: '13d', nightIcon: '13n' };
		  if (weatherCode == 368)
			return { dayIcon: '13d', nightIcon: '13n' };
		  if (weatherCode == 365)
			return { dayIcon: '13d', nightIcon: '13n' };
		  if (weatherCode == 362)
			return { dayIcon: '13d', nightIcon: '13n' };
		  if (weatherCode == 359)
			return { dayIcon: '09d', nightIcon: '09n' };
		  if (weatherCode == 356)
			return { dayIcon: '09d', nightIcon: '09n' };
		  if (weatherCode == 353)
			return { dayIcon: '09d', nightIcon: '09n' };
		  if (weatherCode == 350)
			return { dayIcon: '13d', nightIcon: '13n' };
		  if (weatherCode == 338)
			return { dayIcon: '13d', nightIcon: '13n' };
		  if (weatherCode == 335)
			return { dayIcon: '13d', nightIcon: '13n' };
		  if (weatherCode == 332)
			return { dayIcon: '13d', nightIcon: '13n'};
	
			if (weatherCode == 329)
			return {dayIcon: '13d', nightIcon: '13n'}; // Patchy moderate snow
			if (weatherCode == 326)
			return {dayIcon: '13d', nightIcon: '13n'}; // Light snow
			if (weatherCode == 323)
			return {dayIcon: '13d', nightIcon: '13n'}; // Patchy light snow
			if (weatherCode == 320)
			return {dayIcon: '13d', nightIcon: '13n'}; // Moderate or heavy sleet
			if (weatherCode == 317)
			return {dayIcon: '13d', nightIcon: '13n'}; // Light sleet
			if (weatherCode == 314)
			return {dayIcon: '09d', nightIcon: '09n'}; // Moderate or heavy freezing rain
			if (weatherCode == 311)
			return {dayIcon: '09d', nightIcon: '09n'}; // Light freezing rain
			if (weatherCode == 308)
			return {dayIcon: '09d', nightIcon: '09n'}; // Heavy rain
			if (weatherCode == 305)
			return {dayIcon: '09d', nightIcon: '09n'}; // Heavy rain at times
			if (weatherCode == 302)
			return {dayIcon: '09d', nightIcon: '09n'}; // Moderate rain
			if (weatherCode == 299)
			return {dayIcon: '10d', nightIcon: '10n'}; // Moderate rain at times
			if (weatherCode == 296)
			return {dayIcon: '10d', nightIcon: '10n'}; // Light rain
			if (weatherCode == 293)
			return {dayIcon: '10d', nightIcon: '10n'}; // Patchy light rain
			if (weatherCode == 284)
			return {dayIcon: '09d', nightIcon: '09n'}; // Heavy freezing drizzle
			if (weatherCode == 281)
			return {dayIcon: '09d', nightIcon: '09n'}; // Freezing drizzle
			if (weatherCode == 266)
			return {dayIcon: '09d', nightIcon: '09n'}; // Light drizzle
			if (weatherCode == 263)
			return {dayIcon: '10d', nightIcon: '10n'}; // Patchy light drizzle
			if (weatherCode == 260)
			return {dayIcon: '50d', nightIcon: '50n'}; // Freezing fog
			if (weatherCode == 248)
			return {dayIcon: '50d', nightIcon: '50n'}; // Fog
			if (weatherCode == 230)
			return {dayIcon: '50d', nightIcon: '50n'}; // Blizzard
			if (weatherCode == 227)
			return {dayIcon: '13d', nightIcon: '13n'}; // Blowing snow
			if (weatherCode == 200)
			return {dayIcon: '11d', nightIcon: '11n'}; // Thundery outbreaks in nearby
			if (weatherCode == 185)
			return {dayIcon: '10d', nightIcon: '10n'}; // Patchy freezing drizzle nearby
			if (weatherCode == 182)
			return {dayIcon: '13d', nightIcon: '13n'}; // Patchy sleet nearby
			if (weatherCode == 179)
			return {dayIcon: '13d', nightIcon: '13n'};
			if (weatherCode == 176)
			return {dayIcon: '10d', nightIcon: '10n'};
			if (weatherCode == 143)
			return {dayIcon: '50d', nightIcon: '50n'};
			if (weatherCode == 122)
			return {dayIcon: '04d', nightIcon: '04n'};
			if (weatherCode == 119)
			return {dayIcon: '03d', nightIcon: '03n'};
			if (weatherCode == 116)
			return {dayIcon: '02d', nightIcon: '02n'};
			if (weatherCode == 113)
			return {dayIcon: '01d', nightIcon: '01n'};

		}
	}
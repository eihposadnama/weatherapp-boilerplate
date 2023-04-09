import { h, render, Component } from 'preact';
import $ from 'jquery';
import Style from './style';

export default class SearchPage extends Component {

   constructor(props){
    super(props);
    this.setState({
        value: '',
        suggestedLocations: []
    });
    
   }
    
   
    
   
    // Function which handles the event when data in Input element changes
    onInput = e => {
        const { value } = e.target;
        this.fetchLocatedData(`https://api.myptv.com/geocoding/v1/locations/by-address?locality=${value}&apiKey=RVVfNTQxYTk5Y2Y3OGFiNDIyZTllY2QxMDE0ZWM2OGNlY2E6NGQ5MTNiNzAtNjk0Yi00ZjFiLTgzMjQtNWMwNjEyMTRjZTM5`);
        this.setState({ value });    
	}
  // fetchs data from API based upon value
    fetchLocatedData = (url) => {
		$.ajax({
			url: url,
			dataType: "json",
			success : this.parseSuggestedLocResponse,
			error : function(req, err){ console.log('API call search Locations failed ' + err); }
		})
    }

    // Function that redirects from search to showing data
    redirectToWeather = (Lat, Long,Location) =>{
        
        this.props.getLatLong(Lat,Long,Location);
       
        console.log(Lat,Long);
    }
    // Parses response from API
    parseSuggestedLocResponse = (parsed_json) =>{
        console.log(parsed_json);
        const suggestedLocations = parsed_json.locations.slice(0,15).map((location) => ({
            Country: location.address.countryName,
            State: location.address.state,
            Location: location.formattedAddress,
            latitude: location.referencePosition.latitude,
            longitude: location.referencePosition.longitude,
            
          }));
          var textToPrint = []
          for (let i = 0; i < suggestedLocations.length ; i++){
            var locationData =  <li class={Style.searchItemsli} ><a class={Style.searchItems} href="#" onClick={() => this.redirectToWeather(suggestedLocations[i]['latitude'],suggestedLocations[i]['longitude'],suggestedLocations[i]['Location']) }>{`${suggestedLocations[i]['Location']}, ${suggestedLocations[i]['State']}, ${suggestedLocations[i]['Country']}`}</a></li>;
            textToPrint.push(locationData);
         }
          
          this.setState({
            textToPrint : textToPrint
          })
          
    }
    render(_, { value }) {
        return (
        <div class={Style.searchItemsli}>
            <input type="text" value={value} onInput={this.onInput} class={Style.searchItemsli}/>
            <div class={Style.searchItemsli}>
               <ul class={Style.searchItemsli}>
               {this.state.textToPrint}
               
               </ul>
                    
            </div>
        </div>
            
        
        );
    }
    }


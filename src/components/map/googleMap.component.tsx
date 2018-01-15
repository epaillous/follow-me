import * as moment from 'moment';
import * as React from 'react';
import {
  GoogleMap, withGoogleMap, withScriptjs,
} from 'react-google-maps';
import { RouteComponentProps, withRouter } from 'react-router';
import { Button } from 'reactstrap';
import SuggestionMarker from '../../containers/suggestionMarker.container';
import LatLng = google.maps.LatLng;
import PlaceResult = google.maps.places.PlaceResult;
import { Point } from '../../models/point';
import { Suggestion } from '../../models/suggestion';
import { Trip } from '../../models/trip';
import InfoWindowMarkerComponent from './infoWindowMarker/infoWindowMarker.component';
import { MarkerType, MarkerViewModel } from './marker.viewModel';
import { styles } from './styles';
import { TripMarkerAndPolyline } from './tripMarkerAndPolyline.component';

interface GoogleMapProps {
  trips: Trip[];
  suggestions: Suggestion[];
  center: LatLng;
  zoom: number;
  place: PlaceResult;

  onMarkerClick(point: Point): void;

  onMarkerDblClick(point: Point): void;

  createSuggestion(place: PlaceResult): void;
}

class GoogleMapComponent extends React.Component<GoogleMapProps & RouteComponentProps<any>> {
  private trips: Trip[];
  private options = {
    fullscreenControl: false,
    mapTypeControl: false,
    minZoom: 2,
    streetViewControl: false,
    styles,
  };

  constructor(props: GoogleMapProps & RouteComponentProps<any>) {
    super(props);
    this.renderPlaceSelected = this.renderPlaceSelected.bind(this);
    this.renderSuggestion = this.renderSuggestion.bind(this);
    this.renderTrip = this.renderTrip.bind(this);
    this.createSuggestion = this.createSuggestion.bind(this);
  }

  public componentWillMount() {
    this.trips = this.props.trips.filter((trip) => trip.date.isSameOrBefore(moment()));
  }

  public render() {
    return (
      <GoogleMap
        zoom={this.props.zoom}
        center={this.props.center}
        defaultOptions={this.options}
      >
        {this.trips.map(this.renderTrip)}
        {this.props.suggestions.map(this.renderSuggestion)}
        {this.renderPlaceSelected()}
      </GoogleMap>
    );
  }

  private createSuggestion() {
    this.props.createSuggestion(this.props.place);
    this.props.history.push('/suggestions/new');
  }

  private renderSuggestion(suggestion: Suggestion) {
    return <SuggestionMarker key={suggestion.id} suggestion={suggestion} {...this.props}/>;
  }

  private renderTrip(trip: Trip) {
    return <TripMarkerAndPolyline key={trip.id} trip={trip} isCurrent={trip === this.trips[0]} {...this.props}/>;
  }

  private renderPlaceSelected() {
    if (this.props.place) {
      return (
        <InfoWindowMarkerComponent
          position={this.props.place.geometry.location.toJSON()}
          icon={new MarkerViewModel(MarkerType.Suggestion).icon}
          title={this.props.place.name}
        >
          <div className="info-window">
            <h6>{this.props.place.name}</h6>
            <p>{this.props.place.formatted_address}</p>
            <Button color="danger" onClick={this.createSuggestion}>
              Suggérer ce lieu !
            </Button>
          </div>
        </InfoWindowMarkerComponent>
      );
    }
    return null;
  }
}

export default withRouter(withScriptjs(withGoogleMap(GoogleMapComponent)));

import { connect } from 'react-redux';
import { deleteSuggestion, editSuggestion } from '../actions/suggestions.actions';
import markerForSuggestion from '../components/map/suggestionMarker.component';
import { Suggestion } from '../models/suggestion';

const mapStateToProps = (state: any) => {
  return {};
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    deleteSuggestion: (suggestion: Suggestion) => {
      dispatch(deleteSuggestion(suggestion));
    },
    editSuggestion: (suggestion: Suggestion) => {
      dispatch(editSuggestion(suggestion));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(markerForSuggestion);

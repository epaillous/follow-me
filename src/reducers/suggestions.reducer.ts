import { MODAL_ANIMATION_ENDED } from '../actions/modal.actions';
import {
  CREATE_SUGGESTION_SUCCESS, DELETE_SUGGESTION_SUCCESS,
  EDIT_SUGGESTION,
  FETCH_SUGGESTION_TYPES_SUCCESS, FETCH_SUGGESTIONS_SUCCESS, NEW_SUGGESTION, RESET_SUGGESTION, UPDATE_SUGGESTION_SUCCESS,
} from '../actions/suggestions.actions';
import { Suggestion } from '../models/suggestion';
import { SuggestionType } from '../models/suggestionType';

interface StateInterface {
  types: SuggestionType[];
  suggestions: Suggestion[];
  suggestion: Suggestion | null;
  editMode: boolean;
}

const INITIAL_STATE = { types: [], suggestions: [], suggestion: null, editMode: false };

export default function suggestions(state: StateInterface = INITIAL_STATE, action: any) {
  switch (action.type) {
    case FETCH_SUGGESTION_TYPES_SUCCESS:
      return { ...state, types: action.payload };
    case FETCH_SUGGESTIONS_SUCCESS:
      return { ...state, suggestions: action.payload };
    case 'SIGN_OUT_COMPLETE':
      return { ...state, suggestions: [] };
    case EDIT_SUGGESTION:
      return { ...state, suggestion: action.payload, editMode: true };
    case NEW_SUGGESTION:
      return { ...state, suggestion: action.payload };
    case DELETE_SUGGESTION_SUCCESS: {
      const newSuggestions = state.suggestions.filter((suggestion: Suggestion) => suggestion.id !== action.payload.id);
      return { ...state, suggestions: newSuggestions, suggestion: null };
    }
    case UPDATE_SUGGESTION_SUCCESS:
      return { ...state, editMode: false };
    case CREATE_SUGGESTION_SUCCESS: {
      const newSuggestions = state.suggestions;
      newSuggestions.push(action.payload);
      return { ...state, suggestions: newSuggestions };
    }
    case MODAL_ANIMATION_ENDED:
    case RESET_SUGGESTION:
      return { ...state, suggestion: null };
    default:
      return state;
  }
}

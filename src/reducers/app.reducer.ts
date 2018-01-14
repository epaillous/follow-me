import { RESET_MAIN_ALERT } from '../actions/alerts.actions';
import { CREATE_SUGGESTION_SUCCESS, DELETE_SUGGESTION_SUCCESS, UPDATE_SUGGESTION_SUCCESS } from '../actions/suggestions.actions';

interface StateInterface {
  alertMessage: string | null;
}

const INITIAL_STATE = { alertMessage: null };

export default function app(state: StateInterface = INITIAL_STATE, action: any) {
  switch (action.type) {
    case CREATE_SUGGESTION_SUCCESS:
      return { ...state, alertMessage: 'Merci pour votre suggestion !' };
    case UPDATE_SUGGESTION_SUCCESS:
      return { ...state, alertMessage: 'Votre modification a bien été prise en compte !' };
    case DELETE_SUGGESTION_SUCCESS:
      return { ...state, alertMessage: 'Votre suggestion a bien été supprimée' };
    case RESET_MAIN_ALERT:
      return { ...state, alertMessage: null };
    default:
      return state;
  }
}

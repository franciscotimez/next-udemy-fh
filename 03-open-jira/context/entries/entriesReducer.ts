import { EntriesState } from "./";
import { Entry } from '../../interfaces';

type EntriesActionType =
  | { type: '[Entries] - Add Entry', payload: Entry; }
  | { type: '[Entries] - Close SideBar'; };

export const entriesReducer = (state: EntriesState, action: EntriesActionType): EntriesState => {
  switch (action.type) {
    case '[Entries] - Add Entry':
      return {
        ...state,
        entries: [...state.entries, action.payload]
      };

    default:
      return state;
  }
};
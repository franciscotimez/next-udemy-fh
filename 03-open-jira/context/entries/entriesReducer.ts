import { EntriesState } from "./";

type EntriesActionType =
  | { type: '[Entries] - Open SideBar'; }
  | { type: '[Entries] - Close SideBar'; };

export const entriesReducer = (state: EntriesState, action: EntriesActionType): EntriesState => {
  switch (action.type) {

    default:
      return state;
  }
};
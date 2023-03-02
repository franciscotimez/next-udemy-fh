import { UIState } from "./";

type UIActionType =
  | { type: '[UI] - Open SideBar'; }
  | { type: '[UI] - Close SideBar'; }
  | { type: '[UI] - Set isAddingEntry', payload: boolean; };

export const uiReducer = (state: UIState, action: UIActionType): UIState => {
  switch (action.type) {
    case '[UI] - Open SideBar':
      return {
        ...state,
        sideMenuOpen: true,
      };

    case '[UI] - Close SideBar':
      return {
        ...state,
        sideMenuOpen: false,
      };

    case '[UI] - Set isAddingEntry':
      return {
        ...state,
        isAddingEntry: action.payload
      };
    default:
      return state;
  }
};
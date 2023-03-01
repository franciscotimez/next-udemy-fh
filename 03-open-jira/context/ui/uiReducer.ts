import { UIState } from "./";

type UIActionType =
  | { type: '[UI] - Open SideBar'; }
  | { type: '[UI] - Close SideBar'; };

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
    default:
      return state;
  }
};
import * as React from 'react';

export enum TaskChanged {
  NEW_TASK = 'NEW_TASK',
  DELETE_TASK = 'DELETE_TASK',
  EDIT_TASK = 'EDIT_TASK',
}

interface DashboardContext {
  newTask: boolean;
  deleteTask: boolean;
  editTask: boolean;
  dispatch: React.Dispatch<{ type: TaskChanged; payload: boolean }>;
}

interface DashboardContextProps {
  children: React.ReactNode;
}

const initialState: DashboardContext = {
  deleteTask: false,
  editTask: false,
  newTask: false,
  dispatch: () => {},
};

const stateReducer = (
  state: DashboardContext = initialState,
  action: { type: TaskChanged; payload: boolean },
) => {
  switch (action.type) {
    case TaskChanged.DELETE_TASK:
      return { ...state, deleteTask: action.payload };
    case TaskChanged.EDIT_TASK:
      return { ...state, editTask: action.payload };
    case TaskChanged.NEW_TASK:
      return { ...state, newTask: action.payload };
    default:
      return state;
  }
};

export const DashboardContext =
  React.createContext<DashboardContext>(initialState);

export const DashboardContextProvider: React.FC<DashboardContextProps> = ({
  children,
}) => {
  const [state, dispatch] = React.useReducer(stateReducer, initialState);

  return (
    <DashboardContext.Provider value={{ ...state, dispatch }}>
      {children}
    </DashboardContext.Provider>
  );
};

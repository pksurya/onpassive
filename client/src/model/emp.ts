import { CommonActionType } from "./common";

export interface IEmp {
  emp: any[];
  loading: boolean;
  error: any;
}

export enum EmpActions {
  "ADD_EMP" = "ADD_EMP",
  "ADD_EMPS" = "ADD_EMPS",
  "UPDATE_EMP" = "UPDATE_EMP",
  "DELETE_EMP" = "DELETE_EMP",
  "ADD_ERROR" = "ADD_ERROR"
}

export type EmpAction =
  | CommonActionType<typeof EmpActions.ADD_EMP, any>
  | CommonActionType<typeof EmpActions.ADD_EMPS, any>
  | CommonActionType<typeof EmpActions.UPDATE_EMP, any>
  | CommonActionType<typeof EmpActions.DELETE_EMP, any>
  | CommonActionType<typeof EmpActions.ADD_ERROR, any>
  ;

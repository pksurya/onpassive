import { CommonActionType } from "./common";

export interface IAuth {
  userid: string;
  role:string,
  data: any;
  activeWeb:any;
  loading: boolean;
  logined: boolean;
  error: any;
}

export enum AuthActions {
  SET_AUTH_S = "SET_AUTH_S",
  SET_AUTH_F = "SET_AUTH_F",
  SET_AUTH_R = "SET_AUTH_R",
  UPDATE_ACTIVE_WEB = "UPDATE_ACTIVE_WEB",
  UPDATE_ACCESS = "UPDATE_ACCESS",
  UPDATE_LOGINED_USER="UPDATE_LOGINED_USER",
  LOGOUT = "LOGOUT"
}

export type AuthAction =
  | CommonActionType<typeof AuthActions.SET_AUTH_S, any>
  | CommonActionType<typeof AuthActions.SET_AUTH_R, any>
  | CommonActionType<typeof AuthActions.SET_AUTH_F, any>
  | CommonActionType<typeof AuthActions.LOGOUT, any>
  | CommonActionType<typeof AuthActions.UPDATE_ACTIVE_WEB, any>
  | CommonActionType<typeof AuthActions.UPDATE_ACCESS, any>
  | CommonActionType<typeof AuthActions.UPDATE_LOGINED_USER, any>
  ;

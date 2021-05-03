import { combineReducers } from "redux";
import { IAuth,IEmp} from "../model";
import * as authReducer from "./auth";
import * as empReducer from "./emp";

export interface RootState {
	auth:IAuth;
	emp:IEmp;
}

export default (history: any) =>
	combineReducers({
		...authReducer,
		...empReducer
	});

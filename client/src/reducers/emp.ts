import { EmpActions, EmpAction, IEmp } from "../model";
import { deepClone } from "../utility";
import createReducer from "./createReducer";

const updater = (arr: any[], obj: any) => {
	let ar = deepClone(arr);
	for (var i = 0; i < ar.length; i++) {
		let x = ar[i];
		if (x._id == obj._id) {
			ar[i] = obj;
		}
	}
	return ar;
}

export const emp = createReducer<IEmp>(<IEmp>{}, {

	[EmpActions.ADD_ERROR](state: IEmp, action: EmpAction) {
		return { ...state, loading: false, error: action.payload };
	},
	[EmpActions.ADD_EMPS](state: IEmp, action: EmpAction) {
		console.log("----------2------");
		return { ...state, loading: false, emp: action.payload.data };
	},
	[EmpActions.ADD_EMP](state: IEmp, action: EmpAction) {
		console.log("----------3------");
		return { ...state, loading: false, emp: state.emp.concat(action.payload.data) };
	},
	[EmpActions.UPDATE_EMP](state: IEmp, action: EmpAction) {
		return { ...state, loading: false, emp: updater(state.emp, action.payload) };
	},
	[EmpActions.DELETE_EMP](state: IEmp, action: EmpAction) {
		return { ...state, loading: false, emp: state.emp.filter(x => { if (x._id != action.payload._id) { return true; } }) };
	}
});

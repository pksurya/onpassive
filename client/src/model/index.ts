import { AuthAction } from './auth';
import { EmpAction } from './emp';

export * from './auth';
export * from './emp';

export type Action =
    | AuthAction
    | EmpAction
    ;

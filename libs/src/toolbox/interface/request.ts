import type { ResponseType } from "../constants";

export interface IErrorResponse {
  response: {
    data: {
      codigo: string;
      mensaje: string;
      timestamp: string;
    };
  };
}

export interface IResponse {
  type: ResponseType;
  message: string;
}

export interface IAuthError {
  codigo: string;
  mensaje: string;
  timestamp: string;
}

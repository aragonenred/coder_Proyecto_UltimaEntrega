import { Usuarios } from './usuarios';
export interface Sesion {
  sesionActiva:boolean,
  usuario?:Usuarios
}

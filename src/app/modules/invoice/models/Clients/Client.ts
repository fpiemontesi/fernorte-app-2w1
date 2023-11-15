import { CategoriaFiscal } from './CategoriaFiscal';
import { TipoCliente } from './TipoCliente';
import { TipoDocumento } from './TipoDocumento';

export class Client {
  id?: number;
  nombre?: string;
  apellido?: string;
  email?: string;
  telefono?: string;
  id_tipo_doc: TipoDocumento = new TipoDocumento();
  nro_doc?: number;
  id_categoria_fiscal?: CategoriaFiscal;
  id_tipo_cliente: TipoCliente = new TipoCliente();
  cant_puntos?: number;
  domicilio?: string;
}

export class Cliente {
    id = null;
    nombre = '';
    apellido = '';
    email = '';
    telefono = '';
    domicilio = '';
    id_tipo_doc = {
      id_tipo_doc: null,
      tipo_documento: '',
    };
    nroDoc = null;
    id_categoria_fiscal = {
      id_categoria: null,
      descripcion: '',
    };
    id_tipo_cliente = {
      id_tipo_cliente: null,
      tipo_cliente: '',
    };
    id_clasificacion = {
      id_clasificacion: null,
      descripcion: '',
    };
    cant_puntos = 0;
  }

export class Usuario {
    nombre: string = '';
    apellido: string = '';
    username: string = '';
    password: string = '';
    email: string = '';
    telefono: string = '';
    id_tipo_documento: {
      id_tipo_documento: number | null;
      descripcion: string;
    } = {
      id_tipo_documento: null,
      descripcion: '',
    };
    numero_documento: number | null = null;
    id_cargo: {
      id_cargo: number | null;
      descripcion: string;
    } = {
      id_cargo: null,
      descripcion: '',
    };
  }
  
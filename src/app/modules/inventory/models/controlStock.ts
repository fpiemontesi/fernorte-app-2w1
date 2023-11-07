export interface ControlStock {
    id: number;
    lote_id: number;
    descripcion: string;
    cantidad_inspeccionada: number;
    cantidad_dañada: number;
    lote_vencido: boolean;
    fecha:Date
  }
  
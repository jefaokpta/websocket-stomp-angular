export interface Message {
  action: string;
  controlNumber: number;
  whatsapp: string;
  message?: string;
  contacts?: any[];

}

export interface Message {
  action: string;
  controlNumber: number;
  whatsapp: string;
  agent?: string;
  message?: string;
  contacts?: any[];
  departments?: any[];

}

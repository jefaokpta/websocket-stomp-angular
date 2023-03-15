export interface Message {
  action: string;
  controlNumber: number;
  agent: string;
  message?: string;
  contactId?: number;

}

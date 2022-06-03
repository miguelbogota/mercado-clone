export interface Snapshot {
  url: string;
  width: number;
  height: number;
  status: string;
}

export interface MercadoLibreItemDescriptionResponse {
  text: string;
  plain_text: string;
  last_updated: Date;
  date_created: Date;
  snapshot: Snapshot;
}


export interface Order {
  do_id: string;
  do_no: string;
  goods_name: string;
  origin_name: string;
  destination_code: string;
  destination_name: string;
  destination_address: string;
  order_status: number;
}

export interface FilterState {
  order_status: number[];
  origin_code: string[];
  destination_code: string[];
}

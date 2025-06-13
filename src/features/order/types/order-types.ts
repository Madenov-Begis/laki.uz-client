export interface OrderFormBody {
  full_name: string
  phone: string
  address: string
  basket_ids: number[] | null
}

export interface Orders {
  status: string
  id: number
  full_name: string
  phone: string
  address: string
  count: number
  price: number
  product_id: number
  customer_id: number
  oder_id: number
}

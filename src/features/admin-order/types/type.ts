export interface AdminOrderType {
  id: number
  status: string
  full_name: string
  phone: string
  address: string
  items: OrderProduct[]
}

export interface OrderProduct {
  id: number
  count: number
  price: number
  product: {
    id: number
    image: string
    title: string
  }
}

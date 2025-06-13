export interface HTTPError {
  status_code: number
  message: string
  errors?: Record<string, string[]>
}

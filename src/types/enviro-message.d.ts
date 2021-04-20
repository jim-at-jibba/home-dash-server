export interface EnviroMessage {
  temperature: number
  pressure: number
  humidity: number
  oxidised?: number
  reduced?: number
  nh3?: number
  lux?: number
  serial?: string
}

import { AxiosError } from 'axios'
import * as _ from 'lodash'
import { IErrors } from '.'
import { RateLimitDto } from '../models-dto/rate-limit/rate-limit.dto'

const message = 'Generic error'

/**
 * Not api key found
 */
export class GenericError extends Error implements IErrors {
  readonly status: number
  readonly error: Error
  readonly rateLimits: RateLimitDto
  readonly body?: any
  readonly name = 'GenericError'

  constructor (rateLimits: RateLimitDto, error: AxiosError) {
    super(error.message || message)
    this.status = error.response!.status
    this.body = error.response?.data || null;
    this.rateLimits = rateLimits
    this.error = error
    Object.setPrototypeOf(this, GenericError.prototype)
  }
}

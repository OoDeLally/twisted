import Queue from 'promise-queue'
import axios, { AxiosRequestConfig } from 'axios'

export class RequestBase {
  static queue: Queue

  private static sendRequest (config: AxiosRequestConfig) {
    return new Promise((resolve, reject) => {
      axios(config)
        .then(response => resolve(response.data))
        .catch(reject)
    })
  }

  private static getQueue () {
    if (!RequestBase.queue) {
      RequestBase.queue = new Queue(Infinity, Infinity)
    }
    return RequestBase.queue
  }

  static setConcurrency (concurrency: number) {
    RequestBase.queue = new Queue(concurrency, Infinity)
  }

  static request<T> (config: AxiosRequestConfig): Promise<T> {
    return RequestBase.getQueue().add(() => RequestBase.sendRequest(config) as any)
  }
}

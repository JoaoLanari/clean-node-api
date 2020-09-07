import { Controller, HttpRequest, HttpRespose } from '../../presentation/protocols'

export class LogControllerDecorator implements Controller {
  private readonly controller: Controller

  constructor (controller: Controller) {
    this.controller = controller
  }

  async handle (httpRequest: HttpRequest): Promise<HttpRespose> {
    const HttpRespose = await this.controller.handle(httpRequest)
    return HttpRespose
  }
}

import { RequestHandler } from 'express';
import { ExampleService } from '../services/example-service';
import { sendResponse } from '@/common/lib/response';

export class ExampleController {
  private readonly exampleService: ExampleService;

  constructor() {
    this.exampleService = new ExampleService();
  }

  public getExampleResponse: RequestHandler = async (req, res) => {
    const response = this.exampleService.getExampleResponse();
    return sendResponse(res, 200, response);
  };
}

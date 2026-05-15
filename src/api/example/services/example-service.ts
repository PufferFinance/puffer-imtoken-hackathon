import { ExampleRepository } from '../repositories/example-repository';

export class ExampleService {
  private readonly exampleRepository: ExampleRepository;

  constructor() {
    this.exampleRepository = new ExampleRepository();
  }

  public getExampleResponse() {
    return this.exampleRepository.getExampleResponse();
  }
}

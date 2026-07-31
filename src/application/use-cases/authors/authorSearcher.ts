import { Author } from "../../../domain/models/author";
import { AuthorRepositoryInterface } from "../../../domain/repositories/authorRepository.interface";

export class AuthorSearcher {
  constructor(private authorRepository: AuthorRepositoryInterface) {
    // constructor for dependency injection
    this.authorRepository = authorRepository;
  }

  async run(): Promise<Author[]> {
    //Use DB operations
    let authorsFound = await this.authorRepository.find();
    if (authorsFound.length === 0) {
      return [];
    }
    
    return authorsFound;
  }
}

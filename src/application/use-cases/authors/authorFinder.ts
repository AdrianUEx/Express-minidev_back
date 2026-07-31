import { Author } from "../../../domain/models/author";
import { AuthorRepositoryInterface } from "../../../domain/repositories/authorRepository.interface";

// * As a class in the Application Layer, this class can access to its layer and the Domain Layer.
export class AuthorFinder {

  constructor(private authorRepository: AuthorRepositoryInterface) {
    // constructor for dependency injection (no recuerdo qué se inyectaba aquí)
    this.authorRepository = authorRepository;
  }

  async run(id: number): Promise<Author | null> {
    //Use DB operations
    let author = await this.authorRepository.findById(id);
    if(author === null) {
      throw new Error(`Author with id ${id} not found`);
    }
    return author;
  }

}

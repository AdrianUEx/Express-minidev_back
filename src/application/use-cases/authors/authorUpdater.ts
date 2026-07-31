import { Author } from "../../../domain/models/author";
import { AuthorRepositoryInterface } from "../../../domain/repositories/authorRepository.interface";

export class AuthorUpdater {
    
  constructor(private repository: AuthorRepositoryInterface) {}

  run(author: Author): void {
    let foundAuthor = this.repository.findById(author.id);
    if(!foundAuthor) {
      throw new Error(`Author with id ${author.id} not found`);
    }
    this.repository.update(author);

  }
}

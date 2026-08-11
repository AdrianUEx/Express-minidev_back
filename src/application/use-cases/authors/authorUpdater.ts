import { Author } from "../../../domain/models/author";
import { AuthorRepositoryInterface } from "../../../domain/repositories/authorRepository.interface";

export class AuthorUpdater {

  constructor(private repository: AuthorRepositoryInterface) {}

  async run(authorId: number, author: Author): Promise<void> {
    let foundAuthor = await this.repository.findById(authorId);
    if (!foundAuthor) {
      throw new Error(`Author with id ${authorId} not found`);
    }
    await this.repository.update(foundAuthor.id, author); // ! We dont use authorId on this line in order to keep the architecture clean, but I'm not sure if this counts as such.
  }
}

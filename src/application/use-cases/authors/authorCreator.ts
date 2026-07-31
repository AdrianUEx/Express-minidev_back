import { Author } from "../../../domain/models/author";
import { AuthorRepositoryInterface } from "../../../domain/repositories/authorRepository.interface";

export class AuthorCreator {

    constructor(private repository: AuthorRepositoryInterface) {}

    async run(author: Author): Promise<void> {
        let result = await this.repository.create(author);
    }
}
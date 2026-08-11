import { Author } from "../../../domain/models/author";
import { AuthorRepositoryInterface } from "../../../domain/repositories/authorRepository.interface";
import { AppDataSource } from "../../persistence/data-source";
import { TypeORMAuthor } from "../../entities/typeOrmAuthor";

const orm = AppDataSource;
const ormAuthorRepository = orm.getRepository(TypeORMAuthor);

// * This repository implements the real operations using the ORM. Thus, it follows the implementation of the interface defined in the Domain Layer but retrieves the ORM instance as well as the operations from the ORM's .getRepository() method
export class AuthorRepository implements AuthorRepositoryInterface {
  constructor() {}

  async find(): Promise<Author[]> {
    let foundAuthors = await ormAuthorRepository.find();

    return foundAuthors.map((current) => {
      let author: Author = new Author();
      author.id = current.id;
      author.name = current.name;
      author.lastname = current.lastname;
      author.birthDate = current.birthDate;
      author.nationality = current.nationality;
      author.biography = current.biography;
      return author;
    });
  }

  async findById(id: number): Promise<Author | null> {
    const foundAuthor: TypeORMAuthor | null = await ormAuthorRepository.findOneBy({ id: id });
    console.log("Author encontrado: ", foundAuthor);

    if (foundAuthor) {
      let mappedAuthor: Author = new Author();
      mappedAuthor.id = foundAuthor.id;
      mappedAuthor.name = foundAuthor.name;
      mappedAuthor.lastname = foundAuthor.lastname;
      mappedAuthor.birthDate = foundAuthor.birthDate;
      mappedAuthor.nationality = foundAuthor.nationality;
      mappedAuthor.biography = foundAuthor.biography;

      return mappedAuthor;
    }

    return null;
  }

  async create(author: Author): Promise<void> {
    let newAuthor: TypeORMAuthor = new TypeORMAuthor();
    newAuthor.name = author.name;
    newAuthor.lastname = author.lastname;
    newAuthor.birthDate = author.birthDate;
    newAuthor.nationality = author.nationality;
    newAuthor.biography = author.biography;

    const insertResult = await ormAuthorRepository.insert(newAuthor);
  }

  async update(requestId: number, author: Author): Promise<void> {

    let newAuthor: TypeORMAuthor = new TypeORMAuthor();
    newAuthor.name = author.name;
    newAuthor.lastname = author.lastname;
    newAuthor.birthDate = author.birthDate;
    newAuthor.nationality = author.nationality;
    newAuthor.biography = author.biography;

    const updateResult = await ormAuthorRepository.update(requestId, newAuthor);
  }

  async delete(id: number): Promise<void> {

    const deleteResult = await ormAuthorRepository.delete(id);
  }
}

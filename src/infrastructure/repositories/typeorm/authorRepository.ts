
import { Author } from "../../../domain/models/author";
import { AuthorRepositoryInterface } from "../../../domain/repositories/authorRepository.interface";
import { AppDataSource } from "../../data-source";
import { TypeORMAuthor } from "../../entities/typeOrmAuthor";



const orm = AppDataSource;
const ormAuthorRepository = orm.getRepository(TypeORMAuthor);

// * This repository implements the real operations using the ORM. Thus, it follows the implementation of the interface defined in the Domain Layer but retrieves the ORM instance as well as the operations from the ORM's .getRepository() method
export class AuthorRepository implements AuthorRepositoryInterface {

  constructor() {}

  async find(): Author[] {

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

  findById(id: number): Author | null {

    return null;
  }

  create(author: Author): void {

  }

  update(author: Author): void { 

  }

  delete(id: number): void {

  }


}

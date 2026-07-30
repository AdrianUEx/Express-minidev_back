import { Author } from "../../../domain/models/author";
import { AuthorRepositoryInterface } from "../../../domain/repositories/authorRepository.interface";

export class AuthorSearcher {
  constructor(private authorRepository: AuthorRepositoryInterface) {
    // constructor for dependency injection
    this.authorRepository = authorRepository;
  }

  run(): Author[] {
    //Use DB operations
    let authorsFound = this.authorRepository.find();
    if (authorsFound.length === 0) {
      return [];
    }

/*     let mappedAuthors: Author[] = authorsFound.map((current, index) => {
      current.id = authorsFound[index].id;
      current.name = authorsFound[index].name;
      current.lastname = authorsFound[index].lastname;
      current.birthDate = authorsFound[index].birthDate;
      current.nationality = authorsFound[index].nationality;
      current.biography = authorsFound[index].biography;
    }); */
    
    return authorsFound;
  }
}

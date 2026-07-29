import { AuthorDTO } from "../../../domain/models/author.interface";

// * As a class in the Application Layer, this class can access to its layer and the Domain Layer.
export class AuthorFinder {
  /** Esta clase es una abstracción para eliminar una invocación de una operación concreta del getRepository de TypeORM del controller de Author.
   * El tema es que invoque a AuthorFinder en lugar de la instancia de .getRepository(Author) de TypeORM. Está garantizado que esta clase va a tener ese método.
   * No obstante un respaldo debe respaldar desde la abstracción, por eso no se si debe de recuperar aquí la instancia de TypeORM o debe implementar una clase más que sí
   * que sea la que implemente la instancia de TypeORM.
   * Estoy observando que si se cambiase de ORM, solo habría que cambiarlo de los controllers según el código actual, pero si se recuperase la instancia en todos los métodos de la capa de aplicación, habría que
   * borrar todas esas referencias una vez por cada operación, y eso añade trabajo, no lo quita.
   */
  constructor() {
    // constructor for dependency injection (no recuerdo qué se inyectaba aquí)
  }

  findById(id: string): AuthorDTO[] {
    //Use DB operations
    return [];
  }

}

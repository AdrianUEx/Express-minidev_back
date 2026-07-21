import { AuthorDTO } from "./author.interface";

export interface BookDTO {
    isbn: number; // * number is mapped by default as integer in the DB.

    title: string // * String is mapped to varchar(255) by default
    
    publishDate: Date;

    genre: string;

    description: string

    stock: number
    
    author: AuthorDTO
}
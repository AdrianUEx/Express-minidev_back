
export class Customer {

    id: number; // * number is mapped by default as integer in the DB.
    name: string // * String is mapped to varchar(255) by default
    lastname: string
    phone: number
    registrationDate: Date

}
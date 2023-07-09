export interface iUser {
    id: number,
    name: string,
    email: string,
    pass: string
}

export interface iPost {
    id: number,
    userId: number,
    text: string,
    date: Date
}

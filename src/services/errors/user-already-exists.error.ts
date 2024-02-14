export class UserAlreadyExistsError extends Error {
    constructor() {
        super(
            '✘ Ooops. This e-mail already exists with an account registered in our database',
        )
    }
}

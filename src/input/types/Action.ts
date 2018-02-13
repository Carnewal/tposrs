export type UserInput = {
    user: string,
    type: string,
    action: object
}

export class Action {

    user: string
    executed: boolean = false

    constructor(user: string) {
        this.user = user
    }
    
    protected isValid(): boolean {
        console.log('Default isvalid called!')
        return true
    }
    
    public execute(): void {}
    
    public toString(): string {
        return `${this.user}: input`
    }
}
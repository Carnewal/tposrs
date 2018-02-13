import * as RobotJS from 'robotjs'
import { Action } from "./Action";
import { Region, Pixel } from '../InputHandler';
import { CLIENT_SIZE, CLIENT_REGION, VALID_KEYS } from '../../util/Constants';
import { isPointInRegion } from '../../util/Functions';


export class Tap extends Action {
    
    key: string

    constructor(user, action) {
        super(user)
        this.key = action.key.toLowerCase()
    }
    
    protected isValid(): boolean {
        return VALID_KEYS.indexOf(this.key) >= 0
    }

    public execute(): void {
        if(this.isValid()) {
            RobotJS.keyTap(this.key)
        }
        this.executed = true
    }
    

    public toString(): string {
        return `${this.user}: tap(${this.key})`
    }
}
import * as RobotJS from 'robotjs'
import { Action } from "./Action";
import { Region, Pixel } from '../InputHandler';
import { CLIENT_SIZE, CLIENT_REGION } from '../../util/Constants';
import { isPointInRegion } from '../../util/Functions';

export class MouseMoveClick extends Action {
    
    // The x,y coordinate to click on the client
    x: number
    y: number

    screenClientPosition: Pixel
    blockedClientRegions: Region[]
    button: string

    constructor(user, action) {
        super(user)
        this.x = action.x
        this.y = action.y
        this.screenClientPosition = action.screenClientPosition,
        this.blockedClientRegions = action.blockedClientRegions
        this.button = action.button
    }
    
    protected isValid(): boolean {
        return (this.button === 'left' || this.button === 'right')
            && isPointInRegion(this.x, this.y, CLIENT_REGION) 
            && !this.isInsideBlockedRegion()
    }

    private isInsideBlockedRegion(): boolean {
        return this.blockedClientRegions.some(region => isPointInRegion(this.x, this.y, region))
    }

        
    public execute(): void {
        if(this.isValid()) {
            RobotJS.moveMouse(
                this.screenClientPosition.x + this.x, 
                this.screenClientPosition.y + this.y
            )
            RobotJS.mouseClick(this.button)
        }
        this.executed = true
    }
    

    public toString(): string {
        return `${this.user}: click(${this.x},${this.y})`
    }
}
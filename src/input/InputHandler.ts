import * as RobotJS from 'robotjs'
import { setTimeout } from 'timers';
import { Action, UserInput } from './types/Action';
import { ActionFactory } from './ActionFactory';
import { MouseMoveClick } from './types/MouseMoveClick';
import * as Constants from '../util/Constants'

/**
 * A pixel on the screen
 */
export type Pixel = {
    x: number,
    y: number
}

export type Region = {
    tl: {x: number, y: number}, //Top-Left x,y coordinate
    br: {x: number, y: number}, //Bottom-Right x,y coordinate
}

export class InputHandler {

    actionFactory: ActionFactory
    strategy: string

    executedActions: Action[] = []
    actionQueue: Action[] = []

    lastExecution: number = Date.now()

    constructor(
        screenClientPosition: Pixel,
        blockedClientRegions: Region[],
    ) {
        this.strategy = 'ALL'
        this.actionFactory = new ActionFactory(screenClientPosition, blockedClientRegions)
        this.tick()
    }


    public onMessage(channel: string, userstate: any, message: string, self: boolean): void {
        if(self) { return }
        const input: Action = this.actionFactory.create(userstate.username, message)
        if(input) {
            console.log('Pushing ', input.toString())
            this.actionQueue.push(input)
        }
    }


    private tick() {
        this.execute()
        setTimeout(this.tick.bind(this), this.getSleepTime())
    }

    /**
     * Executes all queued actions using the defined strategy.
     */
    private execute() {

        if(this.actionQueue.length === 0) {
            this.keepLoggedIn()
            return
        }

        /*if(this.strategy === 'AVG') {
            const nonClickActions= this.actionQueue.filter((a: Action) => (a instanceof MouseClick || a instanceof MouseMoveClick))
            const clickActions = this.actionQueue.filter((a: Action) => !(a instanceof MouseClick || a instanceof MouseMoveClick))
            const avgClickAction= this.actionFactory.averageClickAction(clickActions)
            
            this.actionQueue = [...nonClickActions, avgClickAction]
        }*/

        this.actionQueue.forEach(a => { a.execute() })
        this.executedActions.push(...this.actionQueue)
        this.actionQueue = []    
        this.lastExecution = Date.now()
    }

    private keepLoggedIn() {
        if( (Date.now() - this.lastExecution) > Constants.KEEP_ALIVE_CLICK_INTERVAL) {
            const tapMessage = `tap ${Constants.VALID_KEYS[Math.floor(Math.random() * Constants.VALID_KEYS.length)]}`
            this.onMessage(Constants.CHAT_CHANNEL, {username: '$system-keepalive$'}, tapMessage, false)
        }
    }

    private getSleepTime() {
        const min = Math.ceil(600);
        const max = Math.floor(3000);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    }



}
import { UserInput, Action } from './types/Action'
import { MouseMoveClick } from './types/MouseMoveClick';
import { Pixel, Region } from './InputHandler';
import { Tap } from './types/Tap';

export class ActionFactory {
    
    screenClientPosition: Pixel
    blockedClientRegions: Region[]

    actionCreators = {
        'click': (user:string, args: string[]) => new MouseMoveClick(user, {
            x: parseInt(args[1]), 
            y: parseInt(args[2]),
            screenClientPosition: this.screenClientPosition,
            blockedClientRegions: this.blockedClientRegions,
            button: 'left'
        }),
        'rclick': (user:string, args: string[]) => new MouseMoveClick(user, {
            x: parseInt(args[1]), 
            y: parseInt(args[2]),
            screenClientPosition: this.screenClientPosition,
            blockedClientRegions: this.blockedClientRegions,
            button: 'right'
        }),
        'tap': (user: string, args: string[]) => new Tap(user, {
            key: args[1]
        })
    }
    


    constructor(screenClientPosition, blockedClientRegions) {
        this.screenClientPosition = screenClientPosition
        this.blockedClientRegions = blockedClientRegions
    }



    public create(username: string, message: string): Action {
        let args = message.split(' ')
        if(args.length <= 1 || args.length > 5) {
            return null
        }
        const type = args[0]
        const actionCreator = this.actionCreators[type]
        if(actionCreator) {
            return actionCreator(username, args)
        }
        return null
    }

    /*public averageClickAction(actions: (MouseClick|MouseMoveClick)[]): Action {
        return new MouseMoveClick('system', {
            x: 300,
            y: 0
        })
        /*const red = actions.reduce((acc, action) => {
            return {
                totalX: acc.totalX + action.x,
                
            }
        }, {
            totalX: 0,
            totalY: 0,
            amount: 0,
            users: ''
        })

        return new MouseMoveClick(
            red.users, 
            { 
                x: red.totalX/red.amount, 
                y: red.totalY/red.amount
            }
        )
}*/



}
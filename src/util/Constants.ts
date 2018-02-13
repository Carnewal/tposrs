export const CHAT_CHANNEL = 'twitchplays2007'
//http://robotjs.io/docs/syntax#keys
export const VALID_KEYS = [
    'space', 
    'backspace', 
    'escape',
    'enter',
    'f1', 
    'f2', 
    'f3', 
    'f4', 
    'f5', 
    'f6', 
    'f7', 
    'f8', 
    'f9', 
    'f10', 
    'f11', 
    'f12',
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z'
]


export const CLIENT_SIZE = {
    w: 765,
    h: 503
}

export const CLIENT_REGION = {
    tl: {x: 0, y: 0},
    br: {x: 765, y: 503}
}

//Constants for regions where the client window will be
// The client is 765x503 pixels, the points below are the 
// top-right location of the first pixel of the client in the screen.
export const SCREEN_CLIENT_POSITION = {
    //For 1680x1050 screen with OSRS maximized to the right, the client's top-left pixel is at
    // 877,31
    right1050: {
        x: 877,
        y: 31
    }
}

// Regions not to click within the client region
// Coordinates start at top,left as usual
export const BLOCKED_CLIENT_REGIONS = [
    {
        tl: {x: 624, y: 465},
        br: {x: 663, y: 503}
    }, //logout button (bottom)
    {
        tl: {x: 710, y: 0},
        br: {x: 765, y: 45}
    } //logout button (top)
]

// Auto click somewhere every (2*60*1000ms = 2 minutes)
export const KEEP_ALIVE_CLICK_INTERVAL = 1000*60
import { Region } from "../input/InputHandler";

export const isPointInRegion = (x: number, y: number, region: Region): boolean => {
    return x >= region.tl.x && x <= region.br.x 
        && y >= region.tl.y && y <= region.br.y
}
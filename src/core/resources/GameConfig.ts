// store general game configuration and defined values

export class GameConfig {
    static tileTextureSize: number = 45;       // size of one tile eq to tileTextureSize * tileTextureSize
    static TILE_CANNOT_WALK: number = -1;      // cannot walk on tile - terrain object
    static TILE_OCCUPIED: number = -2;         // tile cannot walk on tile - occupied
}

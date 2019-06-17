export class MapFile {
    public tiles: any;
    public tiles_textures: any;
    public objects: any;
    public object_descriptions: any;
}

let map1 = new MapFile();
map1.tiles = [[0,1,0,0,0,0,1,0,1,0,0,1,0,0,0,1,1,1,1,1,1,0,1,1,1,0,0,1,0,0,0,0,0,1,1,1],
[1,1,1,1,0,0,0,1,0,1,0,1,0,1,0,1,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,1,0,1,0,0],
[1,1,1,1,1,1,1,0,1,1,1,0,0,1,1,1,0,0,0,1,1,0,0,0,1,0,1,0,0,0,0,1,1,1,1,1],
[1,0,1,1,0,1,1,0,1,0,1,1,1,1,1,0,1,1,0,0,1,1,0,0,1,0,0,0,0,0,0,1,0,0,1,0],
[1,1,0,0,0,1,0,0,1,1,1,0,1,0,0,0,0,0,0,0,1,0,1,1,1,1,1,0,1,1,1,0,1,0,1,1],
[0,0,1,1,0,1,0,1,1,0,0,0,0,1,0,1,0,0,1,0,1,0,0,0,1,1,1,0,1,1,1,1,1,1,0,1],
[1,0,0,0,0,0,0,1,0,0,1,1,1,1,1,0,1,0,1,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0],
[1,0,1,0,0,1,0,1,1,1,1,0,1,1,1,1,0,1,0,0,1,1,0,1,1,0,1,1,0,0,0,1,0,1,0,0],
[1,1,0,0,0,0,1,1,1,0,1,0,1,1,0,1,1,0,1,1,1,1,1,0,0,0,0,0,0,1,0,1,1,0,1,0],
[0,1,1,0,1,0,0,1,0,1,1,0,1,0,0,1,0,0,0,1,1,0,1,1,0,0,0,1,1,0,1,0,0,1,0,1],
[0,0,0,0,0,1,1,0,0,0,0,0,1,0,1,0,1,1,0,1,1,1,1,0,1,1,0,1,0,0,1,1,0,1,1,1],
[1,1,0,0,1,0,0,1,1,0,0,0,0,0,1,1,0,0,0,0,0,1,0,0,0,1,0,1,1,1,0,1,0,0,0,0],
[0,0,1,0,0,0,0,0,0,1,0,0,0,0,1,0,1,1,1,0,1,0,1,0,0,0,1,1,0,0,1,0,1,0,1,0],
[1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,0,1,1,1,1,1,1,1,1,1,0,0,1,0,1,0,1,1,0,0],
[1,1,0,0,0,0,0,0,0,1,0,1,0,1,1,1,1,1,1,1,0,1,0,0,1,1,0,0,0,1,0,1,0,1,0,1],
[1,1,0,0,1,1,0,0,1,1,0,1,1,1,0,0,0,0,0,1,0,0,0,0,0,1,0,1,0,1,1,0,1,1,0,0],
[0,1,1,0,0,0,0,0,0,1,0,0,0,0,1,1,1,1,0,1,1,1,0,1,0,0,0,1,1,1,0,0,0,1,1,0],
[1,1,0,0,0,0,1,0,1,0,0,1,1,1,0,0,0,1,0,0,0,1,1,1,0,1,0,0,1,0,1,0,1,1,1,0],
[0,1,1,0,0,0,1,0,1,0,1,1,1,0,1,0,1,0,1,0,0,0,0,0,0,1,0,1,0,1,0,1,1,1,0,1],
[1,0,1,1,0,0,1,0,0,0,1,0,0,1,0,0,1,0,1,1,1,0,1,0,1,1,0,1,1,1,1,1,1,0,1,1],
[0,1,1,0,0,1,1,1,1,1,1,1,0,1,1,0,0,1,0,1,0,1,1,1,0,1,0,0,0,1,1,0,1,0,1,1],
[1,0,0,1,1,0,1,1,1,0,0,0,0,0,0,1,0,1,0,0,1,1,0,1,1,0,0,1,1,1,1,0,0,0,1,0],
[0,1,0,1,0,1,0,1,1,0,1,0,0,0,0,0,1,1,0,0,0,0,1,1,0,1,0,0,1,1,0,0,1,0,1,0],
[0,0,0,0,0,1,0,1,1,1,0,1,0,1,0,0,1,0,1,0,1,0,1,1,1,1,1,0,1,1,0,0,0,1,0,1],
[1,1,1,1,0,1,0,0,1,0,0,0,0,1,1,0,1,0,1,0,0,0,1,0,1,0,1,0,1,1,1,1,0,1,1,0],
[1,0,0,1,1,0,0,1,1,1,0,1,0,1,1,0,0,0,1,1,0,1,1,0,1,1,1,0,1,1,0,0,0,1,0,0],
[0,0,0,1,0,0,1,0,0,1,0,0,0,0,0,1,1,1,1,1,1,1,0,1,1,0,0,1,0,0,1,1,1,1,0,1],
[0,0,1,0,1,1,1,0,0,0,1,0,0,1,1,0,0,1,0,1,1,1,1,1,0,1,0,1,0,1,0,1,0,1,1,0],
[1,0,1,1,0,0,1,0,0,0,1,0,0,0,1,1,1,1,1,0,1,1,1,1,1,1,1,0,0,0,0,0,0,1,0,1],
[1,1,0,0,0,1,0,0,1,1,1,0,0,0,0,1,0,1,0,1,0,0,1,0,1,0,0,0,1,1,1,1,1,1,0,1],
[0,1,0,1,1,0,1,0,1,0,0,0,0,1,0,1,0,1,0,1,0,0,0,0,0,1,0,0,0,1,1,0,1,1,1,1],
[1,1,0,1,1,0,1,1,1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0,0,0,1,1,0,0,1,0,1,0,0,0],
[0,1,1,1,1,1,1,0,1,0,1,1,0,0,0,1,0,1,0,1,0,1,1,1,1,0,0,1,0,1,1,0,0,1,1,1],
[0,0,1,0,1,0,1,0,1,0,0,0,1,1,1,0,1,1,0,0,1,0,1,1,1,1,1,1,1,1,1,0,1,0,0,0],
[1,0,0,0,0,1,0,1,1,0,1,0,1,0,0,1,0,1,0,1,1,0,1,1,1,1,0,1,1,1,0,0,0,0,1,1],
[1,0,0,1,1,1,0,1,1,0,1,0,0,0,1,1,1,0,1,0,0,1,0,1,1,0,1,1,1,1,1,0,0,1,0,1]];

map1.tiles_textures = {
    0: require('../assets/dirt.png'),
    1: require('../assets/grass.png')
};

map1.objects = [{
    pos: [4,4],
    type: ['cliff']
}];

map1.object_descriptions = {
    'cliff' : {
        shape: [2,2]
    }
};

export default map1;
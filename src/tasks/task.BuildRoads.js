const config = require('config');

var taskBuildRoads = {
  
  run: function(game) {
    var spawnPos= game.spawns.Spawn1.pos;
    var room = game.spawns.Spawn1.room;
    var controlPos = game.spawns.Spawn1.room.controller.pos;
    var sources = room.find(FIND_SOURCES);


    // roads to sources
    for (var i = 0; i < sources.length; i++) { 
      let path = room.findPath(spawnPos, sources[i].pos,
        {ignoreCreeps: true, heuristicWeight: 1000});
      _.map(path, function(c) {
        // don't build on source
        if (!sources[i].pos.isNearTo(c.x, c.y)) {
          room.createConstructionSite(c.x, c.y, STRUCTURE_ROAD)
        }
      });
    }

  }
}
      
module.exports = taskBuildRoads;
const config = require('config');

var taskBuildBase = {
  
  run: function(game) {
    var room= game.spawns.Spawn1.room;
    var room_level = room.controller.level;
    var structures = config['structures'];

    // place extensions
    var max_extensions = CONTROLLER_STRUCTURES['extension']['room_level']

    // filter the structures allowed for current rcl
    var to_build = _.filter(structures, function(o) { return o.minRCL <= room_level; });

    // build
    for (s in to_build) {
      room.createConstructionSite(to_build[s].x, to_build[s].y, to_build[s].type);
    }

  }
}
      
module.exports = taskBuildBase;
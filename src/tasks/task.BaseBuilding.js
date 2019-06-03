var roleBuilder = require('roles_role.builder');
const config = require('config');

var taskBaseBuilding = {
  
  run: function(game) {
    var room= game.spawns.Spawn1.room;
    var RCL = room.controller.level;
    var structures = config['structures'];

    // filter the structures allowed for current rcl
    var to_build = _.filter(structures, function(o) { return o.minRCL <= RCL; });

    // build
    for (s in to_build) {
      room.createConstructionSite(to_build[s].x, to_build[s].y, to_build[s].type);
    }
  }
}
      
module.exports = taskBaseBuilding;
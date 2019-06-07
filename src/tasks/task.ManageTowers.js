const config = require('config');

var taskManageTowers = {
  
  run: function() {
    var towers = _.filter(Game.structures, s => s.structureType == STRUCTURE_TOWER);
    if (towers.length > 0) {
      for (t in towers) {
        let tower = towers[t];
        let closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
          filter: (structure) => 
          (structure.hits < structure.hitsMax * config['REPAIR_THRESHOLD'] &&
          structure.structureType != STRUCTURE_WALL && structure.structureType != STRUCTURE_RAMPART)
        });
        if(closestDamagedStructure) {
          tower.repair(closestDamagedStructure);
        }
        let closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
          tower.attack(closestHostile);
        }
      }
    }
  }
}
      
module.exports = taskManageTowers;
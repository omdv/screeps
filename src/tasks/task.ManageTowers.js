const config = require('config');

var taskManageTower = {
  
  run: function() {
    var tower = Game.getObjectById('TOWER_ID');
    if(tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => 
            (structure.hits < structure.hitsMax * config['REPAIR_THRESHOLD'] &&
            structure.structureType != STRUCTURE_WALL && structure.structureType != STRUCTURE_RAMPART)
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }
  }
}
      
module.exports = taskManageTower;
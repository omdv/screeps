const config = require('config');

var taskSpawner = {
  
  run: function(game) {
    var NumberOfMiners = _(Memory.creeps).filter( { role: 'miner' } ).size();
    var NumberOfSources = 20;

    // spawn miners
    for (var i = 0; i < NumberOfSources; i++) {
      // miner per source
      let name = 'miner' + i;
      if (!(name in Memory.creeps)) {
        game.spawns['Spawn1'].spawnCreep(
          [WORK,WORK,MOVE],
          name, {memory: {role: 'miner', source: i}}
        );
      }
      
      // hauler per source
      name = 'hauler' + i;
      if (!(name in Memory.creeps)) {
        game.spawns['Spawn1'].spawnCreep(
          [CARRY,MOVE],
          name, {memory: {role: 'hauler', source: i}}
        );
      }

      // update NumberOfSources
      if (NumberOfSources == 20) {
        NumberOfSources = game.spawns['Spawn1'].room.find(FIND_SOURCES).length;
      }
    }
    
    // spawn other roles
    for (var i = 0; i < config['NUMBER_OF_UPGRADERS']; i++) {
      let name = 'upgrader'+i;
      if (!(name in Memory.creeps)) {
        game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], name, {memory: {role: 'upgrader'}});
      }
    }

    for (var i = 0; i < config['NUMBER_OF_BUILDERS']; i++) {
      let name = 'builder'+i;
      if (!(name in Memory.creeps)) {
        game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], name, {memory: {role: 'builder'}});
      }
    }

    // verbose
    if(game.spawns['Spawn1'].spawning) {
      var spawningCreep = game.creeps[game.spawns['Spawn1'].spawning.name];
      game.spawns['Spawn1'].room.visual.text(
          '🛠️' + spawningCreep.memory.role,
          game.spawns['Spawn1'].pos.x + 1,
          game.spawns['Spawn1'].pos.y,
          {align: 'left', opacity: 0.8});
    }

  }
}
      
module.exports = taskSpawner;
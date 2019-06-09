const config = require('config');

var taskSpawner = {
  
  run: function() {
    var room = Game.spawns['Spawn1'].room;
    var room_level = room.controller.level;

    // evaluate sources
    if (!('sources' in Memory)){
      let sources = room.find(FIND_SOURCES);
      let sources_dict = {};
      _.forEach(sources, function(s, idx){
        let fields = room.lookForAtArea(LOOK_TERRAIN, s.pos.y-1, s.pos.x-1, s.pos.y+1, s.pos.x+1, true);
        let accessibleFields = 9-_.countBy(fields , 'terrain' ).wall;
        // console.log(s, accessibleFields);
        sources_dict[idx] = {
          'source': s,
          'open_fields': accessibleFields,
          'assigned_parts': 0,
          'assigned_miners': 0
        }
      })
      Memory.sources = sources_dict;
    };

    // spawn miners
    _.forOwn(Memory.sources, function(v, k) {
      const work_parts_can_add = Math.floor((room.energyAvailable - 2*BODYPART_COST['move']) / BODYPART_COST['work']);
      
      // cap the amount
      let max_work_parts_needed = 10/HARVEST_POWER - Memory.sources[k]['assigned_parts'];
      let work_parts_to_add = work_parts_can_add > max_work_parts_needed ? max_work_parts_needed : work_parts_can_add;

      // if work_parts can be added
      if (work_parts_to_add > 0){
        // if there is enough space - just add creep
        if (Memory.sources[k]['assigned_miners'] < Memory.sources[k]['open_fields']) {
          let creep_body = [MOVE, MOVE, WORK];
          for (var i = 0; i < work_parts_to_add-1; i++) {
            creep_body.push(WORK);
          }
          let name = 'miner' + Game.time.toString();
          Game.spawns['Spawn1'].spawnCreep(
            creep_body,
            name,
            {memory: {role: 'miner', source: k, work_parts: work_parts_to_add}}
          );
          // update memory
          Memory.sources[k]['assigned_parts'] += work_parts_to_add;
          Memory.sources[k]['assigned_miners'] += 1;
        } else {
          // TODO: create max capacity miner
          null
          // console.log('upgrading miners');
          // // upgrade existing miners
          // let current_miners = _.filter(Memory.creeps, function(c) { 
          //   return (c.memory.role == 'miner' && c.memory.source == k) });
          // current_miners = _.sortKeysBy(current_miners, function (v, k) {
          //   return value;
          // });
        }
      }
    });

    var NumberOfSources = 5;

    // spawn miners
    for (var i = 0; i < NumberOfSources; i++) {
      // hauler per source
      name = 'hauler' + i;
      if (!(name in Memory.creeps)) {
        Game.spawns['Spawn1'].spawnCreep(
          [CARRY,MOVE],
          name, {memory: {role: 'hauler', source: i}}
        );
      }
    }
    
    // spawn other roles
    for (var i = 0; i < config['NUMBER_OF_UPGRADERS']; i++) {
      let name = 'upgrader'+i;
      if (!(name in Memory.creeps)) {
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], name, {memory: {role: 'upgrader'}});
      }
    }

    for (var i = 0; i < config['NUMBER_OF_BUILDERS']; i++) {
      let name = 'builder'+i;
      if (!(name in Memory.creeps)) {
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], name, {memory: {role: 'builder'}});
      }
    }

    // verbose
    if(Game.spawns['Spawn1'].spawning) {
      var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
      Game.spawns['Spawn1'].room.visual.text(
          '🛠️' + spawningCreep.memory.role,
          Game.spawns['Spawn1'].pos.x + 1,
          Game.spawns['Spawn1'].pos.y,
          {align: 'left', opacity: 0.8});
    }

  }
}
      
module.exports = taskSpawner;
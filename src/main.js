// all tasks
var taskSpawner = require('tasks_task.Spawner');
var taskBaseBuilding = require('tasks_task.BaseBuilding');

// all roles
var roleMiner = require('roles_role.miner');
var roleHauler = require('roles_role.hauler');
var roleUpgrader = require('roles_role.upgrader');
var roleBuilder = require('roles_role.builder');

// config
const config = require('config');

module.exports.loop = function () {

    // clear memory
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    // game spawner
    // gameSpawner.run(Game, config);

    // spawnMiners
    taskSpawner.run(Game);

    // Base Building
    if (Game.time % config['BUILDING_CHECK_FREQUENCY'] == 0) {
      console.log('Checking structures');
      taskBaseBuilding.run(Game);
    }


    // var tower = Game.getObjectById('TOWER_ID');
    // if(tower) {
    //     var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
    //         filter: (structure) => structure.hits < structure.hitsMax
    //     });
    //     if(closestDamagedStructure) {
    //         tower.repair(closestDamagedStructure);
    //     }

    //     var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    //     if(closestHostile) {
    //         tower.attack(closestHostile);
    //     }
    // }

    // assign roles
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'miner') {
          roleMiner.run(creep, creep.memory.source);
        }
        if(creep.memory.role == 'hauler') {
          roleHauler.run(creep, creep.memory.source);
        }
        if(creep.memory.role == 'upgrader') {
          roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
          roleBuilder.run(creep);
        }
      }
}
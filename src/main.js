// all tasks
var taskSpawner = require('tasks_task.Spawner');
var taskBuildBase = require('tasks_task.BuildBase');
var taskBuildRoads = require('tasks_task.BuildRoads');
var taskUpdateMemory = require('tasks_task.UpdateMemory');


// all roles
var roleMiner = require('roles_role.miner');
var roleHauler = require('roles_role.hauler');
var roleUpgrader = require('roles_role.upgrader');
var roleBuilder = require('roles_role.builder');

// config
const config = require('config');

module.exports.loop = function () {

    // // clear memory
    // for(var name in Memory.creeps) {
    //     if(!Game.creeps[name]) {
    //         // let creep = Game.creeps[name];
    //         console.log(Memory.creeps[name]);
    //         if (Memory.creeps[name].role == 'miner') {
    //           // console.log('Clearing up miner:', name, Memory.creeps[name].source);
    //           Memory.sources[Memory.creeps[name].source].assigned_parts -= Memory.creeps[name].work_parts;
    //           Memory.sources[Memory.creeps[name].source].assigned_miners -= 1;

    //         }
    //         delete Memory.creeps[name];
    //         console.log('Clearing non-existing creep memory:', name);
    //     }
    // }
    taskUpdateMemory.run();

    // Spawner loop
    // TODO: make room specific
    taskSpawner.run(Game);

    // Construction loops
    if (Game.time % config['BUILDING_CHECK_FREQUENCY'] == 0) {
      console.log('Checking structures');
      taskBuildBase.run(Game);
      taskBuildRoads.run(Game);
    }

    // // Place roads
    // if (Game.time % config['BUILDING_CHECK_FREQUENCY'] == 0) {
    //   console.log('Checking roads');
    //   taskBuildRoads.run(Game);
    // }


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
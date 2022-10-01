//Testing repo

var roleHarvester = require('role.harvester');
var roleBuilder = require('role.builder');
var roleUpgrader = require('role.upgrader');
let spawnStart = false; //We need harvesters to spawn before anyone else 
let ratioHarvest = .2;
let maxCreeps = 3;

module.exports.loop = function() {

//console.log();
//Game.spawns['Spawn1'].spawnCreep( [WORK, CARRY, MOVE], 'Harvester1');

var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader'); 
//console.log('Builders: ' + builders.length);

creepEval();

function totalCreeps() {
    let totalCreeps = 
    harvesters.length 
    + builders.length 
    + upgraders.length;
    console.log(totalCreeps);
    return totalCreeps;

}

function creepEval() {

    let x = totalCreeps();
    //console.log(harvesters.length / x);
    //Code to handle the creation queue of creeps
    if((harvesters.length / x) < ratioHarvest) {
    spawnStart = false;
    }      

    
    spawnHarvester();


}

function spawnHarvester() {
    if(harvesters.length < maxCreeps && spawnStart == false) {
        var newName = 'Harvester' + Game.time;
        console.log('Spawning new harvester: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE,WORK], newName,
            {memory: {role: 'harvester'}});
    } else if (harvesters.length >= maxCreeps && spawnStart == false) {
        spawnStart = true;
        console.log("There are now " + harvesters.length + " harvesters. Switching to creating other creeps.");
    }

}


if(builders.length < maxCreeps && spawnStart == true) {
    var newName = 'Builder' + Game.time;
    console.log('Spawning new builder: ' + newName);
    Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE,WORK], newName,
        {memory: {role: 'builder'}});
}

if(upgraders.length < maxCreeps  && spawnStart == true) {
    var newName = 'Upgrader' + Game.time;
    console.log('Spawning new upgrader: ' + newName);
    Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE,WORK], newName,
    {memory: {role: 'upgrader'}});

}


if(Game.spawns['Spawn1'].spawning) {
    var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
    Game.spawns['Spawn1'].room.visual.text(
        '🛠️' + spawningCreep.memory.role,
        Game.spawns['Spawn1'].pos.x + 1,
        Game.spawns['Spawn1'].pos.y,
        {align: 'left', opacity: 0.8});
}

for(var name in Game.creeps) {
    var creep = Game.creeps[name];
    if(creep.memory.role == 'harvester') {
        roleHarvester.run(creep);
    }
    if(creep.memory.role == 'upgrader') {
        roleUpgrader.run(creep);
    }
    if(creep.memory.role == 'builder') {
        roleBuilder.run(creep);
    }
}

}
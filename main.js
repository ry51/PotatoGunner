/*
// sets username
function verifyuser() {
    localStorage.setItem("username", document.getElementById('userinput').value);
    window.location.assign("http://localhost:5000/game.html");
}

// shows leaderboard
function showleaderboard() {
    window.location.assign("http://localhost:5000/leaderboard.html");
}

// sorts players
function orderPlayers() {
    orderedplayers = players.sort((a, b) => a.frames - b.frames)
}

var username = localStorage.getItem("username");
*/

let canvas = document.querySelector('canvas');

canvas.width = innerWidth;
canvas.height = innerHeight;

const ctx = canvas.getContext('2d')

const x = canvas.width / 2;
const y = innerHeight / 2;

let savestring;
let encodedsave;
let encodedstring;
let decodedstring;
let parsedstring;

var dead = false;
var stage = 0;
var level = 1;
var cleared = false;

let freezemultiplier = 1;

let ss = 12000;

var speed = 8;
var damage = 10;
var freezeduration = 0;
var bossmultiplier = 1;
var dot_damage = 0;
var dot_duration = 0;
var health = 950;
var maxhealth = 950;
var reload_time = 15;
var exp = 0;
var exp_required = [10, 100, 250, 400, 600, 900, 1200, 1600, 2000, 2500, 3200, 4500, 6000, 7500, 9000, 12000, 15000, 18000, 22000, 27000, 32000, 40000, 50000, 60000, 70000, 80000, 90000, 100000, 120000, 140000, 170000, 200000, 240000, 280000, 330000, 380000, 450000];

var leech = 0;

var collectionradius = 50;
var collectionbonus = 1;
var dropchancebonus = 0;
var shadow = 1;
var projlifetime = 60;

var endroundgold = 0;
var endroundpotatoes = 0;
var endroundcopper = 0;
var endroundiron = 0;

var clickable = false;
var exclamation = false;
var buildingex = false;
var lifelevel = 0;
var powerlevel = 0;
var speedlevel = 0;
var experiencedlevel = 0;
var impactlevel = 0;
var agilitylevel = 0;
var gravitylevel = 0;
var precisionlevel = 0;
var points = 0;

var timewarp = 0;

var enemies_killed = 0;

var pierce = 1;
var pause = 0;

var weight = 0;
var multi = 0;
var buck = 0;
var knockback = 0;
var bomb_radius = 0;
var bomb_damage = 0;
var fragments = 0;
var tanks = 0;

var randomizer = Math.random();

var rarityroll = 0;

var enemyattacks = 0;

var damagereduced = 0;

var hpbartoggle = 0;
var infotoggle = 0;
var resourcetoggle = 1;
var savebuttontoggle = 0;
var importtoggle = 0;
var storetoggle = 1;
var upgradetoggle = 1;
var buildingtoggle = 1;

var transmutedisplay = 1;
var smeltdisplay = 1;
var compressdisplay = 1;
var pressurizedisplay = 1;

var upgrade_1;
var upgrade_2;
var upgrade_3;
var upgrade_4;
var upgrade_5;
var upgrade_6;

var cta = 0;

var nav = 1;

var radangle = 0;
var angularvelocity = 0;

var weakened = false;

var incin = 0;

var updated = false;

let winnable = true;

let activated = false;

var players;
var orderedplayers = [];

var player = new Player(x, y, 60, 'blue');

var projectile = new Projectile(renderingPosX(player.x), renderingPosY(player.y), 5, 'black', {x:1, y:1}, true, pierce);
var projectiles = [];
var enemies = [];
var enemyprojectiles = [];

var upgrades = [];
var ownedBuildings = [];

var money = 0;
var potatoes = 0;
var copper = 0;
var iron = 0;
var titanium = 0;
var diamond = 0;
var iridium = 0;
var essence = 0;

var gold = [];
var droppedpotatoes = [];
var droppedcopper = [];
var droppediron = [];
var droppedtitanium = [];
var droppeddiamond = [];
var droppediridium = [];
var droppedessence = [];

var abilities = [];

var coppertransmuter = false;
var smelter = false;
var compressor = false;
var pressurizer = false;
var transmuteinput;
var smeltinput;
var compressinput;
var pressurizerinput;

var sandstorm = Math.random();
var sandstormdirection;

// var saveobjectstring = JSON.parse(localStorage.getItem('saveobject')) || {};
var saveobjectstring;

if (saveobjectstring) {
    for (let key in saveobjectstring) {
        window[key] = saveobjectstring[key];
    }
}

var frames = 0;

var destructAuraActive = false;

let keys = {"w": false, "a": false, "s": false, "d": false}

window.addEventListener("keydown", event => {
    keys[event.key.toLowerCase()] = true
})

window.addEventListener("keyup", event => {
    keys[event.key.toLowerCase()] = false
})

window.onresize = event => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }

// movement
function updateLocation() {
    if (keys["w"] && keys["a"] && player.y > 0 && pause % 2 === 0) {
        if (player.y > 0 && pause % 2 === 0) {
            player.y -= speed/Math.sqrt(2)*freezemultiplier
            projectiles.forEach((projectile, indexp) => {
                if (projectile.isrotating === true) {
                    projectile.y -= speed/Math.sqrt(2)
                }
            })
        }
        if (player.x > 0 && pause % 2 === 0) {
            player.x -= speed/Math.sqrt(2)*freezemultiplier
            projectiles.forEach((projectile, indexp) => {
                if (projectile.isrotating === true) {
                    projectile.x -= speed/Math.sqrt(2)
                }
            })
        }
    } else if (keys["w"] && keys["d"] && player.y > 0 && pause % 2 === 0) {
        if (player.y > 0 && pause % 2 === 0) {
            player.y -= speed/Math.sqrt(2)*freezemultiplier
            projectiles.forEach((projectile, indexp) => {
                if (projectile.isrotating === true) {
                    projectile.y -= speed/Math.sqrt(2)
                }
            })
        }
        if (player.x < 10000 && pause % 2 === 0) {
            player.x += speed/Math.sqrt(2)*freezemultiplier
            projectiles.forEach((projectile, indexp) => {
                if (projectile.isrotating === true) {
                    projectile.x += speed/Math.sqrt(2)
                }
            })
        }
    } else if (keys["s"] && keys["a"] && player.y > 0 && pause % 2 === 0) {
        if (player.y < 10000 && pause % 2 === 0) {
            player.y += speed/Math.sqrt(2)*freezemultiplier
            projectiles.forEach((projectile, indexp) => {
                if (projectile.isrotating === true) {
                    projectile.y += speed/Math.sqrt(2)
                }
            })
        }
        if (player.x  > 0 && pause % 2 === 0) {
            player.x -= speed/Math.sqrt(2)*freezemultiplier
            projectiles.forEach((projectile, indexp) => {
                if (projectile.isrotating === true) {
                    projectile.x -= speed/Math.sqrt(2)
                }
            })
        }
    } else if (keys["s"] && keys["d"] && player.y > 0 && pause % 2 === 0) {
        if (player.y < 10000 && pause % 2 === 0) {
            player.y += speed/Math.sqrt(2)*freezemultiplier
            projectiles.forEach((projectile, indexp) => {
                if (projectile.isrotating === true) {
                    projectile.y += speed/Math.sqrt(2)
                }
            })
        }
        if (player.x < 10000 && pause % 2 === 0) {
            player.x += speed/Math.sqrt(2)*freezemultiplier
            projectiles.forEach((projectile, indexp) => {
                if (projectile.isrotating === true) {
                    projectile.x += speed/Math.sqrt(2)
                }
            })
        }
    } else {
        if (keys["w"] && player.y  > 0 && pause % 2 === 0) {
            player.y -= speed*freezemultiplier
            projectiles.forEach((projectile, indexp) => {
                if (projectile.isrotating === true) {
                    projectile.y -= speed
                }
            })
        }
        if (keys["a"] && player.x  > 0 && pause % 2 === 0) {
            player.x -= speed*freezemultiplier
            projectiles.forEach((projectile, indexp) => {
                if (projectile.isrotating === true) {
                    projectile.x -= speed
                }
            })
        }
        if (keys["s"] && player.y < 10000 && pause % 2 === 0) {
            player.y += speed*freezemultiplier
            projectiles.forEach((projectile, indexp) => {
                if (projectile.isrotating === true) {
                    projectile.y += speed
                }
            })
        }
        if (keys["d"] && player.x < 10000 && pause % 2 === 0) {
            player.x += speed*freezemultiplier
            projectiles.forEach((projectile, indexp) => {
                if (projectile.isrotating === true) {
                    projectile.x += speed
                }
            })
        }
    }
}

setInterval(() => {
     if (dead === false) {
        randomizer = Math.random()
     }
}, 1)


// all rendering pos coordinates are on the currently displayed canvas
function renderingPosX(x) {
    return x + canvas.width / 2 - player.x;
}
function renderingPosY(y) {
    return y + canvas.height / 2 - player.y;
}

// activate ability
function activate(abilityname) {
    if (abilityname === "Destructive Aura") {
        destructAuraActive = true
        enemies.forEach((enemy, index) => {
            if (Math.hypot(enemy.x - player.x, enemy.y - player.y) < 300) {
                if (upgrade_5 === "magic3") {
                    enemies[index].health *= 0.3;  
                } else {
                    enemies[index].health *= 0.5;
                }
            }
        })
        setTimeout(() => {
            destructAuraActive = false
            abilities[0].state = "recharging"
        }, 1000)
    }
}

// add projectiles to gravitational armor
function regengravity(amount, range) {
    for (let i = 0; i < amount; i++) {
        radangle = Math.PI*2*i/amount;
        angularvelocity = {x:Math.cos(radangle)*0, y:Math.sin(radangle)*0}
        projectiles.push(new Projectile(player.x + Math.cos(radangle)*range, player.y + Math.sin(radangle)*range, 8, "#111111", angularvelocity, 1, true, true, radangle, 100 + Math.random()*500))
    }
}

// enemy deaths and item drops
function enemydeath(enemy) {
    exp += enemy.expdrop*(1 + 0.05*experiencedlevel)
    enemies_killed += 1;
    if (exp >= exp_required[level-1]) {
        level += 1;
        clickable = true;
		points += 3;
    }
	
	if (enemies_killed % 100 == 0) {
		droppedessence.push(new Essence(enemy.x, enemy.y, 1))
	}
	
    if (randomizer < 0.015 + 0.015*dropchancebonus && randomizer > 0.01 && stage > 13) {
        droppediridium.push(new Iridium(enemy.x, enemy.y, Math.floor((0.8 + (0.5 + 0.5*Math.random())*10*(2 + level/2 + stage/6))/4)))
    } else if (randomizer < 0.04 + 0.02*dropchancebonus && randomizer > 0.02 && stage > 10) {
        droppeddiamond.push(new Diamond(enemy.x, enemy.y, Math.floor((0.8 + (0.5 + 0.5*Math.random())*10*(2 + level/2 + stage/6))/3.5)))
    } else if (randomizer < 0.06 + 0.03*dropchancebonus && randomizer > 0.04 && stage > 7) {
        droppedtitanium.push(new Titanium(enemy.x, enemy.y, Math.floor((0.8 + (0.5 + 0.5*Math.random())*10*(2 + level/2 + stage/6))/3)))
    } else if (randomizer < 0.09 + 0.045*dropchancebonus && randomizer > 0.06 && stage > 4) {
        droppediron.push(new Iron(enemy.x, enemy.y, Math.floor((0.8 + (0.5 + 0.5*Math.random())*10*(2 + level/2 + stage/6))/2.5)))
    } else if (randomizer < 0.12 + 0.06*dropchancebonus && randomizer > 0.09 && stage > 1) {
        droppedcopper.push(new Copper(enemy.x, enemy.y, Math.floor((0.8 + (0.5 + 0.5*Math.random())*10*(2 + level/2 + stage/6))/2)))
    } else if (randomizer < 0.18 + 0.09*dropchancebonus && randomizer > 0.012) {
        droppedpotatoes.push(new Potato(enemy.x, enemy.y, Math.floor((0.8 + (0.5 + 0.5*Math.random())*10*(2 + level/2 + stage/6))/1.5)))
    } else if (randomizer < 0.27 + 0.13*dropchancebonus && randomizer > 0.18) {
        gold.push(new Gold(enemy.x, enemy.y, Math.floor((0.8 + (0.5 + 0.5*Math.random())*10*(2 + level/2 + stage/6))/1)))
    }
    if (enemy.isSuperBoss === true && winnable === true) {
        newStage()
        winnable = false;
    }
}

// freeze and damage nearby enemies with a cold nova
function coldnova(duration, damage, range) {
    enemies.forEach((enemy, index) => {
        if (Math.hypot(enemy.x - player.x, enemy.y - player.y) < range) {
            enemy.isFrozen = true;
            enemy.health -= damage;
            if (enemy.health <= 0) {
                enemydeath(enemy)
                enemies.splice(index, 1)
            }
            setInterval(() => {
                enemy.isFrozen = false;
            }, duration*1000)
        }
    })
}

// knockback and damage nearby enemies with a cold nova
function kbnova(damage, range) {
    enemies.forEach((enemy, index) => {
        if (Math.hypot(enemy.x - player.x, enemy.y - player.y) < range) {
            enemy.health -= damage;
            if (enemy.health <= 0) {
                enemydeath(enemy)
                enemies.splice(index, 1)
            }
            const kb_angle =  Math.atan2(enemy.x - player.x, enemy.y - player.y)
            enemy.y += (Math.cos(kb_angle)*2)*range/2;
            enemy.x += (Math.sin(kb_angle)*2)*range/2;
        }
    })
}

// enemy boss nova
function bossnova(enemy, damage, projectilecount) {
    for (let i = 0; i < projectilecount; i++) {
        let velocity = {x:Math.cos(Math.PI*2*i/projectilecount)*10, y:Math.sin(Math.PI*2*i/projectilecount)*10}
        enemyprojectiles.push(new enemyProjectile(enemy.x, enemy.y, 10, "purple", velocity, 1, damage, false, false))
    }
}

// nova that damages both enemies and yourself by a percentage of life
function percentnova(item, range, percent) {
    enemies.forEach((enemy, index) => {
        if (Math.hypot(enemy.x - item.x, enemy.y - item.y) < range && activated === false) {
            enemy.health *= percent;
        }
    })
    if (activated === false) {
        health /= 2;    
    }
    activated = true;
}


// incinerator build firearcs
function firearc(projectilecount) {
    const angle = Math.atan2(mousePos.y - canvas.height / 2, mousePos.x - canvas.width / 2)
    for (let i = -projectilecount; i <= projectilecount; i++) {
        let velocity = {x:Math.cos(angle + 0.01*i)*15, y:Math.sin(angle + 0.01*i)*15}
        projectiles.push(new Projectile(player.x, player.y, 5, "#FF9900", velocity, pierce))
    }
}

// change sandstorm direction
function changess() {
	sandstorm = Math.floor(Math.random()*4);
}

/*
// submit time to the leaderboard after the game is completed
async function submitTime(url, data) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    return response.json()
}
*/



var grid = [];
var minimap = [];
noise.seed(Math.random());

function edgeDist(x, y) {
	let a = 50 - x;
	let b = 50 - y;
	return Math.sqrt(a * a + b * b);
}

// generates map tile colours
function getColor(value) {
	if (stage < 6) {
		if (value < 0.04) {
			return "#081108";
        } else if (value < 0.09) {
			return "#173518";
        } else if (value < 0.13) {
			return "#2E6930";
        } else if (value < 0.18) {
			return "#348C31";
        } else if (value < 0.24) {
            return "#EEEE00";
        } else if (value < 0.31) {
            return "#0055B3";
        } else {
            return "#003166";
        }
	} else if (stage < 11) {
		if (value < 0.04) {
			return "#B19A6A";
        } else if (value < 0.09) {
			return "#B9A57A";
        } else if (value < 0.13) {
			return "#C2B18B";
        } else if (value < 0.18) {
			return "#CBBC9B";
        } else if (value < 0.24) {
            return "#D4C7AC";
        } else if (value < 0.31) {
            return "#CEE8F0";
        } else {
            return "#ADD8E6";
        }
	} else if (stage < 16) {
		if (value < 0.04) {
			return "#CCCCCC";
        } else if (value < 0.09) {
			return "#BBBBBB";
        } else if (value < 0.13) {
			return "#AAAAAA";
        } else if (value < 0.18) {
			return "#999999";
        } else if (value < 0.24) {
            return "#888888";
        } else if (value < 0.31) {
            return "#777777";
        } else {
            return "#666666";
        }
	}
		
}

mousePos = {x:0, y:0}
addEventListener("mousemove", event => {
    mousePos.x = event.clientX;
    mousePos.y = event.clientY;
})

function getImage(src){
    let img = new Image()
    img.src = src
    return img
}

// spawn enemies and create levels

// constructor(x, y, radius, velocity, health, maxhealth, expdrop, projradius, projcolor, projpierce, enemyReloadTime, enemyReloadTimer, damage, isFrozen, isDot, isHomingProj, nova, multi, image, isBoss, isSuperBoss, isUnique)
function spawnEnemy(x, y, radius, health, maxhealth, expdrop, projradius, projcolor, projpierce, enemyReloadTime, enemyReloadTimer, damage) {
    let velocity = {x: 0, y: 0};
    enemies.push(new Enemy(x, y, radius, velocity, health, maxhealth, expdrop, projradius, projcolor, projpierce, enemyReloadTime, enemyReloadTimer, damage, false, false, false, 0, 1, "enemy.png", false, false, false))
}

function spawnHomingEnemy(x, y, radius, health, maxhealth, expdrop, projradius, projcolor, projpierce, enemyReloadTime, enemyReloadTimer, damage) {
    let velocity = {x: 0, y: 0};
    enemies.push(new Enemy(x, y, radius, velocity, health, maxhealth, expdrop, projradius, projcolor, projpierce, enemyReloadTime, enemyReloadTimer, damage, false, false, true, 0, 1, "homingenemy.png", false, false, false))
}

function spawnMultiEnemy(x, y, radius, health, maxhealth, expdrop, projradius, projcolor, projpierce, enemyReloadTime, enemyReloadTimer, damage, multi) {
    let velocity = {x: 0, y: 0};
    enemies.push(new Enemy(x, y, radius, velocity, health, maxhealth, expdrop, projradius, projcolor, projpierce, enemyReloadTime, enemyReloadTimer, damage, false, false, false, 0, multi, "multienemy.png", false, false, false))
}

function spawnNovaEnemy(x, y, radius, health, maxhealth, expdrop, projradius, projcolor, projpierce, enemyReloadTime, enemyReloadTimer, damage, nova) {
    let velocity = {x: 0, y: 0};
    enemies.push(new Enemy(x, y, radius, velocity, health, maxhealth, expdrop, projradius, projcolor, projpierce, enemyReloadTime, enemyReloadTimer, damage, false, false, false, nova, 1, "novaenemy.png", false, false, false))
}


function spawnBoss(x, y, radius, health, maxhealth, expdrop, projradius, projcolor, projpierce, enemyReloadTime, enemyReloadTimer, damage) {
    let velocity = {x: 0, y: 0};
    enemies.push(new Enemy(x, y, radius, velocity, health, maxhealth, expdrop, projradius, projcolor, projpierce, enemyReloadTime, enemyReloadTimer, damage, false, false, false, 0, 1, "mountainminiboss.png", true, false, false))
}

function spawnSuperBoss(x, y, radius, health, maxhealth, expdrop, projradius, projcolor, projpierce, enemyReloadTime, enemyReloadTimer, damage) {
    let velocity = {x: 0, y: 0};
    enemies.push(new Enemy(x, y, radius, velocity, health, maxhealth, expdrop, projradius, projcolor, projpierce, enemyReloadTime, enemyReloadTimer, damage, false, false, false, 0, stage == 5 ? 20 : 5 + Math.floor(stage/3), "mountainsuperboss.png", true, true, false))
}


function addAbility(name, hotkey, cooldown, cooldownremaining, state) {
    abilities.push(new Ability(name, hotkey, cooldown, cooldownremaining, state))
}

function spawnNextStage(stage) {
	if (stage < 6) {
		for (let i = 0; i < 100 + stage*6; i++) {
        	if (stage < 40) {
            	spawnEnemy(Math.random()*10000, Math.random()*10000, 25, (level + 10)*1.06**stage*1.5, (level + 10)*1.06**stage*1.5, Math.floor((level + 10)*1.06**stage/10*1.5), 5, "#FF0000", 1, 75, 75, stage/2)
        	}
    	}
	} else if (stage < 11) {
		for (let i = 0; i < 20 + stage*6; i++) {
        	if (stage < 40) {
            	spawnEnemy(Math.random()*10000, Math.random()*10000, 25, (level + 10)*1.06**stage*1.5, (level + 10)*1.06**stage*1.5, Math.floor((level + 10)*1.06**stage/10*1.5), 5, "#FF0000", 1, 75, 75, stage/2)
        	}
    	}
	}
    
    // x, y, radius, health, maxhealth, expdrop, projradius, projcolor, projpierce, enemyReloadTime, enemyReloadTimer, damage
    if (stage > 2) {
        for (let i = 0; i < 50 + stage*5; i++) {
            if (stage < 40) {
                spawnHomingEnemy(Math.random()*10000, Math.random()*10000, 35, (level + 10)*1.06**stage*1.5, (level + 10)*1.06**stage*1.5, Math.floor(((level + 10)*1.06**stage/10)*1.5), 5, "#800000", 1, 65, 65, stage/2 + 1)
            }
        }
    }
    
    // x, y, radius, health, maxhealth, expdrop, projradius, projcolor, projpierce, enemyReloadTime, enemyReloadTimer, damage, multi
    if (stage > 5) {
        for (let i = 0; i < 80 + stage*4; i++) {
            if (stage < 40) {
                spawnMultiEnemy(Math.random()*10000, Math.random()*10000, 35, (level + 10)*1.06**stage*1.8, (level + 10)*1.06**stage*1.8, Math.floor((level + 10)*1.06**stage/10*1.8), 5, "#F00000", 1, 75, 75, stage/2, Math.floor(Math.random()*6 + 6))
            }
        }
    }

    // x, y, radius, health, maxhealth, expdrop, projradius, projcolor, projpierce, enemyReloadTime, enemyReloadTimer, damage
    if (stage > 1) {
        for (let i = 0; i < 4 + Math.floor(stage/7); i++) {
            if (stage < 40) {
                let bossx = Math.random()*10000;
                let bossy = Math.random()*10000;
                spawnBoss(bossx, bossy, 60, (level + 10)*1.06**stage*15, (level + 10)*1.06**stage*15, Math.floor((level + 10)*1.06**stage*1.5), 7, "#CC0000", 1, 12, 12, stage/1.5 + 3)
                for (let i = 0; i < Math.floor(Math.random()*8 + 10); i++) {
                    spawnEnemy(bossx + Math.random()*600 - 600, bossy + Math.random()*600 - 600, 25, (level + 10)*1.06**stage, (level + 10)*1.06**stage, Math.floor((level + 10)*1.06**stage/10), 5, "#FF0000", 1, 75, 75, stage/1.5)
                }
            }
        } 
    }

    

    
/*
for (let i = 0; i < 30 + stage*6; i++) {
        if (stage < 40) {
            spawnNovaEnemy(Math.random()*10000, Math.random()*10000, 35, (level + 10)*1.06**stage, (level + 10)*1.06**stage, Math.floor((level + 10)*1.06**stage/10), 5, "#F00000", 1, 75, 75, stage/2, 50)
        }
    }

*/
	if (stage % 5 != 0) {
		spawnSuperBoss(9999, 9999, 150, (level + 10)*1.06**stage*180*Math.floor(1 + stage/10), (level + 10)*1.06**stage*180*Math.floor(1 + stage/10), Math.floor((level + 10)*1.06**stage*9*Math.floor(1 + stage/10)), 15, "#00F000", 1, 10, 10, stage/2)
	} else {
		spawnSuperBoss(4999, 4999, 150, (level + 10)*1.06**stage*180*Math.floor(1 + stage/10), (level + 10)*1.06**stage*180*Math.floor(1 + stage/10), Math.floor((level + 10)*1.06**stage*27*Math.floor(1 + stage/10)), 15, "#00F000", 1, 10, 10, stage*1.5)
	}

//function spawnSuperBoss(x, y, radius, health, maxhealth, expdrop, projradius, projcolor, projpierce, enemyReloadTime, enemyReloadTimer, damage, image) {
    //let velocity = {x: 0, y: 0};
    //enemies.push(new SuperBoss(x, y, radius, velocity, health, maxhealth, expdrop, projradius, projcolor, projpierce, enemyReloadTime, enemyReloadTimer, damage, image))
}

function leechboost() {
    leech += 3;
}

function radiusboost() {
    collectionradius += 200;
}

function drboost() {
    damagereduced += 80;
}

function buildtransmute() {
	coppertransmuter = true;
	buildingex = true;
}

function buildsmelter() {
	smelter = true;
	buildingex = true;
}

function buildcompressor() {
	compressor = true;
	buildingex = true;
}

function buildpressurizer() {
	pressurizer = true;
	buildingex = true;
}

function destructionboost() {
	impactlevel += 1;	
}

function buyUpgrade(costau, costp, costcu, costfe, costti, costd, costir, coste, func, index) {
    if (costau <= money && costp <= potatoes && costcu <= copper && costfe <= iron && costti <= titanium && costd <= diamond && costir <= iridium && coste <= essence) {
        money -= costau;
        potatoes -= costp;
        copper -= costcu;
        iron -= costfe;
        titanium -= costti;
        diamond -= costd;
        iridium -= costir;
        essence -= coste;
        func();
        upgrades.splice(index, 1);
    }
}

function newStage() {
    noise.seed(Math.random())
    grid = []
    for (let x = 0; x < 100; x++) {
        grid.push([]);
        for (let y = 0; y < 100; y++) {
            grid[grid.length - 1].push(~~(((p1.get(x / 50, y / 50) + p1.get(x / 100, y / 100) + p2.get(x / 25, y / 25) + p2.get(x / 10, y / 10) * 0.3) / 3.3 + 0.5) * 255));  
        }  
    }
    setTimeout(() => {
        if (pause % 2 == 0) {
            pause += 1;
        }
    }, 1)
    cta = 0;
    infotoggle = 0;
    points += Math.floor(stage/5 + 1)*2;
    health += 200;
    maxhealth += 50;
    health = maxhealth;
    enemies.length = 0;
    projectiles.length = 0;
    enemyprojectiles.length = 0;
    stage += 1;
    if (stage == 2) {
        exclamation = true;
        upgrades.push(new Upgrade("Life leech I", "Every time you hit your enemies, you heal for 3% of your dealt damage.", 150, 100, 0, 0, 0, 0, 0, 1, leechboost))
    }
    if (stage == 3) {
        exclamation = true;
        upgrades.push(new Upgrade("Vacuum I", "Increases resource collection radius by 200%.", 250, 0, 0, 0, 0, 0, 0, 1, radiusboost))
    }
    if (stage == 4) {
        exclamation = true;
        upgrades.push(new Upgrade("Armored I", "Enemy damage reduced by 8%.", 200, 450, 75, 0, 0, 0, 0, 1, drboost))
    }
	if (stage == 6) {
        exclamation = true;
        upgrades.push(new Upgrade("Copper Transmuter", "A building that allows you to turn gold into copper.", 800, 200, 150, 100, 0, 0, 0, 1, buildtransmute))
    }
	if (stage == 8) {
        exclamation = true;
        upgrades.push(new Upgrade("Iron Smelter", "A building that allows you to turn gold and copper into iron.", 900, 300, 200, 200, 100, 0, 0, 1, buildsmelter))
    }
	if (stage == 10) {
        exclamation = true;
        upgrades.push(new Upgrade("Titanium Compressor", "A building that allows you to turn gold, copper, and iron into titanium.", 1100, 300, 400, 300, 100, 0, 0, 1, buildcompressor))
    }
	if (stage == 15) {
        exclamation = true;
        upgrades.push(new Upgrade("Diamond Pressurizer", "A building that allows you to turn gold, iron, and titanium into diamond.", 3000, 300, 400, 300, 300, 100, 0, 1, buildpressurizer))
    }
	if (stage == 14) {
        exclamation = true;
        upgrades.push(new Upgrade("Destruction I", "Each hit on an enemy takes off 0.1% of their current life.", 1200, 900, 800, 800, 600, 100, 0, 1, destructionboost))
    }
    
    if (stage === 25 && weakened === false) {
        weakened = true;
        health *= 0.75;
        damage *= 0.75;
        speed *= 0.75;
    }
    player.x = canvas.width / 2;
    player.y = canvas.height / 2;
	
	if (stage > 1) {
		endroundgold = Math.floor((30 + stage*20*Math.random())*Math.random() + 30);
		endroundpotatoes = Math.floor(((30 + stage*20*Math.random())*Math.random() + 30)/2);
	}
	
	if (stage > 2) {
		endroundcopper = Math.floor(((30 + stage*30*Math.random())*Math.random() + 30)/5);
	}
	if (stage > 5) {
		endroundiron = Math.floor(((30 + stage*32*Math.random())*Math.random() + 30)/7);
	}
	
	money += endroundgold;
	potatoes += endroundpotatoes;
	copper += endroundcopper;
	iron += endroundiron;
	
	
	
	
    if (stage <= 40) {
        spawnNextStage(stage)
    } else {
        submitTime('http://localhost:5000/api/players', {
            username: username,
            frames: frames
        }).then(data => {
            players = data;
            orderPlayers();
            localStorage.setItem("playerlist", JSON.stringify(orderedplayers));
        })
        document.getElementById("leaderboardlink").style.display = "initial";
    }
}

addEventListener("keydown", event => {
    if (event.keyCode === 32 && dead === false) {
        pause += 1;
    } else if (event.key === "k") {
        infotoggle += 1;
    } else if (event.key === "l") {
        resourcetoggle += 1;
    } else if (event.key === "m") {
        upgradetoggle += 1;
    } else if (event.key === "n") {
        buildingtoggle += 1;
    } else if (event.key === "q") {
        while (health < maxhealth - 10 && potatoes > 0) {
            potatoes -= 1;
            health += 10;
        }
    } else if (event.keyCode < 58 && event.keyCode > 51 && buildingtoggle % 2 == 1) {
        buyUpgrade(upgrades[event.keyCode - 52].costau, upgrades[event.keyCode - 52].costp, upgrades[event.keyCode - 52].costcu, upgrades[event.keyCode - 52].costfe, upgrades[event.keyCode - 52].costti, upgrades[event.keyCode - 52].costd, upgrades[event.keyCode - 52].costir, upgrades[event.keyCode - 52].coste, upgrades[event.keyCode - 52].func, event.keyCode - 52);
    }
})

// activate ability when the hotkey is pressed
addEventListener("keydown", event => {
    abilities.forEach((ability, indexa) => {
        if (event.key === abilities[indexa].hotkey && abilities[indexa].state === "ready") {
            activate(abilities[indexa].name)
            abilities[indexa].state = "active"
            abilities[indexa].cooldownremaining = abilities[indexa].cooldown
        }
    })
})




// decrease cooldown of abilities after each second
setInterval(() => {
    abilities.forEach((ability, indexa) => {
        if (abilities[indexa].cooldownremaining <= 0) {
            abilities[indexa].state = "ready";
        } else if (abilities[indexa].cooldownremaining > 0 && pause % 2 === 0) {
            abilities[indexa].cooldownremaining -= 1;
        }
    })
}, 1000)

// spray boss novas periodically on superboss levels
setInterval(() => {
    enemies.forEach((enemy) => {
        if (enemy.isSuperBoss === true) {
            bossnova(enemy, 10 + stage*2, 100 + stage*4)
        }
    })
}, 6000 - stage*10)


// spray firearcs periodically
setInterval(() => {
    if (upgrade_6 === "incinerator4") {
        firearc(140)
    } else if (upgrade_5 === "incinerator3") {
        firearc(90)
    }
}, 7000)

// regenerate gravitational armor periodically
setInterval(() => {
    if (upgrade_1 === "heavy" && projectiles.length < 10 + gravitylevel*2 && pause % 2 === 0) {
        regengravity(1 + 0.4*gravitylevel, 100 + Math.random()*500)
    }
}, 1000 - gravitylevel*10)

// refresh enemy attacks to limit melee damage done by enemies
setInterval(() => {
    enemyattacks = 0;
}, 50)

setInterval(() => {
    updated = false;
}, 100)

setInterval(() => {
    winnable = true
}, 1000)

newStage()

animate()
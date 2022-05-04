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

let dead = false;
let stage = 0;
let level = 1;
let freezemultiplier = 1;
let terrainmultiplier = 1;

let ss = 12000;

let speed = 8;
let damage = 10;
let freezeduration = 0;
let bossmultiplier = 1;
let dot_damage = 0;
let dot_duration = 0;
let health = 950;
let maxhealth = 950;
let reload_time = 15;
let exp = 0;
let exp_required = [10, 100, 250, 400, 600, 900, 1200, 1600, 2000, 2500, 3200, 4500, 6000, 7500, 9000, 12000, 15000, 18000, 22000, 27000, 32000, 40000, 50000, 60000, 70000, 80000, 90000, 100000, 120000, 140000, 170000, 200000, 240000, 280000, 330000, 380000, 440000, 500000, 550000, 600000, 660000, 750000, 850000, 1000000];

let leech = 0;
let cap = 0;
let chaos = false;

let collectionradius = 50;
let collectionbonus = 1;
let dropchancebonus = 0;
let shadow = 1;
let projlifetime = 60;

let endroundgold = 0;
let endroundpotatoes = 0;
let endroundcopper = 0;
let endroundiron = 0;

let clickable = false;
let exclamation = false;
let buildingex = false;
let lifelevel = 0;
let powerlevel = 0;
let speedlevel = 0;
let experiencedlevel = 0;
let impactlevel = 0;
let agilitylevel = 0;
let gravitylevel = 0;
let precisionlevel = 0;
let points = 0;

let timewarp = 0;
let frozen = false;

let spawntimer = 0;
let novatimer = 0;
let firetimer = 0;
let gravtimer = 0;
let attacktimer = 0;

let enemies_killed = 0;

let pierce = 1;
let pause = 0;

let weight = 0;
let multi = 0;
let buck = 0;
let knockback = 0;
let bomb_radius = 0;
let bomb_damage = 0;
let fragments = 0;
let tanks = 0;

let randomizer = Math.random();

let enemyattacks = 0;

let damagereduced = 0;

let hpbartoggle = 0;
let infotoggle = 0;
let resourcetoggle = 1;
let savebuttontoggle = 0;
let importtoggle = 0;
let storetoggle = 1;
let upgradetoggle = 1;
let buildingtoggle = 1;

let transmutedisplay = 1;
let smeltdisplay = 1;
let compressdisplay = 1;
let pressurizedisplay = 1;
let synthesizedisplay = 1;
let vaporizedisplay = 1;

let upgrade_1;
let upgrade_2;
let upgrade_3;
let upgrade_4;
let upgrade_5;
let upgrade_6;
let upgrade_7;

let cta = 0;

let nav = 1;

let radangle = 0;
let angularvelocity = 0;

let weakened = false;

let incin = 0;

let updated = false;

let winnable = true;

let activated = false;

let players;
let orderedplayers = [];

let player = new Player(x, y, 60, 'blue');

let projectile = new Projectile(renderingPosX(player.x), renderingPosY(player.y), 5, 'black', {x:1, y:1}, true, pierce);
let projectiles = [];
let enemies = [];
let enemyprojectiles = [];

let upgrades = [];
let ownedBuildings = [];

let money = 0;
let potatoes = 0;
let copper = 0;
let iron = 0;
let titanium = 0;
let diamond = 0;
let iridium = 0;
let essence = 0;

let gold = [];
let droppedpotatoes = [];
let droppedcopper = [];
let droppediron = [];
let droppedtitanium = [];
let droppeddiamond = [];
let droppediridium = [];
let droppedessence = [];

let abilities = [];

let coppertransmuter = false;
let smelter = false;
let compressor = false;
let pressurizer = false;
let synthesizer = false;
let vaporizer = false;
let transmuteinput;
let smeltinput;
let compressinput;
let pressurizerinput;
let synthesizerinput;
let vaporizerinput;

let sandstorm = Math.random();
let sandstormdirection;

// var saveobjectstring = JSON.parse(localStorage.getItem('saveobject')) || {};
let saveobjectstring;

if (saveobjectstring) {
    for (let key in saveobjectstring) {
        window[key] = saveobjectstring[key];
    }
}

let frames = 0;

let destructAuraActive = false;
let novaActive = false;
let radianceActive = false;
let overdriveActive = false;

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
            player.y -= speed/Math.sqrt(2)*freezemultiplier*terrainmultiplier
            projectiles.forEach((projectile, indexp) => {
                if (projectile.isrotating === true) {
                    projectile.y -= speed/Math.sqrt(2)
                }
            })
        }
        if (player.x > 0 && pause % 2 === 0) {
            player.x -= speed/Math.sqrt(2)*freezemultiplier*terrainmultiplier
            projectiles.forEach((projectile, indexp) => {
                if (projectile.isrotating === true) {
                    projectile.x -= speed/Math.sqrt(2)
                }
            })
        }
    } else if (keys["w"] && keys["d"] && player.y > 0 && pause % 2 === 0) {
        if (player.y > 0 && pause % 2 === 0) {
            player.y -= speed/Math.sqrt(2)*freezemultiplier*terrainmultiplier
            projectiles.forEach((projectile, indexp) => {
                if (projectile.isrotating === true) {
                    projectile.y -= speed/Math.sqrt(2)
                }
            })
        }
        if (player.x < 10000 && pause % 2 === 0) {
            player.x += speed/Math.sqrt(2)*freezemultiplier*terrainmultiplier
            projectiles.forEach((projectile, indexp) => {
                if (projectile.isrotating === true) {
                    projectile.x += speed/Math.sqrt(2)
                }
            })
        }
    } else if (keys["s"] && keys["a"] && player.y > 0 && pause % 2 === 0) {
        if (player.y < 10000 && pause % 2 === 0) {
            player.y += speed/Math.sqrt(2)*freezemultiplier*terrainmultiplier
            projectiles.forEach((projectile, indexp) => {
                if (projectile.isrotating === true) {
                    projectile.y += speed/Math.sqrt(2)
                }
            })
        }
        if (player.x  > 0 && pause % 2 === 0) {
            player.x -= speed/Math.sqrt(2)*freezemultiplier*terrainmultiplier
            projectiles.forEach((projectile, indexp) => {
                if (projectile.isrotating === true) {
                    projectile.x -= speed/Math.sqrt(2)
                }
            })
        }
    } else if (keys["s"] && keys["d"] && player.y > 0 && pause % 2 === 0) {
        if (player.y < 10000 && pause % 2 === 0) {
            player.y += speed/Math.sqrt(2)*freezemultiplier*terrainmultiplier
            projectiles.forEach((projectile, indexp) => {
                if (projectile.isrotating === true) {
                    projectile.y += speed/Math.sqrt(2)
                }
            })
        }
        if (player.x < 10000 && pause % 2 === 0) {
            player.x += speed/Math.sqrt(2)*freezemultiplier*terrainmultiplier
            projectiles.forEach((projectile, indexp) => {
                if (projectile.isrotating === true) {
                    projectile.x += speed/Math.sqrt(2)
                }
            })
        }
    } else {
        if (keys["w"] && player.y  > 0 && pause % 2 === 0) {
            player.y -= speed*freezemultiplier*terrainmultiplier
            projectiles.forEach((projectile, indexp) => {
                if (projectile.isrotating === true) {
                    projectile.y -= speed
                }
            })
        }
        if (keys["a"] && player.x  > 0 && pause % 2 === 0) {
            player.x -= speed*freezemultiplier*terrainmultiplier
            projectiles.forEach((projectile, indexp) => {
                if (projectile.isrotating === true) {
                    projectile.x -= speed
                }
            })
        }
        if (keys["s"] && player.y < 10000 && pause % 2 === 0) {
            player.y += speed*freezemultiplier*terrainmultiplier
            projectiles.forEach((projectile, indexp) => {
                if (projectile.isrotating === true) {
                    projectile.y += speed
                }
            })
        }
        if (keys["d"] && player.x < 10000 && pause % 2 === 0) {
            player.x += speed*freezemultiplier*terrainmultiplier
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
            if (Math.hypot(enemy.x - player.x, enemy.y - player.y) < 700) {
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
    } else if (abilityname === "Radiance") {
        radianceActive = true;
        setTimeout(() => {
            radianceActive = false
            abilities[0].state = "recharging"
        }, 4000)
    } else if (abilityname === "Overdrive") {
        overdriveActive = true;
        setTimeout(() => {
            overdriveActive = false
            abilities[0].state = "recharging"
        }, 5000)
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

function freeze(value) {
	frozen = true;	
	freezemultiplier = value;
	setTimeout(() => {
		frozen = false;
		freezemultiplier = 1;
	}, 1000)
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
        enemyprojectiles.push(new enemyProjectile(enemy.x, enemy.y, 10, "#F00000", velocity, 1, damage, false, false))
    }
}

function chaosnova(enemy, damage, range) {
	chaos = true;
	if (Math.hypot(enemy.x - player.x, enemy.y - player.y) < range) {
		health -= damage;
		player.x += Math.random()*300 - 150;
		player.y += Math.random()*300 - 150;
	}
}

// x, y, radius, color, velocity, pierce, damage, isHoming, isFreezing
function bossicenova(enemy, damage, projectilecount) {
    for (let i = 0; i < projectilecount; i++) {
        let velocity = {x:Math.cos(Math.PI*2*i/projectilecount)*10, y:Math.sin(Math.PI*2*i/projectilecount)*10}
        enemyprojectiles.push(new enemyProjectile(enemy.x, enemy.y, 10, "#ADD8E6", velocity, 1, damage, false, true))
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


// normal projectile arcs
function arc(projectilecount, colour, speed) {
    const angle = Math.atan2(mousePos.y - canvas.height / 2, mousePos.x - canvas.width / 2)
    for (let i = -projectilecount; i <= projectilecount; i++) {
        let velocity = {x:Math.cos(angle + 0.01*i)*speed, y:Math.sin(angle + 0.01*i)*speed}
        projectiles.push(new Projectile(player.x, player.y, 5, colour, velocity, pierce))
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



let grid = [];
let minimap = [];
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
	} else if (stage < 21) {
		if (value < 0.09) {
			return "#273F87";
        } else if (value < 0.11) {
			return "#3454B4";
        } else if (value < 0.13) {
			return "#3B5FCD";
        } else if (value < 0.16) {
			return "#BDE0EB";
        } else if (value < 0.19) {
            return "#CEE8F0";
        } else if (value < 0.23) {
            return "#DEEFF5";
        } else {
            return "#EFF7FA";
        }
	} else if (stage < 26) {
		if (value < 0.09) {
			return "#FF7233";
        } else if (value < 0.11) {
			return "#FF6119";
        } else if (value < 0.13) {
			return "#FF4F00";
        } else if (value < 0.16) {
			return "#666666";
        } else if (value < 0.19) {
            return "#555555";
        } else if (value < 0.23) {
            return "#444444";
        } else {
            return "#333333";
        }
	} else if (stage < 30) {
		if (value < 0.09) {
			return "#111111";
        } else if (value < 0.11) {
			return "#222222";
        } else if (value < 0.13) {
			return "#333333";
        } else if (value < 0.16) {
			return "#FF4F00";
        } else if (value < 0.19) {
            return "#DD2100";
        } else if (value < 0.23) {
            return "#BC0000";
        } else {
            return "#AA0000";
        }
	} else {
		return "#000000";	
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

function spawnIceEnemy(x, y, radius, health, maxhealth, expdrop, projradius, projcolor, projpierce, enemyReloadTime, enemyReloadTimer, damage) {
    let velocity = {x: 0, y: 0};
    enemies.push(new Enemy(x, y, radius, velocity, health, maxhealth, expdrop, projradius, projcolor, projpierce, enemyReloadTime, enemyReloadTimer, damage, false, false, false, 0, 1, "iceenemy.png", false, false, false, true))
}

function spawnFireEnemy(x, y, radius, health, maxhealth, expdrop, projradius, projcolor, projpierce, enemyReloadTime, enemyReloadTimer, damage) {
    let velocity = {x: 0, y: 0};
    enemies.push(new Enemy(x, y, radius, velocity, health, maxhealth, expdrop, projradius, projcolor, projpierce, enemyReloadTime, enemyReloadTimer, damage, false, false, false, 0, 1, "fireenemy.png", false, false, false))
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
            	spawnEnemy(Math.random()*10000, Math.random()*10000, 25, (level + 10)*1.06**stage*1.5, (level + 10)*1.06**stage*1.5, Math.floor((level + 10)*1.06**stage/10*1.5), 5, "#FF0000", 1, 75, 75, stage/2);
        	}
    	}
	} else if (stage < 11) {
		for (let i = 0; i < 30 + stage*5; i++) {
        	if (stage < 40) {
            	spawnEnemy(Math.random()*10000, Math.random()*10000, 25, (level + 10)*1.06**stage*1.5, (level + 10)*1.06**stage*1.5, Math.floor((level + 10)*1.06**stage/10*1.5), 5, "#FF0000", 1, 75, 75, stage/1.6);
        	}
    	}
	} else if (stage < 16) {
		for (let i = 0; i < 30 + stage; i++) {
        	if (stage < 40) {
            	spawnEnemy(Math.random()*10000, Math.random()*10000, 25, (level + 10)*1.06**stage*3, (level + 10)*1.06**stage*3, Math.floor((level + 10)*1.06**stage/10*3), 5, "#FF0000", 1, 75, 75, stage/1.2);
        	}
    	}
	} else if (stage < 26) {
		for (let i = 0; i < 10 + stage; i++) {
        	if (stage < 40) {
            	spawnEnemy(Math.random()*10000, Math.random()*10000, 25, (level + 10)*1.06**stage*3, (level + 10)*1.06**stage*3, Math.floor((level + 10)*1.06**stage/10*3), 5, "#FF0000", 1, 75, 75, stage/0.8);
        	}
    	}
	} else if (stage < 31) {
		for (let i = 0; i < 10 + stage; i++) {
        	if (stage < 40) {
            	spawnEnemy(Math.random()*10000, Math.random()*10000, 25, (level + 10)*1.06**stage*3, (level + 10)*1.06**stage*3, Math.floor((level + 10)*1.06**stage/10*3), 5, "#FF0000", 1, 55, 55, stage/0.5);
        	}
    	}
	}
    
    // x, y, radius, health, maxhealth, expdrop, projradius, projcolor, projpierce, enemyReloadTime, enemyReloadTimer, damage
    if (stage > 2) {
        if (stage < 6) {
			for (let i = 0; i < 50 + stage*5; i++) {
            	if (stage < 40) {
                	spawnHomingEnemy(Math.random()*10000, Math.random()*10000, 35, (level + 10)*1.06**stage*1.5, (level + 10)*1.06**stage*1.5, Math.floor(((level + 10)*1.06**stage/10)*1.5), 5, "#800000", 1, 65, 65, stage/2 + 1);
            	}
        	}	
		} else if (stage < 11) {
			for (let i = 0; i < 30 + stage*5; i++) {
            	if (stage < 40) {
                	spawnHomingEnemy(Math.random()*10000, Math.random()*10000, 35, (level + 10)*1.06**stage*1.5, (level + 10)*1.06**stage*1.5, Math.floor(((level + 10)*1.06**stage/10)*1.5), 5, "#800000", 1, 65, 65, stage/1.6 + 1);
            	}
        	}
		} else if (stage < 21) {
			for (let i = 0; i < 20 + stage*3; i++) {
            	if (stage < 40) {
                	spawnHomingEnemy(Math.random()*10000, Math.random()*10000, 35, (level + 10)*1.06**stage*3.5, (level + 10)*1.06**stage*3.5, Math.floor(((level + 10)*1.06**stage/10)*3.5), 5, "#800000", 1, 65, 65, stage + 1);
            	}
        	}
		} else if (stage < 31) {
			for (let i = 0; i < 20 + stage*3; i++) {
            	if (stage < 40) {
                	spawnHomingEnemy(Math.random()*10000, Math.random()*10000, 35, (level + 10)*1.06**stage*5.5, (level + 10)*1.06**stage*5.5, Math.floor(((level + 10)*1.06**stage/10)*5.5), 5, "#800000", 1, 55, 55, stage*1.5 + 1);
            	}
        	}
		}
    }
    
    // x, y, radius, health, maxhealth, expdrop, projradius, projcolor, projpierce, enemyReloadTime, enemyReloadTimer, damage, multi
    if (stage > 5) {
		if (stage < 11) {
			for (let i = 0; i < 80 + stage*4; i++) {
            	if (stage < 40) {
                	spawnMultiEnemy(Math.random()*10000, Math.random()*10000, 35, (level + 10)*1.06**stage*1.8, (level + 10)*1.06**stage*1.8, Math.floor((level + 10)*1.06**stage/10*1.8), 5, "#F00000", 1, 75, 75, stage/2, Math.floor(Math.random()*6 + 6));
            	}
        	}
		} else if (stage < 16) {
			for (let i = 0; i < 60 + stage*3; i++) {
            	if (stage < 40) {
                	spawnMultiEnemy(Math.random()*10000, Math.random()*10000, 35, (level + 10)*1.06**stage*4, (level + 10)*1.06**stage*4, Math.floor((level + 10)*1.06**stage/10*4), 5, "#F00000", 1, 75, 75, stage/1.5, Math.floor(Math.random()*12 + 6));
            	}
        	}	
		} else if (stage < 21) {
			for (let i = 0; i < 30 + stage*3; i++) {
            	if (stage < 40) {
                	spawnMultiEnemy(Math.random()*10000, Math.random()*10000, 35, (level + 10)*1.06**stage*4, (level + 10)*1.06**stage*4, Math.floor((level + 10)*1.06**stage/10*4), 5, "#F00000", 1, 75, 75, stage, Math.floor(Math.random()*20 + 6));
            	}
        	}	
		} else if (stage < 26) {
			for (let i = 0; i < 10 + stage*3; i++) {
            	if (stage < 40) {
                	spawnMultiEnemy(Math.random()*10000, Math.random()*10000, 35, (level + 10)*1.06**stage*5, (level + 10)*1.06**stage*5, Math.floor((level + 10)*1.06**stage/10*5), 5, "#F00000", 1, 65, 65, stage, Math.floor(Math.random()*30 + 6));
            	}
        	}	
		} else if (stage < 31) {
			for (let i = 0; i < 10 + stage*3; i++) {
            	if (stage < 40) {
                	spawnMultiEnemy(Math.random()*10000, Math.random()*10000, 35, (level + 10)*1.06**stage*6, (level + 10)*1.06**stage*6, Math.floor((level + 10)*1.06**stage/10*6), 5, "#F00000", 1, 55, 55, stage, Math.floor(Math.random()*36 + 6));
            	}
        	}	
		}
    }
	
	if (stage > 10) {
		if (stage < 16) {
			for (let i = 0; i < 30 + stage*6; i++) {
        		if (stage < 40) {
            		spawnNovaEnemy(Math.random()*10000, Math.random()*10000, 35, (level + 10)*1.06**stage*5, (level + 10)*1.06**stage*5, Math.floor((level + 10)*1.06**stage/10*5), 5, "#CC0000", 1, 100, 100, stage/1.5, Math.floor(Math.random()*stage*3 + 30));
        		}
    		}
		} else if (stage < 21) {
			for (let i = 0; i < 40 + stage*3; i++) {
        		if (stage < 40) {
            		spawnNovaEnemy(Math.random()*10000, Math.random()*10000, 35, (level + 10)*1.06**stage*5, (level + 10)*1.06**stage*5, Math.floor((level + 10)*1.06**stage/10*5), 5, "#CC0000", 1, 100, 100, stage, Math.floor(Math.random()*stage*6 + 30));
        		}
    		}
		}
	}
	
	
	if (stage > 15) {
		if (stage < 21) {
			for (let i = 0; i < stage*6; i++) {
        		if (stage < 40) {
            		spawnIceEnemy(Math.random()*10000, Math.random()*10000, 35, (level + 10)*1.06**stage*5, (level + 10)*1.06**stage*5, Math.floor((level + 10)*1.06**stage/10*5), 5, "#CC0000", 1, 100, 100, 0);
        		}
    		}
		}
	}
	
	if (stage > 20) {
		if (stage < 31) {
			for (let i = 0; i < stage*6; i++) {
        		if (stage < 40) {
            		spawnFireEnemy(Math.random()*10000, Math.random()*10000, 35, (level + 10)*1.06**stage*6, (level + 10)*1.06**stage*6, Math.floor((level + 10)*1.06**stage/10*6), 3, "#FFA500", 1, 2, 2, stage/3);
        		}
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
                for (let i = 0; i < Math.floor(Math.random()*8 + 10 + stage/5); i++) {
                    spawnEnemy(bossx + Math.random()*600 - 600, bossy + Math.random()*600 - 600, 25, (level + 10)*1.07**stage, (level + 10)*1.07**stage, Math.floor((level + 10)*1.07**stage/10), 5, "#FF0000", 1, 75, 75, stage)
                }
            }
        } 
    }

	if (stage < 5) {
		spawnSuperBoss(9999, 9999, 150, (level + 10)*1.06**stage*75*Math.floor(1 + stage/10), (level + 10)*1.06**stage*75*Math.floor(1 + stage/10), Math.floor((level + 10)*1.06**stage*0.75*Math.floor(1 + stage/10)), 15, "#00F000", 1, 10, 10, stage/2)
	} else if (stage === 5) {
		spawnSuperBoss(4999, 4999, 150, (level + 10)*1.06**stage*180*Math.floor(1 + stage/10), (level + 10)*1.06**stage*180*Math.floor(1 + stage/10), Math.floor((level + 10)*1.06**stage*18*Math.floor(1 + stage/10)), 15, "#00F000", 1, 10, 10, stage*1.5)
	} else if (stage > 5 && stage < 10) {
		spawnSuperBoss(9999, 9999, 150, (level + 10)*1.06**stage*100*Math.floor(1 + stage/10), (level + 10)*1.06**stage*100*Math.floor(1 + stage/10), Math.floor((level + 10)*1.06**stage*Math.floor(1 + stage/10)), 15, "#00F000", 1, 10, 10, stage/2)
	} else if (stage === 10) {
		spawnSuperBoss(4999, 4999, 150, (level + 10)*1.06**stage*210*Math.floor(1 + stage/10), (level + 10)*1.06**stage*210*Math.floor(1 + stage/10), Math.floor((level + 10)*1.06**stage*21*Math.floor(1 + stage/10)), 15, "#00F000", 1, 10, 10, stage*2)
	} else if (stage > 10 && stage < 15) {
		spawnSuperBoss(9999, 9999, 150, (level + 10)*1.06**stage*160*Math.floor(1 + stage/10), (level + 10)*1.06**stage*160*Math.floor(1 + stage/10), Math.floor((level + 10)*1.06**stage*1.6*Math.floor(1 + stage/10)), 15, "#00F000", 1, 10, 10, stage)
	} else if (stage === 15) {
		spawnSuperBoss(4999, 4999, 150, (level + 10)*1.06**stage*400*Math.floor(1 + stage/10), (level + 10)*1.06**stage*320*Math.floor(1 + stage/10), Math.floor((level + 10)*1.06**stage*32*Math.floor(1 + stage/10)), 18, "#00F000", 1, 5, 5, stage*2.5)
	} else if (stage > 15 && stage < 20) {
		spawnSuperBoss(9999, 9999, 150, (level + 10)*1.06**stage*230*Math.floor(1 + stage/10), (level + 10)*1.06**stage*230*Math.floor(1 + stage/10), Math.floor((level + 10)*1.06**stage*2.3*Math.floor(1 + stage/10)), 15, "#00F000", 1, 10, 10, stage*1.5)
	} else if (stage === 20) {
		spawnSuperBoss(4999, 4999, 150, (level + 10)*1.06**stage*600*Math.floor(1 + stage/10), (level + 10)*1.06**stage*450*Math.floor(1 + stage/10), Math.floor((level + 10)*1.06**stage*45*Math.floor(1 + stage/10)), 15, "#0000F0", 1, 7, 7, stage*3.5)
	} else if (stage > 20 && stage < 25) {
		spawnSuperBoss(9999, 9999, 150, (level + 10)*1.06**stage*450*Math.floor(1 + stage/10), (level + 10)*1.06**stage*350*Math.floor(1 + stage/10), Math.floor((level + 10)*1.06**stage*3.5*Math.floor(1 + stage/10)), 15, "#00F000", 1, 7, 7, stage*2)
	} else if (stage === 25) {
		spawnSuperBoss(4999, 4999, 150, (level + 10)*1.06**stage*1100*Math.floor(1 + stage/10), (level + 10)*1.06**stage*750*Math.floor(1 + stage/10), Math.floor((level + 10)*1.06**stage*75*Math.floor(1 + stage/10)), 15, "#00F000", 1, 5, 5, stage*7)
	} else if (stage > 25 && stage < 30) {
		spawnSuperBoss(9999, 9999, 150, (level + 10)*1.06**stage*800*Math.floor(1 + stage/10), (level + 10)*1.06**stage*500*Math.floor(1 + stage/10), Math.floor((level + 10)*1.06**stage*5*Math.floor(1 + stage/10)), 15, "#00F000", 1, 6, 6, stage*4)
	} else if (stage === 30) {
		spawnSuperBoss(4999, 4999, 150, (level + 10)*1.06**stage*50000*Math.floor(1 + stage/10), (level + 10)*1.06**stage*50000*Math.floor(1 + stage/10), 0, 15, "#00F000", 1, 3, 3, stage*5)
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
    damagereduced += 8;
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

function buildsynthesizer() {
	synthesizer = true;
	buildingex = true;
}

function buildvaporizer() {
	vaporizer = true;
	buildingex = true;
}

function destructionboost() {
	impactlevel += 3;	
}

function capboost() {
	cap = 20;	
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
    maxhealth += 100;
    health = maxhealth;
    enemies.length = 0;
    projectiles.length = 0;
    enemyprojectiles.length = 0;
    stage += 1;
    if (stage == 2) {
        exclamation = true;
        upgrades.push(new Upgrade("Life leech I", "Every time you hit your enemies, you heal for 3% of your dealt damage.", 200, 150, 0, 0, 0, 0, 0, 1, leechboost))
    }
    if (stage == 3) {
        exclamation = true;
        upgrades.push(new Upgrade("Vacuum I", "Increases resource collection radius by 200%.", 250, 0, 0, 0, 0, 0, 0, 1, radiusboost))
    }
    if (stage == 4) {
        exclamation = true;
        upgrades.push(new Upgrade("Armored I", "Enemy damage reduced by 8%.", 400, 450, 100, 0, 0, 0, 0, 1, drboost))
    }
	if (stage == 5) {
        exclamation = true;
        upgrades.push(new Upgrade("Vacuum II", "Increases resource collection radius by an additional 200%.", 750, 0, 0, 0, 0, 0, 0, 1, radiusboost))
    }
	if (stage == 6) {
        exclamation = true;
        upgrades.push(new Upgrade("Copper Transmuter", "A building that allows you to turn gold into copper.", 400, 100, 0, 0, 0, 0, 0, 1, buildtransmute))
    }
	if (stage == 7) {
        exclamation = true;
        upgrades.push(new Upgrade("Armored II", "Enemy damage reduced by an additional 8%.", 700, 900, 400, 200, 0, 0, 0, 1, drboost))
    }
	if (stage == 8) {
        exclamation = true;
        upgrades.push(new Upgrade("Iron Smelter", "A building that allows you to turn gold and copper into iron.", 500, 100, 200, 0, 0, 0, 0, 1, buildsmelter))
    }
	if (stage == 9) {
        exclamation = true;
        upgrades.push(new Upgrade("Life leech II", "Every time you hit your enemies, you heal for an additional 3% of your dealt damage.", 1500, 600, 500, 200, 0, 0, 0, 1, leechboost))
    }
	if (stage == 10) {
        exclamation = true;
        upgrades.push(new Upgrade("Titanium Compressor", "A building that allows you to turn gold, copper, and iron into titanium.", 700, 200, 200, 100, 0, 0, 0, 1, buildcompressor))
    }
	if (stage == 11) {
        exclamation = true;
        upgrades.push(new Upgrade("Vacuum III", "Increases resource collection radius by an additional 200%.", 2000, 0, 0, 0, 0, 0, 0, 1, radiusboost))
    }
	if (stage == 13) {
        exclamation = true;
        upgrades.push(new Upgrade("Armored III", "Enemy damage reduced by an additional 8%.", 1000, 900, 500, 300, 0, 0, 0, 1, drboost))
    }
	if (stage == 14) {
        exclamation = true;
        upgrades.push(new Upgrade("Destruction I", "Each hit on an enemy takes off 0.3% of their current life.", 1600, 600, 600, 600, 600, 100, 0, 1, destructionboost))
    }
	if (stage == 15) {
        exclamation = true;
        upgrades.push(new Upgrade("Diamond Pressurizer", "A building that allows you to turn gold, iron, and titanium into diamond.", 2000, 200, 200, 200, 100, 0, 0, 1, buildpressurizer))
    }
	if (stage == 17) {
        exclamation = true;
        upgrades.push(new Upgrade("Life leech III", "Every time you hit your enemies, you heal for an additional 3% of your dealt damage.", 3000, 1500, 800, 400, 300, 200, 100, 1, leechboost))
    }
	if (stage == 18) {
        exclamation = true;
        upgrades.push(new Upgrade("Iridium Synthesizer", "A building that allows you to turn gold, iron, titanium, and diamond into iridium.", 3000, 300, 300, 300, 300, 100, 0, 1, buildsynthesizer))
    }
	if (stage == 20) {
        exclamation = true;
        upgrades.push(new Upgrade("Essence Vaporizer", "A building that turns essence into potatoes.", 5000, 1000, 100, 100, 100, 100, 100, 1, buildvaporizer))
    }
	if (stage == 21) {
        exclamation = true;
        upgrades.push(new Upgrade("Destruction II", "Each hit on an enemy takes off an additional 0.3% of their current life.", 3000, 900, 900, 900, 900, 300, 200, 1, destructionboost))
    }
	if (stage == 22) {
        exclamation = true;
        upgrades.push(new Upgrade("Armored IV", "Enemy damage reduced by an additional 8%.", 2000, 1500, 1200, 600, 600, 300, 0, 1, drboost))
    }
	if (stage == 23) {
        exclamation = true;
        upgrades.push(new Upgrade("Maximizer", "Stats cap at 120 points instead of 100.", 5000, 500, 500, 300, 200, 200, 0, 1, capboost))
    }
	if (stage == 24) {
        exclamation = true;
        upgrades.push(new Upgrade("Life leech IV", "Every time you hit your enemies, you heal for an additional 3% of your dealt damage.", 4200, 2800, 1400, 600, 500, 300, 100, 1, drboost))
    }
	if (stage == 30) {
        exclamation = true;
        upgrades.push(new Upgrade("Destruction III", "Each hit on an enemy takes off an additional 0.3% of their current life.", 4000, 3000, 1200, 1000, 900, 600, 300, 1, destructionboost))
    }
	
    player.x = canvas.width / 2;
    player.y = canvas.height / 2;
	
	if (stage > 1) {
		endroundgold = Math.floor((30 + (stage + level)*80*Math.random())*Math.random() + 30);
		endroundpotatoes = Math.floor(((30 + (stage + level)*80*Math.random())*Math.random() + 30)/2);
	}
	
	if (stage > 2) {
		endroundcopper = Math.floor(((30 + (stage + level)*80*Math.random())*Math.random() + 30)/3);
	}
	if (stage > 5) {
		endroundiron = Math.floor(((30 + (stage + level)*80*Math.random())*Math.random() + 30)/4);
	}
	
	money += endroundgold;
	potatoes += endroundpotatoes;
	copper += endroundcopper;
	iron += endroundiron;
	
    if (stage <= 30) {
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
        if (abilities[indexa].cooldownremaining <= 1) {
            abilities[indexa].state = "ready";
        } else if (abilities[indexa].cooldownremaining > 0 && pause % 2 === 0) {
            abilities[indexa].cooldownremaining -= 1;
        }
    })
}, 1000)

setInterval(() => {
    winnable = true
}, 1000)

newStage()

animate()

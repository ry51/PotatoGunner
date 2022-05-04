function max_health_update() {
    maxhealth *= (1 + 0.1*lifelevel)/(1 + 0.1*(lifelevel-1));
    health *= (1 + 0.1*lifelevel)/(1 + 0.1*(lifelevel-1));
}
function damage_update() {
    damage *= (1 + 0.05*powerlevel)/(1 + 0.05*(powerlevel-1));
    bomb_damage *= (1 + 0.05*powerlevel)/(1 + 0.05*(powerlevel-1));
}
function speed_update() {
    speed *= (1 + 0.1*speedlevel)/(1 + 0.1*(speedlevel-1))
}
function agility_update() {
    abilities.forEach((ability, indexa) => {
        ability.cooldown *= 0.95;
    })  
}

//t1
function fighter() {
    reload_time = 10;
    speed += 1;
}
function multishot() {
    multi = 2;
}
function heavy() {
    weight += 1;
    damage += 4;
}

//t2
function fighter2() {
    reload_time = 7;
    damage += 2;
    speed += 1;
}
function multishot2() {
    multi = 3;
}
function heavy2() {
    weight += 1;
    damage += 6;
}
function light() {
    reload_time = 11;
    speed += 4;
}
function buckshot() {
    reload_time = 50;
    buck = 7;
    knockback = 4;
	damage *= 1.6;
}
function explosive() {
    bomb_radius = 200;
    bomb_damage += 30;
}

//t3
function fighter3() {
    reload_time = 5;
    damage += 3;
    speed += 1;
}
function magic() {
    addAbility("Destructive Aura", "1", 30, 15, "recharging");
    speed += 1;
    reload_time = 8;
}
function multishot3() {
    multi = 5;
}
function buckshot2() {
    reload_time = 60;
    buck = 12;
    knockback = 5;
    damage += 10;
	damage *= 1.3;
}
function piercing() {
    pierce = 3;
    weight -= 1;
    reload_time = 20;
}
function explosive2() {
    bomb_radius = 300;
    bomb_damage *= 2;
}
function incinerator() {
    damage /= 6;
    reload_time = 1;
    incin = 1;
    projlifetime = 30;
}

//t4
function fighter4() {
    reload_time = 4;
    damage += 3;
    speed += 1;
}
function magic2() {
    speed += 1;
    damage *= 1.4;
}
function incinerator2() {
    damage *= 1.75;
}
function multishot4() {
    multi = 8;
    damage += 20;
}
function buckshot3() {
    buck = 18;
    knockback = 6;
    reload_time = 70;
	damage *= 1.8;
}
function explosive3() {
    bomb_radius = 350;
    bomb_damage *= 2;
}
function pierce2() {
    pierce = 6;
    damage += 1;
    reload_time = 24;
}
function fragmented() {
    fragments = 6;
    reload_time = 35;
}
function tank() {
    reload_time = 120;
    pierce = 3;
    tanks = 3;
}

//t5
function fighter5() {
    reload_time = 3;
    damage += 60;
    bossmultiplier *= 1.2;
}
function magic3() {
    speed += 1;
    reload_time = 6;
    bossmultiplier *= 1.2;
    abilities[0].cooldown *= 0.65;
}
function incinerator3() {
    damage *= 1.8;
    projlifetime = 18;
}
function multishot5() {
    multi = 12;
    reload_time = 13;
}
function buckshot4() {
    buck = 24;
    damage *= 3;
    reload_time = 110;
    bossmultiplier *= 1.2;
    impactlevel += 2;
}
function explosive4() {
    bomb_radius = 400;
    bomb_damage *= 3;
}
function pierce3() {
    pierce = 11;
    damage += 30;
    reload_time = 22;
}
function fragmented2() {
    fragments = 10;
    reload_time = 40;
    damage *= 1.3;
}
function tank2() {
    tanks = 5;
    pierce = 5;
    reload_time = 100;
}

//t6
function infiltrator() {
    damage += 80;
    speed += 2;
    damage *= 1.1;
}
function magic4() {
    speed += 1;
    reload_time = 5;
    bossmultiplier *= 1.2;
    abilities[0].cooldown *= 0.8;
}
function incinerator4() {
    damage *= 1.5;
}
function multishot6() {
    multi = 20;
}
function buckshot5() {
    buck = 28;
    bossmultiplier *= 1.2;
    impactlevel += 2;
}
function nuker() {
    bomb_damage *= 3.5;
	bomb_radius = 450;
}
function pierce4() {
    pierce = 20;
}
function fragmented3() {
    fragments = 12;
    reload_time = 30;
    damage *= 1.1;
}
function tank3() {
    tanks = 9;
    pierce = 7;
    reload_time = 70;
}

// t7
function futurefighter() {
	reload_time = 2;
    damage += 110;
    speed += 4;
    damage *= 1.15;
}
function wizmaster() {
    speed += 3;
    reload_time = 3;
    bossmultiplier *= 2;
	damage *= 1.3;
    abilities[0].cooldown *= 0.7;
}
function meltdown() {
	addAbility("Overdrive", "1", 30, 15, "recharging");
    damage *= 2;
	speed += 3;
	bossmultiplier *= 3;
	projlifetime = 45;
}
function hypernova() {
    multi = 36;
	speed += 2;
	damage += 30;
	damage *= 1.2;
	bossmultiplier *= 1.8;
}
function dominance() {
    buck = 36;
    bossmultiplier *= 1.6;
    impactlevel += 5;
	damage /= 2;
	reload_time = 35;
}
function hellnuker() {
    bomb_damage *= 2;
	bossmultiplier *= 5;
	bomb_radius = 550;
	impactlevel += 1;
}
function microwave() {
	addAbility("Radiance", "1", 30, 15, "recharging");
    pierce = 150;
	impactlevel += 1;
}
function megafragmented() {
    fragments = 20;
    reload_time = 40;
    damage *= 2;
}
function missilelancer() {
    tanks = 15;
    pierce = 9;
    reload_time = 48;
}

addEventListener("keydown", event => {
    if (event.key === "z" && level >= 3 && points > 0 && lifelevel < (100 + cap)) {
        lifelevel += 1;
        points -= 1;
        max_health_update()
    }
    if (event.key === "x" && level >= 4 && points > 0 && powerlevel < (100 + cap)) {
        powerlevel += 1;
        points -= 1;
        damage_update()
    }
    if (event.key === "c" && level >= 5 && points > 0 && speedlevel < (100 + cap)) {
        speedlevel += 1;
        points -= 1;
        speed_update()
    }
    if (event.key === "v" && level >= 8 && points > 0 && experiencedlevel < (100 + cap)) {
        experiencedlevel += 1;
        points -= 1;
    }
    if (event.key === "b" && level >= 15 && points > 0 && upgrade_3 === "magic" && agilitylevel < (25 + cap*0.25)) {
        points -= 1;
        agilitylevel += 1;
        agility_update()
    }
	if (event.key === "b" && points > 0 && upgrade_1 === "heavy" && gravitylevel < (50 + cap*0.5)) {
        points -= 1;
        gravitylevel += 1;
    }
	if (event.key === "b" && points > 0 && upgrade_2 === "multishot2" && precisionlevel < (100 + cap)) {
		points -= 1;
		precisionlevel += 1;
	}
	if (event.key === "b" && points > 0 && upgrade_2 === "buckshot" && impactlevel < (10 + cap*0.1)) {
		points -= 1;
		impactlevel += 1;
	}
	
	else if (event.key === "t" && level >= 40 && clickable === true) {
        if (upgrade_6 === "infiltrator") {
            futurefighter();
            upgrade_7 = 'futurefighter';
            clickable = false;
        } else if (upgrade_6 === "magic4") {
            wizmaster();
            upgrade_7 = 'wizmaster';
            clickable = false;
        } else if (upgrade_6 === "incinerator4") {
            meltdown();
            upgrade_7 = 'meltdown';
            clickable = false;
        } else if (upgrade_6 === "multishot6") {
            hypernova();
            upgrade_7 = 'hypernova';
            clickable = false;
        } else if (upgrade_6 === "buckshot5") {
            dominance();
            upgrade_7 = 'dominance';
            clickable = false;
        } else if (upgrade_6 === "nuker") {
            hellnuker();
            upgrade_7 = 'hellnuker';
            clickable = false;
        } else if (upgrade_6 === "pierce4") {
            microwave();
            upgrade_7 = 'microwave';
            clickable = false;
        } else if (upgrade_6 === "fragmented3") {
            megafragmented();
            upgrade_7 = 'megafragmented';
            clickable = false;
        } else if (upgrade_6 === "tank3") {
            missilelancer();
            upgrade_7 = 'missilelancer';
            clickable = false;
        }
    }
	
    else if (event.key === "t" && level >= 32 && clickable === true) {
        if (upgrade_5 === "fighter5") {
            infiltrator();
            upgrade_6 = 'infiltrator';
            clickable = false;
        } else if (upgrade_5 === "magic3") {
            magic4();
            upgrade_6 = 'magic4';
            clickable = false;
        } else if (upgrade_5 === "incinerator3") {
            incinerator4();
            upgrade_6 = 'incinerator4';
            clickable = false;
        } else if (upgrade_5 === "multishot5") {
            multishot6();
            upgrade_6 = 'multishot6';
            clickable = false;
        } else if (upgrade_5 === "buckshot4") {
            buckshot5();
            upgrade_6 = 'buckshot5';
            clickable = false;
        } else if (upgrade_5 === "explosive4") {
            nuker();
            upgrade_6 = 'nuker';
            clickable = false;
        } else if (upgrade_5 === "pierce3") {
            pierce4();
            upgrade_6 = 'pierce4';
            clickable = false;
        } else if (upgrade_5 === "fragmented2") {
            fragmented2();
            upgrade_6 = 'fragmented3';
            clickable = false;
        } else if (upgrade_5 === "tank2") {
            tank3();
            upgrade_6 = 'tank3';
            clickable = false;
        }
    }
    else if (event.key === "t" && level >= 24 && clickable === true) {
        if (upgrade_4 === "fighter4") {
            fighter5();
            upgrade_5 = 'fighter5';
            clickable = false;
        } else if (upgrade_4 === "magic2") {
            magic3();
            upgrade_5 = 'magic3';
            clickable = false;
        } else if (upgrade_4 === "incinerator2") {
            incinerator3();
            upgrade_5 = 'incinerator3';
            clickable = false;
        } else if (upgrade_4 === "multishot4") {
            multishot5();
            upgrade_5 = 'multishot5';
            clickable = false;
        } else if (upgrade_4 === "buckshot3") {
            buckshot4();
            upgrade_5 = 'buckshot4';
            clickable = false;
        } else if (upgrade_4 === "explosive3") {
            explosive4();
            upgrade_5 = 'explosive4';
            clickable = false;
        } else if (upgrade_4 === "pierce2") {
            pierce3();
            upgrade_5 = 'pierce3';
            clickable = false;
        } else if (upgrade_4 === "fragmented") {
            fragmented2();
            upgrade_5 = 'fragmented2';
            clickable = false;
        } else if (upgrade_4 === "tank") {
            tank2();
            upgrade_5 = 'tank2';
            clickable = false;
        }
    }
    else if (event.key === "t" && level >= 17 && clickable === true) {
        if (upgrade_3 === "fighter3") {
            fighter4();
            upgrade_4 = 'fighter4';
            clickable = false;
        } else if (upgrade_3 === "magic") {
            magic2();
            upgrade_4 = 'magic2';
            clickable = false;
        } else if (upgrade_3 === "incinerator") {
            incinerator2();
            upgrade_4 = 'incinerator2';
            clickable = false;
        } else if (upgrade_3 === "multishot3") {
            multishot4();
            upgrade_4 = 'multishot4';
            clickable = false;
        } else if (upgrade_3 === "buckshot2") {
            buckshot3();
            upgrade_4 = 'buckshot3';
            clickable = false;
        } else if (upgrade_3 === "explosive2") {
            explosive3();
            upgrade_4 = 'explosive3';
            clickable = false;
        } else if (upgrade_3 === "pierce") {
            pierce2();
            upgrade_4 = 'pierce2';
            clickable = false;
        }
    }
    else if (event.key === "y" && level >= 17 && clickable === true) {
        if (upgrade_3 === "explosive2") {
            fragmented();
            upgrade_4 = 'fragmented';
            clickable = false;
        } else if (upgrade_3 === "pierce") {
            tank();
            upgrade_4 = 'tank';
            clickable = false;
        }
    }
    else if (event.key === "t" && level >= 12 && clickable === true) {
        if (upgrade_2 === "fighter2") {
            fighter3();
            upgrade_3 = 'fighter3';
            clickable = false;
        } else if (upgrade_2 === "light") {
            magic();
            upgrade_3 = 'magic';
            clickable = false;
        } else if (upgrade_2 === "multishot2") {
            multishot3();
            upgrade_3 = 'multishot3';
            clickable = false;
        } else if (upgrade_2 === "buckshot") {
            buckshot2();
            upgrade_3 = 'buckshot2';
            clickable = false;
        } else if (upgrade_2 === "heavy2") {
            piercing();
            upgrade_3 = 'pierce';
            clickable = false;
        } else if (upgrade_2 === "explosive") {
            explosive2();
            upgrade_3 = 'explosive2';
            clickable = false;
        }
    } else if (event.key === "y" && level >= 12 && clickable === true) {
        if (upgrade_2 === "fighter2") {
            incinerator();
            upgrade_3 = 'incinerator';
            clickable = false;
        }
    } else if (event.key === "t" && level >= 7 && clickable === true) {
        if (upgrade_1 === "fighter") {
            fighter2();
            upgrade_2 = 'fighter2';
            clickable = false;
        } else if (upgrade_1 === "multishot") {
            multishot2();
            upgrade_2 = 'multishot2';
            clickable = false;
        } else if (upgrade_1 === "heavy") {
            heavy2();
            upgrade_2 = 'heavy2';
            clickable = false;
        }
    }  else if (event.key === "y" && level >= 7 && clickable === true) {
        if (upgrade_1 === "fighter") {
            light();
            upgrade_2 = 'light';
            clickable = false;
        } else if (upgrade_1 === "multishot") {
            buckshot();
            upgrade_2 = 'buckshot';
            clickable = false;
        } else if (upgrade_1 === "heavy") {
            explosive();
            upgrade_2 = 'explosive';
            clickable = false;
        }
    } else if (event.key === "t" && level >= 2 && clickable === true) {
        fighter();
        upgrade_1 = 'fighter';
        clickable = false;
    } else if (event.key === "y" && level >= 2 && clickable === true) {
        multishot();
        upgrade_1 = 'multishot';
        clickable = false;
    } else if (event.key === "u" && level >= 2 && clickable === true) {
        heavy();
        upgrade_1 = 'heavy';
        clickable = false;
    }
})
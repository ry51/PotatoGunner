class Player {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.reloadTime = 3;
    }

    draw() {
        ctx.beginPath()
        ctx.arc(renderingPosX(this.x), renderingPosY(this.y), 31, 0, Math.PI * 2, true)
        ctx.fillStyle = "#000000";
        ctx.fill()
        ctx.beginPath()
        ctx.arc(renderingPosX(this.x), renderingPosY(this.y), 30, 0, Math.PI * 2, true)
        ctx.fillStyle = "#B79268";
        ctx.fill()
    }

    shoot() {
        if (incin === 1) {
            const angle = Math.atan2(mousePos.y - canvas.height / 2, mousePos.x - canvas.width / 2)
            const velocity = {x:Math.cos(angle)*8, y:Math.sin(angle)*8}
            projectiles.push(new Projectile(this.x, this.y, 5+3*weight, "#FF9900", velocity, pierce, true, false))
        } else if (fragments > 0) {
            const angle = Math.atan2(mousePos.y - canvas.height / 2, mousePos.x - canvas.width / 2)
            const velocity = {x:Math.cos(angle)*8, y:Math.sin(angle)*8}
            projectiles.push(new Projectile(this.x, this.y, 5+3*weight, "#000000", velocity, pierce, true, false))
        } else if (tanks >= 1) {
            const angle = Math.atan2(mousePos.y - canvas.height / 2, mousePos.x - canvas.width / 2)
            for (let i = 0; i <= tanks; i++) {
                const velocity = {x:Math.cos(angle)*(10 + tanks), y:Math.sin(angle)*(10 + tanks)}
                projectiles.push(new Projectile(this.x + Math.cos(angle)*10*i, this.y + Math.sin(angle)*10*i, 8, "#000000", velocity, pierce, true, false))
            }
        }  else if (buck >= 1) {
            const angle = Math.atan2(mousePos.y - canvas.height / 2, mousePos.x - canvas.width / 2)
            for (let i = 0; i < buck; i++) {
                const velocity = {x:Math.cos(angle+0.03*i - 0.015*buck + 0.015)*6, y:Math.sin(angle+0.03*i - 0.015*buck + 0.015)*6}
                projectiles.push(new Projectile(this.x, this.y, 7+3*weight, "#000000", velocity, pierce, true, false))
            }
        } else if (multi >= 1) {
            const angle = Math.atan2(mousePos.y - canvas.height / 2, mousePos.x - canvas.width / 2)
            for (let i = 0; i < multi; i++) {
                const velocity = {x:Math.cos(angle+0.8*i*0.92**precisionlevel - 0.4*multi*0.92**precisionlevel + 0.4*0.92**precisionlevel)*8, y:Math.sin(angle+0.8*i*0.92**precisionlevel - 0.4*multi*0.92**precisionlevel + 0.4*0.92**precisionlevel)*8}
                projectiles.push(new Projectile(this.x, this.y, 7+3*weight, "#000000", velocity, pierce, true, false))
            }
        } else {
            const angle = Math.atan2(mousePos.y - canvas.height / 2, mousePos.x - canvas.width / 2)
            const velocity = {x:Math.cos(angle)*8, y:Math.sin(angle)*8}
            projectiles.push(new Projectile(this.x, this.y, 7+3*weight, "#000000", velocity, pierce, true, false))
        }
    }

    update() {
        if (pause % 2 === 0) {
            this.reloadTime--
        }
        if (this.reloadTime <= 0 && pause % 2 === 0) {
            this.shoot()
            this.reloadTime = reload_time
        }
    }
}

class Projectile {
    constructor(x, y, radius, color, velocity, pierce, og, isrotating, rotationangle, rotationrange) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
        this.lifeTime = projlifetime;
        this.pierce = pierce;
        this.og = og;
        this.isrotating = isrotating;
        this.rotationangle = rotationangle;
        this.rotationrange = rotationrange;
    }

    draw() {
        ctx.beginPath()
        ctx.arc(renderingPosX(this.x), renderingPosY(this.y), this.radius, 0, Math.PI * 2, true)
        ctx.fillStyle = this.color;
        ctx.fill()
        ctx.closePath()
    }

    update() {
        this.draw()
        if (pause % 2 === 0) {
            this.x = this.x + this.velocity.x;
            this.y = this.y + this.velocity.y;
        }
    }
}

class Enemy {
    constructor(x, y, radius, velocity, health, maxhealth, expdrop, projradius, projcolor, projpierce, enemyReloadTime, enemyReloadTimer, damage, isFrozen, isDot, isHomingProj, nova, multi, image, isBoss, isSuperBoss, isUnique, isIcy) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.velocity = velocity;
        this.health = health;
        this.maxhealth = maxhealth;
        this.expdrop = expdrop;
        this.projradius = projradius;
        this.projcolor = projcolor;
        this.projlifeTime = 60;
        this.projpierce = projpierce;
        this.enemyReloadTime = enemyReloadTime;
        this.enemyReloadTimer = enemyReloadTimer;
        this.damage = damage;
        this.isFrozen = isFrozen;
        this.isDot = isDot;
        this.isHomingProj = isHomingProj;
        this.nova = nova;
        this.multi = multi;
        this.image = getImage(image)
        this.isBoss = isBoss;
        this.isSuperBoss = isSuperBoss;
        this.isUnique = isUnique;
        this.isIcy = isIcy;
    }

    draw() {
        ctx.save();
        ctx.translate(renderingPosX(this.x), renderingPosY(this.y))
        ctx.rotate((Math.atan2(player.y - this.y, player.x - this.x) + Math.PI/2))
        ctx.drawImage(this.image, -this.radius, -this.radius)
        ctx.restore()
    }

    update() {
        this.draw()
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
        if (this.isFrozen === true && pause % 2 === 0) {
            this.enemyReloadTimer -= 0.4;
        } else {
            if (pause % 2 === 0) {
                this.enemyReloadTimer -= 1;
            }
        }
        if (this.enemyReloadTimer <= 0 && pause % 2 === 0) {
            this.shoot();
            this.enemyReloadTimer = this.enemyReloadTime;
        }
    }

    shoot() {
       
        if (this.isHomingProj === true) {
            const angle = Math.atan2(player.y - this.y, player.x - this.x)
            const velocity = {x:Math.cos(angle)*9, y:Math.sin(angle)*9}
            enemyprojectiles.push(new enemyProjectile(this.x, this.y, this.projradius, this.projcolor, velocity, this.projpierce, this.damage, true, false))
        } else if (this.nova > 1) {
            for (let i = 0; i < this.nova; i++) {
                let velocity = {x:Math.cos(Math.PI*2*i/this.nova)*10, y:Math.sin(Math.PI*2*i/this.nova)*10}
                enemyprojectiles.push(new enemyProjectile(this.x, this.y, this.projradius, this.projcolor, velocity, this.projpierce, this.damage, false, false))
            }
        } else {
            for (let i = 0; i < this.multi; i++) {
                const angle = Math.atan2(player.y - this.y, player.x - this.x)
                const velocity = {x:Math.cos(angle+0.1*i - 0.05*this.multi + 0.05)*8, y:Math.sin(angle+0.1*i - 0.05*this.multi + 0.05)*8}
                enemyprojectiles.push(new enemyProjectile(this.x, this.y, this.projradius, this.projcolor, velocity, this.projpierce, this.damage, false, false))
            }
        }
    }
}

class enemyProjectile {
    constructor(x, y, radius, color, velocity, pierce, damage, isHoming, isFreezing) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
        this.isHoming = isHoming;
        if (this.isHoming === true) {
            this.lifeTime = 540;
        }
        else {
            this.lifeTime = 90;
        }
        this.pierce = pierce;
        this.damage = damage;
       
    }

    draw() {
        ctx.beginPath()
        ctx.arc(renderingPosX(this.x), renderingPosY(this.y), this.radius, 0, Math.PI * 2, true)
        ctx.fillStyle = this.color;
        ctx.fill()
        ctx.closePath()
    }

    update() {
        this.draw()
        if (pause % 2 === 0 && this.isHoming === false) {
            this.x = this.x + this.velocity.x;
            this.y = this.y + this.velocity.y;
        } else if (pause % 2 === 0 && this.isHoming === true) {
            let angle = Math.atan2(player.y - this.y, player.x - this.x);
            this.x += Math.cos(angle)*9;
            this.y += Math.sin(angle)*9;
        }
    }
}

class Gold {
    constructor(x, y, amount, droptime) {
        this.x = x;
        this.y = y;
        this.amount = amount;
        this.droptime = droptime;
    }
}

class Potato {
    constructor(x, y, amount, droptime) {
        this.x = x;
        this.y = y;
        this.amount = amount;
        this.droptime = droptime;
    }
}

class Copper {
    constructor(x, y, amount, droptime) {
        this.x = x;
        this.y = y;
        this.amount = amount;
        this.droptime = droptime;
    }
}

class Iron {
    constructor(x, y, amount, droptime) {
        this.x = x;
        this.y = y;
        this.amount = amount;
        this.droptime = droptime;
    }
}

class Titanium {
    constructor(x, y, amount, droptime) {
        this.x = x;
        this.y = y;
        this.amount = amount;
        this.droptime = droptime;
    }
}

class Diamond {
    constructor(x, y, amount, droptime) {
        this.x = x;
        this.y = y;
        this.amount = amount;
        this.droptime = droptime;
    }
}

class Iridium {
    constructor(x, y, amount, droptime) {
        this.x = x;
        this.y = y;
        this.amount = amount;
        this.droptime = droptime;
    }
}

class Essence {
    constructor(x, y, amount, droptime) {
        this.x = x;
        this.y = y;
        this.amount = amount;
        this.droptime = droptime;
    }
}

class Item {
    constructor(x, y, radius, type, name, rarity, description, droptime, image, stats)  {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.type = type;
        this.name = name;
        this.rarity = rarity;
        this.description = description;
        this.droptime = droptime;
        this.image = getImage(image);
        this.stats = stats;
    }
}

class Ability {
    constructor(name, hotkey, cooldown, cooldownremaining, state) {
        this.name = name
        this.hotkey = hotkey
        this.cooldown = cooldown
        this.cooldownremaining = cooldownremaining
        this.state = state
    }
}

class Upgrade {
    constructor(name, description, costau, costp, costcu, costfe, costti, costd, costir, coste, func) {
        this.name = name;
        this.description = description;
        this.costau = costau;
        this.costp = costp;
        this.costcu = costcu;
        this.costfe = costfe;
        this.costti = costti;
        this.costd = costd;
        this.costir = costir;
        this.coste = coste;
        this.func = func;
    }
}



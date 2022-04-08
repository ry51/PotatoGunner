function animate() {
    requestAnimationFrame(animate);
	
	enemyattacks = 0;
	updated = false;

	if (pause % 2 === 0) {
		frames += 1;
	}

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.lineTo(renderingPosX(0), renderingPosY(0));
    ctx.lineTo(renderingPosX(10000), renderingPosY(0));
    ctx.lineTo(renderingPosX(10000), renderingPosY(10000));
    ctx.lineTo(renderingPosX(0), renderingPosY(10000));
    ctx.lineTo(renderingPosX(0), renderingPosY(0));
    ctx.lineWidth = 6;
    ctx.strokeStyle = "black";
    ctx.stroke();
	
	if (stage < 16 || stage > 20) {
		for (let x = 0; x < grid.length; x++) {
        	for (let y = 0; y < grid[x].length; y++) {
            	if (renderingPosX(100 * x) < - 100 || renderingPosX(100 * x) > canvas.width + 100 || renderingPosY(100 * y) < -100 || renderingPosY(100 * y) > canvas.height + 100) {
                	continue;
            	}  
            	ctx.fillStyle = getColor(grid[x][y]*(edgeDist(x, y)/25000));
            	ctx.fillRect(renderingPosX(100 * x), renderingPosY(100 * y), 101, 101);
        	}
    	}
	} else {
		for (let x = 0; x < grid.length; x++) {
        	for (let y = 0; y < grid[x].length; y++) {
            	if (renderingPosX(100 * x) < - 100 || renderingPosX(100 * x) > canvas.width + 100 || renderingPosY(100 * y) < -100 || renderingPosY(100 * y) > canvas.height + 100) {
                	continue;
            	}  
            	ctx.fillStyle = getColor(grid[x][y]/850);
            	ctx.fillRect(renderingPosX(100 * x), renderingPosY(100 * y), 101, 101);
        	}
    	}
	}
   
   
    

    ctx.fillStyle = "#000000";
    ctx.fillRect(canvas.width - 252, canvas.height - 252, 204, 204);

	if (stage < 16 || stage > 20) {
		for (let x = 0; x < grid.length; x += 2) {
        	for (let y = 0; y < grid[x].length; y += 2) {
            	ctx.fillStyle = getColor(grid[x][y]*(edgeDist(x, y)/25000));
            	ctx.fillRect(canvas.width - 250 + 2*x, canvas.height - 250 + 2*y, 4, 4);
        	}
    	}
	} else {
		for (let x = 0; x < grid.length; x += 2) {
        	for (let y = 0; y < grid[x].length; y += 2) {
            	ctx.fillStyle = getColor(grid[x][y]/850);
            	ctx.fillRect(canvas.width - 250 + 2*x, canvas.height - 250 + 2*y, 4, 4);
        	}
    	}
	}
	
    
	
	if (stage > 5 && stage < 11) {
		if (pause % 2 === 0) {
			if (sandstorm == 0) {
				player.x -= (3 + stage/8);	
			} else if (sandstorm == 1) {
				player.x += (3 + stage/8);	
			} else if (sandstorm == 2) {
				player.y -= (3 + stage/8);	
			} else {
				player.y += (3 + stage/8);	
			}
			ss += 1;
			if (ss > 1000) {
				ss = 0;	
				changess();
			}
		}	
	}
	
	if (upgrade_4 === "incinerator2") {
		firetimer += 1;
		if (firetimer > 400) {
			if (upgrade_6 === "incinerator4") {
				firearc(150);	
			} else if (upgrade_5 === "incinerator3") {
				firearc(100);	
			} else {
				firearc(50);	
			}
			firetimer = 0;
		}
	}
	
	if (upgrade_1 === "heavy" && projectiles.length < 10 + gravitylevel*2 && pause % 2 === 0) {
        gravtimer += 1;
		if (gravtimer > (20 - gravitylevel/5)) {
			regengravity(1 + 0.4*gravitylevel, 100 + Math.random()*500);	
		}
    }
	
	let tilex = Math.min(99, Math.max(0, Math.floor(player.x / 100)));
	let tiley = Math.min(99, Math.max(0, Math.floor(player.y / 100)));
	
	if (stage < 16 || stage > 20) {
		if (getColor(grid[tilex][tiley]*(edgeDist(tilex, tiley)/25000)) == "#003166") {
			freezemultiplier = 0.6;
		} else if (getColor(grid[tilex][tiley]*(edgeDist(tilex, tiley)/25000)) == "#0055B3") {
			freezemultiplier = 0.8;
		} else if (getColor(grid[tilex][tiley]*(edgeDist(tilex, tiley)/25000)) == "#CEE8F0") {
			freezemultiplier = 0.95;
		} else if (getColor(grid[tilex][tiley]*(edgeDist(tilex, tiley)/25000)) == "#ADD8E6") {
			freezemultiplier = 0.9;
		} else {
			freezemultiplier = 1;	
		}
	} else {
		if (getColor(grid[tilex][tiley]/850) == "#273F87") {
			freezemultiplier = 0.5;
		} else if (getColor(grid[tilex][tiley]/850) == "#3454B4") {
			freezemultiplier = 0.6;
		} else if (getColor(grid[tilex][tiley]/850) == "#3B5FCD") {
			freezemultiplier = 0.7;
		} else if (getColor(grid[tilex][tiley]/850) == "#BDE0EB") {
			freezemultiplier = 1.5;
		} else if (getColor(grid[tilex][tiley]/850) == "#CEE8F0") {
			freezemultiplier = 1.6;
		} else if (getColor(grid[tilex][tiley]/850) == "#DEEFF5") {
			freezemultiplier = 1.7;
		} else {
			freezemultiplier = 2;	
		}
	}
	
	
	
   

    if (hpbartoggle % 2 == 0) {
        ctx.fillStyle = "#000000";
        ctx.fillRect(renderingPosX(player.x) - 42, renderingPosY(player.y) - 42 - player.radius, 84, 24);
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(renderingPosX(player.x) - 40, renderingPosY(player.y) - 40 - player.radius, 80, 20);
        ctx.fillStyle = "#00FF00";
        ctx.fillRect(renderingPosX(player.x) - 40, renderingPosY(player.y) - 40 - player.radius, 80*(health/maxhealth), 20);
    }

    enemies.forEach((enemy, index) => {
        if (hpbartoggle % 2 == 0) {
            ctx.fillStyle = "#000000";
            ctx.fillRect(renderingPosX(enemy.x) - 42, renderingPosY(enemy.y) - 42 - enemy.radius, 84, 24);
            ctx.fillStyle = "#FF0000";
            ctx.fillRect(renderingPosX(enemy.x) - 40, renderingPosY(enemy.y) - 40 - enemy.radius, 80, 20);
            if (enemy.health <= enemy.maxhealth) {
                ctx.fillStyle = "#00FF00";
                ctx.fillRect(renderingPosX(enemy.x) - 40, renderingPosY(enemy.y) - 40 - enemy.radius, 80*(enemy.health/enemy.maxhealth), 20);
            } else {
                if (enemy.health <= enemy.maxhealth*25) {
                    ctx.fillStyle = `rgb(0, ${Math.floor(255 - enemy.health/enemy.maxhealth*25)}, 0)`;
                    ctx.fillRect(renderingPosX(enemy.x) - 40, renderingPosY(enemy.y) - 40 - enemy.radius, 80, 20);
                } else {
                    ctx.fillStyle = "#000000";
                    ctx.fillRect(renderingPosX(enemy.x) - 40, renderingPosY(enemy.y) - 40 - enemy.radius, 80, 20);        
                }
           
            }
        }
        if (enemy.isSuperBoss === true) {
            ctx.fillStyle = "#000000";
            ctx.beginPath();
            ctx.arc(canvas.width - 250 + enemy.x / 50, canvas.height - 250 + enemy.y / 50, 7, 0, Math.PI*2, true);
            ctx.fill();
            ctx.closePath();
            ctx.fillStyle = "#FF0000";
            ctx.beginPath();
            ctx.arc(canvas.width - 250 + enemy.x / 50, canvas.height - 250 + enemy.y / 50, 6, 0, Math.PI*2, true);
            ctx.fill();
            ctx.closePath();

			if (Math.hypot(enemy.x - player.x, enemy.y - player.y) < 800) {
				novatimer += 1;
				if (novatimer > (360 - stage*2)) {
					novatimer = 0;
					bossnova(enemy, 10 + stage*2, 100 + stage*4);
				}
			}
			if (stage === 10 && Math.hypot(enemy.x - player.x, enemy.y - player.y) < 800) {
				spawntimer += 1;
				if (spawntimer > 30) {
					spawntimer = 0;
					spawnEnemy(enemy.x + Math.random()*800 - 400, enemy.y + Math.random()*800 - 400, 25, 75, 75, 0, 5, "#FF0000", 1, 60, 60, 6);
				}
			}
			
			if (stage === 15) {
				enemy.health += 2;	
			}
			
        } else if (enemy.isBoss === true) {
            ctx.fillStyle = "#000000"
            ctx.beginPath()
            ctx.arc(canvas.width - 250 + enemy.x / 50, canvas.height - 250 + enemy.y / 50, 5, 0, Math.PI*2, true)
            ctx.fill()
            ctx.closePath()
            ctx.fillStyle = "#FFA500"
            ctx.beginPath()
            ctx.arc(canvas.width - 250 + enemy.x / 50, canvas.height - 250 + enemy.y / 50, 4, 0, Math.PI*2, true)
            ctx.fill()
            ctx.closePath()
        } else if (enemy.isUnique === true) {
            ctx.fillStyle = "#000000"
            ctx.beginPath()
            ctx.arc(canvas.width - 250 + enemy.x / 50, canvas.height - 250 + enemy.y / 50, 5, 0, Math.PI*2, true)
            ctx.fill()
            ctx.closePath()
            ctx.fillStyle = "#350480"
            ctx.beginPath()
            ctx.arc(canvas.width - 250 + enemy.x / 50, canvas.height - 250 + enemy.y / 50, 4, 0, Math.PI*2, true)
            ctx.fill()
            ctx.closePath()
        }
    })

    ctx.fillStyle = "#000000"
    ctx.beginPath()
    ctx.arc(canvas.width - 250 + player.x / 50, canvas.height - 250 + player.y / 50, 4, 0, Math.PI*2, true)
    ctx.fill()

    player.draw()
    player.update()

    gold.forEach((piece, indexg) => {
        ctx.fillStyle = "#000000"
        ctx.beginPath()
        ctx.arc(renderingPosX(piece.x), renderingPosY(piece.y), 15, 0, Math.PI*2, true)
        ctx.fill()
        ctx.fillStyle = "#FFFF00"
        ctx.beginPath()
        ctx.arc(renderingPosX(piece.x), renderingPosY(piece.y), 14, 0, Math.PI*2, true)
        ctx.fill()
        if (Math.hypot(player.x - piece.x, player.y - piece.y) < collectionradius) {
            money += gold[indexg].amount
            gold.splice(indexg, 1)
        }
        piece.droptime += 1;
        if (piece.droptime >= 3600) {
            gold.splice(indexg, 1)
        }
        if (Math.hypot(mousePos.x - renderingPosX(piece.x), mousePos.y - renderingPosY(piece.y) + 22) < 30) {
            ctx.font = "30px Courier New"
            ctx.textAlign = "center"
            ctx.fillText(piece.amount + " Gold", renderingPosX(piece.x), renderingPosY(piece.y) - 50)
        }
    })

    droppedpotatoes.forEach((piece, indexdp) => {
        ctx.fillStyle = "#000000"
        ctx.beginPath()
        ctx.arc(renderingPosX(piece.x), renderingPosY(piece.y), 15, 0, Math.PI*2, true)
        ctx.fill()
        ctx.fillStyle = "#B79628"
        ctx.beginPath()
        ctx.arc(renderingPosX(piece.x), renderingPosY(piece.y), 14, 0, Math.PI*2, true)
        ctx.fill()
        if (Math.hypot(player.x - piece.x, player.y - piece.y) < collectionradius) {
            potatoes += droppedpotatoes[indexdp].amount
            droppedpotatoes.splice(indexdp, 1)
        }
        piece.droptime += 1;
        if (piece.droptime >= 3600) {
            droppedpotatoes.splice(indexdp, 1)
        }
        if (Math.hypot(mousePos.x - renderingPosX(piece.x), mousePos.y - renderingPosY(piece.y) + 22) < 30) {
            ctx.font = "30px Courier New"
            ctx.textAlign = "center"
            ctx.fillText(piece.amount + " Potatoes", renderingPosX(piece.x), renderingPosY(piece.y) - 50)
        }
    })

    droppedcopper.forEach((piece, indexdp) => {
        ctx.fillStyle = "#000000"
        ctx.beginPath()
        ctx.arc(renderingPosX(piece.x), renderingPosY(piece.y), 15, 0, Math.PI*2, true)
        ctx.fill()
        ctx.fillStyle = "#B87333"
        ctx.beginPath()
        ctx.arc(renderingPosX(piece.x), renderingPosY(piece.y), 14, 0, Math.PI*2, true)
        ctx.fill()
        if (Math.hypot(player.x - piece.x, player.y - piece.y) < collectionradius) {
            copper += droppedcopper[indexdp].amount
            droppedcopper.splice(indexdp, 1)
        }
        piece.droptime += 1;
        if (piece.droptime >= 3600) {
            droppedcopper.splice(indexdp, 1);
        }
        if (Math.hypot(mousePos.x - renderingPosX(piece.x), mousePos.y - renderingPosY(piece.y) + 22) < 30) {
            ctx.font = "30px Courier New"
            ctx.textAlign = "center"
            ctx.fillText(piece.amount + " Copper", renderingPosX(piece.x), renderingPosY(piece.y) - 50)
        }
    })

    droppediron.forEach((piece, indexdp) => {
        ctx.fillStyle = "#000000"
        ctx.beginPath()
        ctx.arc(renderingPosX(piece.x), renderingPosY(piece.y), 15, 0, Math.PI*2, true)
        ctx.fill()
        ctx.fillStyle = "#A19D94"
        ctx.beginPath()
        ctx.arc(renderingPosX(piece.x), renderingPosY(piece.y), 14, 0, Math.PI*2, true)
        ctx.fill()
        if (Math.hypot(player.x - piece.x, player.y - piece.y) < collectionradius) {
            iron += droppediron[indexdp].amount
            droppediron.splice(indexdp, 1)
        }
        piece.droptime += 1;
        if (piece.droptime >= 3600) {
            droppediron.splice(indexdp, 1);
        }
        if (Math.hypot(mousePos.x - renderingPosX(piece.x), mousePos.y - renderingPosY(piece.y) + 22) < 30) {
            ctx.font = "30px Courier New"
            ctx.textAlign = "center"
            ctx.fillText(piece.amount + " Iron", renderingPosX(piece.x), renderingPosY(piece.y) - 50)
        }
    })

    droppedtitanium.forEach((piece, indexdp) => {
        ctx.fillStyle = "#000000"
        ctx.beginPath()
        ctx.arc(renderingPosX(piece.x), renderingPosY(piece.y), 15, 0, Math.PI*2, true)
        ctx.fill()
        ctx.fillStyle = "#2E4A9E"
        ctx.beginPath()
        ctx.arc(renderingPosX(piece.x), renderingPosY(piece.y), 14, 0, Math.PI*2, true)
        ctx.fill()
        if (Math.hypot(player.x - piece.x, player.y - piece.y) < collectionradius) {
            titanium += droppedtitanium[indexdp].amount
            droppedtitanium.splice(indexdp, 1)
        }
        piece.droptime += 1;
        if (piece.droptime >= 3600) {
            droppedtitanium.splice(indexdp, 1);
        }
        if (Math.hypot(mousePos.x - renderingPosX(piece.x), mousePos.y - renderingPosY(piece.y) + 22) < 30) {
            ctx.font = "30px Courier New"
            ctx.textAlign = "center"
            ctx.fillText(piece.amount + " Titanium", renderingPosX(piece.x), renderingPosY(piece.y) - 50)
        }
    })

    droppeddiamond.forEach((piece, indexdp) => {
        ctx.fillStyle = "#000000"
        ctx.beginPath()
        ctx.arc(renderingPosX(piece.x), renderingPosY(piece.y), 15, 0, Math.PI*2, true)
        ctx.fill()
        ctx.fillStyle = "#D9E1F9"
        ctx.beginPath()
        ctx.arc(renderingPosX(piece.x), renderingPosY(piece.y), 14, 0, Math.PI*2, true)
        ctx.fill()
        if (Math.hypot(player.x - piece.x, player.y - piece.y) < collectionradius) {
            diamond += droppeddiamond[indexdp].amount
            droppeddiamond.splice(indexdp, 1)
        }
        piece.droptime += 1;
        if (piece.droptime >= 3600) {
            droppeddiamond.splice(indexdp, 1);
        }
        if (Math.hypot(mousePos.x - renderingPosX(piece.x), mousePos.y - renderingPosY(piece.y) + 22) < 30) {
            ctx.font = "30px Courier New"
            ctx.textAlign = "center"
            ctx.fillText(piece.amount + " Diamond", renderingPosX(piece.x), renderingPosY(piece.y) - 50)
        }
    })

    droppediridium.forEach((piece, indexdp) => {
        ctx.fillStyle = "#000000"
        ctx.beginPath()
        ctx.arc(renderingPosX(piece.x), renderingPosY(piece.y), 15, 0, Math.PI*2, true)
        ctx.fill()
        ctx.fillStyle = "#393339"
        ctx.beginPath()
        ctx.arc(renderingPosX(piece.x), renderingPosY(piece.y), 14, 0, Math.PI*2, true)
        ctx.fill()
        if (Math.hypot(player.x - piece.x, player.y - piece.y) < collectionradius) {
            iridium += droppediridium[indexdp].amount
            droppediridium.splice(indexdp, 1)
        }
        piece.droptime += 1;
        if (piece.droptime >= 3600) {
            droppediridium.splice(indexdp, 1);
        }
        if (Math.hypot(mousePos.x - renderingPosX(piece.x), mousePos.y - renderingPosY(piece.y) + 22) < 30) {
            ctx.font = "30px Courier New"
            ctx.textAlign = "center"
            ctx.fillText(piece.amount + " Iridium", renderingPosX(piece.x), renderingPosY(piece.y) - 50)
        }
    })

    droppedessence.forEach((piece, indexdp) => {
        ctx.fillStyle = "#000000"
        ctx.beginPath()
        ctx.arc(renderingPosX(piece.x), renderingPosY(piece.y), 15, 0, Math.PI*2, true)
        ctx.fill()
        ctx.fillStyle = "#FFFFFF"
        ctx.beginPath()
        ctx.arc(renderingPosX(piece.x), renderingPosY(piece.y), 14, 0, Math.PI*2, true)
        ctx.fill()
        if (Math.hypot(player.x - piece.x, player.y - piece.y) < collectionradius) {
            essence += droppedessence[indexdp].amount
            droppedessence.splice(indexdp, 1)
        }
        piece.droptime += 1;
        if (piece.droptime >= 3600) {
            droppedessence.splice(indexdp, 1);
        }
        if (Math.hypot(mousePos.x - renderingPosX(piece.x), mousePos.y - renderingPosY(piece.y) + 22) < 30) {
            ctx.font = "30px Courier New"
            ctx.textAlign = "center"
            ctx.fillText(piece.amount + " Essence", renderingPosX(piece.x), renderingPosY(piece.y) - 50)
        }
    })
   
   

    projectiles.forEach((projectile, indexp) => {
        if (projectile.isrotating === true) {
            if (pause % 2 === 0) {
                projectile.rotationangle += (0.03 + gravitylevel*0.001);
            }
            projectile.x = Math.cos(projectile.rotationangle)*(projectile.rotationrange) + player.x;
            projectile.y = Math.sin(projectile.rotationangle)*(projectile.rotationrange) + player.y;
        }
       
        if ((pause % 2 === 0 && projectile.isrotating === false) || (pause % 2 === 0 && projectile.isrotating === undefined)) {
            projectile.lifeTime--
        }
        if (projectile.lifeTime <= 0) {
            projectiles.splice(indexp, 1)
        }
        projectile.update()
    })

    enemyprojectiles.forEach((enemyprojectile, indexe) => {
        const distance = Math.hypot(enemyprojectile.x - player.x, enemyprojectile.y - player.y)
        if (distance - player.radius < 0) {
            health -= enemyprojectiles[indexe].damage*(1-damagereduced/100);
            enemyattacks += 1;
			if (enemyprojectile.isFreezing == true) {
				freeze(0.3);
			}
            if (health <= 0) {
                if (pause % 2 === 0) {
                    pause += 1;
                }
                dead = true
                ctx.font = "70px Courier New"
                ctx.fillStyle = "red"
                ctx.textAlign = "center"
                ctx.fillText("You died", canvas.width / 2, canvas.height / 2 - 35)
                ctx.font = "30px Courier New"
                ctx.fillStyle = "black"
                if (randomizer < 0.25) {
                    ctx.fillText("Lol you're bad.", canvas.width / 2, canvas.height / 2 + 15)
                } else if (randomizer < 0.5) {
                    ctx.fillText("Better luck next time!", canvas.width / 2, canvas.height / 2 + 15)
                } else if (randomizer < 0.75) {
                    ctx.fillText("Sucks to be you.", canvas.width / 2, canvas.height / 2 + 15)
                } else {
                    ctx.fillText("You just got vrejed.", canvas.width / 2, canvas.height / 2 + 15)
                }
            }
            enemyprojectiles.splice(indexe, 1)
            if (health <= 0) {
                if (pause % 2 === 0) {
                    pause += 1;
                }
                dead = true
                ctx.font = "70px Courier New"
                ctx.fillStyle = "red"
                ctx.textAlign = "center"
                ctx.fillText("You died", canvas.width / 2, canvas.height / 2 - 35)
                ctx.font = "30px Courier New"
                ctx.fillStyle = "black"
                if (randomizer < 0.25) {
                    ctx.fillText("Lol you're bad.", canvas.width / 2, canvas.height / 2 + 15)
                } else if (randomizer < 0.5) {
                    ctx.fillText("Better luck next time!", canvas.width / 2, canvas.height / 2 + 15)
                } else if (randomizer < 0.75) {
                    ctx.fillText("Sucks to be you.", canvas.width / 2, canvas.height / 2 + 15)
                } else {
                    ctx.fillText("You just got vrejed.", canvas.width / 2, canvas.height / 2 + 15)
                }
            }
        }
        if (pause % 2 === 0) {
            enemyprojectile.lifeTime--
        if (enemyprojectile.isHoming === true) {
            let fade = enemyprojectile.lifeTime / 540;
            enemyprojectile.color = `rgba(128, 0, 0, ${fade})`
        } else if (enemyprojectile.color === "#F00000") {
            let fade = enemyprojectile.lifeTime / 90;
            enemyprojectile.color = `rgba(240, 0, 0, ${fade})`
        } else {
            let fade = enemyprojectile.lifeTime / 90;
            enemyprojectile.color = `rgba(240, 0, 0, ${fade})`
        }

        }
        if (enemyprojectile.lifeTime <= 0) {
            enemyprojectiles.splice(indexe, 1)
        }
        enemyprojectile.update()
    })

    enemies.forEach((enemy, index) => {
        if (Math.hypot(enemy.x - player.x, enemy.y - player.y) < 800) {
            let angle = Math.atan2(player.y - enemy.y, player.x - enemy.x)
            if (pause % 2 === 0 && enemy.isFrozen === false) {
                enemy.velocity = {x: Math.cos(angle)*(4 + level*0.01 + stage*0.02), y: Math.sin(angle)*(4 + level*0.01 + stage*0.02)}
                enemy.update()
            } else {
                enemy.velocity = {x:0, y:0}
                enemy.update()
            }
        } else {
            enemy.draw()
        }

        projectiles.forEach((projectile, indexp) => {
            const distance = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y)
            if (distance - enemy.radius - projectile.radius < 0) {
                if (bomb_damage > 0) {
                    enemies.forEach((enemy, indexe) => {
                        const explosiondistance = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y)
                        if (explosiondistance < bomb_radius) {
                            enemies[indexe].health -= bomb_damage;
                            if (enemies[indexe].health <= 0) {
                                enemydeath(enemy)
                                enemies.splice(indexe, 1)
                            }
                            ctx.fillStyle = "#FFA500";
                            ctx.beginPath()
                            ctx.arc(renderingPosX(projectile.x), renderingPosY(projectile.y), bomb_radius, 0, Math.PI*2, true)
                            ctx.fill()
                            ctx.closePath()
                        }
                    })
                }
                if (freezeduration> 0) {
                    enemy.isFrozen = true;
                    setTimeout(() => {
                        enemy.isFrozen = false;
                    }, freezeduration*1000)
                }
                projectiles[indexp].pierce -= 1;
                enemy.isDot = true;
                // frag splitting when a projectiles's pierce runs out
                if (projectiles[indexp].pierce <= 0) {
                    // only split if the projectile hasn't already split and isn't part of the gravitational armor
                    if ((fragments > 0) && projectile.og === true && projectile.isrotating === false) {
                        for (let i = 0; i < fragments; i++) {
                            const velocity = {x:Math.cos(Math.PI*i*2/fragments)*10, y:Math.sin(Math.PI*i*2/fragments)*10}
                            projectiles.push(new Projectile(projectile.x, projectile.y, 4, "#000000", velocity, 1, false))  
                        }
                    }
                // splice original projectile after splitting
                    projectiles.splice(indexp, 1);
                }
                if (enemies.isBoss === true) {
                    if (enemies[index].health) {
                        enemies[index].health *= (1-0.001*impactlevel);
                    }

                    enemies[index].health -= damage*bossmultiplier;
                    health += damage*bossmultiplier*leech/100/Math.log(stage+1)/Math.log(stage+1);
                    if (health > maxhealth) {
                        health = maxhealth;
                    }
                } else {
                    if (enemies[index].health) {
                        enemies[index].health *= (1-0.001*impactlevel);
                    }
                    enemies[index].health -= damage
                    health += damage*leech/100/Math.log(stage+1)/Math.log(stage+1);
                    if (health > maxhealth) {
                        health = maxhealth;
                    }
                }
                const kb_angle =  Math.atan2(enemy.x - player.x, enemy.y - player.y)
                enemy.y += (Math.cos(kb_angle)*2)*knockback;
                enemy.x += (Math.sin(kb_angle)*2)*knockback;
                if (enemies[index].health <= 0) {
                    enemydeath(enemy)
                    enemies.splice(index, 1)
                }
            }
        })

        const distance = Math.hypot(player.x - enemy.x, player.y - enemy.y)
            if (distance - enemy.radius < 0 && health > 0 && enemyattacks <= 10 && pause % 2 === 0) {
                health -= (1 + stage/4)*(1-damagereduced/100);
                enemyattacks += 1
            } else if (distance - enemy.radius < 0 && health <= 0) {
                if (pause % 2 === 0) {
                    pause += 1;
                }
            dead = true

            }
    })

    if (dead === true) {    
        ctx.font = "70px Courier New"
        ctx.fillStyle = "red"
        ctx.textAlign = "center"
        ctx.fillText("You died", canvas.width / 2, canvas.height / 2 - 35)
        ctx.font = "30px Courier New"
        ctx.fillStyle = "black"
        if (randomizer < 0.25) {
            ctx.fillText("Lol you're bad.", canvas.width / 2, canvas.height / 2 + 15)
        } else if (randomizer < 0.5) {
            ctx.fillText("You have been diagnosed with: SKILL ISSUE.", canvas.width / 2, canvas.height / 2 + 15)
        } else if (randomizer < 0.75) {
            ctx.fillText("You really suck at this.", canvas.width / 2, canvas.height / 2 + 15)
        } else {
            ctx.fillText("You're bad lol!!!", canvas.width / 2, canvas.height / 2 + 15)
        }
       
    }

    updateLocation()
    ctx.font = "30px Courier New"
    ctx.textAlign = "left"
    ctx.fillStyle = "black"
    ctx.fillText("Stage: " + stage, 60, 70)
    ctx.fillText("Level: " + level, 60, 105)
    ctx.fillText("Health: " + Math.floor(health), 60, 140)
    ctx.fillText("Damage: " + Math.floor(damage), 60, 175)
	if (freezemultiplier != 1) {
		ctx.fillStyle = "#CC0000";
		ctx.fillText("Speed: " + Math.floor(speed*10*freezemultiplier)/10, 60, 210)	
	} else {
		ctx.fillText("Speed: " + Math.floor(speed*10)/10, 60, 210)	
	}
    ctx.fillStyle = "black"
    ctx.fillText("Experience: " + Math.floor(exp) + "/" + exp_required[level - 1], 60, 245)
    ctx.fillText("Enemies killed: " + enemies_killed, 60, 280)
    ctx.textAlign = "right"
    if (abilities.length > 0) {
        for (let i = 0; i < abilities.length; i++) {
            ctx.fillText(abilities[i].name + " [" + abilities[i].hotkey + "]", canvas.width - 80, 80*(i + 1))
            ctx.font = "25px Courier New"
            if (abilities[i].state === "active") {
                ctx.fillStyle = "#055900"
                ctx.fillText(abilities[i].name + " is active", canvas.width - 80, 80*(i + 1) + 30)
            } else if (abilities[i].state === "ready") {
                ctx.fillStyle = "#D4AF37"
                ctx.fillText(abilities[i].name + " is ready", canvas.width - 80, 80*(i + 1) + 30)
            } else if (abilities[i].state === "recharging") {
                ctx.fillStyle = "#BB0A1E"
                ctx.fillText(abilities[i].name + " is recharging, " + Math.floor(abilities[i].cooldownremaining) + "s remain", canvas.width - 80, 80*(i + 1) + 30)
            }
        }
    }
    ctx.fillStyle = "black"
    ctx.textAlign = "left"
    ctx.fillText("Points: " + points, 60, 330)
    if (frames < 3600) {
        ctx.fillText("Time: " + Math.floor(frames/60), 60, canvas.height - 80)
    } else if (frames >= 3600 && frames%3600 < 600) {
        ctx.fillText("Time: " + Math.floor(frames/3600) + ":0" + Math.floor((frames%3600)/60), 60, canvas.height - 80)
    } else {
        ctx.fillText("Time: " + Math.floor(frames/3600) + ":" + Math.floor((frames%3600)/60), 60, canvas.height - 80)
    }
    if (maxhealth - health < potatoes*10) {
        ctx.fillText("Eat Potatoes [Q]: +" + Math.floor((maxhealth - health)/10)*10 + " health", 60, canvas.height - 120)
    } else {
        ctx.fillText("Eat Potatoes [Q]: +" + potatoes*10 + " health", 60, canvas.height - 120)
    }
   

    if (pause % 2 === 1) {
        ctx.textAlign = "right";
        ctx.fillText("SPACE TO UNPAUSE", canvas.width - 80, 80)
        ctx.textAlign = "left";
    }
    ctx.textAlign = "right";
    ctx.fillText("[L] for resource info", canvas.width - 80, 120);
    if (exclamation == true) {
        ctx.fillStyle = "#FFA500";
        ctx.fillText("!!  [M] for upgrades info", canvas.width - 80, 160);
    } else {
        ctx.fillText("[M] for upgrades info", canvas.width - 80, 160);
    }
	
	ctx.fillStyle = "black";
	if (stage > 5) {
		if (buildingex == true) {
			ctx.fillStyle = "#FFA500";
			ctx.fillText("!!  [N] for buildings info", canvas.width - 80, 200);	
		} else {
			ctx.fillText("[N] for buildings info", canvas.width - 80, 200);	
		}
	}
    ctx.fillStyle = "black"
    ctx.textAlign = "left";
    if (clickable === true && level >= 32 && !upgrade_6) {
        if (upgrade_5 === "fighter5") {
            ctx.font = "30px Courier New"
            ctx.fillText("INFILTRATOR [t]", 80, 440)
            ctx.font = "20px Courier New"
            ctx.fillText("Further increases damage and attack speed.", 80, 460)
        } else if (upgrade_5 === "incinerator3") {
            ctx.font = "30px Courier New"
            ctx.fillText("INCINERATOR IV [t]", 80, 440)
            ctx.font = "20px Courier New"
            ctx.fillText("Improves damage and firearc.", 80, 460)
        } else if (upgrade_5 === "magic3") {
            ctx.font = "30px Courier New"
            ctx.fillText("MAGIC IV [t]", 80, 440)
            ctx.font = "20px Courier New"
            ctx.fillText("Deals extra damage to bosses and shortens Destructive Aura cooldown", 80, 460)
        } else if (upgrade_5 === "multishot5") {
            ctx.font = "30px Courier New"
            ctx.fillText("MULTISHOT VI [t]", 80, 440)
            ctx.font = "20px Courier New"
            ctx.fillText("Shoots 18 projectiles at once!", 80, 460)
        } else if (upgrade_5 === "buckshot4") {
            ctx.font = "30px Courier New"
            ctx.fillText("BUCKSHOT V [t]", 80, 440)
            ctx.font = "20px Courier New"
            ctx.fillText("More projectiles, more damage, more boss damage.", 80, 460)
        } else if (upgrade_5 === "pierce3") {
            ctx.font = "30px Courier New"
            ctx.fillText("PIERCE IV [t]", 80, 440)
            ctx.font = "20px Courier New"
            ctx.fillText("Your projectiles multihit up to 20 times!", 80, 460)
        } else if (upgrade_5 === "explosive4") {
            ctx.font = "30px Courier New"
            ctx.fillText("NUKER [t]", 80, 440)
            ctx.font = "20px Courier New"
            ctx.fillText("Nuke your enemies into oblivion!", 80, 460)
        } else if (upgrade_5 === "fragmented2") {
            ctx.font = "30px Courier New"
            ctx.fillText("FRAGMENTED III [t]", 80, 440)
            ctx.font = "20px Courier New"
            ctx.fillText("Bullets split into 12 on contact and deal extra damage.", 80, 460)
        } else if (upgrade_5 === "tank2") {
            ctx.font = "30px Courier New"
            ctx.fillText("TANK III [t]", 80, 440)
            ctx.font = "20px Courier New"
            ctx.fillText("Even stronger artillery melts your enemies on hit.", 80, 460)
        }
    } else if (clickable === true && level >= 24 && !upgrade_5) {
        if (upgrade_4 === "fighter4") {
            ctx.font = "30px Courier New"
            ctx.fillText("FIGHTER V [t]", 80, 440)
            ctx.font = "20px Courier New"
            ctx.fillText("Further increases attack speed and player speed.", 80, 460)
        } else if (upgrade_4 === "incinerator2") {
            ctx.font = "30px Courier New"
            ctx.fillText("INCINERATOR III [t]", 80, 440)
            ctx.font = "20px Courier New"
            ctx.fillText("Further increases damage and adds a periodic firearc.", 80, 460)
        } else if (upgrade_4 === "magic2") {
            ctx.font = "30px Courier New"
            ctx.fillText("MAGIC III [t]", 80, 440)
            ctx.font = "20px Courier New"
            ctx.fillText("Destructive aura deals 70% damage instead of 50% and recharges faster.", 80, 460)
        } else if (upgrade_4 === "multishot4") {
            ctx.font = "30px Courier New"
            ctx.fillText("MULTISHOT V [t]", 80, 440)
            ctx.font = "20px Courier New"
            ctx.fillText("Shoots 12 projectiles at once!", 80, 460)
        } else if (upgrade_4 === "buckshot3") {
            ctx.font = "30px Courier New"
            ctx.fillText("BUCKSHOT IV [t]", 80, 440)
            ctx.font = "20px Courier New"
            ctx.fillText("Buckshot deals even more damage and does percentage damage.", 80, 460)
        } else if (upgrade_4 === "pierce2") {
            ctx.font = "30px Courier New"
            ctx.fillText("PIERCE III [t]", 80, 440)
            ctx.font = "20px Courier New"
            ctx.fillText("Your projectiles multihit up to 11 times and deal more damage!", 80, 460)
        } else if (upgrade_4 === "explosive3") {
            ctx.font = "30px Courier New"
            ctx.fillText("EXPLOSIVE IV [t]", 80, 440)
            ctx.font = "20px Courier New"
            ctx.fillText("Explosions gain even more damage and range.", 80, 460)
        } else if (upgrade_4 === "fragmented") {
            ctx.font = "30px Courier New"
            ctx.fillText("FRAGMENTED II [t]", 80, 440)
            ctx.font = "20px Courier New"
            ctx.fillText("Bullets split into 10 on contact!", 80, 460)
        } else if (upgrade_4 === "tank") {
            ctx.font = "30px Courier New"
            ctx.fillText("TANK II [t]", 80, 440)
            ctx.font = "20px Courier New"
            ctx.fillText("Even stronger artillery melts your enemies on hit.", 80, 460)
        }
    } else if (clickable === true && level >= 17 && !upgrade_4) {
        if (upgrade_3 === "fighter3") {
            ctx.font = "30px Courier New"
            ctx.fillText("FIGHTER IV [t]", 80, 440)
            ctx.font = "20px Courier New"
            ctx.fillText("Further increases attack speed and player speed.", 80, 460)
        } else if (upgrade_3 === "incinerator") {
            ctx.font = "30px Courier New"
            ctx.fillText("INCINERATOR II [t]", 80, 440)
            ctx.font = "20px Courier New"
            ctx.fillText("Increases fire damage even more!", 80, 460)
        } else if (upgrade_3 === "magic") {
            ctx.font = "30px Courier New"
            ctx.fillText("MAGIC II [t]", 80, 440)
            ctx.font = "20px Courier New"
            ctx.fillText("Destructive aura deals 70% damage instead of 50%.", 80, 460)
        } else if (upgrade_3 === "multishot3") {
            ctx.font = "30px Courier New"
            ctx.fillText("MULTISHOT IV [t]", 80, 440)
            ctx.font = "20px Courier New"
            ctx.fillText("Shoots 8 projectiles at once!", 80, 460)
        } else if (upgrade_3 === "buckshot2") {
            ctx.font = "30px Courier New"
            ctx.fillText("BUCKSHOT III [t]", 80, 440)
            ctx.font = "20px Courier New"
            ctx.fillText("Buckshot deals even more damage and does percentage damage.", 80, 460)
        } else if (upgrade_3 === "pierce") {
            ctx.font = "30px Courier New"
            ctx.fillText("PIERCE II [t]", 80, 440)
            ctx.font = "20px Courier New"
            ctx.fillText("Your projectiles multihit up to 6 times!", 80, 460)
            ctx.font = "30px Courier New"
            ctx.fillText("TANK [y]", 80, 510)
            ctx.font = "20px Courier New"
            ctx.fillText("Fires slow but extremely strong piercing shells.", 80, 530)
        } else if (upgrade_3 === "explosive2") {
            ctx.font = "30px Courier New"
            ctx.fillText("EXPLOSIVE III [t]", 80, 440)
            ctx.font = "20px Courier New"
            ctx.fillText("Explosions gain even more damage and range.", 80, 460)
            ctx.font = "30px Courier New"
            ctx.fillText("FRAGMENTED [y]", 80, 510)
            ctx.font = "20px Courier New"
            ctx.fillText("Projectiles split into 6 on contact with enemies.", 80, 530)
        }
    } else if (clickable === true && level >= 12 && !upgrade_3) {
        if (upgrade_2 === "fighter2") {
            ctx.font = "30px Courier New"
            ctx.fillText("FIGHTER III [t]", 80, 440)
            ctx.font = "20px Courier New"
            ctx.fillText("Further increases attack speed and player speed.", 80, 460)
            ctx.font = "30px Courier New"
            ctx.fillText("INCINERATOR [y]", 80, 510)
            ctx.font = "20px Courier New"
            ctx.fillText("Sprays a continuous beam of fire at your enemies.", 80, 530)
        } else if (upgrade_2 === "light") {
            ctx.font = "30px Courier New"
            ctx.fillText("MAGIC [t]", 80, 440)
            ctx.font = "20px Courier New"
            ctx.fillText("Adds a Destructive Aura ability that takes off half of your enemies' hp.", 80, 460)
        } else if (upgrade_2 === "multishot2") {
            ctx.font = "30px Courier New"
            ctx.fillText("MULTISHOT III [t]", 80, 440)
            ctx.font = "20px Courier New"
            ctx.fillText("Shoots 5 projectiles at once.", 80, 460)
        } else if (upgrade_2 === "buckshot") {
            ctx.font = "30px Courier New"
            ctx.fillText("BUCKSHOT II [t]", 80, 510)
            ctx.font = "20px Courier New"
            ctx.fillText("Adds more projectiles, knockback, and damage.", 80, 530)
        } else if (upgrade_2 === "heavy2") {
            ctx.font = "30px Courier New"
            ctx.fillText("PIERCE [t]", 80, 440)
            ctx.font = "20px Courier New"
            ctx.fillText("Your attacks multihit, allowing them to deal more damage and pierce through enemies.", 80, 460)
        } else if (upgrade_2 === "explosive") {
            ctx.font = "30px Courier New"
            ctx.fillText("EXPLOSIVE II [t]", 80, 510)
            ctx.font = "20px Courier New"
            ctx.fillText("Explosions gain massively increased damage and range!", 80, 530)
        }
    } else if (clickable === true && level >= 7 && !upgrade_2) {
        if (upgrade_1 === "fighter") {
            ctx.fillText("FIGHTER II [t]", 80, 440)
            ctx.font = "20px Courier New"
            ctx.fillText("Further increases attack speed and player speed.", 80, 460)
            ctx.font = "30px Courier New"
            ctx.fillText("LIGHT [y]", 80, 510)
            ctx.font = "20px Courier New"
            ctx.fillText("Massively increases movement speed.", 80, 530)
        } else if (upgrade_1 === "multishot") {
            ctx.fillText("MULTISHOT II [t]", 80, 440)
            ctx.font = "20px Courier New"
            ctx.fillText("Shoots 3 projectiles at once.", 80, 460)
            ctx.font = "30px Courier New"
            ctx.fillText("BUCKSHOT [y]", 80, 510)
            ctx.font = "20px Courier New"
            ctx.fillText("A powerful array of dense projectiles that knock back your enemies.", 80, 530)
        } else if (upgrade_1 === "heavy") {
            ctx.fillText("HEAVY II [t]", 80, 440)
            ctx.font = "20px Courier New"
            ctx.fillText("Further enhanced damage and impact.", 80, 460)
            ctx.font = "30px Courier New"
            ctx.fillText("EXPLOSIVE [y]", 80, 510)
            ctx.font = "20px Courier New"
            ctx.fillText("Your projectiles explode on contact, damaging nearby enemies.", 80, 530)
        }
    } else if (clickable === true && level >= 2 && !upgrade_1) {
        ctx.fillText("FIGHTER [t]", 80, 440)
        ctx.font = "20px Courier New"
        ctx.fillText("Increases attack speed and player speed.", 80, 460)
        ctx.font = "30px Courier New"
        ctx.fillText("MULTISHOT [y]", 80, 510)
        ctx.font = "20px Courier New"
        ctx.fillText("Shoots two angled shots instead of a single shot.", 80, 530)
        ctx.font = "30px Courier New"
        ctx.fillText("HEAVY [u]", 80, 580)
        ctx.font = "20px Courier New"
        ctx.fillText("Increases health, projectile damage, and projectile size but decreases player speed and attack speed.", 80, 600)
    } else {
        if (level >= 3) {
            ctx.font = "30px Courier New"
            ctx.fillText(`LIFE [z]  Level: ${lifelevel}`, 80, 440)
            ctx.font = "20px Courier New"
            ctx.fillText("Increases your health by a stacking 10%.", 80, 460)
        }
        if (level >= 4) {
            ctx.font = "30px Courier New"
            ctx.fillText(`POWER [x]  Level: ${powerlevel}`, 80, 510)
            ctx.font = "20px Courier New"
            ctx.fillText("Increases your damage by a stacking 5%.", 80, 530)
        }
        if (level >= 5) {
            ctx.font = "30px Courier New"
            ctx.fillText(`SPEED [c]  Level: ${speedlevel}`, 80, 580)
            ctx.font = "20px Courier New"
            ctx.fillText("Increases your speed by a stacking 10%.", 80, 600)
        }
        if (level >= 8) {
            ctx.font = "30px Courier New"
            ctx.fillText(`EXPERIENCED [v]  Level: ${experiencedlevel}`, 80, 650)
            ctx.font = "20px Courier New"
            ctx.fillText("Increases experience gained by a stacking 5%.", 80, 670)
        }
        if (upgrade_1 === "heavy") {
            ctx.font = "30px Courier New"
            ctx.fillText(`GRAVITY [b]  Level: ${gravitylevel}`, 80, 720)
            ctx.font = "20px Courier New"
            ctx.fillText("Increases speed, regen speed, and projectile count of rotating projectiles.", 80, 740)
        }
        if (upgrade_1 === "multishot") {
            ctx.font = "30px Courier New"
            ctx.fillText(`PRECISION [b] Level: ${precisionlevel}`, 80, 720)
            ctx.font = "20px Courier New"
            ctx.fillText("Makes multishot projectiles much more accurate.", 80, 740)
        }
        if (level >= 15 && upgrade_3 === "magic") {
            ctx.font = "30px Courier New"
            ctx.fillText(`AGILITY [b] Level: ${agilitylevel}`, 80, 720)
            ctx.font = "20px Courier New"
            ctx.fillText("Decrease cooldown of Destructive Aura by a compounding 5%.", 80, 740)
        }
    }

    if (infotoggle % 2 === 0) {
        ctx.fillStyle = "#000000"
        ctx.fillRect(150, 150, canvas.width - 300, canvas.height - 300)
        ctx.fillStyle = "#EEEEEE"
        ctx.fillRect(155, 155, canvas.width - 310, canvas.height - 310)
        if (stage === 1) {
            ctx.font = "50px Courier New"
            ctx.fillStyle = "black"
            ctx.fillText("Potato Gunner", 200, 230)
        } else if (stage > 40) {
            ctx.font = "50px Courier New"
            ctx.fillStyle = "black"
            ctx.fillText("Congratulations, you won!!", 200, 230)
        } else {
            ctx.font = "50px Courier New"
            ctx.fillStyle = "black"
            ctx.fillText("Stage " + stage, 200, 230)
        }
        if (stage === 1) {
            ctx.font = "20px Courier New"
            ctx.fillText("v2.0.5 new features:", 200, 270)
            ctx.fillText("Added buildings", 200, 290)
            ctx.fillText("Added mountain terrain mechanics", 200, 310)
            ctx.fillText("Reworked enemy scaling and leech scaling", 200, 330)
            ctx.font = "40px Courier New"
            ctx.fillText("Rules:", 200, 400)
            ctx.font = "15px Courier New"
            ctx.fillText("W, a, s, and d keys to move. The game autofires for you, and you can control", 200, 436);
            ctx.fillText("the direction of shooting with your mouse. Defeat the boss of each stage to move", 200, 452);
            ctx.fillText("onto the next (bosses are highlighted for you on the minimap in red). You will get xp", 200, 468);
            ctx.fillText("by killing enemies, and when you reach a breakpoint, a level will be gained. Using xp", 200, 484);
            ctx.fillText("you can upgrade your character by clicking the upgrade's respective hotkey (hotkeys in this", 200, 500);
            ctx.fillText("game are represented with square brackets, so for example [K] means to click the hotkey K).", 200, 516);
            ctx.fillText("As you kill enemies, you will gain various resources. You can press L to toggle the resource menu.", 200, 532);
            ctx.fillText("Good luck!", 200, 580);
        } else if (stage === 2) {
            ctx.font = "20px Courier New"
            ctx.fillText("New Content!", 200, 270)
            ctx.fillText("More enemies will spawn each stage, but more loot will drop as well.", 200, 290)
            ctx.fillText("Boss packs spawn! Each stage there will be a couple bosses with minions around them", 200, 310)
            ctx.fillText("allowing you to rack up exp and loot quickly.", 200, 330)
            ctx.font = "15px Courier New"
            ctx.fillText("COPPER now spawns in the world. Like gold and potatoes, copper is a resource that can be used", 200, 436);
            ctx.fillText("to purchase upgrades. In the later stages, copper can also be used to create more powerful", 200, 452);
            ctx.fillText("resources.", 200, 468);
            ctx.fillText("ESSENCE spawns in the world, but it is an exceptionally rare and powerful resource. One", 200, 484);
            ctx.fillText("essence drops every 100 kills and all upgrades need essence to be purchased.", 200, 500);
            ctx.fillText("You have unlocked your first upgrade! Press [M] to toggle the upgrade information menu.", 200, 516);
        } else if (stage === 3) {
            ctx.font = "20px Courier New"
            ctx.fillText("New Content!", 200, 270)
            ctx.fillText("HOMING enemies now spawn. They deal extra damage with long-lasting seeking projectiles.", 200, 290)
			ctx.font = "15px Courier New"
            ctx.fillText("You will unlock new upgrades every couple of levels.", 200, 436);
        } else if (stage === 5) {
            ctx.font = "20px Courier New"
            ctx.fillText("New Content!", 200, 270)
            ctx.fillText("Every 5 levels, a MEGABOSS will spawn instead of a normal level boss. MEGABOSSES have special", 200, 290);
			ctx.fillText("modifiers as well as extra health and damage, but drop more experience and loot.", 200, 310);
			ctx.font = "15px Courier New"
            ctx.fillText("The level 5 MEGABOSS spawns with the MULTISHOT modifier, making it spray a lot more", 200, 436);
			ctx.fillText("projectiles than normal.", 200, 452);
        } else if (stage === 6) {
            ctx.font = "20px Courier New"
            ctx.fillText("New Content!", 200, 270)
            ctx.fillText("Welcome to the desert! This new terrain brings various benefits and hinderences.", 200, 290);
			ctx.fillText("MULTISHOT enemies now spawn. They will shoot a barrage of bullets at you.", 200, 310);
			ctx.font = "15px Courier New"
            ctx.fillText("You have unlocked BUILDINGS! To unlock a building, you need to research it in the upgrades", 200, 436);
			ctx.fillText("tab. Buildings allow you to turn less valuable resources into more valuable resources.", 200, 452);
            ctx.fillText("Strong winds in the desert terrain cause SANDSTORMS to occur. You're not very stong yet, so", 200, 468);
            ctx.fillText("sandstorms actually cause you quite a bit of trouble. You will be blown in a random direction", 200, 484);
            ctx.fillText("(either up, down, left, or right) that will constantly change about once every 15-20 seconds.", 200, 500);
            ctx.fillText("Be careful!", 200, 516);
        } else if (stage === 6) {
			ctx.font = "15px Courier New"
            ctx.fillText("Don't worry if you feel overwhelmed by upgrades. The game doesn't mean for you to purchase", 200, 436);
			ctx.fillText("every upgrade, but to give you choice as to what stats you want to boost.", 200, 452);
        } else if (stage === 10) {
			ctx.font = "15px Courier New"
            ctx.fillText("This MEGABOSS on stage 10 has the SUMMONING modifier. It will spawn many enemies to protect it,", 200, 436);
			ctx.fillText("making it much harder to hit as well as having minions to deal damage. Adding to your troubles,", 200, 452);
            ctx.fillText("every 10 stages bosses will gain an additional +100% health.", 200, 468);
        } else if (stage === 11) {
            ctx.font = "20px Courier New"
            ctx.fillText("New Content!", 200, 270)
            ctx.fillText("Welcome to the mountain! This new terrain brings various benefits and hinderences.", 200, 290);
			ctx.fillText("NOVA enemies now spawn. They will shoot a ring of bullets at you, so don't stand overtop", 200, 310);
			ctx.fillText("of them or you will get destroyed.", 200, 330);
			ctx.font = "15px Courier New"
            ctx.fillText("You feel relieved that there are no more sandstorm winds or that there are no more bodies", 200, 436);
			ctx.fillText("of water to hinder movement speed. However, you have noticed that the enemies here are much", 200, 452);
            ctx.fillText("stronger than usual. You will need to be careful if you want to stay alive.", 200, 468);
        } else if (stage === 15) {
			ctx.font = "15px Courier New"
            ctx.fillText("This MEGABOSS on stage 15 has the BELLIGERENT modifier. It will attack fast and deal extra,", 200, 436);
			ctx.fillText("damage. Its novas are also much more frequent. The boss will also heal health passively, so", 200, 452);
            ctx.fillText("make sure you kill it quick!", 200, 468);
        } else if (stage === 16) {
			/*
			ctx.font = "20px Courier New"
            ctx.fillText("New Content!", 200, 270)
            ctx.fillText("Welcome to the tundra! This new terrain brings various benefits and hinderences.", 200, 290);
			ctx.fillText("ICE enemies now spawn. They will shoot a freezing bullet, making you less mobile and shoot", 200, 310);
			ctx.fillText("slower.", 200, 330);
			ctx.font = "15px Courier New"
            ctx.fillText("In this new terrain, your mobility is greatly challenged. When on ice, you will move much faster", 200, 436);
			ctx.fillText("than usual but movement is harder to control. When in a water puddle, you will move much slower", 200, 452);
            ctx.fillText("just like when you're normally in water.", 200, 468);
			*/
        }
		
		ctx.font = "15px Courier New"
		if (stage > 5) {
			ctx.fillText("You managed to steal " + endroundgold + " gold, " + endroundpotatoes + " potatoes, " + endroundcopper + " copper, and " + endroundiron + " iron from that boss. Nice!", 200, 532);	
		} else if (stage > 2) {
			ctx.fillText("You managed to steal " + endroundgold + " gold, " + endroundpotatoes + " potatoes, and " + endroundcopper + " copper from that boss. Nice!", 200, 532);	
		} else if (stage > 1) {
			ctx.fillText("You managed to steal " + endroundgold + " gold and " + endroundpotatoes + " potatoes from that boss. Nice!", 200, 532);	
		}
		

        ctx.font = "25px Courier New"
        ctx.fillText("[K] to close menu", 195, 630);
    }

    ctx.beginPath()
    ctx.arc(80, canvas.height - 40, 15, 0, Math.PI * 2, false);
    ctx.fillStyle = "#000000";
    ctx.fill()
    ctx.beginPath()
    ctx.arc(80, canvas.height - 40, 14, 0, Math.PI * 2, false);
    ctx.fillStyle = "#FFFF00";
    ctx.fill();

    ctx.beginPath()
    ctx.arc(205, canvas.height - 40, 15, 0, Math.PI * 2, false);
    ctx.fillStyle = "#000000";
    ctx.fill()
    ctx.beginPath()
    ctx.arc(205, canvas.height - 40, 14, 0, Math.PI * 2, false);
    ctx.fillStyle = "#B79628";
    ctx.fill();

    if (stage > 1) {
        ctx.beginPath()
        ctx.arc(330, canvas.height - 40, 15, 0, Math.PI * 2, false);
        ctx.fillStyle = "#000000";
        ctx.fill()
        ctx.beginPath()
        ctx.arc(330, canvas.height - 40, 14, 0, Math.PI * 2, false);
        ctx.fillStyle = "#B87333";
        ctx.fill();
    }

    if (stage > 4) {
        ctx.beginPath()
        ctx.arc(455, canvas.height - 40, 15, 0, Math.PI * 2, false);
        ctx.fillStyle = "#000000";
        ctx.fill()
        ctx.beginPath()
        ctx.arc(455, canvas.height - 40, 14, 0, Math.PI * 2, false);
        ctx.fillStyle = "#A19D94";
        ctx.fill();
    }

    if (stage > 7) {
        ctx.beginPath()
        ctx.arc(580, canvas.height - 40, 15, 0, Math.PI * 2, false);
        ctx.fillStyle = "#000000";
        ctx.fill()
        ctx.beginPath()
        ctx.arc(580, canvas.height - 40, 14, 0, Math.PI * 2, false);
        ctx.fillStyle = "#2E4A9E";
        ctx.fill();
    }

    if (stage > 10) {
        ctx.beginPath()
        ctx.arc(705, canvas.height - 40, 15, 0, Math.PI * 2, false);
        ctx.fillStyle = "#000000";
        ctx.fill()
        ctx.beginPath()
        ctx.arc(705, canvas.height - 40, 14, 0, Math.PI * 2, false);
        ctx.fillStyle = "#D9E1F9";
        ctx.fill();
    }

    if (stage > 13) {
        ctx.beginPath()
        ctx.arc(830, canvas.height - 40, 15, 0, Math.PI * 2, false);
        ctx.fillStyle = "#000000";
        ctx.fill()
        ctx.beginPath()
        ctx.arc(830, canvas.height - 40, 14, 0, Math.PI * 2, false);
        ctx.fillStyle = "#393339";
        ctx.fill();
    }

    ctx.beginPath()
    ctx.arc(955, canvas.height - 40, 15, 0, Math.PI * 2, false);
    ctx.fillStyle = "#000000";
    ctx.fill()
    ctx.beginPath()
    ctx.arc(955, canvas.height - 40, 14, 0, Math.PI * 2, false);
    ctx.fillStyle = "#FFFFFF";
    ctx.fill();


    ctx.font = "30px Courier New"
    ctx.fillStyle = "black"
        
    ctx.fillText(Math.floor(money), 110, canvas.height - 30);
    ctx.fillText(Math.floor(potatoes), 235, canvas.height - 30);
    if (stage > 1) ctx.fillText(Math.floor(copper), 360, canvas.height - 30);
    if (stage > 4) ctx.fillText(Math.floor(iron), 485, canvas.height - 30);
    if (stage > 7) ctx.fillText(Math.floor(titanium), 610, canvas.height - 30);
    if (stage > 10) ctx.fillText(Math.floor(diamond), 735, canvas.height - 30);
    if (stage > 13) ctx.fillText(Math.floor(iridium), 860, canvas.height - 30);
    ctx.fillText(Math.floor(essence), 985, canvas.height - 30);

    if (resourcetoggle % 2 == 0) {
        ctx.fillStyle = "#000000"
        ctx.fillRect(150, 150, canvas.width - 300, canvas.height - 300)
        ctx.fillStyle = "#EEEEEE"
        ctx.fillRect(155, 155, canvas.width - 310, canvas.height - 310)

        ctx.beginPath()
        ctx.arc(200, 200, 15, 0, Math.PI * 2, false);
        ctx.fillStyle = "#000000";
        ctx.fill()
        ctx.beginPath()
        ctx.arc(200, 200, 14, 0, Math.PI * 2, false);
        ctx.fillStyle = "#FFFF00";
        ctx.fill();

        ctx.beginPath()
        ctx.arc(200, 200 + 60, 15, 0, Math.PI * 2, false);
        ctx.fillStyle = "#000000";
        ctx.fill()
        ctx.beginPath()
        ctx.arc(200, 200 + 60, 14, 0, Math.PI * 2, false);
        ctx.fillStyle = "#B79628";
        ctx.fill();


        if (stage > 1) {
            ctx.beginPath()
            ctx.arc(200, 200 + 60*2, 15, 0, Math.PI * 2, false);
            ctx.fillStyle = "#000000";
            ctx.fill()
            ctx.beginPath()
            ctx.arc(200, 200 + 60*2, 14, 0, Math.PI * 2, false);
            ctx.fillStyle = "#B87333";
            ctx.fill();
        }

        if (stage > 4) {
            ctx.beginPath()
            ctx.arc(200, 200 + 60*3, 15, 0, Math.PI * 2, false);
            ctx.fillStyle = "#000000";
            ctx.fill()
            ctx.beginPath()
            ctx.arc(200, 200 + 60*3, 14, 0, Math.PI * 2, false);
            ctx.fillStyle = "#A19D94";
            ctx.fill();
        }

        if (stage > 7) {
            ctx.beginPath()
            ctx.arc(200, 200 + 60*4, 15, 0, Math.PI * 2, false);
            ctx.fillStyle = "#000000";
            ctx.fill()
            ctx.beginPath()
            ctx.arc(200, 200 + 60*4, 14, 0, Math.PI * 2, false);
            ctx.fillStyle = "#2E4A9E";
            ctx.fill();
        }

        if (stage > 10) {
            ctx.beginPath()
            ctx.arc(200, 200 + 60*5, 15, 0, Math.PI * 2, false);
            ctx.fillStyle = "#000000";
            ctx.fill()
            ctx.beginPath()
            ctx.arc(200, 200 + 60*5, 14, 0, Math.PI * 2, false);
            ctx.fillStyle = "#D9E1F9";
            ctx.fill();
        }

        if (stage > 13) {
            ctx.beginPath()
            ctx.arc(200, 200 + 60*6, 15, 0, Math.PI * 2, false);
            ctx.fillStyle = "#000000";
            ctx.fill()
            ctx.beginPath()
            ctx.arc(200, 200 + 60*6, 14, 0, Math.PI * 2, false);
            ctx.fillStyle = "#393339";
            ctx.fill();
        }

        ctx.beginPath()
        ctx.arc(200, 200 + 60*7, 15, 0, Math.PI * 2, false);
        ctx.fillStyle = "#000000";
        ctx.fill()
        ctx.beginPath()
        ctx.arc(200, 200 + 60*7, 14, 0, Math.PI * 2, false);
        ctx.fillStyle = "#FFFFFF";
        ctx.fill();

        ctx.font = "25px Courier New"
        ctx.fillStyle = "black"
        ctx.fillText("Gold is the basic resource and can be used to purchase upgrades.", 230, 210);
        ctx.fillText("Potatoes heal you if you press the hotkey [Q].", 230, 270);
        if (stage > 1) ctx.fillText("As a strong metal, copper can be used to build and craft items.", 230, 330);
        if (stage > 4) ctx.fillText("Iron is similar to copper but slightly rarer and more valuable.", 230, 390);
        if (stage > 7) ctx.fillText("Titanium is a stronger metal and is used for protective gear.", 230, 450);
        if (stage > 10) ctx.fillText("Diamond is both extremely valuable and durable, but is hard to find.", 230, 510);
        if (stage > 13) ctx.fillText("Iridium can be used to power up your character and craft powerful items.", 230, 570);
        ctx.fillText("Sacred potato essence is rare and required for all upgrades.", 230, 630);
        ctx.fillText("[L] to close menu", 230, 690);
    }

    if (upgradetoggle % 2 == 0) {
        exclamation = false;

        ctx.fillStyle = "#000000"
        ctx.fillRect(150, 150, canvas.width - 300, canvas.height - 300)
        ctx.fillStyle = "#DDDDDD"
        ctx.fillRect(155, 155, canvas.width - 310, canvas.height - 310)
		
		if (upgrades.length == 0) {
			ctx.fillStyle = "black";
			ctx.font = "25px Courier New"
			ctx.fillText("No upgrades available", 200, 220);
		}
		
		if (upgrades.length > 6) {
			for (let i = 0; i < 6; i++) {
            	ctx.font = "25px Courier New"
				if (money >= upgrades[i].costau && potatoes >= upgrades[i].costp && copper >= upgrades[i].costcu && iron >= upgrades[i].costfe && titanium >= upgrades[i].costti && diamond >= upgrades[i].costd && iridium >= upgrades[i].costir && essence >= upgrades[i].coste) {
					ctx.fillStyle = "black";
				} else {
					ctx.fillStyle = "#800000";
				}
            	ctx.fillText(upgrades[i].name + "    [" + (i + 4) + "]", 200, 220 + 100*i);
            	ctx.font = "20px Courier New";
            	ctx.fillText(upgrades[i].description, 205, 250 + 100*i);
            

            	let costdist = 0;

            	if (upgrades[i].costau > 0) {
                	ctx.beginPath()
                	ctx.arc(200 + 100*costdist, 280 + 100*i, 11, 0, Math.PI * 2, false);
                	ctx.fillStyle = "#000000";
                	ctx.fill()
                	ctx.beginPath()
                	ctx.arc(200 + 100*costdist, 280 + 100*i, 10, 0, Math.PI * 2, false);
                	ctx.fillStyle = "#FFFF00";
                	ctx.fill();

                	ctx.fillStyle = "#000000";
                	ctx.fillText(upgrades[i].costau, 230 + costdist*100, 290 + 100*i);
                	costdist += 1;
            	}
            	if (upgrades[i].costp > 0) {
                	ctx.beginPath()
                	ctx.arc(200 + 100*costdist, 280 + 100*i, 11, 0, Math.PI * 2, false);
                	ctx.fillStyle = "#000000";
                	ctx.fill()
                	ctx.beginPath()
                	ctx.arc(200 + 100*costdist, 280 + 100*i, 10, 0, Math.PI * 2, false);
                	ctx.fillStyle = "#B79628";
                	ctx.fill();

                	ctx.fillStyle = "#000000";
                	ctx.fillText(upgrades[i].costp, 230 + costdist*100, 290 + 100*i);
                	costdist += 1;
            	}
            	if (upgrades[i].costcu > 0) {
                	ctx.beginPath()
                	ctx.arc(200 + 100*costdist, 280 + 100*i, 11, 0, Math.PI * 2, false);
                	ctx.fillStyle = "#000000";
                	ctx.fill()
                	ctx.beginPath()
                	ctx.arc(200 + 100*costdist, 280 + 100*i, 10, 0, Math.PI * 2, false);
                	ctx.fillStyle = "#B87333";
                	ctx.fill();

                	ctx.fillStyle = "#000000";
                	ctx.fillText(upgrades[i].costcu, 230 + costdist*100, 290 + 100*i);
                	costdist += 1;
            	}
            	if (upgrades[i].costfe > 0) {
                	ctx.beginPath()
                	ctx.arc(200 + 100*costdist, 280 + 100*i, 11, 0, Math.PI * 2, false);
                	ctx.fillStyle = "#000000";
                	ctx.fill()
                	ctx.beginPath()
                	ctx.arc(200 + 100*costdist, 280 + 100*i, 10, 0, Math.PI * 2, false);
                	ctx.fillStyle = "#A19D94";
                	ctx.fill();

                	ctx.fillStyle = "#000000";
                	ctx.fillText(upgrades[i].costfe, 230 + costdist*100, 290 + 100*i);
                	costdist += 1;
            	}
            	if (upgrades[i].costti > 0) {
                	ctx.beginPath()
                	ctx.arc(200 + 100*costdist, 280 + 100*i, 11, 0, Math.PI * 2, false);
                	ctx.fillStyle = "#000000";
                	ctx.fill()
                	ctx.beginPath()
                	ctx.arc(200 + 100*costdist, 280 + 100*i, 10, 0, Math.PI * 2, false);
                	ctx.fillStyle = "#2E4A9E";
                	ctx.fill();

                	ctx.fillStyle = "#000000";
                	ctx.fillText(upgrades[i].costti, 230 + costdist*100, 290 + 100*i);
                	costdist += 1;
            	}
            	if (upgrades[i].costd > 0) {
                	ctx.beginPath()
                	ctx.arc(200 + 100*costdist, 280 + 100*i, 11, 0, Math.PI * 2, false);
                	ctx.fillStyle = "#000000";
                	ctx.fill()
                	ctx.beginPath()
                	ctx.arc(200 + 100*costdist, 280 + 100*i, 10, 0, Math.PI * 2, false);
                	ctx.fillStyle = "#D9E1F9";
                	ctx.fill();

                	ctx.fillStyle = "#000000";
                	ctx.fillText(upgrades[i].costd, 230 + costdist*100, 290 + 100*i);
                	costdist += 1;
            	}
            	if (upgrades[i].costir > 0) {
                	ctx.beginPath()
                	ctx.arc(200 + 100*costdist, 280 + 100*i, 11, 0, Math.PI * 2, false);
                	ctx.fillStyle = "#000000";
                	ctx.fill()
                	ctx.beginPath()
                	ctx.arc(200 + 100*costdist, 280 + 100*i, 10, 0, Math.PI * 2, false);
                	ctx.fillStyle = "#393339";
                	ctx.fill();

                	ctx.fillStyle = "#000000";
                	ctx.fillText(upgrades[i].costir, 230 + costdist*100, 290 + 100*i);
                	costdist += 1;
            	}
            	if (upgrades[i].coste > 0) {
                	ctx.beginPath()
                	ctx.arc(200 + 100*costdist, 280 + 100*i, 11, 0, Math.PI * 2, false);
                	ctx.fillStyle = "#000000";
                	ctx.fill()
                	ctx.beginPath()
                	ctx.arc(200 + 100*costdist, 280 + 100*i, 10, 0, Math.PI * 2, false);
                	ctx.fillStyle = "#FFFFFF";
                	ctx.fill();
                
                	ctx.fillStyle = "#000000";
                	ctx.fillText(upgrades[i].coste, 230 + costdist*100, 290 + 100*i);
                	costdist += 1;
            	}
        	}
		} else {
			for (let i = 0; i < upgrades.length; i++) {
            	ctx.font = "25px Courier New"
				if (money >= upgrades[i].costau && potatoes >= upgrades[i].costp && copper >= upgrades[i].costcu && iron >= upgrades[i].costfe && titanium >= upgrades[i].costti && diamond >= upgrades[i].costd && iridium >= upgrades[i].costir && essence >= upgrades[i].coste) {
					ctx.fillStyle = "black";
				} else {
					ctx.fillStyle = "#800000";
				}
            	ctx.fillText(upgrades[i].name + "    [" + (i + 4) + "]", 200, 220 + 100*i);
            	ctx.font = "20px Courier New";
            	ctx.fillText(upgrades[i].description, 205, 250 + 100*i);
            

            	let costdist = 0;

            	if (upgrades[i].costau > 0) {
                	ctx.beginPath()
                	ctx.arc(200 + 100*costdist, 280 + 100*i, 11, 0, Math.PI * 2, false);
                	ctx.fillStyle = "#000000";
                	ctx.fill()
                	ctx.beginPath()
                	ctx.arc(200 + 100*costdist, 280 + 100*i, 10, 0, Math.PI * 2, false);
                	ctx.fillStyle = "#FFFF00";
                	ctx.fill();

                	ctx.fillStyle = "#000000";
                	ctx.fillText(upgrades[i].costau, 230 + costdist*100, 290 + 100*i);
                	costdist += 1;
            	}
            	if (upgrades[i].costp > 0) {
                	ctx.beginPath()
                	ctx.arc(200 + 100*costdist, 280 + 100*i, 11, 0, Math.PI * 2, false);
                	ctx.fillStyle = "#000000";
                	ctx.fill()
                	ctx.beginPath()
                	ctx.arc(200 + 100*costdist, 280 + 100*i, 10, 0, Math.PI * 2, false);
                	ctx.fillStyle = "#B79628";
                	ctx.fill();

                	ctx.fillStyle = "#000000";
                	ctx.fillText(upgrades[i].costp, 230 + costdist*100, 290 + 100*i);
                	costdist += 1;
            	}
            	if (upgrades[i].costcu > 0) {
                	ctx.beginPath()
                	ctx.arc(200 + 100*costdist, 280 + 100*i, 11, 0, Math.PI * 2, false);
                	ctx.fillStyle = "#000000";
                	ctx.fill()
                	ctx.beginPath()
                	ctx.arc(200 + 100*costdist, 280 + 100*i, 10, 0, Math.PI * 2, false);
                	ctx.fillStyle = "#B87333";
                	ctx.fill();

                	ctx.fillStyle = "#000000";
                	ctx.fillText(upgrades[i].costcu, 230 + costdist*100, 290 + 100*i);
                	costdist += 1;
            	}
            	if (upgrades[i].costfe > 0) {
                	ctx.beginPath()
                	ctx.arc(200 + 100*costdist, 280 + 100*i, 11, 0, Math.PI * 2, false);
                	ctx.fillStyle = "#000000";
                	ctx.fill()
                	ctx.beginPath()
                	ctx.arc(200 + 100*costdist, 280 + 100*i, 10, 0, Math.PI * 2, false);
                	ctx.fillStyle = "#A19D94";
                	ctx.fill();

                	ctx.fillStyle = "#000000";
                	ctx.fillText(upgrades[i].costfe, 230 + costdist*100, 290 + 100*i);
                	costdist += 1;
            	}
            	if (upgrades[i].costti > 0) {
                	ctx.beginPath()
                	ctx.arc(200 + 100*costdist, 280 + 100*i, 11, 0, Math.PI * 2, false);
                	ctx.fillStyle = "#000000";
                	ctx.fill()
                	ctx.beginPath()
                	ctx.arc(200 + 100*costdist, 280 + 100*i, 10, 0, Math.PI * 2, false);
                	ctx.fillStyle = "#2E4A9E";
                	ctx.fill();

                	ctx.fillStyle = "#000000";
                	ctx.fillText(upgrades[i].costti, 230 + costdist*100, 290 + 100*i);
                	costdist += 1;
            	}
            	if (upgrades[i].costd > 0) {
                	ctx.beginPath()
                	ctx.arc(200 + 100*costdist, 280 + 100*i, 11, 0, Math.PI * 2, false);
                	ctx.fillStyle = "#000000";
                	ctx.fill()
                	ctx.beginPath()
                	ctx.arc(200 + 100*costdist, 280 + 100*i, 10, 0, Math.PI * 2, false);
                	ctx.fillStyle = "#D9E1F9";
                	ctx.fill();

                	ctx.fillStyle = "#000000";
                	ctx.fillText(upgrades[i].costd, 230 + costdist*100, 290 + 100*i);
                	costdist += 1;
            	}
            	if (upgrades[i].costir > 0) {
                	ctx.beginPath()
                	ctx.arc(200 + 100*costdist, 280 + 100*i, 11, 0, Math.PI * 2, false);
                	ctx.fillStyle = "#000000";
                	ctx.fill()
                	ctx.beginPath()
                	ctx.arc(200 + 100*costdist, 280 + 100*i, 10, 0, Math.PI * 2, false);
                	ctx.fillStyle = "#393339";
                	ctx.fill();

                	ctx.fillStyle = "#000000";
                	ctx.fillText(upgrades[i].costir, 230 + costdist*100, 290 + 100*i);
                	costdist += 1;
            	}
            	if (upgrades[i].coste > 0) {
                	ctx.beginPath()
                	ctx.arc(200 + 100*costdist, 280 + 100*i, 11, 0, Math.PI * 2, false);
                	ctx.fillStyle = "#000000";
                	ctx.fill()
                	ctx.beginPath()
                	ctx.arc(200 + 100*costdist, 280 + 100*i, 10, 0, Math.PI * 2, false);
                	ctx.fillStyle = "#FFFFFF";
                	ctx.fill();
                
                	ctx.fillStyle = "#000000";
                	ctx.fillText(upgrades[i].coste, 230 + costdist*100, 290 + 100*i);
                	costdist += 1;
            	}
        	}
		}

        
        ctx.font = "25px Courier New";
        ctx.fillStyle = "#000000";
        ctx.fillText("[M] to close menu", 200, canvas.height - 180);
    }
	
	if (buildingtoggle % 2 == 0) {
		buildingex = false;
		
		ctx.fillStyle = "#000000";
        ctx.fillRect(150, 150, canvas.width - 300, canvas.height - 300);
        ctx.fillStyle = "#E1C699";
        ctx.fillRect(155, 155, canvas.width - 310, canvas.height - 310);
		
		ctx.font = "25px Courier New";
        ctx.fillStyle = "#000000";
		ctx.fillText("[N] to close menu", 200, canvas.height - 180);
		
		if (coppertransmuter == true) {
			document.getElementById("transmuter").style.display = "initial";	
		}
		if (smelter == true) {
			document.getElementById("smelter").style.display = "initial";		
		}
		if (compressor == true) {
			document.getElementById("compressor").style.display = "initial";		
		}
		if (pressurizer == true) {
			document.getElementById("pressurizer").style.display = "initial";		
		}
		if (synthesizer == true) {
			document.getElementById("synthesizer").style.display = "initial";		
		}
		if (vaporizer == true) {
			document.getElementById("vaporizer").style.display = "initial";		
		}
	} else {
		document.getElementById("transmuter").style.display = "none";
		document.getElementById("smelter").style.display = "none";	
		document.getElementById("compressor").style.display = "none";	
		document.getElementById("pressurizer").style.display = "none";
		document.getElementById("synthesizer").style.display = "none";
		document.getElementById("vaporizer").style.display = "none";
	}
}
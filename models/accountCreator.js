
'use strict';
const puppeteer = require('puppeteer');
const fetch = require("node-fetch");
const { array } = require('@hapi/joi');
let jsonReturn = [];
async function AccountCreater(server, key, howMany) {
    for (let i = 0; i < howMany; ++i){
        const nickList = ['Slaver', 'Jankos', 'Change', 'Full', 'Skill', 'Skull', 'Fairy', 'Buddie', 'Shard', 'Ninja', 'Keeper', 'Fantastic', 'Romance', 'Papa', 'Pengiun', 'Nami', 'Cat', 'White', 'Red', 'Yellow', 'Blue', 'Black', 'Brown', 'Orange', 'Grey', 'Green', 'Gold', 'Silver', 'Bronze', 'Diamond', 'Platinium', 'Challenger', 'Knight', 'Tank', 'Archer', 'Palladin', 'Druid', 'Sorccer', 'Human', 'Goblin', 'Dragon', 'Angel', 'Unicorn', 'Minotaur', 'Golem', 'Devil', 'Demon', 'Giant', 'Titan', 'Energy', 'Power', 'Master', 'Slime', 'Orc',
            'Minions', 'Tower', 'King', 'Lord', 'Fighter', 'Noob', 'Smart', 'Maximum', 'Mighty', 'Stinky', 'Creepy', 'Blody', 'Crazy', 'Alcoholic', 'Special', 'Angry', 'Dirty', 'Secret', 'Pscyho', 'Extreme', 'Zombie', 'Bikini', 'Smelly', 'Maniac', 'Penguin', 'Combat', 'Rat', 'Mecha', 'Clones', 'Super', 'Metal', 'Hidden', 'Dark', 'Icy', 'Sweet', 'Twin', 'Rage', 'Slayer', 'Thunder', 'Push', 'Lucky', 'Old', 'Ranger','Dude','Man','Woman','OldMan','Turtle','Shot','Warrior','Toy','Blade','Pepe','Piky','Mike','Porithe','Amazing','Steve' ];
        let a = Math.random() * nickList.length;
        let b = Math.random() * nickList.length;
        let nickname = nickList[Math.round(a)] + nickList[Math.round(b)];
        let password = Math.random().toString(36).slice(2) + "A1";
        let email = nickname + "@gmail.sc";
        const day = Math.floor(Math.random() * 30) + 1;
        const month = Math.floor(Math.random() * 11) + 1;
        const year = Math.floor(Math.random() * (2002 - 1950)) + 1950;
        const browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            slowMo: 20,
        });
    
        const page = await browser.newPage();
        await page.setViewport({
            width: 1920,
            height: 1280,
            deviceScaleFactor: 1,
        });
        await page.goto(`https://signup.${server}.leagueoflegends.com/en/signup/index#/`, { waitUntil: 'networkidle0', timeout: 0  });
        await page.focus('input[name=email]');
        await page.keyboard.type(email)
        page.keyboard.press('Enter');
        await page.waitForSelector('select[name=dob-day]', { visible: true, timeout: 0 });
        await page.select('select[name="dob-day"]', day.toString())
        await page.select('select[name="dob-month"]', month.toString())
        await page.select('select[name="dob-year"]', year.toString())
        await page.click('div[class="next-button"]');
        await page.waitForSelector('input[name="username"]', { visible: true, timeout: 0 });
        await page.type('input[name=username]', nickname);
        await page.type('input[name=password]', password);
        await page.type('input[name=confirm_password]', password);
        await page.click('div[class=checkbox-indicator]');
        await page.click('div[class="next-button"]');
        await page.click('div[class="app-component"]');
        let token = 'CAPCHA_NOT_READY';
        await page.evaluate((token) => {
            document.querySelector('#g-recaptcha-response').innerText = token;
        }, token)
        await page.waitFor(1000)
        await page.click('div[class="next-button"]');
        await page.waitForNavigation({ waitUntil: ['networkidle0', 'load', 'domcontentloaded'], timeout: 0 }).catch(error => console.log(error));
        await page.waitFor(2000)
        let currentURL = page.url();
        // console.log(server)
        // console.log(currentURL);
        // currentURL === `https://signup.${server.toLowerCase()}.leagueoflegends.com/en/signup/index#/confirmation` ? console.log(true) : console.log(false);
        let i = 0;
        let id = 0;
        //  console.log("while loop start");
        while (currentURL === `https://signup.${server}.leagueoflegends.com/${server === "ru" ? server : "en"}/signup/index#/confirmation`) {
            await page.waitFor(2000)
            await page.click("input[name=username]", { clickCount: 3 })
            if (i === 0) {
                await page.type('input[name=username]', nickList[Math.round(a)] + nickList[Math.round(b)]);
                await page.click('div[class="app-component"]');
                page.keyboard.press('Enter');
                await fetch("https://2captcha.com/in.php", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        key: key,
                        method: "userrecaptcha",
                        googlekey: "6Lc3HAsUAAAAACsN7CgY9MMVxo2M09n_e4heJEiZ",
                        pageurl: `https://signup.${server}.leagueoflegends.com/${server === "ru" ? server : "en"}/signup/index#/confirmation`,
                        json: "1"
                    })
                })
                    .then(response => response.json())
                    .then(data => {
                        id = data.request
                        console.log(id)
                    })
                    .catch(err => console.error(err))

                token = 'CAPCHA_NOT_READY';
                while (token === "CAPCHA_NOT_READY") {
                    await fetch(`https://2captcha.com/res.php?key=${key}&action=get&id=${id}&json=1`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json"
                        },
                    })
                        .then(response => response.json())
                        .then(data => {
                            if (data.request === 'CAPCHA_NOT_READY') {
                                
                            }
                            else {
                                token = data.request
                            }
                        })
                        .catch(err => console.error(err))
                        
                };
                await page.evaluate((token) => {
                    document.querySelector('#g-recaptcha-response').innerText = token;
                }, token)
                // console.log("one")
            } else if (i === 1) {
                await page.type('input[name=username]', nickList[Math.round(a)] + nickList[Math.round(b)] + "s");
            } else if (i === 2) {
                await page.type('input[name=username]', nickList[Math.round(a)] + "s" + nickList[Math.round(b)]);
            } else if (i === 3) {
                await page.type('input[name=username]', nickList[Math.round(a)] + "s" + nickList[Math.round(b)] + "s");
            } else if (i === 4) {
                await page.type('input[name=username]', nickList[Math.round(a)] + nickList[Math.round(b)] + "os");
            } else if (i === 5) {
                await page.type('input[name=username]', nickList[Math.round(a)] + "os" + nickList[Math.round(b)]);
            } else if (i === 6) {
                await page.type('input[name=username]', nickList[Math.round(a)] + "os" + nickList[Math.round(b)] + "os");
            } else if (i === 6) {
                await page.type('input[name=username]', nickList[Math.round(a)] + nickList[Math.round(b)] + "ey");
            }
            // console.log("send");
            await page.waitFor(1000);
            await page.waitForSelector('input[name=username]');
            nickname = await page.$eval("input[name=username]", e => e.value);
            // console.log(nickname)
            i++
            await page.waitFor(1000)
            await page.click('div[class="next-button"]');
            
            await page.on('response', async (response) => {
                if (response.url() == "https://signup-api.leagueoflegends.com/v1/accounts") {
                    if (response._status != 200) {
                        await response.json()
                        .then(data => {
                            if (data.fields.username == 'ValueNotUnique') {
                                console.log("Nick zajęty wybierz inny")
                            } else if (token === 'ERROR_CAPTCHA_UNSOLVABLE') {
                                i--
                                console.log('captcha is unsolvable');
                            }
                            else if (data.fields.captcha == 'InvalidToken') {
                                i--
                                console.log(data.fields)
                                console.log("captcha is invalid")
                                fetch(`https://2captcha.com/res.php?key=${key}&action=reportbad&id=${id}&json=1`, {
                                    method: "GET",
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                })
                                    .then(response => response.json())
                                    .then(data => { console.log(data) })
                                    .catch(err => { console.error(err) })
                            }
                        })
                    }
                }
            });
            await page.waitForNavigation({ waitUntil: ['networkidle0', 'load', 'domcontentloaded'], timeout: 5000 }).catch(error => console.log());
            // console.log("reload");
            currentURL = page.url();
        }
        //  console.log("while loop end");
        if(currentURL === `https://signup.${server}.leagueoflegends.com/en/signup/index#/error`){
            console.log('WebPage ERROR')
            await browser.close()
        }
        await page.waitForSelector('.download-button', {
            visible: true,
        })
        // console.log(page.url());
                
        if (server === "eune") {   
            jsonReturn.push(`EUN:${nickname}:${password}`)
            console.log("EUN" + ":" + nickname + ":" + password)
        } else if (server === "euw") {   
            jsonReturn.push(`EUW:${nickname}:${password}`)
            console.log("EUW" + ":" + nickname + ":" + password)
        } else {
            jsonReturn.push(`${server}:${nickname}:${password}`)
            console.log(server + ":" + nickname + ":" + password)
        }
        await browser.close()
    }
    
    return jsonReturn;
}
AccountCreater();


module.exports = AccountCreater;
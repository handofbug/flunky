const path = require('path');
const fs = require('fs');
const cheerio = require('cheerio');
const needle = require('needle');

class Module {
    constructor(eventEmmiter, db) {
        this.eventEmmiter = eventEmmiter;
        this.db = db;
        this.modules = {};
    }
    /**
     * Load all modules from path pathToFolder
     * 
     * @param {string} [pathToFolder='../modules'] 
     * @returns this
     * @memberof Module
     */
    loadModules(pathToFolder = '../modules') {
        fs.readdirSync(path.join(__dirname, pathToFolder)).forEach(fileName => {
            if (fileName !== 'baseModule.js') {
                const moduleFile = require('./' + pathToFolder + '/' + fileName);
                this.addModule(fileName, moduleFile);
            }
        });
        return this;
    }
    /**
     * Add module to class
     * 
     * @param {any} fileName 
     * @param {any} moduleFile 
     * @memberof Module
     */
    addModule(fileName, moduleFile) {
        this.modules[fileName] = new moduleFile({
            eventEmmiter: this.eventEmmiter,
            db: this.db,
            cheerio: cheerio,
            needle: needle
        });
    }
    getModules() {
        return this.modules;
    }
    getModule(name) {
        return this.modules[name]
    }
    /**
     * Message from discord.js redirected to all modules 
     * 
     * @param {any} message 
     * @memberof Module
     */
    onMessage(message) {
        Object.keys(this.modules).forEach(key => {
            this.modules[key].command(message);
        })
    }
    onTick() {
        // this.eventEmmiter.emit('tick', {});
    }
}

module.exports = Module;
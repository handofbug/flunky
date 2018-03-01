const path = require('path');
const fs = require('fs');

class Module {
    constructor() {
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
            const moduleFile = require('./' + pathToFolder + '/' + fileName);
            this.addModule(fileName, moduleFile);
        });
        return this;
    }
    event(eventEmmiter) {
        this.eventEmmiter = eventEmmiter;
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
        this.modules[fileName] = moduleFile.event(this.eventEmmiter);
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
        this.eventEmmiter.emit('tick', {});
    }
}

module.exports = new Module()
const {pool} = require("../utils/db");
const {v4: uuid} = require('uuid');

class TodoRecord {
    constructor(obj) {
        this.id = obj.id ?? uuid();
        this.title = obj.title;
        this._validation();
    }

    async insert() {
        await pool.execute('INSERT INTO `todos` VALUES(:id, :title)', {
            id: this.id,
            title: this.title,
        });


        return this.id;

    }
    async delete() {
        if(!this.id){
            throw new Error('Todo has no ID.')
        }

       await pool.execute('DELETE FROM `todos` WHERE `id` = :id', {
            id: this.id,
        });
    }

    async update(){
        if(!this.id){
            throw new Error('Todo has no ID.')
        }
        this._validation();
        await pool.execute('UPDATE `todos` SET `title`= :title WHERE `id`= :id', {
            id: this.id,
            title: this.title,
        });
    }

    static async findAll(){
        const [results] = await pool.execute('SELECT * FROM `todos`');
        return results.length === 1 ? new TodoRecord(results[0]) : null;
    }

    static async find(id){
        const [results] = await pool.execute('SELECT * FROM `todos` WHERE `id` = :id', {
            id: id,
        });
        return results.length === 1 ? new TodoRecord(results[0]) : null;
    }

    _validation(){
        if (this.title.trim().length <= 5) {
            throw new Error('Todo title should be at least 5 characters.')
        }
        if (this.title.length >= 100) {
            throw new Error('Todo title should be at most 100 characters.')
        }
    }
}

module.exports = {
    TodoRecord,
}
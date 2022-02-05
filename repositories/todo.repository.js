const {pool} = require("../utils/db");
const {v4: uuid} = require("uuid");

class TodoRepository {

    constructor(obj) {
        this.id = obj.id;
        this.title = obj.title;
    }

   static async _validation(record){
        if (record.title.trim().length < 5) {
            throw new Error('Todo title should be at least 5 characters.')
        }
        if (record.title.length >= 100) {
            throw new Error('Todo title should be at most 100 characters.')
        }
    }
    static async insert(record) {
        await TodoRepository._validation(record);
        record.id = record.id ?? uuid();
        console.log(record.id);
        console.log(record.title);
        await pool.execute('INSERT INTO `todos` VALUES(:id, :title);', {
            id: record.id,
            title: record.title,
        });

        return record.id;

    }
    static async delete(id) {
        if(!id){
            throw new Error('Todo has no ID.')
        }
        console.log(id);

        await pool.execute('DELETE FROM `todos` WHERE `id` = :id;', {
            id,
        });
    }

    static async update(record){
        await TodoRepository._validation(record);
        if(!record.id){
            throw new Error('Todo has no ID.')
        }
        await pool.execute('UPDATE `todos` SET `title`= :title WHERE `id`= :id;', {
            id: record.id,
            title: record.title,
        });
    }

    static async findAll(){
        const [results] = await pool.execute('SELECT * FROM `todos`;');
        return results.map(result => new TodoRepository(result));
    }

    static async find(id){
        const [results] = await pool.execute('SELECT * FROM `todos` WHERE `id` = :id;', {
            id: id,
        });
        return results.length === 1 ? new TodoRepository(results[0]) : null;
    }
}
module.exports ={
    TodoRepository,
}
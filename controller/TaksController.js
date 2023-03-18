const Task = require('../models/Task');


const getAllTasks = async (req, res) => {

    try {
        const taskList = await Task.find();//busca as tasks gravadas no banco
        return res.render("index", { taskList })
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}//fecha getAllTAsks



const createTask = async (req, res) => {
    const task = req.body;

    if (!task.task) {
        return res.redirect("/")
    }

    try {
        await Task.create(task);
        console.log("Tarefa criada com sucesso!!");
        return res.redirect("/")

    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

const getById = async (req, res) => {
    //enviar o id como parametro da rota

    try {
        const taskList = await Task.find();//busca as tasks gravadas no banco
        if (req.params.method == "update") {//verifoco se a url é para o updade
            const task = await Task.findOne({ _id: req.params.id });
            return res.render("index", { task, taskList })
        } else {
            res.render("index", { task: null, taskList })
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}


const updateOneTask = async (req, res) => {

    try {
        const task = req.body;
        await Task.updateOne({ _id: req.params.id }, task);
        console.log("Tarefa atualizada com sucesso!!");
        return res.redirect("/")

    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}



module.exports = {
    getAllTasks,
    createTask,
    updateOneTask,
    getById,
}
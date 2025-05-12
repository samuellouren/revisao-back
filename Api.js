import express from "express"
import cors from "cors";
import { promises as fs } from "node:fs";


const PORT = 3333;
const app = express()

app.use(cors({
    origin: "*",
    methods:["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))

app.use(express.json())

app.get('/instrutores', async (req, res) => {
    try {
        const data = await  fs.readFile(DATABASE_URL, "utf-8");
        const db = JSON.parse(data)

        const instrutores = db.usuarios.filter((aluno) => aluno.tipo === 'instrutor')

        res.status(200).json({instrutores})
    } catch (error) {
        console.log(error)
        res.status(500).json({mensagem:"internal server error"})
    }
})

app.get ('//cursos/com-muitos-comentarios', async (req, res) => {
    try {
        const data = await  fs.readFile(DATABASE_URL, "utf-8");
        const db = JSON.parse(data)

        const curso3 = db.cursos.filter((cursos) => cursos.comentarios.lenght >= 3)

        res.status(200).json({mensagem: " esses sao os cursos com mais de 3 comentarios " + curso3})
    } catch (error) {
        console.log(error)
        res.status(500).json({mensagem:"internal server error"})
    }
})

app.get('/usuarios/:id/cursos', async(req, res) => {
    try {
        const data = await  fs.readFile(DATABASE_URL, "utf-8");
        const db = JSON.parse(data)

        const cursoMatriculados = db.cursos.find((usuario) => usuario.id === id) || null

        res.status(200).json({mensagem: " esses sao os cursos cadastrado por este usuario" + cursoMatriculados})
    } catch (error) {
        console.log(error)
        res.status(500).json({mensagem:"internal server error"})
    }
})
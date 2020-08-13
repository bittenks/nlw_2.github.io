//Dados
const proffys = [
    {
        name: "Diego Fernandes",
        avatar: "https://avatars2.githubusercontent.com/u/2254731?s=460&u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&v=4",
        whatsapp:"8190345980",
        bio: "Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.",
        subject: "Química",
        cost:"20" ,
        weekday: [0],
        time_from: [720],
        time_to: [1220]
    },
    {
        name: "Guilherme Bittencourt",
        avatar: "https://scontent.fudi1-1.fna.fbcdn.net/v/t1.0-1/p160x160/67575564_2353868238217183_4956188755443580928_n.jpg?_nc_cat=109&_nc_sid=dbb9e7&_nc_eui2=AeG3N7Ii_M7o4XZ3C3egSGa-t5WvckJJ4ke3la9yQkniRyBGmfH2q8ujatemDCgVC80cSAtKZhbBgUiVDCf8IYXj&_nc_ohc=R4WtgRXwTLQAX-sitO1&_nc_ht=scontent.fudi1-1.fna&_nc_tp=6&oh=c3c56364f2b3fb205659b2710b2fe4db&oe=5F5424CA",
        whatsapp:"21896328354",
        bio: "Louco por filmes que fazem estourar os miolos, como Donnie Darko",
        subject: "Técnico de Informática",
        cost:"40" ,
        weekday: [6],
        time_from: [720],
        time_to: [1220]
    },
{
    name: "Isabella",
    avatar: "https://scontent.fudi1-1.fna.fbcdn.net/v/t1.0-9/36985492_1698872080220649_9131239898819330048_n.jpg?_nc_cat=105&_nc_sid=7aed08&_nc_eui2=AeEGvpkYwKuBrn2Z8tD5NZ6pU8QpWuL64lNTxCla4vriU35BeZdI5_tVYOcByVPbQAgg8Xv8Us0NeKhnyym2KAIV&_nc_ohc=oIbuIDMLTm4AX8ODh4J&_nc_ht=scontent.fudi1-1.fna&oh=554718d0c86f692192e8a723e256cc11&oe=5F518ECA",
    whatsapp:"21896328354",
    bio: "Amo Harry Potter , Jogos vorazes e recentemente eu revi a saga crepúscolo",
    subject: "Advogada",
    cost:"90" ,
    weekday: [6],
    time_from: [720],
    time_to: [1220]
}
]


const subjects = [
    "Artes",
    "Biologia",
    "Ciência",
    "Educação Física",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Português",
    "Química",
]

const weekdays = [
    "Domingo",
    "Segunda-Feira",
    "Terça-Feira",
    "Quarta-Feira",
    "Quinta-Feira",
    "Sexta-Feira",
    "Sábado",
]

//Funcionalidades
function getSubject(subjectNumber){
    const arrayPosition = +subjectNumber - 1
    return subjects[arrayPosition]
}

function pageLanding(req, res){
    return res.render("index.html")
}

function pageStudy(req, res){
    const filters = req.query
    return res.render("study.html", {proffys, filters, subjects, weekdays})
}

function pageGiveClasses(req, res){
    const data = req.query

    const isNotEmpty = Object.keys(data).length > 0
    //Se tiver dados
    if (isNotEmpty) {

        data.subject = getSubject(data.subject)
        //Adicionar dados à lista de proffys
        proffys.push(data)

        return res.redirect("/study")
    }

    //Se não, mostrar a página
    return res.render("give-classes.html", {subjects, weekdays})
}

//Servidor
const express = require('express')
const server = express()

//Configurar nunjucks (template engine)
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
    express: server,
    noCache: true,
})
// Início e configuração do servidor
server
//Configurar arquivos estáticos (CSS, scripts, imagens)
.use(express.static('public'))
//Rotas da aplicação
.get("/", pageLanding)
.get("/study", pageStudy)
.get("/give-classes", pageGiveClasses)
//Start do servidor
.listen(5500)
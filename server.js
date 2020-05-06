var express = require("express"),
    http = require("http"),
    app = express(),
    toDos = [
        { 
            "description" : "Купить продукты",
            "tags"  : [ "покупки", "chores" ]
        },
        { 
            "description" : "Сделать несколько новых задач",
            "tags"  : [ "писательство", "работа" ]
        },
        {
            "description" : "Подготовиться к лекции в понедельник",
            "tags"  : [ "работа", "преподавание" ]
        },
        { 
            "description" : "Отвтетить на электронные письма",
            "tags"  : [ "работа" ]
        },
        { 
            "description" : "Вывести Грейси на прогулку в парке",
            "tags"  : [ "рутины", "питомцы" ]
        },
        { 
            "description" : "Закончить писать книгу",
            "tags"  : [ "писательство", "работа" ]
        }
    ]
        
app.use(express.static(__dirname + "/client"));

app.use(express.urlencoded({ extended: true }));

http.createServer(app).listen(3000);

app.get("/todos.json", function (req, res) {
    res.json(toDos);
});
/*
app.post("/todos", function (req, res) {
    console.log("Данные были отправлены на сервер!");
    res.json({"message":"Вы размещаетесь на сервере!"});
});
*/

app.post("/todos", function (req, res) {
    var newToDo = req.body;
    console.log(newToDo);
    toDos.push(newToDo);
    res.json({"message":"Вы размещаетесь на сервере!"});
});

import React, {useState} from 'react';
import './App.css';
import {v1} from "uuid";
import {TodoList} from "./TodoList";
import AddItemForm from "./AddItemForm";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type filterType = "all" | "active" | "completed"
type TodoListType = {
    id: string
    title: string
    filter: filterType
}

type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    const todoListID_1 = v1()
    const todoListID_2 = v1()
    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID_1, title: "What to learn", filter: "all"},
        {id: todoListID_2, title: "What to buy", filter: "all"},
    ])

    const [tasks, setTasks] = useState({
        [todoListID_1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: false},
            {id: v1(), title: "React", isDone: true},
        ],
        [todoListID_2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Bread", isDone: false},
            {id: v1(), title: "Meat", isDone: true},
        ],
    })


    function changeFilter(value: filterType, todoListID: string) {
        const todoList = todoLists.find(tl => tl.id === todoListID)
        if(todoList){
            todoList.filter = value
            setTodoLists([...todoLists])
        }
    }
    function changeTodoListTitle(newTitle: string, todoListID: string) {
        const todoList = todoLists.find(tl => tl.id === todoListID)
        if(todoList){
            todoList.title = newTitle
            setTodoLists([...todoLists])
        }
    }

    function removeTask(id: string, todoListID: string) {
        const todoListTasks = tasks[todoListID]
        const filteredTask = todoListTasks.filter(t => t.id != id)
        tasks[todoListID] = filteredTask
        setTasks({...tasks})
    }

    function addTask(title: string, todoListID: string) {
        let newTask = {id: v1(), title: title, isDone: false}
        tasks[todoListID] =[newTask, ... tasks[todoListID]]
        setTasks({...tasks})
    }

    function changeStatus(id: string, isDone: boolean, todoListID: string) {
        const todoListTasks = tasks[todoListID]
        const task = todoListTasks.find(t => t.id === id)
        if (task)
            task.isDone = isDone
        setTasks({...tasks})
    }
    function changeTaskTitle(id: string, newTitle: string, todoListID: string) {
        const todoListTasks = tasks[todoListID]
        const task = todoListTasks.find(t => t.id === id)
        if (task)
            task.title = newTitle
        setTasks({...tasks})
    }

    function removeTodoList(todoListID: string){
        setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
        delete  tasks[todoListID]

    }
    function addTodoList (title: string) {
        const newTodoListID = v1()
        const newTodoList: TodoListType = {id:newTodoListID, title, filter: "all"}
        setTodoLists([...todoLists, newTodoList])
        setTasks({...tasks, [newTodoListID]: []})
    }
    const todoListComponents = todoLists.map(tl => {
        let tasksForTodoList = tasks[tl.id]

        if (tl.filter === "active")
            tasksForTodoList = tasksForTodoList.filter(t => t.isDone === false)

        if (tl.filter === "completed")
            tasksForTodoList = tasksForTodoList.filter(t => t.isDone === true)
        return (
            <TodoList
                id={tl.id}
                title={tl.title}
                task={tasksForTodoList}
                addTask={addTask}
                filter={tl.filter}
                removeTask={removeTask}
                changeFilter={changeFilter}
                changeStatus={changeStatus}
                removeTodoList={removeTodoList}
                changeTaskTitle = {changeTaskTitle}
                changeTodoListTitle = {changeTodoListTitle}

            />
        )
    })

    return (
        <div className="App">
            <AddItemForm addItem={addTodoList} />
            {todoListComponents}

        </div>)
}


export default App;

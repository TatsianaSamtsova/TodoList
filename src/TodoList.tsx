import React, {ChangeEvent, useState} from "react";
import {filterType} from "./App";
import {KeyboardEvent} from 'react';
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";


export type taskPropsType = {
    id: string
    title: string
    isDone: boolean
}

type todoListPropsType = {
    id: string
    title: string
    filter: filterType
    task: Array<taskPropsType>
    removeTodoList:(todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    removeTask: (id: string, todoListID: string) => void
    changeFilter: (value: filterType, todoListID: string) => void
    changeStatus: (id: string, isDone: boolean, todoListID: string) => void
    changeTaskTitle: (id: string, newTitle: string, todoListID: string) => void
    changeTodoListTitle: (newTitle: string, todoListID: string) => void
}

export function TodoList(props: todoListPropsType) {

    const addTask = (title: string) => props.addTask(title, props.id)

    const removeTodoList = () => props.removeTodoList(props.id)

    const onAllClickHandler = () => {
        props.changeFilter("all", props.id)
    }

    const onActiveClickHandler = () => {
        props.changeFilter("active", props.id)
    }

    const onCompletedClickHandler = () => {
        props.changeFilter("completed", props.id)
    }
    const changeTodoListTitle = (title: string) => props.changeTodoListTitle(title, props.id)

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                <button onClick={removeTodoList}>X</button></h3>
            <AddItemForm addItem={addTask} />
            <ul>
                {props.task.map(t => {
                    const onClickHandler = () => {props.removeTask(t.id, props.id)}
                    const onChangeStatusHandler =(e:ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked
                        props.changeStatus(t.id, newIsDoneValue, props.id)
                    }
                    const changeTaskTitle = (newTitle: string) =>
                        props.changeTaskTitle(t.id, newTitle, props.id)
                        return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                            <input type="checkbox"
                                   onChange={onChangeStatusHandler}
                                   checked={t.isDone}
                            />
                            <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
                            <button onClick={onClickHandler}>x</button>
                        </li>
                    }
                )
                }
            </ul>
            <div>
                <button className={props.filter === "all" ? "active-filter" : ""} onClick={onAllClickHandler}>All</button>
                <button className={props.filter === "active" ? "active-filter" : ""} onClick={onActiveClickHandler}>Active</button>
                <button className={props.filter === "completed" ? "active-filter" : ""} onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>

    );

}
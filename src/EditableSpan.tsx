import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string
    changeTitle:(newTitle: string) => void
}

function EditableSpan (props: EditableSpanPropsType) {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onEditMode = () => setEditMode(true)
    const offEditMode = () => {
            setEditMode(false)
            props.changeTitle(title)
        }


    return (
        editMode
        ? <input
            value={title}
            autoFocus
            onChange={onChangeHandler}
            onBlur={offEditMode}
            />
        : <span onDoubleClick={onEditMode}>{props.title}</span>
    )
}

export default EditableSpan
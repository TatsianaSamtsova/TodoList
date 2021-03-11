import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormPropsType = {
    addItem: (title:string) => void
}

function AddItemForm(props:AddItemFormPropsType) {
    const [title, setTitle] = useState("")
    const [error, setError] = useState<string>("")

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addItem();
        }
        setError("")
    }
    const addItem = () => {
        if (title.trim() !== "") {
            props.addItem(title)
            setTitle("")}
        else {
            setError("Error")
        }
    }
    return(
        <div >
            <input
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
            />
            <button onClick={addItem}>+</button>
            {error && <div className={"error"}>{error}</div>}
        </div>
    )
}

export default AddItemForm
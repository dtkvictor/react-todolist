import React, { ChangeEventHandler, MouseEventHandler, useContext } from "react";
import { Todo } from "../models/Todo";
import { TodoContextType } from "../contexts/TodoContextType";
import { TodoContext } from "../contexts/TodoContext";

interface TodoListItemProps {
    todo: Todo,
}

const TodoListItem = (props: TodoListItemProps) => {

    const { todo } = props;

    const { removeTodo, toggle } = useContext<TodoContextType>(TodoContext);

    const onRemove: MouseEventHandler = () => {
        removeTodo(todo);
    }

    const handleChange: ChangeEventHandler = () => {
        toggle(todo);
    }

    return (
        <tr className="uk-animation-slide-bottom-medium">
            <td className="uk-width-auto">
                <label>
                    <input 
                        className="uk-checkbox" 
                        type="checkbox" 
                        checked={todo.done}
                        onChange={handleChange}
                    />
                </label>
            </td>
            <td className="uk-width-expand">
                {todo.title}
            </td>
            <td className="uk-width-auto">
                <button 
                    className="uk-icon-button uk-button-danger" 
                    uk-icon="trash"
                    onClick={onRemove}
                ></button>
            </td>
        </tr>
    );
}
export default TodoListItem;
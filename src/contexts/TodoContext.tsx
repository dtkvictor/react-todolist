import React, { createContext, useEffect, useState } from "react";
import { TodoContextType } from "./TodoContextType";
import { Todo } from "../models/Todo";
import { get, save } from "../services/TodoService";
import iziToast from "izitoast";

export const TodoContext = createContext<TodoContextType>({
    todos: [],
    addTodo: () => {},
    removeTodo: () => {},
    toggle: () => {},
});

const TodoProvider = (props: any) => {
    const [todos, setTodos] = useState<Todo[]>(get);

    const addTodo =  (title:string) => {
        const todo: Todo = { 
            id: todos.length + 1, 
            title: title, 
            done: false 
        }
        setTodos([...todos, todo]);
        iziToast.success({            
            message: "Tarefa criada com sucesso."    
        });
    };

    const removeTodo = (todo:Todo) => {

        const remove = () => {
            const index = todos.indexOf(todo);
            setTodos(todos.filter((_, i) => i !== index));
        }

        iziToast.question({
            timeout: 20000,
            close: false,
            overlay: true,            
            id: 'question',
            zindex: 999,            
            message: 'Deseja mesmo excluir essa tarefa?',
            position: 'topCenter',
            buttons: [
                ['<button><b>YES</b></button>', function (instance, toast) {         
                    remove();                
                    instance.hide({ transitionOut: 'fadeOut' }, toast, 'button')
                }, true],
                ['<button>NO</button>', function (instance, toast) {
                    instance.hide({ transitionOut: 'fadeOut' }, toast, 'button')         
                }, false],
            ]            
        });
    };

    const toggle = (todo:Todo) => {
        const index = todos.indexOf(todo);    
        todos[index].done = !todo.done;
        setTodos([...todos]);

        if(todos[index].done === true) {
            iziToast.info({                
                message: "Tarefa concluída."
            });
        }                
    };

    useEffect(() => save(todos), [todos]);

    return (
        <TodoContext.Provider value={{
            todos: todos,
            addTodo: addTodo,
            removeTodo: removeTodo,
            toggle: toggle
        }}>            
            { props.children }
        </TodoContext.Provider>
    );
}

export default TodoProvider;
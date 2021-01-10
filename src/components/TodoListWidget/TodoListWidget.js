import { useEffect, useState } from 'react';
import TodoListComponent from '@yana4961/react-todo-list';
import { GET_TODO_LIST, SET_TODO_LIST, SET_ACTIVE } from '../../graphql/states/todoState';
import { useQuery } from '@apollo/client';
import cache from '../../graphql/cache';
import FormAddTodo from '../FormAddTodo';
let ids = 100;

const TodoListWidget = () => {
    const [todoNew, setTodoNew] = useState([]);
    const [isActives, setIsActives] = useState(false);
    const { data } = useQuery(GET_TODO_LIST);

    useEffect(() => {
        setTodoNew(data.todoList);
        setIsActives(data.isActive);
    }, [data]);

    const handleAddTodo = (label) => {
        const id = ids++;
        const todoList = {
            id: id,
            label: label
        };
        cache.writeQuery({
            query: SET_TODO_LIST,
            data: {
                todoList: [...todoNew, todoList]
            }
        });
    };
    const handleChangeAccess = () => {
        cache.writeQuery({
            query: SET_ACTIVE,
            data: {
                isActive: !isActives
            }
        });
    };
    const handleMouseLeave = (s) => {
        setTodoNew(s);
    };

    return (
        <div>
            <TodoListComponent todoData={todoNew} handleMouseLeave={handleMouseLeave} />
            {
                isActives
                    ? <FormAddTodo handleAddTodo={handleAddTodo} />
                    : <button onClick={handleChangeAccess}>Добавление невозможно</button>
            }
        </div>
    );
};

export default TodoListWidget;

import { gql } from '@apollo/client';
import cache from '../../graphql/cache';

export const GET_TODO_LIST = gql`    
    query getTodoList {
        todoList @client,
        isActive @client
    }
`;

export const SET_TODO_LIST = gql`    
    query setTodoList {
        todoList {
            id,
            label
        }
    }
`;

export const SET_ACTIVE = gql`    
    query setIsActive {
        isActive
    }
`;

cache.writeQuery({
    query: GET_TODO_LIST,
    data: {
        todoList: [{ label: 'drink', id: 5 }, { label: 'sleep', id: 6 }],
        isActive: false
    }
});

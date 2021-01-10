import { useState, useEffect } from 'react';
import style from './FormAddTodo.module.scss';
import PropTypes from 'prop-types';

const FormAddTodo = ({ handleAddTodo }) => {
    const [label, setLabel] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        handleAddTodo(label);
        setLabel('');
    };

    useEffect(() => {
        return () => setLabel('');
    }, []);

    return (
        <form className={style.formAdd} onSubmit={handleSubmit}>
            <input className={style.inputTodo} type="text" value={label} onChange={(e) => setLabel(e.target.value)}/>
            <button className={style.buttonTodo} type="submit" value={'Push'}>Add Todo</button>
        </form>

    );
};

FormAddTodo.propTypes = {
    handleAddTodo: PropTypes.func
};

export default FormAddTodo;

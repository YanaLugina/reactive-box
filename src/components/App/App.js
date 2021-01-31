import ThemeButton from '../ThemeButton';
import { useQuery } from '@apollo/client';
import { GET_DARK_MODE } from '../../graphql/reactivities/themeVariable';
import TodoListWidget from '../TodoListWidget';
import React from 'react';
import { NavLink, BrowserRouter, Route, Switch } from 'react-router-dom';
import MicroFrontend from '../../MicroFrontend';
import PropTypes from 'prop-types';
import '@yana4961/react-todo-list/dist/index.css';
import style from './App.module.scss';

const Home = () => (
    <>
        <p>
            Home page
        </p>
    </>
);

const CreateReactApp = ({ history, data }) => (
    <MicroFrontend
        history={history}
        host={'http://localhost:3001'}
        name="createreactapp"
        data={data}
    />
);

const newData = [
    { label: 'First Container', id: 1, done: false, important: true },
    { label: 'From MAIN domain', id: 3, done: true, important: true }
];

CreateReactApp.propTypes = {
    history: PropTypes.object,
    data: PropTypes.array
};

const App = () => {
    const { loading, error, data } = useQuery(GET_DARK_MODE);

    if (loading) {
        return (<>Loading... </>);
    }

    if (error) {
        return (<>Error... </>);
    }

    return (
        <div className={style.App + ' ' + (data.darkMode ? style.dark : style.white)}>
            <header className={style.AppHeader}>
                Mode
                <ThemeButton />
            </header>
            <TodoListWidget />
            <div className={style.microfrontends}>
                <BrowserRouter>
                    <h1>
                        Some micro frontends
                    </h1>
                    <ul>
                        <li>
                            <NavLink to="/home">Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/createreactapp">
                                Micro Frontend: Todo Example
                            </NavLink>
                        </li>
                    </ul>

                    <Switch>
                        <Route path="/home" component={Home} />
                        <Route path="/createreactapp" render={() => <CreateReactApp data={newData} />} />
                    </Switch>
                </BrowserRouter>
            </div>
        </div>
    );
};

export default App;

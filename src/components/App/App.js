import ThemeButton from '../ThemeButton';
import style from './App.module.scss';
import { useQuery } from '@apollo/client';
import { GET_DARK_MODE } from '../../graphql/reactivities/themeVariable';

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
        </div>
    );
};

export default App;

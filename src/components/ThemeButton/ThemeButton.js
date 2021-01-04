import style from './ThemeButton.module.scss';
import { Moon, Sun } from 'react-feather';
import { useQuery } from '@apollo/client';
import { GET_DARK_MODE, darkMode as reactiveDarkMode } from '../../graphql/reactivities/themeVariable';

const ThemeButton = () => {
    const { loading, error, data } = useQuery(GET_DARK_MODE);

    if (loading) {
        return (<>Loading... </>);
    }

    if (error) {
        return (<>Error... </>);
    }

    const toggleMode = () => {
        reactiveDarkMode(!data.darkMode);
    };

    return (
        <button className={style.ThemeButton + ' ' + (data.darkMode ? style.dark : style.white)} onClick={toggleMode}>
            {
                data.darkMode
                    ? <Sun />
                    : <Moon />
            }
            Change
        </button>
    );
};

export default ThemeButton;

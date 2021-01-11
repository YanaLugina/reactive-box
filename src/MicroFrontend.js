import React from 'react';
import PropTypes from 'prop-types';

class MicroFrontend extends React.Component {
    componentDidMount() {
        const { name, host, document } = this.props;
        const scriptId = `micro-frontend-script-${name}`;

        if (document.getElementById(scriptId)) {
            this.renderMicroFrontend();
            return;
        }

        fetch(`${host}/asset-manifest.json`)
            .then(res => res.json())
            .then(manifest => {
                console.log('manifest', manifest);
                const script = document.createElement('script');
                script.id = scriptId;
                script.crossOrigin = '';
                script.src = `${host}${manifest.files['main.js']}`;
                script.onload = this.renderMicroFrontend;
                document.head.appendChild(script);
            })
            .catch(e => {
                console.log(e);
            });
    }

    componentWillUnmount() {
        const { name, window } = this.props;

        window[`unmount${name}`] && window[`unmount${name}`](`${name}-container`);
    }

    renderMicroFrontend = () => {
        const { name, window, history } = this.props;

        window[`render${name}`] && window[`render${name}`](`${name}-container`, history);
    };

    render() {
        return <main id={`${this.props.name}-container`} />;
    }
}

MicroFrontend.defaultProps = {
    document,
    window
};

MicroFrontend.propTypes = {
    name: PropTypes.string,
    window: PropTypes.object,
    history: PropTypes.object,
    document: PropTypes.object,
    host: PropTypes.string
};

export default MicroFrontend;

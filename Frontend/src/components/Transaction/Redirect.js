import React from 'react';
import url from '../../assets/data/clientUrl';


class Redirect extends React.Component {
    constructor(props) {
        super(props);

    }
    componentDidMount = ()=>{

        window.location = `${url}Transaction${window.location.search}`
        // console.log(`${url}Transaction${window.location.search}`)
    }


    render() {
        return <p>Redirecting... Please wait!</p>;

    }
}

export default Redirect;
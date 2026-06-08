import React from 'react';
import Main from './Main';
import Left from './Left';
import Right from './Right';

class Content extends React.Component {
    render() {
        return (
            <div className="row">
                {/* Gọi left component */}
                <div className="col-md-3">
                    <Left />
                </div>
                {/* Gọi main component */}
                <div className="col-md-6">
                    <Main />
                </div>
                {/* Gọi right component */}
                <div className="col-md-3">
                    <Right />
                </div>
            </div>
        )
    }
}

export default Content;

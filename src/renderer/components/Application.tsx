import { hot } from 'react-hot-loader/root';
import * as React from 'react';
import './index.css';

import PopOver from './PopOver';

const contentStyle = {
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6
};

const Application = () => (
    <div className="app">
        <div className="top-popover">
            <PopOver position="top" height={12} />
        </div>
        <div className="content" style={contentStyle}>
            To do list
        </div>
    </div>
);

export default hot(Application);

import React from 'react';
import ReactDOM from 'react-dom/client';

const stream = ReactDOM.createRoot(
    document.getElementById('stream')
);



ReactDOM.render(
    <React.StrictMode>
        <p>Hello World</p>
    </React.StrictMode>,
    document.getElementById('stream')
);

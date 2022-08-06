import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//ルーティング用
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
// reportWebVitals();

// ↓↓けんた作業用==========================================================================
import React,{ useState } from "react";
import".index.css";

const  App = () => {
    const[text,setText] = useState("");

    const[addtext,setAddText] = useState("");

    const onClickAddText = () =>{
        setAddText(text);
        setText("");
    }

    return (
        <div className="App">
            <input
              value={text}
              onChange={(Event) => setText(Event.target.value)}
              />

            <button onClick={onClickAddText}>与える</button>

              <p>{text}</p>

              <p>今までの食べ物:{addText}</p>
        </div>
    );
};
 
export default App;


import React, { useState } from 'react';

const  App = () => {
    const[text,setText] = useState("")

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

              <p>今までの食べ物:{addtext}</p>
        </div>
    );
};
 
export default App;

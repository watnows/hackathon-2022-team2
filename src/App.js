import React, { useState } from 'react';

const  App = () => {
    const[text,setText] = useState("")

     const[addtext,setAddText] = useState([]);

    // const onClickAddText = () =>{
    //     setAddTexts(text);
    //     setText("");
    // }

    const [addtexts, setTexts] = useState([]);

    const addTexts = () => {
        setTexts([...addtexts, text])
    }

    return (
        <div className="App">
            <input
              value={text}
              onChange={(Event) => setText(Event.target.value)}
              />

            <button onClick={addTexts}>与える</button>

              <p>今までの食べ物:{addtexts}</p>
        </div>
    );
};
 
export default App;

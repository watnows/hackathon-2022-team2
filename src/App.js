import React, { useState } from 'react';

const  App = () => {
    const[text,setText] = useState("")

    const [addtexts, setTexts] = useState([]);

    const addTexts = () => {
        setTexts([text, ...addtexts])
    }
    const Pressenter = (e) =>{
        if(e.key === 'Enter'){
            setTexts([text, ...addtexts])
            setText("")
        }
    }


    return (
        <div className="App">
            <input
              value={text}
              onChange={(Event) => setText(Event.target.value)}
              onKeyPress={Pressenter}

              />

            <button onClick={addTexts}>与える</button>

              <p>今までの食べ物:</p>

              <ul>
                {addtexts.map((food,i)=> <li key={i}>{food}</li>)}
              </ul>
        </div>
    );
};
 
export default App;

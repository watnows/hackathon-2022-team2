import React, { useState } from 'react';

const  App = () => {
    const[text,setText] = useState("")
    const [addtexts, setTexts] = useState([]);

    // const post = () => {
    //     const requestOptions = {
    //     method: 'POST',
    //     headers:{'Content-Type': 'application/json'},
    //     body: JSON.stringify({food: text})
    //     };

    //     fetch("https://dry-temple-23156.herokuapp.com/calorie",requestOptions
    //     ).then((response)=> response.json()
    //     ).then((responseJson) =>{
    //         console.log(responseJson)
    //     })


    

    const addTexts = () => {
        const requestOptions = {
            method: 'POST',
            mode: 'cors',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({food: text})
        };
    
        fetch("https://dry-temple-23156.herokuapp.com/calorie",requestOptions
        ).then((response)=>{
            response.json()
            console.log(response)
            }
        ).then((responseJson) =>{
            console.log(responseJson)
        })
        
        // setTexts([String(this.response), ...addtexts])
        setTexts([[text, 1], ...addtexts])
    }

    const Pressenter = (e) =>{
        if(e.key === 'Enter'){
            addTexts()
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

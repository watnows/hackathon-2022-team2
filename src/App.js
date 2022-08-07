import React, { useState } from 'react';
 import pic from "./イラスト11.png"
 import "./App.css"


const  App = () => {
    const[text,setText] = useState("")
    const [addtexts, setTexts] = useState([]);
    const[sumcalorie,setsumcalorie] = useState(0)
    const[logo,setLogo] = useState("");

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
    const change = () => {
        setLogo();
    }

    

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
        setsumcalorie(sumcalorie+1)
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

                <p>摂取カロリー{sumcalorie}kcal</p>

              <p>今までの食べ物:</p>

              <ul>
                {addtexts.map((food,i)=> <li key={i}>{food}</li>)}
              </ul>
              <img className={'size'+ sumcalorie} src={pic} alt="picture"/>
        </div>
    );
};
 
export default App;

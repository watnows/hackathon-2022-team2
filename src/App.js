import React, { useState } from 'react';
 import pic from "./イラスト11.png"
 import "./App.css"

 const Header = () =>{
    return(
        <h3>ぼくまさし</h3>
    )
 }

 const Body = () =>{
    return(
        <div>
            <Display/>
            <Data/>
        </div>
    )
 }

 const Display = () =>{
    return(
        <div>

        </div>
    )
 }

 const Data = () =>{
    return(
        <div>

        </div>
    )
 }

const  App = () => {

    const[text,setText] = useState("")
    const [addtexts, setTexts] = useState([]);
    const[sumcalorie,setsumcalorie] = useState(0)


    const url = "https://dry-temple-23156.herokuapp.com/calorie"
    const getText = () => {
        const requestOptions = {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ food: text })
        };

        (async () => {
            try {
                const response = await fetch(url, requestOptions);
                const body = await response.json();
                console.log(body["calorie"])
                setTexts([[text, body["calorie"]], ...addtexts])
                setsumcalorie(sumcalorie + parseInt(body["calorie"]))
                // const responsejson: restaurantinfo[] = body["data"]

            }
            catch (err) {

            } finally {

            }
        })();


    };


    const Pressenter = (e) =>{
        if(e.key === 'Enter'){
            getText()
            setText("")
        
        }
    }

    return (
        <div className="App">
            <Header/>
            <Body/>
            <input
              value={text}
              onChange={(Event) => setText(Event.target.value)}
              onKeyPress={Pressenter}

              />

            <button onClick={getText}>与える</button>

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
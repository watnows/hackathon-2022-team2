import React, { useState } from 'react';
import pic from "./イラスト11.png"
import "./style/App.css"
import"./style/Header.css"
import"./style/Body.css"
import"./style/Data.css"
import"./style/Display.css"


const Header = () => {
    return (
        <div class = "component_header">
            <h3>ぼくまさし</h3>
        </div>
    )
}


const Body = () => {
    const [sumcalorie, setsumcalorie] = useState(0)
    // keep data here!!
    return (
            <div class = "component_body">
                <Display sumcalorie={ sumcalorie } />
                <Data sumcalorie={sumcalorie} setsumcalorie={ setsumcalorie } />
            </div>
    )
}

const Display = (props) => {
    return (
        <div class="component_display">
            <div class="img_display">
                <img className={'size' + Math.round(props.sumcalorie/1000)} src={pic} alt="syasin"/>
            </div>
        </div>
    )
}

const Data = (props) => {
    const url = "https://dry-temple-23156.herokuapp.com/calorie"
   
    const [text, setText] = useState("")
    const [addtexts, setTexts] = useState([""]);

    const requestOptions = {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ food: text })
    };

    const getText = () => {
        (async () => {
            try {
                console.log("いれたご飯", text)
                const response = await fetch(url, requestOptions);
                const body = await response.json();
                console.log(body["calorie"])
                setTexts([[text, body["calorie"]], ...addtexts])
                props.setsumcalorie(props.sumcalorie + parseInt(body["calorie"]))
                // const responsejson: restaurantinfo[] = body["data"]
            }
            catch (err) {
            } finally {
            }
        })();
    }
    const Pressenter = (e) => {
        if (e.key === 'Enter') {
            gotoheroku()
        }
    }
    const gotoheroku = () => {
        setText("")
        getText()
    }

    return (
        <div class = "component_data">
            <div className="App">
                <input
                    value={text}
                    onChange={(Event) => setText(Event.target.value)}
                    onKeyPress={Pressenter}
                />
                <button onClick={gotoheroku}>与える</button>

                <p>摂取カロリー{props.sumcalorie}kcal</p>

                <p>今までの食べ物:</p>

                <ul>
                    {addtexts.map((food, i) => <li key={i}>{food}</li>)}
                </ul>
                {/* <img className={'size'+ sumcalorie} src={pic} alt="picture"/> */}
            </div>
        </div>
    )

}

const App = () => {
    return (
        <div class = "component_app">
            <Header />
            <Body />
        </div>
    );
};

export default App;
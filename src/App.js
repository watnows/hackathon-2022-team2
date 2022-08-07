import React, { useState } from 'react';
import pic from "./イラスト11.png"
import "./App.css"

const Header = () => {
    return (
        <h3>ぼくまさし</h3>
    )
}


//foodstring 入力した食べ物
const Body = (foodstring) => {
    const url = "https://dry-temple-23156.herokuapp.com/calorie"
    const [sumcalorie, setsumcalorie] = useState(0)
    const [text, setText] = useState("")
    const [addtexts, setTexts] = useState([]);

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
    }

    // keep data here!!
    return (
        <div>
            <Display handlegettext={getText} sumcalorie={sumcalorie} text={text} />
            <Data settext={setText} />
        </div>
    )
}

const Display = () => {
    return (
        <div>
            <img className={'size1'} src={pic} alt="syasin" />
        </div>
    )
}

const Data = (props) => {
    const Pressenter = (e) => {
        if (e.key === 'Enter') {
            props.setText("")
        }
    }

    const [textarray, settextarray] = React.useState(props.addtexts)

    if (textarray.length === 0) {
        return (
            <div className="App">
                <input
                    value={props.text}
                    onChange={(Event) => props.setText(Event.target.value)}
                    onKeyPress={Pressenter}
                />
                <button onClick={props.handlegettext}>与える</button>

                <p>摂取カロリー{props.sumcalorie}kcal</p>

                <p>今までの食べ物:</p>

                <ul>
                    {textarray.map((food, i) => <li key={i}>{food}</li>)}
                </ul>
                {/* <img className={'size'+ sumcalorie} src={pic} alt="picture"/> */}
            </div>
        )
    } else {
        return (
            <div className="App">
                <input
                    value={props.text}
                    onChange={(Event) => props.setText(Event.target.value)}
                    onKeyPress={Pressenter}

                />

                <button onClick={props.handlegettext}>与える</button>

                <p>摂取カロリー{props.sumcalorie}kcal</p>

                <p>今までの食べ物:</p>

                {/* <ul>
                    {props.addtexts.map((food, i) => <li key={i}>{food}</li>)}
                </ul> */}
                {/* <img className={'size'+ sumcalorie} src={pic} alt="picture"/> */}
            </div>
        )
    }
}

const App = () => {
    return (
        <div>
            <Header />
            <Body />
        </div>
    );
};

export default App;
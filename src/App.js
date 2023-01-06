import React, { useState } from 'react';
import pic from "./mercy.png"
import "./style/App.css"
import"./style/Header.css"
import"./style/Body.css"
import"./style/Data.css"
import"./style/Display.css"
import"./style/loader.css"


const Header = () => {
    return (
        <div className = "component_header">
            <h3>ぼくまさし</h3>
        </div>
    )
}


const Body = () => {
    const [sumcalorie, setsumcalorie] = useState(0)
    // keep data here!!
    return (
        <div class = "component_body">
            {/* <div class="loader">Loading...</div> */}
            <div class = "center_body">
                <Display sumcalorie={ sumcalorie } />
                <Data sumcalorie={sumcalorie} setsumcalorie={ setsumcalorie } />
            </div>
        </div>
    )
}

const Display = (props) => {

    return (
        <div class="component_display">
            <div class="img_display">
                {/* <img style ={(150 + props.sumcalorie/1000)}px src={pic} alt="syasin"/> */}
                {/* <img className={'size' + Math.round(props.sumcalorie/1000)} width={150 + props.sumcalorie/1000} src={pic} alt="syasin"/> */}
                <img  width={270 + props.sumcalorie/100} height={400} src={pic} alt="syasin"/>
            </div>
        </div>
    )
}

const Data = (props) => {
    const url = "https://dry-temple-23156.herokuapp.com/calorie"
   
    const [text, setText] = useState("")
    const [addtexts, setTexts] = useState([]);
    const [loader_color, setload_color] = useState("transparent");
    const [first_load, setfirst_load] = useState(true);
    
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
                if(first_load === true){
                    return
                }
                console.log("this is not first load")
                const body = await response.json();
                console.log(body["calorie"])
                setTexts([[text, body["calorie"]], ...addtexts])
                props.setsumcalorie(props.sumcalorie + parseInt(body["calorie"]))
                setload_color("transparent")
                // const responsejson: restaurantinfo[] = body["data"]
            }
            catch (err) {
                setload_color("transparent")
            } finally {
                setload_color("transparent")
            }
        })();
    }

    const alternativeGetText = () => {
        if (text === "") {return}
        let alternativeCalorie = Math.floor(Math.random() * 10) !== 1 ?
            Math.floor(Math.random() * 1000) :
            Math.floor(Math.random() * 1000) * 5;
        addtexts.map((food) => {
            if (food[0] === text) {
                alternativeCalorie = food[1]
            }
        })
        setTexts([[text, alternativeCalorie], ...addtexts])
        props.setsumcalorie(props.sumcalorie + alternativeCalorie)
    }

    // startup heroku
    if(first_load === true){
        getText()
        console.log("this is first load")
        setfirst_load(false)
    }

    const Pressenter = (e) => {
        if (e.key === 'Enter') {
            gotoheroku()
        }
    }
    const gotoheroku = () => {
        if(text !== ""){
            setload_color("#8AC6D1")
        }
        // setload_color("#8AC6D1")
        // setload_color("#9c0505")
        setText("")
        getText()
        alternativeGetText()
    }

    return (
        <div class = "component_data">
            <div class="loader" style={{color:loader_color}}>Loading...</div>
            <div className="App">
                <input
                    value={text}
                    placeholder="食べ物を入力"
                    onChange={(Event) => setText(Event.target.value)}
                    onKeyPress={Pressenter}
                />
                <button onClick={gotoheroku}>与える</button>

                <p>総摂取カロリー{props.sumcalorie}kcal</p>

                <p>今日のごはん:</p>
            <div class="box">
                <div className='food_list'>
                    <ul>
                        {/* 全角スペースわざとです */}
                        {addtexts.map((food, i) => <li key={i}>{food[0]}　</li>)}
                    </ul>
                    <ul>
                        {/* 全角スペースわざとです */}
                        {addtexts.map((food, i) => <li key={i}>　{food[1]}kcal</li>)}
                    </ul>
                </div>
            </div>
                {/* <img className={'size'+ sumcalorie} src={pic} alt="picture"/> */}
            </div>
        </div>
    )
}

const App = () => {
    return (
        <div class = "component_app">
            <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0"></meta>
            <Header />
            <Body />
        </div>
    );
};

export default App;
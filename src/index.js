import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

const back = "fon.jpg"
const logo = "logo.png"
const hokage = "Минато Намикадзе"
const contact = "ул. Листовая, дом 5"
const phone = "89223334532"
const data = [
  { name: 'Sasuke', rank: 'Jonin', age: 25,},
  { name: 'Naruto', rank: 'Jonin', age: 25, },
  { name: 'Rock Lee', rank: 'Chunin', age: 26, },
];
const ninjaGuide= [
	{head: "Звания ниндзя",
			code: `Джонин - элитный, Чунин - средний, Генин - начинающий.`},
	{head: "Оплата",
			code: `Оплата ежемесячно 10000Y.`},
	{head: "Оружие",
			code: `В комплект входят кунаи и сюрикены. Дальше по званию.`}
]

function Full(){
	return(
		<>
			<Head logo={logo} />
			<Button />
			<Guide1 title="Надо знать:" list={ninjaGuide} />
			<div className='fortable'>
				Сортировка таблицы ниндзя:
				<Table data={data} />
			</div>
			<Foot hokage={hokage} phone={phone} />
		</>
	)
}

function Foot(props){
	return(
		<div className="foot">
						<p>Связь с хокаге {props.hokage}:</p>
						<p>Номер телефона: {props.phone}</p>
		</div>
)
}

function Guide1(props){
	const ninjaGuide = props.list.map((item, index) =>
        <Guide key={index} head={item.head} code={item.code} />

    );
    return (
        <div className="prof">
            <h2>{props.title} </h2>
            <ul>
                {ninjaGuide}
            </ul>
        </div>

    )
}

function Guide(props) {

	const [isOpen, setOpenClose] = React.useState(false);
	const press = () => {
			setOpenClose(!isOpen);
	}
	return(
			<li onClick={press}>
					<span className="left">{props.head}</span>
					<span className="right">{isOpen ? "<" : ">"}</span>
					{isOpen &&
							<code> {props.code} </code>
					}
			</li>
	)
}

const Table = ({ data }) => {
  const [sortColumn, setSortColumn] = useState(null);

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortColumn(null);
    } else {
      setSortColumn(column);
    }
  };
	
	let sortedData;
	if (sortColumn === 'age'){
		sortedData = sortColumn ? [...data].sort((a, b) => parseInt(a[sortColumn]) - parseInt(b[sortColumn])) : data;
	}
	else{
		sortedData = sortColumn ? [...data].sort((a, b) => a[sortColumn].localeCompare(b[sortColumn])) : data;
	}

  return (
    <div>
      <ul>
        {Object.keys(data[0]).map((column) => (
          <li key={column}>
            <input
              type="radio"
              name="sort"
              checked={sortColumn === column}
              onChange={() => handleSort(column)}
            />
            {column}
          </li>
        ))}
      </ul>
      <table>
        <thead>
          <tr>
            {Object.keys(data[0]).map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, index) => (
            <tr key={index}>
              {Object.values(row).map((value, index) => (
                <td key={index} id="1">{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

function Head(props){
	return(
		<div className='head'>
			<img src={props.logo} />
			<span className='name'>Меня зовут {hokage}, я приглашаю вас вступить в отряд ниндзя Листа</span>
		</div>
	)
}

function Anketa(){
	const [text, setText] = React.useState("");
	React.useEffect(() => {
			setText(text)
	})
	function changeText(event) {
			setText(event.target.value);
	}

	const [Tap, setButt] = React.useState(false);
	const click = () => {
		setButt(true);
};

	return(
		<>
		<div className='anketa'>
			<p>Привет, {text}!</p>
			Ваше имя: <input className="text" onChange={changeText}/>
			<br />
			Ваше звание: <select className='text'><option>Джонин</option><option>Чунин</option><option>Генин</option></select>
			<br />
			Сколько вам лет?: <input className="text" />
			<br />
			<button className='text' onClick={click}>Стать ниндзя!</button>
			{Tap &&<p>{text}, в скором времени вы будете добавлены в таблицу ниндзя.</p>}
		</div>
		</>
	)
}

function Button(){
	const [isPressed, setButton] = React.useState(true);
    const press = () => {
        setButton(!isPressed);
    };
    return(
        <>
            <div className="anketa">
                {!isPressed ? <Anketa /> : null}
                <br/>
                <input className="button" type="button" value={isPressed ? "Стань ниндзя вместе со мной!" : "Закрыть"} onClick={press} />
            </div>
        </>
    )
}

root.render(<Full />)

reportWebVitals();

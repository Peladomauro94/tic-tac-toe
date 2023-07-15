import { useState } from 'react'
import './App.css'

function App() {
  const [nextMove, setNextMove] = useState("X");
  const [squares, setSquares] = useState(["", "", "", "", "", "", "", "", ""]);
  const [info, setInfo] = useState("");
  const [winner, setWinner] = useState("")
  const [theme, setTheme] = useState('sun');

  const onNextMove = (position) => {
    if (squares[position] === "") {
      setInfo("");
      let currentSquare = squares;
      currentSquare[position] = nextMove;
      setSquares(currentSquare);
      nextMove === "X" ? setNextMove("O") : setNextMove("X");
      verificarGanadores();
    } else {
      setInfo("La celda ya tiene un valor");
    }
  };

  const verificarGanadores = () => {
    const ganadores = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    let hayGanador = false

    ganadores.forEach((ganador) => {

      const condition = 
        squares[ganador[0]]!== '' && 
        squares[ganador[0]] === squares[ganador[1]] && 
        squares[ganador[2]] === squares[ganador[0]];

      if(condition){
        const gano = squares[ganador[0]];
        setWinner(gano);
        setInfo('Ganador jugador: '+gano);
        setSquares(["", "", "", "", "", "", "", "", ""]);
        setNextMove("X");
        hayGanador = true;
        } 
    });

    if (!hayGanador && squares.every((square) => square !== "")) {
      setInfo("El juego terminó en empate.");
      setSquares(["", "", "", "", "", "", "", "", ""]);
      setNextMove("X");
    }
  };

  const handleButtonClick = () => {
    const newTheme = theme === 'sun' ? 'moon' : 'sun';
    setTheme(newTheme);
    if (newTheme == 'sun') {
      document.body.classList.remove('sun');
      document.body.classList.add('moon');
    }else{
      document.body.classList.remove('moon');
      document.body.classList.add('sun');
    };}


  return (

    <div className={`total ${theme}`}>
      
      <div className="game-div">
        <button className={`header-icon ${theme}`} onClick={handleButtonClick}>
          <img src={theme === 'sun' ? '/icon-moon.svg' : '/icon-sun.svg'}  alt="..."/>
        </button>

        <h2 className={theme}>Turno Actual: {nextMove} </h2>

       {  !info ? "" :  <h4 className={theme}>{info}</h4>} 

        <div className={`buttons-div ${theme}`}>
          <div className={`square ${theme} top-left`} onClick={()=>onNextMove(0)}>{squares[0]}</div>
          <div className={`square ${theme}`} onClick={()=>onNextMove(1)}>{squares[1]}</div>
          <div className={`square ${theme} top-right`} onClick={()=>onNextMove(2)}>{squares[2]}</div>
        </div>

        <div className={`buttons-div ${theme}`}>
          <div className={`square ${theme}`} onClick={()=>onNextMove(3)}>{squares[3]}</div>
          <div className={`square ${theme}`} onClick={()=>onNextMove(4)}>{squares[4]}</div>
          <div className={`square ${theme}`} onClick={()=>onNextMove(5)}>{squares[5]}</div>
        </div>

        <div className={`buttons-div ${theme}`}>
          <div className={`square ${theme} bottom-left`} onClick={()=>onNextMove(6)}>{squares[6]}</div>
          <div className={`square ${theme}`} onClick={()=>onNextMove(7)}>{squares[7]}</div>
          <div className={`square ${theme} bottom-right`} onClick={()=>onNextMove(8)}>{squares[8]}</div>
        </div>
      </div>
    </div>
      
  )
}

export default App

import React from "react";
import "./styles.css";

export default function App() {
  const App = () => {
    const [gameOver, setGameOver] = React.useState(false);
    const [lotteryNum, setLotteryNum] = React.useState(0);
    const [rightChoice, setRigthChoice] = React.useState(false);
    const [totalPoint, setTotalPoint] = React.useState(100);

    React.useEffect(() => {
      randomNumber();
    }, []);

    //Random Winner
    const randomNumber = () => {
      const winner = Math.floor(Math.random() * 6);
      setLotteryNum(winner);
    };

    //Restart Game
    const restartGame = () => {
      setTotalPoint(100);
      setGameOver(false);
    };

    //CallBack - Get Data
    const getResultFromChild = (result) => {
      if (result === true) {
        var newPoints = totalPoint;
        newPoints += 20;
        setTotalPoint(newPoints);
        setRigthChoice(true);
      } else {
        var newPoints = totalPoint;
        newPoints -= 20;
        if (newPoints === 0) {
          setGameOver(true);
          return;
        }
        setTotalPoint(newPoints);
        setRigthChoice(false);
      }
    };

    if (gameOver) {
      return (
        <div>
          <div style={style.gameOver}>
            <h1 style={{ color: "red", fontFamily: '"Langar", cursive' }}>
              Game <span style={{ color: "green" }}>Over</span>
            </h1>
            <p onClick={restartGame} style={{ cursor: "pointer" }}>
              RESTART
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="container">
        <div className="snow1"></div>
        <div className="snow2"></div>
        <div className="snow3"></div>

        <div className="row">
          <div className="game">
            <div style={style.game}>
              <Game
                lotteryNum={lotteryNum}
                sendResult={getResultFromChild}
                resetLotteryNum={randomNumber}
              />
            </div>
          </div>
          <div className="score">
            <div style={style.score}>
              <h3>Points: {totalPoint}</h3>
              <h3>{rightChoice ? "CORRECT" : "INCORRECT"}</h3>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const Game = ({ lotteryNum, sendResult, resetLotteryNum }) => {
    const [flipCard1, setFlipCard1] = React.useState(false);
    const [flipCard2, setFlipCard2] = React.useState(false);
    const [flipCard3, setFlipCard3] = React.useState(false);
    const [flipCard4, setFlipCard4] = React.useState(false);
    const [flipCard5, setFlipCard5] = React.useState(false);
    const [flipCard6, setFlipCard6] = React.useState(false);

    const hideCard = () => {
      setFlipCard1(false);
      setFlipCard2(false);
      setFlipCard3(false);
      setFlipCard4(false);
      setFlipCard5(false);
      setFlipCard6(false);
    };

    const revealAllCard = () => {
      setFlipCard1(true);
      setFlipCard2(true);
      setFlipCard3(true);
      setFlipCard4(true);
      setFlipCard5(true);
      setFlipCard6(true);
    };

    const onCArdClick = (toggle, index) => {
      toggle(true);
      if (lotteryNum === index) {
        sendResult(true);
      } else {
        sendResult(false);
      }

      setTimeout(() => {
        revealAllCard();
      }, 500);

      setTimeout(() => {
        hideCard();
      }, 1500);

      setTimeout(() => {
        resetLotteryNum();
      }, 2000);
    };

    return (
      <div>
        <h1 style={{ marginLeft: 20 }}>Lottery</h1>
        <div
          style={{
            display: "flex",
            height: 300,
            flexWrap: "wrap",
            justifyContent: "center"
          }}
        >
          {[
            [flipCard1, setFlipCard1],
            [flipCard2, setFlipCard2],
            [flipCard3, setFlipCard3],
            [flipCard4, setFlipCard4],
            [flipCard5, setFlipCard5],
            [flipCard6, setFlipCard6]
          ].map((item, index) => {
            return (
              <div style={{ width: 130 }}>
                <div class="card">
                  <div
                    class="content"
                    style={{
                      transform: item[0] ? "rotateY(180deg)" : "",
                      transition: item[0] ? "transform 0.5s" : ""
                    }}
                  >
                    <div
                      class="front"
                      onClick={() => onCArdClick(item[1], index)}
                    ></div>
                    <div class="back">{lotteryNum === index ? "💰" : "❌"}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const style = {
    game: {
      borderRadius: 10,
      padding: 20,
      marginTop: 20,
      display: "flex",
      alignItems: "center",
      background: "rgba(55, 155, 155, 0.4)",
      boxShadow: "0px 1px 3px 1px rgba(0,0,0,0.3)"
    },
    score: {
      borderRadius: 10,
      padding: 20,
      marginTop: 20,
      alignItems: "center",
      background: "rgba(55, 155, 155, 0.4)",
      boxShadow: "0px 1px 3px 1px rgba(0,0,0,0.3)"
    },
    gameOver: {
      width: 400,
      marginTop: 20,
      borderRadius: 10,
      boxShadow: "0px 1px 3px 1px rgba(0,0,0,0.3)",
      padding: 20,
      background: "rgba(255, 255, 255, 0.9)",
      textAlign: "centre",
      marginRight: "auto",
      marginLeft: "auto"
    }
  };
  return <App />;
}

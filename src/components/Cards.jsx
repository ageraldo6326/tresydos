import { useState } from 'react';
import '../stylesheets/Cards.css'
import { useEffect } from 'react';

function Cards() {
    let [cards,setCards] = useState([
        "10_of_clubs.png",
        "10_of_diamonds.png",
        "10_of_hearts.png",
        "10_of_spades.png",
        "2_of_clubs.png",
        "2_of_diamonds.png",
        "2_of_hearts.png",
        "2_of_spades.png",
        "3_of_clubs.png",
        "3_of_diamonds.png",
        "3_of_hearts.png",
        "3_of_spades.png",
        "4_of_clubs.png",
        "4_of_diamonds.png",
        "4_of_hearts.png",
        "4_of_spades.png",
        "5_of_clubs.png",
        "5_of_diamonds.png",
        "5_of_hearts.png",
        "5_of_spades.png",
        "6_of_clubs.png",
        "6_of_diamonds.png",
        "6_of_hearts.png",
        "6_of_spades.png",
        "7_of_clubs.png",
        "7_of_diamonds.png",
        "7_of_hearts.png",
        "7_of_spades.png",
        "8_of_clubs.png",
        "8_of_diamonds.png",
        "8_of_hearts.png",
        "8_of_spades.png",
        "9_of_clubs.png",
        "9_of_diamonds.png",
        "9_of_hearts.png",
        "9_of_spades.png",
        "ace_of_clubs.png",
        "ace_of_diamonds.png",
        "ace_of_hearts.png",
        "ace_of_spades.png",
        "ace_of_spades2.png",
        "black_joker.png",
        "jack_of_clubs.png",
        "jack_of_clubs2.png",
        "jack_of_diamonds.png",
        "jack_of_diamonds2.png",
        "jack_of_hearts.png",
        "jack_of_hearts2.png",
        "jack_of_spades.png",
        "jack_of_spades2.png",
        "king_of_clubs.png",
        "king_of_clubs2.png",
        "king_of_diamonds.png",
        "king_of_diamonds2.png",
        "king_of_hearts.png",
        "king_of_hearts2.png",
        "king_of_spades.png",
        "king_of_spades2.png",
        "queen_of_clubs.png",
        "queen_of_clubs2.png",
        "queen_of_diamonds.png",
        "queen_of_diamonds2.png",
        "queen_of_hearts.png",
        "queen_of_hearts2.png",
        "queen_of_spades.png",
        "queen_of_spades2.png",
        "red_joker.png"
    ]);

    let [removeButton,setRemoveButton] = useState(false)

    let [win,setWin] = useState(false)
    let [tomarCard,setTomarCard] = useState(false)

    useEffect(() => {
      setCards(cards.sort(() => Math.random() - 0.5))

      if (fiveCards.length==5) {
        setRemoveButton(false)
      }

    },)
		
		let [fiveCards,setFiveCards] = useState([])
    let [noTaked,setNoTaked] = useState([])

    function restarArreglo(arr1, arr2) {
      return arr1.filter((card) => !arr2.includes(card));
    }

    const tomar = () => {
      if(fiveCards.length==5) {
        setFiveCards( [...fiveCards,cards[0] ])
        setCards(restarArreglo(cards,cards[0])) 
        setRemoveButton(true); 
        console.log('No Taked')
        console.log(noTaked)
      }
    }

		const barajar = () => {
			let numeros = [];
      setWin(false)
      setTomarCard(true)
      tomarCard=true
      win=false
			for (let i = 0; i < 5; i++) {
					numeros.push(cards [ Math.floor(Math.random() * cards.length) ] ); 
			}

      // let boton = document.getElementById('repartir')

      // boton.textContent = "Reiniciar ✅"

      setCards(restarArreglo(cards,numeros))

			setFiveCards(numeros.sort())

		}


    function gameWin(arr) {
      const countMap = new Map();

      // Contar la frecuencia de la primera letra de cada elemento
      arr.forEach(str => {
          let firstLetter = str.charAt(0); // Obtener la primera letra
          countMap.set(firstLetter, (countMap.get(firstLetter) || 0) + 1);
      });
  
      // Obtener los valores de las frecuencias
      const counts = [...countMap.values()].sort((a, b) => b - a);
  
      // Verificar si hay un grupo de 3 iguales y otro de 2 iguales
      return counts.length === 2 && counts.includes(3) && counts.includes(2);
    }

    function eliminarElemento(arr, elemento) {
      return arr.filter(item => item !== elemento);
    }    

    const restarArregloFiveCards = (index) => {
  
      if(fiveCards.length==6) {
        let mano = eliminarElemento(fiveCards,fiveCards[index.n])

        console.log('five antes')
        console.log(fiveCards)
      
        console.log('Mano')
        console.log(mano)
        fiveCards = mano.sort()
        setFiveCards(mano.sort())

        console.log('five despues')
        console.log(fiveCards)        

        setNoTaked([...noTaked,fiveCards[index.n]])

        win = gameWin(mano)
        setWin(gameWin(mano))

        if (win) {
          console.log('gano 🏆')
          setTomarCard(false)
          tomarCard=false
        } else {
          console.log('Aun no, continua... 🃏')
        }

      }
      
    }


    return ( 
			<>
				<div>
          <h1>Juega 3 y 2</h1>
          <div>
            <button id='repartir' className='boton-barajar' onClick={barajar}>Repartir 🃏</button>
            <button className={tomarCard==true?'boton-tomar':'boton-tomar-apagado'} onClick={tomar}>Tomar</button>
          </div>
          {
              
              fiveCards?.map(
                (card,n) => (
                  <div className='contenedor-cartas' key={n}>
                    <div className='carta-boton' key={n}>
                      <img className={n==fiveCards.length-1&&fiveCards.length==6?"card-tomar":"card"}  src={'../src/cards/' + card} alt={card}/>
                      <br/>
                      {removeButton && <button className='boton-remove' onClick={() => restarArregloFiveCards({n})}>❌</button>}
                    </div>
                  </div>
                ) 
              )
              
          }
          {<div className='mensaje'>{win==true?"Ganaste 🏆":"Aun no ganas continua...😊"}</div>}
				</div>

				
			</>
     );
}

export default Cards;
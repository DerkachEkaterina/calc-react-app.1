import { useState } from 'react';

/*Хук useState - это функция, которая используется для хранения состояния в функциональном компоненте.
Он принимает аргумент как начальное значение состояния и возвращает массив с 2 элементами.
Первый элемент - это текущее значение состояния. Второй элемент - это функция обновления состояния.*/


function App() {
  const [calc, setCalc] = useState("");
  const [result, setResult] = useState("");


  const ops = ['/', '*', '+', '-', '.'];

  const updateCalc = value => {
    if(
        ops.includes(value) && calc === '' ||
        ops.includes(value) && ops.includes(calc.slice(-1))/*возвращает новый массив, содержащий копию части исходного массива.
        в данном случае вытянет последний элемент*/
    ){
      return;
    }

    setCalc(calc + value);

    if(!ops.includes(value)){
      setResult(eval(calc + value).toString());
    }

  }


  const createDigits = () => {
    const digits = [];

    for(let i = 1; i < 10; i++){
      digits.push(
          <button onClick={() => updateCalc(i.toString())} key={i}>{i}</button>
      )
    }
    return digits;
  }

  const deleteLast = () => {
    if(calc === ''){
      return;
    }

    const value = calc.slice(0, -1);
    setCalc(value);
  }

  const calculate = () => {
    setCalc(eval(calc).toString()); /*выполняет JavaScript-код, представленный строкой.*/
  }

  return (
    <div className="App">
      <div className="calculator">
        <div className="display">
          {result ? <span>({result})</span> : ''}&nbsp;
          /*это общий встроенный контейнер для фразового содержимого, который по своей сути ничего не представляет
          nbsp - это неразрывный пробел*/
          {calc || "0"}
        </div>
        <div className="operators">
          <button onClick={() => updateCalc('/')}>/</button>
          <button onClick={() => updateCalc('*')}>*</button>
          <button onClick={() => updateCalc('+')}>+</button>
          <button onClick={() => updateCalc('-')}>-</button>
          <button onClick={deleteLast}>DEL</button>
        </div>
        <div className="digits">
          {createDigits()}
          <button onClick={() => updateCalc('0')}>0</button>
          <button onClick={() => updateCalc('.')}>.</button>
          <button onClick={calculate}>=</button>
        </div>



      </div>

    </div>
  );
}

export default App;

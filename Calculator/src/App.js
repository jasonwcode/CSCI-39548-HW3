import React, { useState } from "react";
import Wrapper from "./components/Wrapper";
import Screen from "./components/Screen";
import ButtonBox from "./components/ButtonBox";
import Button from "./components/Button";

const btnValues = [
  ["Deg", "x!", "(", ")", "%", "AC"],
  ["sin", "ln", 7, 8, 9, "÷"],
  ["cos", "log", 4, 5, 6, "x"],
  ["tan", "√", 1, 2, 3, "-"],
  ["EXP", "x^y", 0, ".", "=", "+"],
];

const toLocaleString = (num) =>
  String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

const removeSpaces = (num) => num.toString().replace(/\s/g, "");

const App = () => {
  let [calc, setCalc] = useState({
    sign: "",
    num: 0,
    res: 0,
  });
  
  const numHandler = (e) => {
    e.preventDefault();
    const val = e.target.innerHTML;

    if (removeSpaces(calc.num).length < 16) {
      setCalc({
        ...calc,
        num:
          calc.num === 0 && val === "0"
            ? "0"
            : removeSpaces(calc.num) % 1 === 0
            ? toLocaleString(Number(removeSpaces(calc.num + val)))
            : toLocaleString(calc.num + val),
        res: !calc.sign ? 0 : calc.res,
      });
    }
  };

  const decHandler = (e) => {
    e.preventDefault();
    const val = e.target.innerHTML;
  
    setCalc({
      ...calc,
      num: !calc.num.toString().includes(".") ? calc.num + val : calc.num,
    });
  };

  const signHandler = (e) => {
    e.preventDefault();
    const val = e.target.innerHTML;
  
    setCalc({
      ...calc,
      sign: val,
      res: !calc.res && calc.num ? calc.num : calc.res,
      num: 0,
    });
  };

  const equalsHandler = () => {
    if (calc.sign && calc.num) {
      const math = (a, b, sign) =>
        sign === "+"
          ? a + b : 
          sign === "-"
          ? a - b: 
          sign === "x"
          ? a * b: 
          sign === "÷"
          ? a / b : 
          sign === "x^y"
          ? Math.pow(a, b) : 
          sign === "ln"
          ? Math.log(b) :
          Math.log10(b)
          
  
      setCalc({
        ...calc,
        res:
          calc.num === "0" && calc.sign === "/"
            ? "Can't divide with 0"
            : math(Number(calc.res), Number(calc.num), calc.sign),
        sign: "",
        num: 0,
      });
    }
  };

  const percentHandler = () => {
    let num = calc.num ? parseFloat(calc.num) : 0;
    let res = calc.res ? parseFloat(calc.res) : 0;
  
    setCalc({
      ...calc,
      num: (num /= 100),
      res: (res /= 100),
      sign: "",
    });
  };

  const resetHandler = () => {
    setCalc({
      ...calc,
      sign: "",
      num: 0,
      res: 0,
    });
  };

  const factorialHandler = () => {
    let n = calc.num
    let val = calc.num
    while (n > 1) {
      n--;
      val *= n
    }

    setCalc({
      sign: "",
      res: val,
      num: 0
    });
  }

  const trigHandler = (e) => {
    e.preventDefault();
    const val = e.target.innerHTML;
    
    let n = calc.num ? calc.num : calc.res
    setCalc({
      sign: "",
      res: val === "sin" ? Math.sin(n) :
        val === "cos" ? Math.cos(n) :
        Math.tan(n),
      num: 0
    });
  }

  const sqrtHandler = (e) => {
    e.preventDefault();
    const val = e.target.innerHTML;
    
    let n = calc.num ? calc.num : calc.res
    setCalc({
      sign: "",
      res: Math.sqrt(n),
      num: 0
    });
  }

  const expHandler = (e) => {
    e.preventDefault();
    const val = e.target.innerHTML;
    
    let n = calc.num ? calc.num : calc.res
    console.log(n)
    setCalc({
      sign: "",
      res: n.includes("e") ? Number(n).toLocaleString() : Number(n).toExponential(),
      num: 0
    });
  }

  const nHandler = () => {
    console.log("Fail")
  }

  return (
    <Wrapper>
      <Screen value={calc.num ? calc.num : calc.res} />
      <ButtonBox>
        {
          btnValues.flat().map((btn, i) => {
            return (
              <Button
                key={i}
                className={btn === "=" ? "equals" : ""}
                value={btn}
                onClick={
                  btn === "x!" ? factorialHandler :
                  btn === "%" ? percentHandler :
                  btn === "AC" ? resetHandler :
                  btn === "sin" || btn === "cos" || btn === "tan" ? trigHandler :
                  btn === "√" ? sqrtHandler :
                  btn === "EXP" ? expHandler :
                  btn === "÷" || btn === "x" || btn === "-" || btn === "+" || btn === "log" || btn === "ln" || btn === "x^y" ? signHandler :
                  btn === "." ? decHandler :
                  btn === "=" ? equalsHandler : 
                  btn === "(" || btn === ")" || btn === "Deg" ? nHandler :
                  numHandler
                }
              />
            );
          })
        }
      </ButtonBox>
    </Wrapper>
  );
};

export default App;
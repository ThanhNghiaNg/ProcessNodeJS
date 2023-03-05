import { useState } from "react";

const TestComponent = (props) => {
  const [amount, setAmount] = useState(0);
  const increaseAmountHandler = () => {
    setAmount((amount) => amount + 1);
  };
  return (
    <div>
      <p>{amount}</p>
      <button onClick={increaseAmountHandler}>Increase</button>
    </div>
  );
};

export default TestComponent;

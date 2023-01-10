import { useState } from "react";

const useInput = (initState) => {
  const [value, setValue] = useState(initState ? initState : "");
  const onChangeValue = (event) => {
    setValue(event.target.value);
  };
  const resetHandler = () => {
    setValue(initState ? initState : "");
  };

  return {
    value,
    onChangeValue,
    onReset: resetHandler,
  };
};

export default useInput;

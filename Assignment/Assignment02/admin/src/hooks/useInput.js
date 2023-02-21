import { useState } from "react";

function useInput(initValue) {
  const [value, setValue] = useState(initValue ? initValue : "");
  const onChangeValue = (event) => {
    setValue(event.target.value);
  };
  return { value, onChangeValue, setValue };
}

export default useInput;

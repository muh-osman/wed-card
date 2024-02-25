// useContext
import { createContext, useState } from "react";

export const TrigerContext = createContext();

export default function TrigerProvider(props) {
  const [triger, setTriger] = useState(0);

  return (
    <>
      <TrigerContext.Provider value={{ triger, setTriger }}>
        {props.children}
      </TrigerContext.Provider>
    </>
  );
}

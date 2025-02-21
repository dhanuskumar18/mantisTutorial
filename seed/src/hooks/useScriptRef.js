import { useEffect, useRef } from 'react';

// ==============================|| ELEMENT REFERENCE HOOKS ||============================== //

export default function useScriptRef() {
  const scripted = useRef(true);

  useEffect(() => {
    return () => {
      scripted.current = false; // ✅ Set to false only when component unmounts
    };
  }, []);

  return scripted;
}

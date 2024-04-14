import { useState } from "react";
import AboutPlace from "./AboutPlace";
import AddImages from "./AddImages";
import IntroAddPlace from "./IntroAddPlace";
import SetPrice from "./SetPrice";

export default function AddSpotPage() {
  const [index, setIndex] = useState(0);
  return (
    <>
      {index == 0 && <IntroAddPlace setIndex={setIndex} />}
      {index == 1 && <AboutPlace setIndex={setIndex} />}
      {index == 2 && <AddImages setIndex={setIndex} />}
      {index == 3 && <SetPrice setIndex={setIndex} />}
    </>
  );
}

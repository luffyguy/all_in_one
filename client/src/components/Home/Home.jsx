import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const Home = () => {
  const [id, setId] = useState("");

  useEffect(() => {
    setId(uuidv4());
  }, []);

  return (
    <>
      <h1>HOME</h1>
      <Link to={`/room/${id}`}>
        <button>Create a Room</button>
      </Link>
    </>
  );
};

export default Home;

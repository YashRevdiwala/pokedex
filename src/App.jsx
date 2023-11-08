/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import PokeCard from "./components/PokeCard";
import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "./components/Loader";
import { FaSearch } from "react-icons/fa";

const BookList = () => {
  const [pokemon, setPokemon] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchItem, setSearchItem] = useState("");

  const pokeData = async () => {
    await axios
      .get(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=21`)
      .then((data) => {
        // console.log(data.data.results)
        setPokemon(data.data.results);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(true);
      });
  };

  useEffect(() => {
    pokeData();
  }, [offset]);

  const nextPage = () => {
    setLoading(true);
    setOffset(offset + 21);
  };

  return loading ? (
    <Loader />
  ) : (
    <>
      <h1 className="text-3xl font-bold underline">PokeDex v1</h1>
      <div className="flex justify-center pt-5 ">
        <input
          type="text"
          placeholder="Search Pokemon..."
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
          className="border-2 px-1 rounded"
        />
        <FaSearch className="mt-1 w-10" />
      </div>
      <div className="pokelist">
        {pokemon
          .filter((item) => {
            return searchItem === ""
              ? item
              : item.name.toLowerCase().includes(searchItem);
          })
          .map((data, index) => {
            return <PokeCard {...data} key={index} number={index} />;
          })}
      </div>
      <button type="button" className="btn" onClick={nextPage}>
        Next
      </button>
    </>
  );
};

export default BookList;

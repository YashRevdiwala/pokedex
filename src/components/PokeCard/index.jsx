/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react"
import axios from "axios"
import Loader from "../Loader"

const PokeCard = (props) => {
  const [pokeId, setPokeId] = useState(0)
  const [loading, setLoading] = useState(true)
  // console.log(props.sprites)

  const pokemonData = async () => {
    await axios
      .get(props.url)
      .then((data) => {
        setPokeId(
          `https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${data.data.id}.svg`
        )
        setLoading(false)
      })
      .catch((error) => {
        setLoading(true)
        setPokeId("")
      })
  }
  pokemonData()

  return loading ? (
    <Loader />
  ) : (
    <article className="bg-white rounded-2xl p-4 relative text-center">
      <img
        src={pokeId}
        alt={props.name}
        className="w-full aspect-video object-contain"
      />
      <h2 className="mt-4 font-bold text-base">{props.name.toUpperCase()}</h2>
      <h4 className="text-xs font-bold text-gray-600 mt-2">{props.url}</h4>
    </article>
  )
}

export default PokeCard

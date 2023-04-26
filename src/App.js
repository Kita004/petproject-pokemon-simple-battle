import "./App.css";
import React, { useState, useEffect } from "react";

import LocationPage from "./LocationPage";
import EncounterPage from "./EncounterPage";
import { getRandom } from "./utils";

function App() {
    const [locations, setLocations] = useState();
    const [area, setArea] = useState();
    const [isBattle, setIsBattle] = useState(false);
    const [wildPokemon, setWildPokemon] = useState();
    const [myPokemons, setMyPokemons] = useState([]);

    useEffect(() => {
        // fetch locations
        const fetchLocations = async () => {
            const locations = await (
                await fetch(
                    " https://pokeapi.co/api/v2/location?offset=17&limit=9"
                )
            ).json();
            setLocations(locations.results);
        };

        // fetch my starter pokemons
        const fetchMyPokemons = async () => {
            // set myPokemons to empty array so that it wont be populated twice (?)
            setMyPokemons([]);

            const myPokemonNums = await (
                await fetch("http://localhost:3500/storage")
            ).json();

            // console.log("NUMS: ", myPokemonNums);

            let arr = [];
            for (let num of myPokemonNums) {
                const myPoke = await (
                    await fetch(`https://pokeapi.co/api/v2/pokemon/${num}`)
                ).json();

                // console.log("myPOKE: ", myPoke);

                arr.push(myPoke);
                setMyPokemons(arr);
            }
        };

        fetchLocations();
        fetchMyPokemons();
    }, []);

    useEffect(() => {
        const fetchRandomPokemon = async () => {
            // fetch details of chosen Area
            const chosenArea = await (await fetch(area)).json();
            // console.log("Chosen Area", chosenArea);

            // get Wild Pokemons from Chosen Area
            const wildPokemons = chosenArea.pokemon_encounters;
            // console.log("Wild Pokemons", wildPokemons);

            // get URL from Random Pokemon
            const randomPokemonURL =
                wildPokemons[getRandom(wildPokemons.length)].pokemon.url;
            // console.log("Random URL", randomPokemonURL);

            // fetch Detail of Random Pokemon
            const res = await (await fetch(randomPokemonURL)).json();
            const wildEncounter = {
                name: res.name,
                img: res.sprites.front_default,
                type: res.types[0].type.name,
                hp: res.stats[0].base_stat,
                ...(res.stats[1].base_stat > res.stats[3].base_stat
                    ? { ap: res.stats[1].base_stat }
                    : { ap: res.stats[3].base_stat }),
                ...(res.stats[2].base_stat > res.stats[4].base_stat
                    ? { dp: res.stats[2].base_stat }
                    : { dp: res.stats[4].base_stat }),
            };

            setWildPokemon(wildEncounter);
            // console.log("Wild Encounter", wildEncounter);
        };
        fetchRandomPokemon();
    }, [area]);

    return (
        <div className="App bg">
            {!isBattle ? (
                <LocationPage
                    locations={locations}
                    setIsBattle={setIsBattle}
                    setArea={setArea}
                />
            ) : (
                <EncounterPage
                    wildPokemon={wildPokemon}
                    myPokemons={myPokemons}
                    setIsBattle={setIsBattle}
                />
            )}
        </div>
    );
}

export default App;

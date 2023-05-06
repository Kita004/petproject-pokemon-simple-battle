import "./App.css";
import React, { useState, useEffect } from "react";

import LocationPage from "./LocationPage";
import EncounterPage from "./EncounterPage";
import Storage from "./Storage";

import { getRandom } from "./utils";

function App() {
    const [locations, setLocations] = useState();
    const [area, setArea] = useState();
    const [isEncounter, setIsEncounter] = useState(false);
    const [count, setCount] = useState(0);
    const [wildPokemon, setWildPokemon] = useState();
    const [myPokemons, setMyPokemons] = useState([]);
    const [activePokemon, setActivePokemon] = useState(null);

    const [attacker, setAttacker] = useState();

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

            let arr = [];
            for (let num of myPokemonNums) {
                const res = await (
                    await fetch(`https://pokeapi.co/api/v2/pokemon/${num}`)
                ).json();

                const myPoke = buildSimplifiedPokemon(res);

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

            // get Wild Pokemons from Chosen Area
            const wildPokemons = chosenArea.pokemon_encounters;

            // get URL from Random Pokemon
            const randomPokemonURL =
                wildPokemons[getRandom(wildPokemons.length)].pokemon.url;

            // fetch Detail of Random Pokemon
            const res = await (await fetch(randomPokemonURL)).json();
            const wildEncounter = buildSimplifiedPokemon(res);

            setWildPokemon(wildEncounter);
        };
        fetchRandomPokemon();
    }, [area]);

    useEffect(() => {
        handleBattle();
    }, [count]);

    const buildSimplifiedPokemon = (pokemon) => {
        return {
            name: pokemon.name,
            img: pokemon.sprites.front_default,
            type: pokemon.types[0].type.name,
            hp: pokemon.stats[0].base_stat,
            // Is Attack or Special Attack bigger? Return it
            ...(pokemon.stats[1].base_stat > pokemon.stats[3].base_stat
                ? { ap: pokemon.stats[1].base_stat }
                : { ap: pokemon.stats[3].base_stat }),
            // Is Defense or Special Defense bigger? Return it
            ...(pokemon.stats[2].base_stat > pokemon.stats[4].base_stat
                ? { dp: pokemon.stats[2].base_stat }
                : { dp: pokemon.stats[4].base_stat }),
            sp: pokemon.stats[5].base_stat,
        };
    };

    // needs a new state to check rounds not ActivePokmemon? only run useEffect when needed
    const handleBattle = () => {
        // check if we chose a fighter
        if (activePokemon) {
            // set who attacks first
            setAttacker(
                activePokemon.sp >= wildPokemon.sp
                    ? "activePokemon"
                    : "wildPokemon"
            );

            console.log("SET attacker: ", attacker);

            // fight logic
            if (activePokemon.hp > 0 && wildPokemon.hp > 0) {
                if (attacker == "activePokemon") {
                    setWildPokemon({
                        ...wildPokemon,
                        hp: wildPokemon.hp - 10,
                    });
                    console.log("Wild HP: ", wildPokemon.hp);
                } else {
                    setActivePokemon({
                        ...activePokemon,
                        hp: activePokemon.hp - 10,
                    });
                    console.log("Active HP: ", activePokemon.hp);
                }
                setCount((prev) => prev + 1);

                // Switch attacker
                setAttacker(
                    attacker == "activePokemon"
                        ? "wildPokemon"
                        : "activePokemon"
                );
            } else {
                console.log("Stop fight logic!!");
            }
        } else {
            console.info("First mount, when Active pokemon is NULL");
        }
    };

    return (
        <div className="App bg">
            {!isEncounter ? (
                <LocationPage
                    locations={locations}
                    setIsEncounter={setIsEncounter}
                    setArea={setArea}
                />
            ) : (
                <EncounterPage
                    setIsEncounter={setIsEncounter}
                    wildPokemon={wildPokemon}
                    activePokemon={activePokemon}
                    setActivePokemon={setActivePokemon}
                    storage={
                        <Storage
                            myPokemons={myPokemons}
                            setActivePokemon={setActivePokemon}
                            setCount={setCount}
                            handleBattle={handleBattle}
                        />
                    }
                />
            )}
        </div>
    );
}
export default App;

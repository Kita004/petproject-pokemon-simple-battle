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
    const [catchLoading, setCatchLoading] = useState(false);

    const [attacker, setAttacker] = useState();

    useEffect(() => {
        // fetch locations
        fetchLocations();
        // fetch my starter pokemons
        fetchMyPokemons();
    }, [isEncounter]);

    useEffect(() => {
        fetchRandomPokemon();
    }, [area]);

    useEffect(() => {
        handleBattle();
    }, [count]);

    const fetchLocations = async () => {
        const locations = await (
            await fetch(" https://pokeapi.co/api/v2/location?offset=17&limit=9")
        ).json();
        setLocations(locations.results);
    };

    const fetchMyPokemons = async () => {
        // set myPokemons to empty array so that it wont be populated twice
        setMyPokemons([]);

        const myPokemonNums = await (
            await fetch("http://localhost:3500/storage")
        ).json();

        let arr = [];
        let id = 0;
        for (let poke of myPokemonNums) {
            const res = await (
                await fetch(`https://pokeapi.co/api/v2/pokemon/${poke.id}`)
            ).json();

            const myPoke = buildSimplifiedPokemon(res, id);

            arr.push(myPoke);

            id++;
        }
        setMyPokemons(arr);
    };

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
        const wildEncounter = await buildSimplifiedPokemon(res);

        setWildPokemon(wildEncounter);
    };

    const buildSimplifiedPokemon = (pokemon, id) => {
        return {
            ...(id != null ? { id: id } : { id: pokemon.id }),
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
            isDefeated: false,
        };
    };

    const onActivePokemonSelected = (index) => {
        setActivePokemon(myPokemons[index]);
        setCount((prev) => prev + 1);
    };

    const onLocationSelected = (randomArea) => {
        setArea(randomArea);
        setIsEncounter(true);
    };

    // map through pokes, change isDefeated
    const setIsDefeated = (id = null) => {
        let updatedArr;
        if (id != null) {
            updatedArr = myPokemons.map((poke) => {
                if (poke.id == id) {
                    return { ...poke, isDefeated: true };
                }
                return poke;
            });
            // if there is no ID, reset all isDefeated
        } else {
            updatedArr = myPokemons.map((poke) => {
                return { ...poke, isDefeated: false };
            });
        }
        setMyPokemons(updatedArr);
    };

    const handleHpReduction = (attacker, defender, setDefenderHP) => {
        const dmg = Math.floor((attacker.ap / defender.dp) * 10);

        setDefenderHP({
            ...defender,
            hp: defender.hp - dmg,
        });
    };

    const handleBattle = () => {
        // check if we chose a fighter
        if (activePokemon) {
            // set who attacks first
            setAttacker(
                activePokemon.sp >= wildPokemon.sp
                    ? "activePokemon"
                    : "wildPokemon"
            );

            // fight logic
            if (activePokemon.hp > 0 && wildPokemon.hp > 0) {
                if (attacker == "activePokemon") {
                    // your pokemon attacks
                    handleHpReduction(
                        activePokemon,
                        wildPokemon,
                        setWildPokemon
                    );
                    console.info("Wild HP: ", wildPokemon.hp);
                } else {
                    // wild pokemon attacks
                    handleHpReduction(
                        wildPokemon,
                        activePokemon,
                        setActivePokemon
                    );
                    console.info("Active HP: ", activePokemon.hp);
                }

                // Switch attacker
                setAttacker(
                    attacker == "activePokemon"
                        ? "wildPokemon"
                        : "activePokemon"
                );

                // delay between rounds
                setTimeout(() => {
                    setCount((prev) => prev + 1);
                }, 500);
            }

            // if activePokemon lost >> isDefeated = true, button is disabled + CSS
            if (activePokemon.hp <= 0) {
                setIsDefeated(activePokemon.id);
            }
        } else {
            console.info("First mount, when Active pokemon is NULL");
        }
    };

    const addPokemonToDB = async (id) => {
        const postOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id,
            }),
        };

        await fetch("http://localhost:3500/storage", postOptions);
        console.info("New Pokemon has been Added!");
    };

    const handleCatch = async (id) => {
        addPokemonToDB(id);
        setCatchLoading(true);
        // this should be refactored, it is only here to show result on frontend
        // fetch new pokemon data
        const res = await (
            await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        ).json();

        // build simplified version and add it to team
        const newPokemon = buildSimplifiedPokemon(res, myPokemons.length);
        setMyPokemons((prev) => [...prev, newPokemon]);

        // reset states, go back to LocationPage
        setTimeout(() => {
            resetStates();
        }, 1500);
    };

    const resetStates = () => {
        setIsEncounter(false);

        setActivePokemon(null);
        setIsDefeated();

        setWildPokemon(null);

        setCatchLoading(false);
    };

    return (
        <div className="App bg">
            {!isEncounter ? (
                <LocationPage
                    locations={locations}
                    onLocationSelected={onLocationSelected}
                />
            ) : (
                <EncounterPage
                    wildPokemon={wildPokemon}
                    activePokemon={activePokemon}
                    handleCatch={handleCatch}
                    resetStates={resetStates}
                    catchLoading={catchLoading}
                    storage={
                        <Storage
                            myPokemons={myPokemons}
                            onActivePokemonSelected={onActivePokemonSelected}
                            handleBattle={handleBattle}
                        />
                    }
                />
            )}
        </div>
    );
}
export default App;

import React, { useState } from "react";
import PokemonCard from "./PokemonCard";
import Storage from "./Storage";

const EncounterPage = ({ wildPokemon, myPokemons, setIsBattle }) => {
    const [activePokemon, setActivePokemon] = useState(null);

    return (
        <div className="container">
            <div className="encounter">
                <PokemonCard pokemon={activePokemon} />
                <PokemonCard pokemon={wildPokemon} />
            </div>
            <Storage
                myPokemons={myPokemons}
                setActivePokemon={setActivePokemon}
            />
            <button className="action" onClick={(e) => setIsBattle(false)}>
                FLEE
            </button>
        </div>
    );
};

export default EncounterPage;

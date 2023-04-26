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
            <div className="btn-container">
                {wildPokemon.hp <= 0 ? (
                    <button className="action">CATCH</button>
                ) : (
                    <></>
                )}
                <button className="action" onClick={(e) => setIsBattle(false)}>
                    FLEE
                </button>
            </div>

            <Storage
                myPokemons={myPokemons}
                setActivePokemon={setActivePokemon}
            />
        </div>
    );
};

export default EncounterPage;

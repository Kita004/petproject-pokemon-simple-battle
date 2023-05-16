import React from "react";

const Storage = ({ myPokemons, onActivePokemonSelected }) => {
    return (
        <>
            {myPokemons ? (
                <div className="storage">
                    {myPokemons.map((poke) => {
                        return (
                            <button
                                key={poke.id}
                                onClick={() => onActivePokemonSelected(poke.id)}
                                disabled={poke.isDefeated}
                            >
                                <img
                                    className={
                                        poke.isDefeated ? "defeated" : ""
                                    }
                                    src={poke.img}
                                    alt={poke.name}
                                />
                            </button>
                        );
                    })}
                </div>
            ) : (
                <p>NOPE</p>
            )}
        </>
    );
};

export default Storage;

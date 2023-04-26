import React from "react";

const Storage = ({ myPokemons, setActivePokemon }) => {
    const handleSelect = (e) => {
        const index = e.currentTarget.value;
        setActivePokemon(myPokemons[index]);
    };

    return (
        <>
            {myPokemons ? (
                <div className="storage">
                    {myPokemons.map((poke) => {
                        return (
                            <button
                                onClick={(e) => handleSelect(e)}
                                value={myPokemons.indexOf(poke)}
                            >
                                <img
                                    src={poke.sprites.front_default}
                                    alt="..."
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

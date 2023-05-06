import React from "react";

const Storage = ({ myPokemons, setActivePokemon, setCount, handleBattle }) => {
    const handleSelect = (e) => {
        const index = e.currentTarget.value;
        setActivePokemon(myPokemons[index]);
        setCount((prev) => prev + 1);
        // handleBattle();
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
                                <img src={poke.img} alt="..." />
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

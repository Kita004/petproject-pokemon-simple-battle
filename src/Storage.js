import React from "react";

const Storage = ({ myPokemons, setActivePokemon, setCount }) => {
    const handleSelect = (e) => {
        const index = e.currentTarget.value;
        setActivePokemon(myPokemons[index]);
        setCount((prev) => prev + 1);
    };

    return (
        <>
            {myPokemons ? (
                <div className="storage">
                    {myPokemons.map((poke) => {
                        return (
                            <button
                                onClick={(e) => handleSelect(e)}
                                value={poke.id}
                                disabled={poke.isDefeated}
                            >
                                <img
                                    className={
                                        poke.isDefeated ? "defeated" : ""
                                    }
                                    src={poke.img}
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

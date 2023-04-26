import React from "react";

const PokemonCard = ({ pokemon }) => {
    const unknown = {
        name: "unknown",
        types: [{ type: { name: "unknown" } }],
        stats: [],
        img: "https://archives.bulbagarden.net/media/upload/d/dc/Spr_3r_Egg.png",
    };

    const type = pokemon ? pokemon.types[0].type.name : "unknown";
    return (
        <>
            {pokemon ? (
                <div className={"pokemon-card bg-" + type}>
                    <h1>{pokemon.name}</h1>
                    <img src={pokemon.sprites.front_default} alt="..." />
                    <table>
                        <tbody>
                            {pokemon.stats.map((stat) => {
                                return (
                                    <tr>
                                        <td>{stat.stat.name}</td>
                                        <td>{stat.base_stat} </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className={"pokemon-card bg-" + type}>
                    <h1>{unknown.name}</h1>
                    <img src={unknown.img} alt="..." />
                    <table>
                        <tbody>
                            {unknown.stats.map((stat) => {
                                return (
                                    <tr>
                                        <td>{stat.stat.name}</td>
                                        <td>{stat.base_stat} </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
};

export default PokemonCard;

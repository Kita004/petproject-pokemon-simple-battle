import React from "react";

const PokemonCard = ({ pokemon }) => {
    const unknown = {
        name: "unknown",
        types: [{ type: { name: "unknown" } }],
        stats: [],
        img: "https://archives.bulbagarden.net/media/upload/d/dc/Spr_3r_Egg.png",
    };

    const type = pokemon ? pokemon.type : "unknown";
    return (
        <>
            {pokemon ? (
                <div className={"pokemon-card bg-" + type}>
                    <h1>{pokemon.name}</h1>
                    <img src={pokemon.img} alt="..." />
                    <table>
                        <tbody>
                            <tr>
                                <td>HP</td>
                                <td>{pokemon.hp}</td>
                            </tr>
                            <tr>
                                <td>AP</td>
                                <td>{pokemon.ap}</td>
                            </tr>
                            <tr>
                                <td>DP</td>
                                <td>{pokemon.dp}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className={"pokemon-card bg-" + type}>
                    <h1>{unknown.name}</h1>
                    <img src={unknown.img} alt="..." />
                </div>
            )}
        </>
    );
};

export default PokemonCard;

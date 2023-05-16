import React from "react";

const DefaultPokemonCard = () => {
    const defaultPokemon = {
        name: "???",
        type: "unknown",
        stats: [],
        img: "http://localhost:3000/Spr_3r_Egg.png",
    };
    return (
        <div className={"pokemon-card bg-" + defaultPokemon.type}>
            <h1>{defaultPokemon.name}</h1>
            <img src={defaultPokemon.img} alt="..." />
            <table>
                <tbody>
                    <tr>
                        <td>HP</td>
                        <td>{defaultPokemon.hp}</td>
                    </tr>
                    <tr>
                        <td>AP</td>
                        <td>{defaultPokemon.ap}</td>
                    </tr>
                    <tr>
                        <td>DP</td>
                        <td>{defaultPokemon.dp}</td>
                    </tr>
                    <tr>
                        <td>SP</td>
                        <td>{defaultPokemon.sp}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default DefaultPokemonCard;

import React from "react";

const PokemonCard = ({ pokemon }) => {
    return (
        <div className={"pokemon-card bg-" + pokemon.type}>
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
                    <tr>
                        <td>SP</td>
                        <td>{pokemon.sp}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default PokemonCard;

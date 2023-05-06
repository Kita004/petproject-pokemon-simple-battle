import PokemonCard from "./PokemonCard";

const EncounterPage = ({
    storage,
    wildPokemon,
    activePokemon,
    setIsEncounter,
    setActivePokemon,
}) => {
    const resetStates = () => {
        setIsEncounter(false);
        setActivePokemon(null);
    };

    return (
        <div className="container">
            <div className="encounter">
                <PokemonCard pokemon={activePokemon} />
                <PokemonCard pokemon={wildPokemon} />
            </div>
            <div className="btn-container">
                {wildPokemon?.hp <= 0 ? (
                    <button className="action">CATCH</button>
                ) : (
                    <></>
                )}
                <button className="action" onClick={(e) => resetStates()}>
                    FLEE
                </button>
            </div>
            {storage}
        </div>
    );
};

export default EncounterPage;

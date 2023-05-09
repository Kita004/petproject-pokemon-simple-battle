import PokemonCard from "./PokemonCard";

const EncounterPage = ({
    storage,
    wildPokemon,
    activePokemon,
    setIsEncounter,
    setActivePokemon,
    setWildPokemon,
    setIsDefeated,
    handleCatch,
    resetStates,
}) => {
    return (
        <div className="container">
            <div className="encounter">
                <PokemonCard pokemon={activePokemon} />
                <PokemonCard pokemon={wildPokemon} />
            </div>
            <div className="btn-container">
                {wildPokemon?.hp <= 0 ? (
                    <button
                        className="action"
                        value={wildPokemon.id}
                        onClick={(e) => {
                            handleCatch(e.currentTarget.value);
                            e.currentTarget.disabled = true;
                        }}
                    >
                        CATCH
                    </button>
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

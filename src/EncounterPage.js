import PokemonCard from "./PokemonCard";
import DefaultPokemonCard from "./DefaultPokemonCard";

const EncounterPage = ({
    storage,
    wildPokemon,
    activePokemon,
    handleCatch,
    resetStates,
    catchLoading,
}) => {
    return (
        <div className="container">
            <div className="encounter">
                {/* ide default Cardot rendereljen, ha nincs pokemon c activepokemon */}
                {!activePokemon && !wildPokemon ? (
                    <>
                        <DefaultPokemonCard />
                        <DefaultPokemonCard />
                    </>
                ) : activePokemon ? (
                    <>
                        <PokemonCard pokemon={activePokemon} />
                        <PokemonCard pokemon={wildPokemon} />
                    </>
                ) : (
                    <>
                        <DefaultPokemonCard />
                        <PokemonCard pokemon={wildPokemon} />
                    </>
                )}
            </div>
            <div className="btn-container">
                {wildPokemon?.hp <= 0 ? (
                    <button
                        disabled={catchLoading}
                        className="action"
                        onClick={() => {
                            handleCatch(wildPokemon.id);
                        }}
                    >
                        CATCH
                    </button>
                ) : (
                    <></>
                )}
                <button className="action" onClick={() => resetStates()}>
                    FLEE
                </button>
            </div>
            {storage}
        </div>
    );
};

export default EncounterPage;

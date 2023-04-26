import React from "react";
import { getRandom } from "./utils";

const LocationPage = ({ locations, setArea, setIsBattle }) => {
    const handleClick = async (e) => {
        const url = e.currentTarget.value;
        const res = await (await fetch(url)).json();
        const randomArea = res.areas[getRandom(res.areas.length)].url;
        setArea(randomArea);
        setIsBattle(true);
    };

    return (
        <div>
            {locations ? (
                <div className="container">
                    {locations.map((location) => {
                        return (
                            <button
                                className="city"
                                value={location.url}
                                onClick={(e) => handleClick(e)}
                            >
                                {location.name}
                            </button>
                        );
                    })}
                </div>
            ) : (
                <p>No Location Found!</p>
            )}
        </div>
    );
};

export default LocationPage;

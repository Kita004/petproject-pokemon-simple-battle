import React from "react";
import { getRandom } from "./utils";

const LocationPage = ({ locations, onLocationSelected }) => {
    const handleLocationSelection = async (url) => {
        const res = await (await fetch(url)).json();
        const randomArea = res.areas[getRandom(res.areas.length)].url;

        onLocationSelected(randomArea);
    };

    return (
        <div>
            {locations ? (
                <div className="container">
                    {locations.map((location) => {
                        return (
                            <button
                                className="city"
                                onClick={() =>
                                    handleLocationSelection(location.url)
                                }
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

import { atom, useAtom } from "jotai";
import { useEffect } from "react";
import { persistState, getPersistedState } from "../../utils";
import { PERSISTOR_KEYS } from "../../variables";

const locationAtom = atom(getPersistedState(PERSISTOR_KEYS.location) ?? "/");

const useLocation = () => {
    const [path, setPath] = useAtom(locationAtom);

    useEffect(() => persistState(PERSISTOR_KEYS.location, path), [path]);

    return {
        path, setPath
    };
};

export {
    useLocation
};
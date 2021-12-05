import request from "../../api";
import { useMutation, useQuery } from 'react-query';
import { atom, useAtom } from "jotai";
import { useSnackbar } from 'notistack';
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { persistState, getPersistedState } from "../../utils";
import { PERSISTOR_KEYS } from "../../variables";

const emitTicket = () => {
    const { enqueueSnackbar } = useSnackbar();
    const {
        data,
        mutate: emit,
        isLoading,
        error
    } = useMutation(
        (payload) => request.ticket.createTicket(payload),
        {
            onSuccess: data => {
                if (data.status) {
                    enqueueSnackbar('Se ha Emitido la boleta', { variant: 'success' });
                }
            }
        }
    );
    return {
        isLoading,
        error,
        emit,
        data
    };
};

export {
    emitTicket
};
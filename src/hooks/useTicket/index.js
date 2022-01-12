import request from "../../api";
import { useMutation } from 'react-query';
import { useSnackbar } from 'notistack';

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
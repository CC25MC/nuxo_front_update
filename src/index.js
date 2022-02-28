import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { QueryClientProvider, QueryClient } from 'react-query';
import { Provider as ProviderJotai } from 'jotai';

const queryClient = new QueryClient();

ReactDOM.render(
    <QueryClientProvider client={queryClient}>
        <ProviderJotai>
            <App />
        </ProviderJotai>
    </QueryClientProvider>, document.getElementById('root'))

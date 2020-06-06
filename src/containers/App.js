import React from 'react'
import './App.css'
import Routes from '../routes/Routes'
import Layout from '../includes/Layout'
import { GlobalProvider } from '../context/GlobalState'
import { Helmet } from 'react-helmet';

const App = () => {
    return (
        <GlobalProvider>
            <main className="app">
                <Helmet>
                    <style>{'body { background-color: #FFD836 !important; }'}</style>
                </Helmet>
                <Layout>
                    <Routes />
                </Layout>
            </main>
        </GlobalProvider>
    )
}

export default App

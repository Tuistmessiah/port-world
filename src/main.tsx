import React from 'react';
import ReactDOM from 'react-dom/client';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import { App, endpoints } from './app.container.tsx';
import { Landing } from './pages/landing/landing.page.tsx';

import './main.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <RecoilRoot>
                <App>
                    <Routes>
                        {endpoints().map(({ path, page }) => (
                            <Route path={path} element={page} />
                        ))}
                        <Route path="/" element={<Landing />} />
                    </Routes>
                </App>
            </RecoilRoot>
        </BrowserRouter>
    </React.StrictMode>
);

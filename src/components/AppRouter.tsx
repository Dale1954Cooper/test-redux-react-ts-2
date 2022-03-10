import React, {FC} from 'react';
import {Routes, Route} from "react-router-dom";

import {useTypedSelector} from "../hooks/useTypedSelector";

import Login from '../pages/Login'
import Event from "../pages/Event";

const AppRouter: FC = () => {
    const {isAuth} = useTypedSelector(state => state.auth);

    return (
        <Routes>
            {isAuth ?
                <Route path='/' element={<Event/>}/>
                :
                <Route path='/login' element={<Login/>}/>
            }
        </Routes>
    )
};

export default AppRouter;

/*
        return (
            <Routes>
                {isAuth ?
                    privateRoutes.map(rout =>
                        <Route key={rout.path}
                               path={rout.path}
                               element={rout.component}
                        />
                    )
                    :
                    publicRoutes.map(rout =>
                        <Route key={rout.path}
                               path={rout.path}
                               element={rout.component}
                        />
                    )
                }
            </Routes>
        );
      */ // don't work
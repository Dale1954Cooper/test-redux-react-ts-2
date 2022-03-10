import React, {FC} from 'react';
import {Layout, Menu} from "antd";
import {useNavigate} from "react-router-dom";

import {RouteNames} from "../routes/routes";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useActions} from "../hooks/useActions";

const Navbar: FC = () => {
    const {isAuth} = useTypedSelector(state => state.auth);
    const navigate = useNavigate();
    const {logout} = useActions();

    return (
        <Layout.Header>
            {isAuth ?
                <Menu theme='dark' mode='horizontal' selectable={false}>
                    <Menu.Item onClick={() => logout()} key={1}>
                        Logout
                    </Menu.Item>
                </Menu>
                :
                <Menu theme='dark' mode='horizontal' selectable={false}>
                    <Menu.Item onClick={() => navigate(RouteNames.LOGIN)} key={1}>
                        Login
                    </Menu.Item>
                </Menu>
            }
        </Layout.Header>
    );
};

export default Navbar;
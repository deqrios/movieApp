import React from "react";
import { Menu } from "antd";
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

// => home버튼과 favorite버튼을 그려주는 컴포넌트
function LeftMenu(props) {
    return (
        <Menu mode={props.mode}>
            <Menu.Item key="mail">
                <a href="/">Home</a>
            </Menu.Item>
            <Menu.Item key="favorite">
                <a href="/favorite">Favorite</a>
            </Menu.Item>
        </Menu>
    );
}

export default LeftMenu;

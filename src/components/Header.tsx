import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Header.css';

const Header : React.FC = ()=> {
    return (
        <header>
            <h1>求人検索アプリ</h1>
            <nav className="Link">
                <Link to="/">求人一覧</Link>
                <Link to="/post-job">求人投稿</Link>
            </nav>
        </header>
    );
};

export default Header;
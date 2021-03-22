import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

import './scss/app.scss';
import HomeIcon from '@material-ui/icons/Home';
import DevicesIcon from '@material-ui/icons/Devices';
import InfoIcon from '@material-ui/icons/Info';
import Home from './Home/Home'
import acerBrand from './assets/AcerFullBrand.png'

import SideNav, { Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';

function App() {

    const navTextStyle = {padding: '0px 0px 0px 45px'};

    return (
        <div>
        <header className="header">
            <span className="header-languagesetting">Language : </span>

            <select>
                <option key="enus" value="enus">English (US)</option>
                <option key="tc" value="tc">繁體中文</option>
            </select>
        </header>

        <Router >
            <Route render={({ location, history }) => (
                <React.Fragment>
                    <SideNav
                        className="sidenav"
                        onSelect={(selected) => {
                            const to = '/' + selected;
                            if (location.pathname !== to) {
                                history.push(to);
                            }
                        }}
                    >
                        <div>
                            <img className="sidenav-brand" src={acerBrand} alt="acer care center lite"/>
                        </div>

                        <Nav className="sidenav-nav" defaultSelected="home">

                            <NavItem className="sidenav-nav-navitem" eventKey="home">
                                <NavIcon style={{float: 'left'}}>
                                    <HomeIcon className="navicon"/>
                                </NavIcon>
                                <NavText style={navTextStyle}>
                                    Home
                                </NavText>
                            </NavItem>

                            <NavItem className="sidenav-nav-navitem" eventKey="devices">
                                <NavIcon style={{float: 'left'}}>
                                    <DevicesIcon className="navicon"/>
                                </NavIcon>
                                <NavText style={navTextStyle}>
                                    Devices
                                </NavText>
                            </NavItem>

                            <NavItem className="sidenav-nav-navitem" eventKey="others">
                                <NavIcon style={{float: 'left'}}>
                                    <InfoIcon className="navicon"/>
                                </NavIcon>
                                <NavText style={navTextStyle}>
                                    Others
                                </NavText>
                            </NavItem>
                        </Nav>
                    </SideNav>
                    <main className="main">
                        <Redirect from="/" to="/home" exact />
                        <Route path="/home" exact component={props => <Home/>} />
                        <Route path="/device" component={props => null} />
                        <Route path="/others" component={props => null} />
                    </main>
                </React.Fragment>
            )}
            />
        </Router>
        </div>
    );
}
export default App;

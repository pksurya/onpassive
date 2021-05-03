import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Header from '../components/header/header';
import Sidebar from '../components/sidebar/sidebar.jsx';
import Footer from '../components/footer/footer';
import ThemeRoutes from '../routes/routing.jsx';
import AddExternal from '../../external';
import { useSelector } from 'react-redux';
import { RootState } from '../../../reducers';
declare var $: any;
const Fulllayout = (props: any) => {

    //check if not logined
    let history = useHistory();
    const auth = useSelector((state: RootState) => state.auth);
    if (!auth.logined) {
        history.push("/");
    }


    /*--------------------------------------------------------------------------------*/
    /*Change the layout settings [HEADER,SIDEBAR && DARK LAYOUT] from here            */
    /*--------------------------------------------------------------------------------*/
    const [width, setWidth] = useState(window.innerWidth);

    props.history.listen((location: any, action: any) => {
        let a: any = document.getElementById('main-wrapper');
        if (
            window.innerWidth < 767 &&
            a.className.indexOf('show-sidebar') !== -1
        ) {
            a.classList.toggle('show-sidebar');
        }
    });


    /*--------------------------------------------------------------------------------*/
    /*Function that handles sidebar, changes when resizing App                        */
    /*--------------------------------------------------------------------------------*/
    useEffect(() => {
        const updateDimensions = () => {
            let element: any = document.getElementById('main-wrapper');
            setWidth(window.innerWidth)
            if (width < 1170) {
                element.setAttribute("data-sidebartype", "mini-sidebar");
                element.classList.add("mini-sidebar");
            } else {
                element.setAttribute("data-sidebartype", "full");
                element.classList.remove("mini-sidebar");
            }
        }
        if (document.readyState === "complete") {
            updateDimensions();
        }
        window.addEventListener("resize", updateDimensions.bind(this));
        window.addEventListener("load", updateDimensions.bind(this));
        return () => {
            window.removeEventListener("load", updateDimensions.bind(this));
            window.removeEventListener("resize", updateDimensions.bind(this));
        };
        $("body").css('overflow', "scroll !important");
    }, [width]);

    /*--------------------------------------------------------------------------------*/
    /* Theme Setting && Layout Options wiil be Change From Here                       */
    /*--------------------------------------------------------------------------------*/
    return (
        <>
            {auth.logined &&
                <div
                    id="main-wrapper"
                    data-theme="light"
                    data-layout="vertical"
                    data-sidebartype="full"
                    data-sidebar-position="fixed"
                    data-header-position="fixed"
                    data-boxed-layout="full"
                >
                    <AddExternal />
                    {/*--------------------------------------------------------------------------------*/}
                    {/* Header                                                                         */}
                    {/*--------------------------------------------------------------------------------*/}
                    <Header />
                    {/*--------------------------------------------------------------------------------*/}
                    {/* Sidebar                                                                        */}
                    {/*--------------------------------------------------------------------------------*/}
                    <Sidebar {...props} routes={ThemeRoutes} />
                    {/*--------------------------------------------------------------------------------*/}
                    {/* Page Main-Content                                                              */}
                    {/*--------------------------------------------------------------------------------*/}
                    <div className="page-wrapper d-block">
                        <div className="page-content container-fluid">
                            <Switch>
                                {ThemeRoutes.map((prop, key) => {
                                    if (prop.redirect) {
                                        return <Redirect from={prop.path} to={prop.pathTo} key={key} />;
                                    }
                                    else {
                                        return (
                                            <Route path={prop.path} component={prop.component} key={key} />
                                        );
                                    }
                                })}
                            </Switch>
                        </div>
                        <Footer />
                    </div>
                </div>
            }
        </>
    );
}
export default Fulllayout;

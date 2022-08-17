import {connect} from "react-redux";
import {Navbar} from "./Navbar";
import {NavBarStateType} from "../../Redux/navbar-reduser";
import {AppStateType} from "../../Redux/redux-store";
import {Dispatch} from "redux";

type mapStateToPropsType = {
    navbarPage: NavBarStateType
}
type mapDispatchToPropsType = {}
export type NavBarPropsType = mapStateToPropsType & mapDispatchToPropsType
let mapStateToProps = (state: AppStateType): mapStateToPropsType => {
    return {
        navbarPage: state.navbarPage
    }
}
let mapDispatchToProps = (dispatch: Dispatch): mapDispatchToPropsType => {
    return {}
}
export const NavbarContainer = connect(mapStateToProps, mapDispatchToProps)(Navbar);
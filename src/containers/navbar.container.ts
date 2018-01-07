import { connect } from 'react-redux';
import NavBarComponent from '../components/navBar/navBarComponent';
import { fetchMenu, selectMenuItem } from '../actions/menu.actions';
import { MenuItem } from '../models/menuItem';
import { toggleNavbar } from '../actions/navbar.actions';

const mapStateToProps = (state: any) => {
  return {
    menuItems: state.navbar.menu.menuItems,
    collapsed: state.navbar.collapsed,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchMenu: () => {
      dispatch(fetchMenu());
    },
    selectMenuItem: (item: MenuItem) => {
      dispatch(selectMenuItem(item));
    },
    toggleNavbar: () => {
      dispatch(toggleNavbar());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBarComponent);
import * as React from 'react';
import { signOut } from '@firebase/auth';
import { useHistory } from 'react-router';
import { deleteIdUserAction } from '../../redux/creatorsActions/creatorsActions';
import { deleteUserNameAction } from '../../redux/creatorsActions/creatorsActions';
import { Button } from '../../styledComponents/StyledComponents';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { auth } from '../../firebase/InitialFirebase';

export default function Header () {

    
  const history = useHistory();
  const dispatch = useDispatch();

    const logOut = () => {
        signOut(auth);
        dispatch(deleteUserNameAction());
        dispatch(deleteIdUserAction());
        history.push('/');
      };
    return (
        <>
            <Button><NavLink className='button' to='/'>My Account</NavLink></Button>
            <Button><NavLink className='button' to='/history'>History</NavLink></Button>
            <Button><NavLink className='button' to='/editor'>Editor</NavLink></Button>
            <Button onClick={logOut}>Sign Out</Button>
        </>
    );
}

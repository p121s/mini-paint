import * as React from 'react';
import { Div, Body, Button } from './styledComponents/StyledComponents';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { Route, Switch, NavLink } from 'react-router-dom';
import LogIn from './components/pages/LogInPage';
import Registration from './components/pages/RegistrationPage';
import Account from './components/pages/Account';
import HistoryPage from './components/pages/HistoryPage';
import Editor from './components/pages/Editor';
import { auth } from './firebase/InitialFirebase';
import { signOut } from '@firebase/auth';
import { useHistory } from 'react-router';
import { SET_NAME, SET_ID_USER } from './constants/actionsConctants';
import './App.css';

function App() {

  const history = useHistory();
  const dispatch = useDispatch();
  const name = useSelector((state: RootStateOrAny) => state.reduce.name);

  const logOut = () => {
    signOut(auth);
    dispatch({type: SET_NAME, payload: ""});
    dispatch({type: SET_ID_USER, payload: ""});
    history.push('/');
  };

  return (
    <>
        <Switch>
          {name === '' ? (
            <Body>
              <Div>
                  <Route path='/' exact component={LogIn} />
                  <Route path='/register' component={Registration} />
              </Div>
            </Body>
          ) : (
              <>
                  <NavLink to='/'><Button>My Account</Button></NavLink>
                  <NavLink to='/history'><Button>History</Button></NavLink>
                  <NavLink to='/editor'><Button>Editor</Button></NavLink>
                  <Button onClick={logOut}>Sign Out</Button>
                  <Route path='/' exact component={Account} />
                  <Route path='/history' component={HistoryPage} />
                  <Route path='/editor' component={Editor} />
              </>
          )}
        </Switch>
    </>
  );
}

export default App;

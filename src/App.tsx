import * as React from 'react';
import { useEffect } from 'react';
import { Div, Body, Button } from './styledComponents/StyledComponents';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { Route, Switch, NavLink } from 'react-router-dom';
import LogIn from './components/pages/LogInPage';
import Registration from './components/pages/RegistrationPage';
import Account from './components/pages/Account';
import HistoryPage from './components/pages/HistoryPage';
import Editor from './components/pages/Editor';
import { signOut } from '@firebase/auth';
import { useHistory } from 'react-router';
import { deleteIdUserAction } from './redux/creatorsActions/deleteIsUserAction';
import { deleteUserNameAction } from './redux/creatorsActions/deleteUserNameAction';
import { DivPage } from './styledComponents/blocks/DivPage';
import { DivNavigation } from './styledComponents/blocks/DivNavigation';
import { DivContent } from './styledComponents/blocks/DivContent';
import { onAuthStateChanged } from "firebase/auth";
import { getDoc, doc } from '@firebase/firestore';
import { auth, database } from './firebase/InitialFirebase';
import { setUserNameAction } from './redux/creatorsActions/setUserNameAction';
import { setIdUserAction } from './redux/creatorsActions/setIdUserAction';
import './App.css';

function App() {

  const history = useHistory();
  const dispatch = useDispatch();
  const name = useSelector((state: RootStateOrAny) => state.reduce.name);

  useEffect(() => {
    onAuthStateChanged(auth, (user: any) => {
      if (user) {
        const uid = user.uid;
        getDoc(doc(database, 'users', `${uid}`))
            .then(responce => responce!.data()!.userName)
            .then(name => {
        dispatch(setUserNameAction(`${name}`));
        })
        dispatch(setIdUserAction(uid));
        }
    });
  }, [dispatch])

  const logOut = () => {
    signOut(auth);
    dispatch(deleteUserNameAction());
    dispatch(deleteIdUserAction());
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
              <DivPage>
                  <DivNavigation>
                      <Button><NavLink className='button' to='/'>My Account</NavLink></Button>
                      <Button><NavLink className='button' to='/history'>History</NavLink></Button>
                      <Button><NavLink className='button' to='/editor'>Editor</NavLink></Button>
                      <Button onClick={logOut}>Sign Out</Button>
                  </DivNavigation>
                  <DivContent>
                      <Route path='/' exact component={Account} />
                      <Route path='/history' component={HistoryPage} />
                      <Route path='/editor' component={Editor} />
                  </DivContent>
              </DivPage>
          )}
        </Switch>
    </>
  );
}

export default App;

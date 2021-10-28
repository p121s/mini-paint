import * as React from 'react';
import { useEffect } from 'react';
import { Div, Body } from './styledComponents/StyledComponents';
import { Route, Switch } from 'react-router-dom';
import LogIn from './components/pages/LogInPage';
import Registration from './components/pages/RegistrationPage';
import Account from './components/pages/Account';
import HistoryPage from './components/pages/HistoryPage';
import Editor from './components/pages/Editor';
import { DivPage } from './styledComponents/blocks/DivPage';
import { DivNavigation } from './styledComponents/blocks/DivNavigation';
import { DivContent } from './styledComponents/blocks/DivContent';
import { onAuthStateChanged } from "firebase/auth";
import { getDoc, doc } from '@firebase/firestore';
import { auth, database } from './firebase/InitialFirebase';
import { setUserNameAction } from './redux/creatorsActions/creatorsActions';
import { setIdUserAction } from './redux/creatorsActions/creatorsActions';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import './App.css';
import Header from './components/header/Header';

function App() {

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

  return (
    <>
        <Switch>
          {name ? (
              <DivPage>
                  <DivNavigation>
                      <Header />
                  </DivNavigation>
                  <DivContent>
                      <Route path='/' exact component={Account} />
                      <Route path='/history' component={HistoryPage} />
                      <Route path='/editor' component={Editor} />
                  </DivContent>
              </DivPage>
          ) : (
            <Body>
              <Div>
                  <Route path='/' exact component={LogIn} />
                  <Route path='/register' component={Registration} />
              </Div>
            </Body>
          )}
        </Switch>
    </>
  );
}

export default App;

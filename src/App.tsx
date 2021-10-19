import * as React from 'react';
// import { useState, useEffect } from 'react';
import { Div, Body, Button } from './styledComponents/StyledComponents';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import LogIn from './components/pages/LogInPage';
import Registration from './components/pages/RegistrationPage';
import Account from './components/pages/Account';
import HistoryPage from './components/pages/HistoryPage';
import Editor from './components/pages/Editor';
import { auth } from './firebase/InitialFirebase';
import { signOut } from '@firebase/auth';
import { useHistory } from 'react-router';

// const body: HTMLElement = document.getElementsByTagName('body')[0];
// body = document.documentElement.clientHeight;
// console.log(body);

function App() {

  // const [nameNew, setName] = useState();
  const history = useHistory();
  const dispatch = useDispatch();
  const name = useSelector((state: RootStateOrAny) => state.redus.name);

  // useEffect(() => {
  //   setName(name);
  // }, [name])

  // console.log(name);

  // const handleChange = ({target: {value}}: any) => {
  //   setName(value);
  // };

  // const changeName = () => {
  //   dispatch({type: "SET_NAME", payload: nameNew});
  // };

  const logOut = () => {
    signOut(auth);
    dispatch({type: "SET_NAME", payload: ""});
    dispatch({type: "SET_ID_USER", payload: ""});
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

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
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import Header from './components/header/Header';
import { checkingUserAuthorization } from './redux/asyncActions/asuncActions';
import './App.css';

function App() {

  const dispatch = useDispatch();
  const name = useSelector((state: RootStateOrAny) => state.reduce.name);

  useEffect(() => {
    dispatch(checkingUserAuthorization());
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
                      <Route component={Account}>
                        <Route path='/' exact component={Account} />
                        <Route path='/history' component={HistoryPage} />
                        <Route path='/editor' component={Editor} />
                      </Route>
                  </DivContent>
              </DivPage>
          ) : (
            <Body>
              <Div>
                  <Route component={LogIn}>
                    <Route path='/' exact component={LogIn} />
                    <Route path='/register' component={Registration} />
                  </Route>
              </Div>
            </Body>
          )}
        </Switch>
    </>
  );
}

export default App;

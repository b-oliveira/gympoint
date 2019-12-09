import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';
import Plan from '~/pages/Plan';
import PlanForm from '~/pages/Plan/Form';
import Subscription from '~/pages/Subscription';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/plan" component={Plan} isPrivate />
      <Route path="/teste" component={PlanForm} isPrivate />
      <Route path="/subscription" component={Subscription} isPrivate />
    </Switch>
  );
}

import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';
import Plan from '~/pages/Plan';
import PlanForm from '~/pages/Plan/Form';
import Subscription from '~/pages/Subscription';
import SubscriptionForm from '~/pages/Subscription/Form';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/plans" exact component={Plan} isPrivate />
      <Route path="/plans/:id/edit" component={PlanForm} isPrivate />
      <Route path="/plans/new" component={PlanForm} isPrivate />

      <Route path="/subscriptions" exact component={Subscription} isPrivate />
      <Route
        path="/subscriptions/:id/edit"
        component={SubscriptionForm}
        isPrivate
      />
      <Route path="/subscriptions/new" component={SubscriptionForm} isPrivate />
    </Switch>
  );
}

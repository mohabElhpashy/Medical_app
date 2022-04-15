import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import True_View from "./True_View";
import Add_true_view from './Forms/Add_TRue_View/index'
import edit_true_view from './Forms/Edit_true_view/index'

const Project = ({ match }) => {
  return (
    <Switch>
      <Route path={`${match.url}/ListofTrue_View`} component={True_View} />
      <Route path={`${match.url}/AddTRUE_VIEW`} component={Add_true_view} />
      <Route path={`${match.url}/edit_true_view`} component={edit_true_view} />


     
    </Switch>
  );
};

export default Project;
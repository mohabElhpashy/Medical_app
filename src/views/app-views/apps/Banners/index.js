import { Route, Switch, Redirect } from "react-router-dom";
import React from "react";
import Banners_Media from "./Banners_Media";
import AddBannerMedia from './forms/Banners_Media/AddForm/Index'
import EditForm from './forms/Banners_Media/EditForm/index'
import TargetType from './TargetType'
import AddtargetType from './forms/Banners_Media/AddForm/Index'
import EditTargettype from './forms/Banners_Media/EditForm/index'
import Banner from "./Banner";
import AddBanners from '../Banners/forms/Banners/AddForm/Index'
import EditBanners from './forms/Banners/EditForm/Index'
import Add_Service_Provider from  '../Banners/forms/Targettype/AddForm/Index';
import Delev from './Delev'

export default function index({ match }) {
  return (
    <Switch>
      {/* banners_media */}
           <Route path={`${match.url}/BannersMedia`} component={Banners_Media} />
           <Route path={`${match.url}/Addservice`} component={AddtargetType} />
           <Route path={`${match.url}/edit_service_ReadForm`} component={EditTargettype} />
    {/* targetType */}
           <Route path={`${match.url}/targetType`} component={TargetType} />
           <Route path={`${match.url}/AddserviceProvider`} component={Add_Service_Provider} />
           {/* <Route path={`${match.url}/edit_target_ReadForm`} component={EditTargettype} /> */} 

    {/* BANNER */}
    <Route path={`${match.url}/Banner`} component={Banner} />
    <Route path={`${match.url}/AddCategories`} component={AddBanners} />
    <Route path={`${match.url}/edit_Categories_ReadForm`} component={EditBanners} />


 {/* Delev */}
 <Route path={`${match.url}/Delev`} component={Delev} />
    {/* <Route path={`${match.url}/AddCategories`} component={AddBanners} />
    <Route path={`${match.url}/edit_Categories_ReadForm`} component={EditBanners} /> */}






    </Switch>
  );
}

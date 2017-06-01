import React from 'react';
import aaaa from './aaaa';
import Layout from '../../components/Layout';

const aaaaAction = async function (context) {
  return {
    title: '',
    component: <Layout><Hotel {...context} /></Layout>,
  };
};

export default [{
  //simple route
  path: '/',
  action: aaaaAction,
}, {
  //async route
  path: '/',
  async action(context) {
    return aaaaAction({
      ...context,
      params: {
      },
    });
  },
}];

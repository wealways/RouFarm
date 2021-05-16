// RootNavigation.js

import * as React from 'react';

export const isReadRef = React.createRef();

export const navigationRef = React.createRef();


// reset 설정
export function reset(state) {
  // 마운트가 되면 작동
  if (isReadRef.current && navigationRef.current) {
    navigationRef.current?.reset(state);
  }
};
export function navigate(name, params) {
  if (isReadRef.current && navigationRef.current) {
    navigationRef.current?.navigate(name, params);
  }
}
import React, { createContext, PropsWithChildren, useState } from 'react';

export const AuthContext = createContext({
  isAuth: false,
  setAuth: (value: boolean) => {},
});

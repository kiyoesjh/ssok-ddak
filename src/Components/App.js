// import React, { useEffect, useReducer, useState } from 'react';
// import AppRouter from 'components/Router';
// // import { authService } from 'fbase';
// import { ThemeProvider } from 'styled-components';
// import GlobalStyles from 'styles/GlobalStyles';
// import theme from 'styles/theme';
// import RootWrap from './RootWrap';
// import themeReducer from 'reducer/themeReducer';
// import Context from 'context';

// function App() {
//   const [init, setInit] = useState(false);
//   const [userObject, setUserObject] = useState(null);
//   const [state, dispatch] = useReducer(themeReducer, {
//     isDark: false,
//   });

//   useEffect(() => {
//     authService.onAuthStateChanged((user) => {
//       //onAuthStateChanged는 로그인, 로그아웃, 어플리케이션이 초기화 될 때 발생한다.
//       if (user) {
//         setUserObject({
//           displayName: user.displayName,
//           photoURL: user.photoURL,
//           uid: user.uid,
//           updateProfile: (args) => user.updateProfile(args),
//         });
//       } else {
//         setUserObject(null);
//       }
//       setInit(true);
//     });
//   }, []);

//   const refreshUserObj = () => {
//     // setUserObject(authService.currentUser); authService.currentUser => 안에는 너무 많은 정보가 있기때문에 setState에 담아버리면 변화를 알지 못하므로 필요한 정보만 뽑아서 전달해야 한다.
//     const user = authService.currentUser;
//     setUserObject({
//       displayName: user.displayName,
//       uid: user.uid,
//       photoURL: user.photoURL,
//       updateProfile: (args) => user.updateProfile(args),
//     });
//   };

//   return (
//     <Context.Provider value={{ state, dispatch }}>
//       <ThemeProvider theme={state.isDark ? theme.dark : theme.light}>
//         <GlobalStyles />
//         {init ? (
//           <RootWrap>
//             <AppRouter
//               isLoggedIn={Boolean(userObject)}
//               userObject={userObject}
//               refreshUserObj={refreshUserObj}
//             />
//           </RootWrap>
//         ) : (
//           'loading...'
//         )}
//       </ThemeProvider>
//     </Context.Provider>
//   );
// }

// export default App;

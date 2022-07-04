import React from "react";
import { Main, MediaDiv } from "./styledComponent";

import { darkTheme, lightTheme } from "./styles";
import { ThemeProvider } from "styled-components";
import { useState } from "react";
import Header from "./Header";
import Slogun from "./Slogun";
import ShowPostList from "./ShowPostList";
import Footer from "./Footer";
import { Routes, Route } from "react-router-dom";
import ShowPost from "./ShowPost";
import WritePost from "./WritePost";

const API_URL = 'https://reactapitest.pythonanywhere.com/api/';

function App() {
  
  const [darkMode, setDarkMode] = useState(true);



  return (
    <>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <MediaDiv>
          <Header darkMode={darkMode} setDarkMode={setDarkMode} />
          <Main>
            <Slogun></Slogun>
            <Routes>
              <Route
                path="/"
                element={
                  <ShowPostList
                    apiUrl={API_URL}
                  />
                }
              ></Route>
              <Route path="/write" element={<WritePost apiUrl={API_URL}></WritePost>}></Route>
              <Route
                path="/post/:postID"
                element={<ShowPost apiUrl={API_URL}></ShowPost>}
              ></Route>
            </Routes>
          </Main>
          <Footer />
        </MediaDiv>
      </ThemeProvider>
    </>
  );
}

export default App;

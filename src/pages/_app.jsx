import "pages/index";
import { Provider } from "react-redux";
import { store } from "reduxStore/store";
import "styles/globals.css";


function MainWrapper({ Component, pageProps }) {
  return (
    <>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

export default MainWrapper;

import ReactDOM from 'react-dom';
import App from "./App";


if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
    // document.write("mobile");
    // console.log("mobile")
    window.location.replace("https://ashiksudhakaran.com")
  }else{
    // document.write("not mobile");
    // console.log("not mobile")
  }

ReactDOM.render(<App />, document.getElementById('root'));
// import CryptoJS from "crypto-js";
// import SecureStorage from "secure-web-storage";
 
// var SECRET_KEY = 'SECRET_KEY_IN_.ENV_FILE';
 
// var secureStorage = new SecureStorage(typeof  window !== "undefined" && sessionStorage, {
//     hash: function hash(key) {
//         key = CryptoJS.SHA256(key, SECRET_KEY);
 
//         return key.toString();
//     },
//     encrypt: function encrypt(data) {
//         data = CryptoJS.AES.encrypt(data, SECRET_KEY);
 
//         data = data.toString();
 
//         return data;
//     },
//     decrypt: function decrypt(data) {
//         data = CryptoJS.AES.decrypt(data, SECRET_KEY);
 
//         data = data.toString(CryptoJS.enc.Utf8);
 
//         return data;
//     }
// });

class LocalStore {
    getCart = () => {
     if (typeof window !== "undefined") {
        const cart = window.sessionStorage.getItem("cart");
        return JSON.parse(cart);
      }
     return "";
    };

    setCart = cart => {
     if (typeof window !== "undefined") {
       window.sessionStorage.setItem("cart",  JSON.stringify(cart));
      }
    };

    clear = () =>{
        sessionStorage.clear();
    }
    
  
  }
  
  const LocalStoreClass = new LocalStore();
  export default LocalStoreClass;
  
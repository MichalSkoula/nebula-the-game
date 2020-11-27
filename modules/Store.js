var _store = {};

class Store {
   constructor(props) {
      if (props) { 
         _store = props;
      }
    }
    getContent() {
        return _store;
    }
}
export default Store

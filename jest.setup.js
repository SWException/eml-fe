import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

require('dotenv').config(); // Per usare le variabili d'ambiente

configure({
    adapter: new Adapter()
});

global.matchMedia = global.matchMedia || function () {
    return {
        matches : false,
        addListener : function () {},
        removeListener: function () {}
    }
}

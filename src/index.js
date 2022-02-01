import ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil';
import App from './App';

const app = document.getElementById('app');
ReactDOM.render(<RecoilRoot><App /></RecoilRoot>, app);

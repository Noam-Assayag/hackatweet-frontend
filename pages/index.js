import { useSelector } from 'react-redux';
import Login from '../components/Login';
import Home from '../components/Home';

function Index() {
  const user = useSelector((state) => state.user.value);

  if (!user.token) {
    return <Login />;
  }

  return <Home />;
}

export default Index;
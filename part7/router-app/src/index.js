import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useParams,
  useHistory,
  useRouteMatch,
} from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h2>home page</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam volutpat
        feugiat erat, a eleifend lorem tempus vel. Lorem ipsum dolor sit amet,
        consectetur adipiscing elit. Nunc viverra sit amet sapien at varius.
        Etiam vehicula, odio sit amet ultrices dignissim, ex purus aliquam
        tellus, sed imperdiet neque dui et nisl. Proin nec felis ac est luctus
        eleifend. Pellentesque arcu arcu, pretium sed mollis non, tincidunt ac
        nibh. Sed venenatis mattis porta. Nunc aliquet id dui sed placerat.
        Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere
        cubilia curae;
      </p>
    </div>
  );
};

const Note = ({ note }) => {
  return (
    <div>
      <h2>{note.content}</h2>
      <div>{note.user}</div>
      <div>
        <strong>{note.important ? 'important' : ''}</strong>
      </div>
    </div>
  );
};

const Notes = ({ notes }) => {
  return (
    <div>
      <h2>list of notes</h2>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <Link to={`/notes/${note.id}`}>{note.content}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Users = () => {
  return (
    <div>
      <h2>list of users</h2>
      <ul>
        <li>user1</li>
        <li>user2</li>
        <li>user3</li>
      </ul>
    </div>
  );
};

const Login = (props) => {
  const history = useHistory();

  const onSubmit = (event) => {
    event.preventDefault();
    props.onLogin(event.target.username.value);
    history.push('/');
  };

  return (
    <div>
      <h2>login</h2>
      <form onSubmit={onSubmit}>
        <div>
          username: <input name="username" />
        </div>
        <div>
          password: <input type="password" />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

const App = () => {
  const [notes, setNotes] = useState([
    {
      id: 1,
      content: 'HTML is easy',
      important: true,
      user: 'Matti Luukkainen',
    },
    {
      id: 2,
      content: 'Browser can execute only Javascript',
      important: false,
      user: 'Matti Luukkainen',
    },
    {
      id: 3,
      content: 'Most important methods of HTTP-protocol are GET and POST',
      important: true,
      user: 'Arto Hellas',
    },
  ]);

  const [user, setUser] = useState(null);

  const login = (user) => {
    setUser(user);
  };

  const match = useRouteMatch('/notes/:id');
  const note = match
    ? notes.find((note) => note.id === Number(match.params.id))
    : null;

  const padding = {
    padding: 5,
  };

  return (
    <div>
      <div>
        <Link style={padding} to="/">
          home
        </Link>
        <Link style={padding} to="/notes">
          notes
        </Link>
        <Link style={padding} to="/users">
          users
        </Link>
        {user ? (
          <em>{user} logged in</em>
        ) : (
          <Link style={padding} to="/login">
            login
          </Link>
        )}
      </div>

      <Switch>
        <Route path="/notes/:id">
          <Note note={note} />
        </Route>
        <Route path="/notes">
          <Notes notes={notes} />
        </Route>
        <Route path="/users">
          {user ? <Users /> : <Redirect to="/login" />}
        </Route>
        <Route path="/login">
          <Login onLogin={login} />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
      <div>
        <br />
        <i>note app practice tmg</i>
      </div>
    </div>
  );
};

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);

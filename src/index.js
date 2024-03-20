import Handlebars from 'handlebars';
import * as Components from './components';
import * as Pages from './pages';

const pages = {
  'chat': [ Pages.ChatPage ],
  'login': [ Pages.LoginPage ],
  'singup': [Pages.SingUpPage],
  'error': [Pages.ErrorPage],
  'notfound': [Pages.NotFoundPage],
  'profile': [Pages.ProfilePage]
};

Object.entries(Components).forEach(([ name, component ]) => {
  Handlebars.registerPartial(name, component);
});

function navigate(page) {
  const [ source, args ] = pages[page];
  const handlebarsFunct = Handlebars.compile(source);
  document.body.innerHTML = handlebarsFunct(args);
}

document.addEventListener('DOMContentLoaded', (e) => {
  const path = e.target.location.pathname;

  switch (path) {
    case '/login': {
      navigate('login');
      break;
    }
    case '/singup': {
      navigate('singup');
      break;
    }
    case '/profile': {
      navigate('profile');
      break;
    }
    // case '/edit-profile': {
    //   navigate('editProfilePage');
    //   break;
    // }
    // case '/edit-password': {
    //   navigate('editPasswordPage');
    //   break;
    // }
    case '/404': {
      navigate('notfound');
      break;
    }
    case '/500': {
      navigate('error');
      break;
    }

    default: {
      window.location.pathname = '/login';
    }
  }

});


document.addEventListener('click', e => {
  const page = e.target.getAttribute('page');
  if (page) {
    navigate(page);

    e.preventDefault();
    e.stopImmediatePropagation();
  }
});

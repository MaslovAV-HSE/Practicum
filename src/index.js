import Handlebars from 'handlebars';
import * as Components from './components';
import * as Pages from './pages';

const pages = {
  'chat': [ Pages.ChatPage ],
  'login': [ Pages.LoginPage ],
  'singup': [Pages.SingUpPage],
  '500': [Pages.ErrorPage],
  '404': [Pages.NotFoundPage],
  'profile': [Pages.ProfilePage],
  'editprofile': [Pages.EditProfile],
  'editpassword': [Pages.EditPassword]
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
  const path = e.target.location.pathname.slice(1);
  
  if (Object.keys(pages).includes(path)) {
    navigate(path);
  }
  else {
    window.location.pathname = '/login';
  };
});


document.addEventListener('click', e => {
  const page = e.target.getAttribute('page');
  if (page) {
    navigate(page);

    e.preventDefault();
    e.stopImmediatePropagation();
  }
});

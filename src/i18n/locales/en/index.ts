import common from './common.json';
import navigation from './navigation.json';
// Import all screen translations
import about from './screens/about.json';
import blog from './screens/blog.json';
import contact from './screens/contact.json';
import home from './screens/home.json';
import notFound from './screens/notFound.json';
import partners from './screens/partners.json';
import post from './screens/post.json';
import projectDetail from './screens/projectDetail.json';
import projects from './screens/projects.json';
import services from './screens/services.json';
import team from './screens/team.json';
import teamJoin from './screens/teamJoin.json';

// Define screens namespace with all page translations
const screens = {
  about,
  blog,
  contact,
  home,
  notFound,
  partners,
  post,
  projectDetail,
  projects,
  services,
  team,
  teamJoin,
};

export default {
  common,
  navigation,
  screens,
};

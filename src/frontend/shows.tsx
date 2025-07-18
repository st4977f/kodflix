import Daredevil from './gallery/cover/images/daredevil-cover.jpg';
import MyNameIsEarl from './gallery/cover/images/my-name-is-earl.jpg';
import Ozark from './gallery/cover/images/ozark.jpg';
import SweetHome from './gallery/cover/images/sweet-home.jpg';
import TheMentalist from './gallery/cover/images/the-mentalist.jpg';
import Westworld from './gallery/cover/images/westworld.jpg';

export default function getShows() {
  return [
    {
      id: 'daredevil',
      title: 'Daredevil',
      description: 'Action | Crime | Drama',
      image: Daredevil,
      synopsis: 'A blind lawyer by day, vigilante by night, Matt Murdock fights crime in Hell\'s Kitchen as Daredevil.',
    },
    {
      id: 'my-name-is-earl',
      title: 'My Name Is Earl',
      description: 'Comedy',
      image: MyNameIsEarl,
      synopsis: 'A man seeks to improve his life by correcting all the wrongs he has done in the past.',
    },
    {
      id: 'ozark',
      title: 'Ozark',
      description: 'Crime | Drama | Thriller',
      image: Ozark,
      synopsis: 'A financial planner relocates his family to the Ozarks after a money-laundering scheme goes wrong.',
    },
    {
      id: 'sweet-home',
      title: 'Sweet Home',
      description: 'Drama | Horror | Thriller',
      image: SweetHome,
      synopsis: 'Residents of a rundown apartment complex fight to survive as the world is plagued by monsters.',
    },
    {
      id: 'the-mentalist',
      title: 'The Mentalist',
      description: 'Crime | Drama | Mystery',
      image: TheMentalist,
      synopsis: 'A former psychic medium uses his keen observational skills to solve crimes as a consultant for the California Bureau of Investigation.',
    },
    {
      id: 'westworld',
      title: 'Westworld',
      description: 'Drama | Sci-Fi | Thriller',
      image: Westworld,
      synopsis: 'In a futuristic amusement park, guests interact with lifelike robots in a world where they can do anything without consequences.',
    },
  ];
}
